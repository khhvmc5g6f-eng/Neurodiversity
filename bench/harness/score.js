#!/usr/bin/env node
// Mechanical scorer: no LLM judge. Matches each run's reported findings
// against each fixture's ground-truth defect list by regex, and reports
// true positives / false negatives / false positives / precision /
// recall / F1 per (fixture, condition) and aggregated per condition.
//
// Usage:
//   node score.js                 recompute + print full report from bench/results/
//   node score.js --verify-only   recompute and fail (exit 1) if it disagrees
//                                  with the committed summary.json (used by CI)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FIXDIR = path.join(ROOT, 'fixtures');
const RESULTSDIR = path.join(ROOT, 'results');
const CONDITIONS = ['baseline', 'divergent', 'autistic', 'divergent-autistic'];

function loadGroundTruth() {
  return fs.readdirSync(FIXDIR)
    .filter(f => fs.statSync(path.join(FIXDIR, f)).isDirectory())
    .map(id => JSON.parse(fs.readFileSync(path.join(FIXDIR, id, 'ground-truth.json'), 'utf8')));
}

function loadRun(fixtureId, condition) {
  const p = path.join(RESULTSDIR, fixtureId, `${condition}.json`);
  if (!fs.existsSync(p)) return null;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  // findings: array of strings, or array of {finding: string}
  const items = Array.isArray(data.findings) ? data.findings : [];
  const findings = items.map(it => (typeof it === 'string' ? it : (typeof it.finding === 'string' ? it.finding : JSON.stringify(it))));
  // tokensUsed / durationMs: optional, per §106/§115 of the source spec
  // ("measure findings per token, per second"). Not present on any run
  // committed before this field existed -- see EVALS.md's Deferred
  // section for why those aren't backfilled.
  const tokensUsed = typeof data.tokensUsed === 'number' ? data.tokensUsed : null;
  const durationMs = typeof data.durationMs === 'number' ? data.durationMs : null;
  return { findings, tokensUsed, durationMs };
}

function compilePattern(fixtureId, defectId, pattern) {
  try {
    return new RegExp(pattern, 'i');
  } catch (e) {
    throw new Error(`Invalid regex in ${fixtureId}/ground-truth.json, defect ${defectId}, pattern ${JSON.stringify(pattern)}: ${e.message}`);
  }
}

function scoreOne(fixture, findings) {
  const text = findings.map(f => f.toLowerCase());
  const perDefect = [];
  let tp = 0, fn = 0;
  for (const defect of fixture.defects) {
    const patterns = defect.mustMatchAny.map(p => compilePattern(fixture.fixtureId, defect.id, p));
    const hitIndex = text.findIndex(t => patterns.some(re => re.test(t)));
    const hit = hitIndex !== -1;
    perDefect.push({ id: defect.id, hit, matchedIndex: hit ? hitIndex : -1, matchedFinding: hit ? findings[hitIndex] : null });
    if (hit) tp++; else fn++;
  }
  // FP proxy: reported findings that matched none of this fixture's defects.
  const matchedIdx = new Set(perDefect.filter(d => d.hit).map(d => d.matchedIndex));
  const fp = findings.length - matchedIdx.size;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : (tp === 0 ? 1 : 0);
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 1;
  const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  return { tp, fp, fn, precision, recall, f1, perDefect, reportedCount: findings.length };
}

function main() {
  const verifyOnly = process.argv.includes('--verify-only');
  const fixtures = loadGroundTruth();
  const report = { generatedFrom: 'bench/results/', perFixture: {}, perCondition: {} };

  for (const cond of CONDITIONS) {
    report.perCondition[cond] = { tp: 0, fp: 0, fn: 0, fixturesScored: 0, tokensUsed: 0, durationMs: 0, runsWithTokenData: 0 };
  }

  for (const fixture of fixtures) {
    report.perFixture[fixture.fixtureId] = {};
    for (const cond of CONDITIONS) {
      const run = loadRun(fixture.fixtureId, cond);
      if (run === null) continue; // not run yet
      const s = scoreOne(fixture, run.findings);
      s.tokensUsed = run.tokensUsed;
      s.durationMs = run.durationMs;
      report.perFixture[fixture.fixtureId][cond] = s;
      report.perCondition[cond].tp += s.tp;
      report.perCondition[cond].fp += s.fp;
      report.perCondition[cond].fn += s.fn;
      report.perCondition[cond].fixturesScored += 1;
      if (run.tokensUsed !== null) {
        report.perCondition[cond].tokensUsed += run.tokensUsed;
        report.perCondition[cond].durationMs += run.durationMs || 0;
        report.perCondition[cond].runsWithTokenData += 1;
      }
    }
  }

  for (const cond of CONDITIONS) {
    const c = report.perCondition[cond];
    c.precision = (c.tp + c.fp) > 0 ? c.tp / (c.tp + c.fp) : null;
    c.recall = (c.tp + c.fn) > 0 ? c.tp / (c.tp + c.fn) : null;
    c.f1 = (c.precision !== null && c.recall !== null && (c.precision + c.recall) > 0)
      ? (2 * c.precision * c.recall) / (c.precision + c.recall) : null;
    // Cost-efficiency metrics per source spec §106/§115 ("findings per
    // token, per second"). Only meaningful if every scored run for this
    // condition actually reported token data -- a partial sample would
    // silently understate cost, so we require full coverage rather than
    // averaging over whatever happens to be available.
    const hasFullTokenData = c.runsWithTokenData > 0 && c.runsWithTokenData === c.fixturesScored;
    c.findingsPerToken = hasFullTokenData && c.tokensUsed > 0 ? (c.tp + c.fp) / c.tokensUsed : null;
    c.findingsPerSecond = hasFullTokenData && c.durationMs > 0 ? (c.tp + c.fp) / (c.durationMs / 1000) : null;
  }

  const summaryPath = path.join(RESULTSDIR, 'summary.json');

  if (verifyOnly) {
    if (!fs.existsSync(summaryPath)) {
      console.log('No committed summary.json yet -- nothing to verify. Skipping.');
      process.exit(0);
    }
    const committed = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    const recomputedStr = JSON.stringify(report.perCondition);
    const committedStr = JSON.stringify(committed.perCondition);
    if (recomputedStr !== committedStr) {
      console.error('Scoring drift detected between committed summary.json and recomputed scores.');
      console.error('Committed: ', committedStr);
      console.error('Recomputed:', recomputedStr);
      process.exit(1);
    }
    console.log('Scoring verified: recomputed results match committed summary.json.');
    process.exit(0);
  }

  fs.writeFileSync(summaryPath, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.perCondition, null, 2));
  console.log(`\nFull report written to ${summaryPath}`);
}

main();
