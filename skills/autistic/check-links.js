#!/usr/bin/env node
// Checks that every backtick-quoted `references/X.md`, `frames/X.md`, or
// `schemas/X.json` path mentioned in SKILL.md or any frames/references doc
// actually resolves to a real file, relative to this skill's own directory.
// Run from anywhere: node skills/autistic/check-links.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SOURCES = [
  path.join(ROOT, 'SKILL.md'),
  ...fs.readdirSync(path.join(ROOT, 'frames')).map(f => path.join(ROOT, 'frames', f)),
  ...fs.readdirSync(path.join(ROOT, 'references')).map(f => path.join(ROOT, 'references', f)),
];

const LINK_RE = /`((?:\.\.\/)?(?:references|frames|schemas)\/[a-zA-Z0-9_-]+\.(?:md|json))`/g;

let missing = 0;
let checked = 0;

for (const source of SOURCES) {
  const text = fs.readFileSync(source, 'utf8');
  const sourceDir = path.dirname(source);
  let match;
  while ((match = LINK_RE.exec(text)) !== null) {
    const rel = match[1];
    checked++;
    // A bare `references/x.md`-style path (no ../) is always meant relative
    // to the skill root, regardless of which file it appears in -- e.g.
    // SKILL.md and a file inside references/ both write `references/x.md`
    // to mean the same location. A `../`-prefixed path is relative to the
    // referencing file's own directory instead.
    const resolved = rel.startsWith('../') ? path.join(sourceDir, rel) : path.join(ROOT, rel);
    if (!fs.existsSync(resolved)) {
      console.error(`BROKEN LINK: ${path.relative(ROOT, source)} references "${rel}", which does not exist at ${resolved}`);
      missing++;
    }
  }
}

if (missing > 0) {
  console.error(`\n${missing} broken reference(s) found out of ${checked} checked.`);
  process.exit(1);
}

console.log(`All ${checked} internal references resolve.`);
