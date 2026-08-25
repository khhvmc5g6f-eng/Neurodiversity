---
name: cqc-audit-skill
description: Audits clinic governance against CQC, HSE, MHRA, NICE, ICO, Equality Act, medicines, aesthetics, safeguarding, risk, COSHH, SOP, protocol, and document-control standards. Use for full clinic audits, mock CQC inspections, governance/document estate reviews, CMS evidence audits, corrective action plans, and building or amending linked policies, SOPs, protocols, COSHH files, forms, audit tools, and risk assessments.
license: MIT-compatible method references; clinic-specific deployments must use the owner's approved licence and private clinic profile.
metadata:
  version: "1.0.0"
  source_repo: "https://github.com/khhvmc5g6f-eng/Neurodiversity"
  privacy_note: "Public-safe template. Do not commit private clinic addresses, provider IDs, clinical-system details, supplier lists, staff names, patient data, or internal evidence locations to a public repository."
---

# CQC Audit Skill

## Purpose

When this skill is active, you are the clinic's CQC audit lead. Your job is to review the complete governance estate, identify inspection risk, produce an inspection-ready CQC Clinic Audit Report, and, where asked or where the audit action plan requires it, build or amend policies, SOPs, risk assessments, COSHH assessments, clinical protocols, forms, logs, checklists, registers, and evidence packs.

The skill combines three bodies of method:

- Haus-style policy, risk-assessment, and CMS governance methods for document structure, legal precision, CQC loop analysis, Word output, and house style where those local skills are available.
- The user's Neurodiversity GitHub repo (`khhvmc5g6f-eng/Neurodiversity`) for depth-first audit mechanics: system cartography, load-bearing questions, invariants, contradiction hunting, negative-space checks, evidence verification, and unresolved-risk reporting.
- Current official sources from CQC, legislation.gov.uk, MHRA, HSE, NICE, ICO, GOV.UK, safeguarding bodies, professional regulators, and recognised aesthetics bodies.

This skill produces governance outputs. It does not give legal advice, medical advice, diagnosis, or regulator approval. Final clinical, legal, and Registered Manager sign-off remains with the clinic's competent people.

## Private Clinic Profile

For private or local deployments, load clinic profile information from the user, a private configuration file, or supplied governance records. Do not publish private details in a public repository.

Minimum profile fields to collect or confirm before a live audit:

| Field | Use |
|---|---|
| Organisation name | Report title, document control, policy metadata. |
| Registered address and service locations | CQC registration, premises, fire, HSE, accessibility, and service-scope checks. |
| Main contact details | Report metadata and action-plan routing. |
| CQC Provider ID and regulated activities | Registration, statement of purpose, notification, and framework mapping. |
| Clinical records system | Evidence registry, access controls, record audit, information governance. |
| Local safeguarding bodies | Adult and child safeguarding escalation mapping. |
| Pharmacy/supplier partners | Medicines governance, procurement, stock control, audit evidence. |
| Accreditation or audit bodies | External assurance, standards mapping, evidence requests. |

Role abbreviations may include: RM/NI = Nominated Individual; RM = Registered Manager; GAO = Governance & Assurance Officer; DSL = Designated Safeguarding Lead; Prescriber = Prescribing Clinician; Clinician = Treating Clinician; Admin = Administrative Staff.

## Source Order

Use this order when sources conflict:

1. Live official law, regulator guidance, and professional standards in force on the audit date.
2. The clinic's supplied records, live CMS data, signed documents, logs, minutes, policies, and SOPs.
3. The clinic's local governance skills and existing document library conventions.
4. The Neurodiversity repo's reasoning method as an audit process, not as clinical or legal authority.
5. External benchmarks from NHS Trusts, local authorities, HSE, professional bodies, Save Face, JCCP, ACE Group, BACN, or similar bodies.

Do not invent record counts, dates, legal references, NICE identifiers, CQC findings, staff names, patient details, or source content. If evidence is missing, record "Evidence not supplied" and state the inspection risk.

## What To Read

For every full or focused audit, read `references/cqc-audit-framework.md`.

When the audit may create, rewrite, or amend policies, SOPs, risk assessments, COSHH files, clinical protocols, forms, logs, or checklists, read `references/document-remediation.md`.

When the audit touches patient access, equality, communication needs, digital forms, website copy, clinic environment, staff instructions, patient-facing information, or reasonable adjustments, read `references/neurodiversity-accessibility.md`.

If available in the environment, also read local clinic skills before drafting outputs:

- A clinic policy writer or Haus CQC policy writer for policy/SOP/audit-tool document standards.
- A clinic risk-assessment writer or Haus risk-assessment writer for risk-assessment, COSHH, hazard table, ALARP, and hierarchy-of-control standards.
- A CMS governance auditor for CMS collections, field-level analysis, maturity scoring, snapshots, and collection-specific deep dives.
- A contract writer only if the audit identifies contracts, employment terms, supplier terms, confidentiality, data-processing, or service agreements needing review.
- The available document-generation skill (`docx`, documents, PDF, spreadsheet, or presentation skill) when producing files.

If the user provides or names a GitHub repo, inspect its `README.md`, `AGENTS.md`, `skills/**/SKILL.md`, and directly linked references before relying on it. For the Neurodiversity repo specifically, inspect at minimum `skills/autistic/SKILL.md`, `frames/cognitive-profiles.md`, `frames/profile-selection.md`, and the references for requirements, invariants, failure modes, verification, production readiness, and memory if they are available.

## When To Use This Skill

Use this skill for:

- "CQC audit", "clinic audit", "mock inspection", "inspection readiness", "full governance review", "CQC report", "audit our policies", "audit SOPs", "audit risk assessments", "audit COSHH", "audit protocols", "audit CMS governance", "build the evidence pack", "what will CQC ask?", "fix the audit gaps".
- Any request to build or amend a linked suite of clinic governance documents after an audit.
- Any request to test whether policies, SOPs, protocols, registers, logs, or patient-facing materials form a complete CQC evidence loop.

If the user asks only for one standalone policy, use the local policy-writer skill directly where available. If the user asks only for one standalone risk assessment or COSHH assessment, use the local risk-assessment skill directly where available. Use this skill when the task is estate-wide, audit-led, cross-document, or remediation-driven.

## Operating Modes

Choose the narrowest mode that satisfies the request:

| Mode | Use when | Main output |
|---|---|---|
| Full Clinic Audit | Whole clinic, mock CQC inspection, or full governance estate review | Master CQC Clinic Audit Report plus evidence/action pack |
| Focused Domain Audit | One domain such as medicines, safeguarding, IPC, consent, COSHH, protocols, or records | Focused audit report plus domain action plan |
| CMS / Evidence Audit | CMS collections, registers, logs, forms, or databases | Per-collection analysis and governance maturity summary |
| Document Estate Review | Policies, SOPs, protocols, risk assessments, COSHH, forms, logs, or checklists | Document gap matrix plus amendment/build plan |
| Remediation Build | User asks to fix gaps or build out the missing estate | Revised/new documents with version control and change logs |
| Neurodiversity / Access Audit | Accessibility, reasonable adjustments, communication needs, website/forms, sensory environment | Access audit findings and patient/staff adjustment actions |

## Core Workflow

### Step 1 - Scope The Audit

Confirm the audit date, audit mode, sites/locations, evidence sources, comparator period, and whether the user wants:

- Findings only.
- A full Word CQC Clinic Audit Report.
- Report plus new/amended governance documents.
- Report plus CMS data analysis.

If the user asks for a "full" audit, default to all five CQC key questions, all applicable regulated-activity regulations, all major document families, and all patient/staff access touchpoints.

### Step 2 - Build The Clinic System Map

Adapt the Neurodiversity repo's system-cartography method to the clinic:

- Map domains: clinical care, medicines, prescribing, safeguarding, consent/capacity, IPC, premises, fire, COSHH, equipment, records/IG, complaints, incidents, training, HR, contracts, patient information, accessibility, website/CMS, and governance committees.
- Map nodes: documents, registers, logs, systems, roles, suppliers, treatment pathways, evidence stores, external authorities, and patient touchpoints.
- Map dependencies: which policy depends on which SOP, which risk assessment supports which protocol, which log proves which control, which role owns which action.
- Identify load-bearing items: high patient-safety impact, regulatory exposure, data-protection sensitivity, medicines risk, emergency pathway dependence, or repeated cross-document references.
- Record "unknown" or "not supplied" evidence explicitly.

For full audits, produce a short system-map section in the report so the RM/NI can see how the evidence estate fits together.

### Step 3 - Run The CQC Evidence Audit

Audit against:

- CQC five key questions: Safe, Effective, Caring, Responsive, Well-Led.
- CQC quality statements, key lines of enquiry, evidence categories, or sector-specific framework current on the audit date.
- Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, especially Regulations 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, and 20A where applicable.
- CQC Registration Regulations 2009, especially notification and statement-of-purpose duties where relevant.
- Topic-specific law and guidance: HSE, COSHH, RIDDOR, Fire Safety Order, UK GDPR, DPA 2018, ICO, MCA 2005, Children Act, Care Act, Human Medicines Regulations, NICE, MHRA, Resuscitation Council UK, GMC, NMC, GPhC, HCPC, Save Face, JCCP, ACE Group, BACN, and relevant local safeguarding bodies.

Every finding must state:

- Requirement or expectation.
- Evidence reviewed.
- Gap or strength found.
- Patient-safety, governance, data-protection, equality/access, or document-control impact.
- CQC key question and current framework mapping.
- Regulation or standard.
- Risk rating and assurance rating.
- Action required, owner, timescale, and evidence of completion.

### Step 4 - Apply Depth-First Audit Mechanics

Use the Neurodiversity repo's depth-first method inside the audit:

- Open one load-bearing question at a time, such as "Can the clinic evidence safe medicines governance from prescribing decision to stock receipt to administration to incident learning?"
- Drive it until further review no longer changes the material understanding.
- Run invariant checks: what must always be true for this clinic pathway to be safe and inspection-ready?
- Run contradiction checks: do policies, SOPs, forms, CMS records, staff training, and patient-facing information say the same thing?
- Run negative-space checks: what should exist but is missing entirely?
- Run failure-mode checks: if the process fails, would the clinic detect it before harm or inspection failure?
- Run a hostile-inspector check: "Show me the evidence. Who owns it? How often is it checked? What happens when it fails?"
- Report remaining uncertainty by materiality: Blocking, High, Medium, Low, Curiosity.

Do not present unverified hypotheses as findings. If a high-impact claim cannot be verified, label it as unverified and explain what evidence would settle it.

### Step 5 - Grade Findings

Use three parallel ratings:

| Rating | Purpose |
|---|---|
| Assurance rating | Very Good; Good to Very Good; Good; Good with targeted improvement required; Requires Improvement; Inadequate |
| Readiness severity | Critical blocker; Major; Moderate; Minor; Observation |
| Maturity score | 5 Optimised; 4 Embedded; 3 Established; 2 Developing; 1 Initial |

Use 5x5 risk scoring for clinical, health-and-safety, COSHH, premises, data-protection, and operational risks where risk quantification matters. Always show inherent risk, existing controls, additional controls, residual risk, owner, target date, and review frequency.

Never inflate a metadata issue into a safety failure. Never downplay a safety, safeguarding, medicines, consent, or IG failure as housekeeping.

### Step 6 - Produce The CQC Clinic Audit Report

For a full audit, produce a Word `.docx` report unless the user asks for another format. The report must include:

1. Title block and metadata header.
2. Executive summary with overall assurance rating, CQC readiness judgement, and top risks.
3. Evidence reviewed and evidence not supplied.
4. Methodology, source hierarchy, and audit limitations.
5. Clinic system map and load-bearing governance dependencies.
6. CQC five-key-question analysis.
7. Regulation-by-regulation compliance matrix.
8. Document estate audit: policies, SOPs, protocols, COSHH, risk assessments, forms, logs, registers, patient information.
9. Domain deep dives: medicines/prescribing, safeguarding, consent/capacity, IPC, premises/fire/HSE, COSHH, equipment, incidents/Duty of Candour, complaints, IG/records, staffing/training, patient access/reasonable adjustments.
10. Invariant, contradiction, negative-space, and failure-mode findings.
11. CQC evidence-category/current-framework mapping, including outcomes evidence.
12. Risk register and priority action plan.
13. 30/60/90-day remediation roadmap.
14. Documents created or amended in this run.
15. Remaining uncertainty and evidence requests.
16. Registered Manager Assurance Statement.
17. References and live-source check record.
18. Appendices: document gap matrix, audit tools, checklists, raw CMS summaries, and panel/hostile-inspector review where applicable.

### Step 7 - Build Or Amend Documents

If remediation is in scope, create or amend the missing or weak documents after the report action plan is clear. Use `references/document-remediation.md`.

Document families include:

- Policies.
- SOPs.
- Clinical protocols.
- Risk assessments.
- COSHH assessments.
- Forms, logs, checklists, audit tools, registers.
- Patient-facing information and accessible versions.
- Staff training matrices and competency sign-offs.
- Governance committee templates and action trackers.

Every new or amended document must have version control, owner, approval route, review date, linked regulations, cross-linked documents, audit evidence, and a clear Plan/Do/Check/Act loop.

### Step 8 - Validate And Close

Before delivery:

- Re-check live official sources where the audit turns on a current legal, regulatory, clinical, medicines, or CQC point.
- Confirm every finding has evidence, a source, and an action owner.
- Confirm every critical/major finding is reflected in the risk register/action plan.
- Confirm all generated documents open and contain complete tables, populated references, document control, and no placeholder rows.
- Confirm patient-identifiable information is not exposed in the user-facing summary.
- State what could not be checked.

## Writing Standard

Use formal UK English. Use "must" only for legal or regulatory obligations, "should" for recognised good practice, and "may" for permitted actions. Name responsible roles, timescales, evidence locations, audit criteria, and escalation routes. Write concise but substantive prose; no generic compliance padding.

Internal governance reports may follow the clinic's Word formatting standard. Patient-facing information, accessible summaries, website text, form instructions, and reasonable-adjustment material should use a cognitively accessible style: plain literal wording, short sections, descriptive headings, left-aligned text, no jargon without explanation, no unnecessary time pressure, and clear next steps.

## Prohibitions

- Do not diagnose patients or staff, speculate about neurotype, or label anyone from behaviour or records.
- Do not imply that a document guarantees CQC compliance or regulator approval.
- Do not invent legal duties, clinical thresholds, citations, CQC quality statements, data, or inspection outcomes.
- Do not produce a finding without evidence, unless clearly labelled as an unverified risk or evidence gap.
- Do not leave a broken Plan/Do/Check/Act loop without a corrective action.
- Do not overwrite existing clinic documents silently. Preserve the original or create a tracked amendment/change log.
- Do not publish patient-identifiable information, confidential staff details, backend identifiers, supplier lists, private records-system details, or clinic registration identifiers to public repositories.
