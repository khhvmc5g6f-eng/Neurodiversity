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
const CONDITIONS = ['baseline', 'adhd', 'autistic', 'adhd-autistic'];

function loadGroundTruth() {
  return fs.readdirSync(FIXDIR)
    .filter(f => fs.statSync(path.join(FIXDIR, f)).isDirectory())
    .map(id => JSON.parse(fs.readFileSync(path.join(FIXDIR, id, 'ground-truth.json'), 'utf8')));
}

function loadFindings(fixtureId, condition) {
  const p = path.join(RESULTSDIR, fixtureId, `${condition}.json`);
  if (!fs.existsSync(p)) return null;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  // findings: array of strings, or array of {finding: string}
  const items = Array.isArray(data.findings) ? data.findings : [];
  return items.map(it => (typeof it === 'string' ? it : (it.finding || JSON.stringify(it))));
}

function scoreOne(fixture, findings) {
  const text = findings.map(f => f.toLowerCase());
  const perDefect = [];
  let tp = 0, fn = 0;
  for (const defect of fixture.defects) {
    const patterns = defect.mustMatchAny.map(p => new RegExp(p, 'i'));
    const hitIndex = text.findIndex(t => patterns.some(re => re.test(t)));
    const hit = hitIndex !== -1;
    perDefect.push({ id: defect.id, hit, matchedFinding: hit ? findings[hitIndex] : null });
    if (hit) tp++; else fn++;
  }
  // FP proxy: reported findings that matched none of this fixture's defects.
  const matchedIdx = new Set(perDefect.filter(d => d.hit).map(d => text.findIndex(t =>
    fixture.defects.find(def => def.id === d.id).mustMatchAny.some(p => new RegExp(p, 'i').test(t))
  )));
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
    report.perCondition[cond] = { tp: 0, fp: 0, fn: 0, fixturesScored: 0 };
  }

  for (const fixture of fixtures) {
    report.perFixture[fixture.fixtureId] = {};
    for (const cond of CONDITIONS) {
      const findings = loadFindings(fixture.fixtureId, cond);
      if (findings === null) continue; // not run yet
      const s = scoreOne(fixture, findings);
      report.perFixture[fixture.fixtureId][cond] = s;
      report.perCondition[cond].tp += s.tp;
      report.perCondition[cond].fp += s.fp;
      report.perCondition[cond].fn += s.fn;
      report.perCondition[cond].fixturesScored += 1;
    }
  }

  for (const cond of CONDITIONS) {
    const c = report.perCondition[cond];
    c.precision = (c.tp + c.fp) > 0 ? c.tp / (c.tp + c.fp) : null;
    c.recall = (c.tp + c.fn) > 0 ? c.tp / (c.tp + c.fn) : null;
    c.f1 = (c.precision && c.recall && (c.precision + c.recall) > 0)
      ? (2 * c.precision * c.recall) / (c.precision + c.recall) : null;
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
