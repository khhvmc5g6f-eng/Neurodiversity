# Tool-backed cartography and verification

The phases in `SKILL.md` describe cartography, static analysis,
mutation testing, and contract verification as reasoning steps. Where
possible, back them with a real tool instead of an LLM reading files
and inferring a graph or running tests by hand — a call-graph from a
language server is ground truth; an LLM's read of five files is an
inference. Always try a real tool first via the order below; fall back
to manual reading/reasoning only when nothing suitable is available,
and say so explicitly in the output ("cartography built from manual
file reading — no call-graph tool was available") rather than silently
presenting an inferred graph with the same confidence as a real one.

## Cartography (Phase 0)

1. Check for an MCP server exposing call-graph / symbol-reference data
   before reading files manually. `ToolSearch` with a query like
   `"call graph"`, `"references"`, or `"language server"` — servers
   like **agent-lsp** or a connected **Sourcegraph** MCP expose
   `callHierarchy`/`incomingCalls`/`outgoingCalls`/reference-lookup
   tools that give exact symbol-level edges (`CALLS`, `DEPENDS_ON`),
   not an inferred approximation.
2. If no such MCP tool is connected, check for a CLI dependency-graph
   tool in the target repo's own ecosystem and shell out to it (via
   Bash) rather than hand-building the graph:
   - JS/TS: `npx dependency-cruiser --output-type json <src>` (or
     `madge --json <src>` if dependency-cruiser isn't set up).
   - Python: `pydeps <pkg> --show-deps --no-show` (or parse its JSON).
   - Language-agnostic, AST-based: `code2flow <path> -o graph.json`.
   Parse the tool's JSON output into the system-map node/edge shape
   (`schemas/system-map.schema.json`) rather than re-deriving it from
   scratch.
3. Only when neither an MCP tool nor a CLI tool is available (or the
   target is too small/ad hoc to justify one — e.g. a single pasted
   snippet), fall back to reading files directly and building the graph
   by inference. This is the common case for the fixture-sized problems
   in `bench/`; it's the fallback, not the default, for a real repo.

## Static analysis (Phase 3 contradiction/invariant passes)

Check for a **Semgrep MCP** connection first (`ToolSearch` for
`"semgrep"`); if connected, use it directly for pattern-based static
findings (security anti-patterns, known-bad idioms) instead of relying
purely on an LLM's read-through. If not connected, shell out to
whatever linter/static analyzer the target repo already uses (its own
`eslint`/`ruff`/`clippy`/etc. config) via Bash — running the project's
own configured tool respects its own accepted suppressions and
conventions, which a generic pass would not know about.

## Mutation testing (spec §95, "where tooling exists")

Detect the target's language/ecosystem from its manifest file, then
dispatch:

| Ecosystem | Tool | Invocation |
|---|---|---|
| JS/TS | Stryker | `npx stryker run --reporters json` |
| Java/JVM | PIT | `mvn org.pitest:pitest-maven:mutationCoverage` (or the Gradle plugin) |
| Python | mutmut | `mutmut run` then `mutmut results` / `mutmut junit` for structured output |
| Rust | cargo-mutants | `cargo mutants --json` |

Only run this for a `--forensic` or explicit mutation-testing request
on **critical logic already identified as load-bearing** in Phase 0 —
it's expensive and slow; don't run it as a default part of a
`--standard` pass. Parse the tool's own report (JSON where offered,
otherwise its structured text output) into `verifiedFindings` entries
with the mutation-survival detail as evidence, not a vague "ran mutation
testing" note.

## Contract / documented-behavior verification (contradiction hunt)

When a Phase 3 contradiction hunt is checking a documented API contract
(README, OpenAPI doc, changelog) against actual behavior:

- If an OpenAPI spec exists (documented or extractable from route
  definitions/framework annotations), run **oasdiff** or
  **Schemathesis** against it: `schemathesis run <spec-url-or-path>
  --checks all` actually exercises the live/local server and reports
  concrete contract violations — this is stronger evidence than reading
  the doc and the code side by side and reasoning about whether they
  agree.
- For a documented JSON response shape without a formal spec, validate
  a real captured response against a JSON Schema derived from the docs
  using a validator (`ajv` for JS, `jsonschema` for Python) rather than
  eyeballing field names.
- Where the target has consumer-driven contract tests already (a
  `pact/` directory, `*.pact.json` files), run the existing Pact
  verification (`pact-broker can-i-deploy` or the language-specific
  verifier) instead of re-deriving the contract from scratch — a
  contract that's already tested is stronger evidence than one AUTISTIC
  infers fresh.

## When no tool is available

Say so in the output. A cartography section built from manual reading,
or a contradiction finding based on prose comparison rather than an
actual contract-test run, is still valid evidence — but its confidence
score (`references/verification.md`) should reflect that it's weaker
than tool-verified evidence, not be presented with the same certainty.
