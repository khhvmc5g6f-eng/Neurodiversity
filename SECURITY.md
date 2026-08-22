# Security policy

AUTISTIC is a Markdown-based Claude Code Agent Skill: it contains no
executable server, no network service, and no code that runs outside a
Claude Code session invoking the `Agent` tool. The main things worth a
security-minded look are:

- The skill's own prompts (`skills/autistic/SKILL.md`,
  `skills/autistic/references/*.md`) — could a maliciously crafted
  target repository or document cause the skill's instructions to be
  overridden by content the skill is analysing? Findings here (prompt
  injection via analysed content) are the primary class of vulnerability
  this project accepts reports for.
- The benchmark harness (`bench/harness/`) — a local Node/Bash script
  that reads fixture files and writes result JSON. It does not execute
  fixture content and does not make network calls beyond what the
  `claude` CLI itself performs.

## Reporting

Open a GitHub issue with the `security` label, or, for anything you'd
rather not post publicly, contact the maintainer via the profile on this
account. Please include: the fixture or skill file involved, the
specific instruction or content that causes the issue, and what you'd
expect to happen instead.

## Out of scope

- General LLM jailbreak techniques not specific to this skill's own
  instructions.
- Findings about the underlying Claude models themselves — report those
  to Anthropic directly.
