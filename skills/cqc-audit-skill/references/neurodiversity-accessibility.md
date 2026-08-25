# Neurodiversity, Accessibility, And Depth-First Audit Method

Use this reference for patient access, reasonable adjustments, communication needs, sensory access, consent comprehension, website/forms, staff workflows, and for applying the user's Neurodiversity GitHub skill as an audit method.

## Source Framing

The user's Neurodiversity repo (`https://github.com/khhvmc5g6f-eng/Neurodiversity`) contributes a depth-first reasoning architecture, not a clinical claim about autistic people or a patient-screening method. In this CQC skill, use it as an audit discipline:

- Build the system map before judging.
- Stay with one load-bearing question until it is materially resolved.
- Convert vague claims into explicit rules.
- Look for invariants, contradictions, edge cases, missing counterparts, and failure modes.
- Separate evidence from hypothesis.
- Report unresolved uncertainty rather than quietly dropping it.

Do not claim that autistic people all think in one way. Do not use "high functioning", "low functioning", "special needs", "suffers from", "normal people", or "autistic superpower" framing. Do not diagnose, label, or speculate about a real patient's or staff member's neurotype.

## Regulatory Hook

For a CQC clinic audit, neurodiversity and accessibility sit mainly under:

- Equality Act 2010 - reasonable adjustments and non-discrimination.
- CQC Regulation 9 - person-centred care.
- CQC Regulation 10 - dignity and respect.
- CQC Regulation 11 - consent, including comprehension and capacity where relevant.
- CQC Regulation 16 - complaints must be accessible and acted on.
- CQC Regulation 17 - governance systems must monitor whether access commitments are delivered.
- CQC Caring and Responsive key questions.
- Accessible Information Standard DCB1605 as an NHS benchmark to adapt for independent healthcare, especially for identifying, recording, flagging, sharing, and meeting communication needs.

Be precise: the Equality Act reasonable-adjustment duty is legal. The Accessible Information Standard is mandatory for NHS and adult social care organisations within its scope; for Haus of Ästhetik, treat it as a strong NHS benchmark unless a live source confirms a direct duty.

## Clinic Access Touchpoints

Audit each touchpoint:

| Touchpoint | Checks |
|---|---|
| Website and booking | Can patients find treatments, risks, prices, contact routes, accessibility options, cancellation terms, and complaints information without confusion or hidden steps? |
| Pre-consultation forms | Are questions clear, necessary, tolerant of different formats, saved if interrupted, and available with help? |
| Appointment reminders | Do reminders explain what to bring, where to go, how long it takes, and how to request adjustments? |
| Arrival and waiting | Is there a route for quiet waiting, reduced sensory load, support person, mobility access, and privacy? |
| Consultation | Are steps predictable, pace adjustable, jargon explained, written summaries offered, and consent treated as a conversation? |
| Treatment | Can the patient pause, ask questions, decline, or stop? Are sensory needs and anxiety considered without judgement? |
| Aftercare | Are instructions clear, specific, written, and available in alternative formats? Are urgent symptoms and contact routes explicit? |
| Complaints and feedback | Is there more than one channel, not phone-only? Is the process explained in plain language and accessible without logging in? |
| Follow-up | Are next steps, timeframes, escalation, and expected outcomes clear? |

## Reasonable Adjustment Evidence

The audit should check not only whether adjustments are promised, but whether they are operationalised.

Evidence to seek:

- Policy stating how adjustments are requested, recorded, delivered, and reviewed.
- Booking form field for access/communication needs with privacy-safe wording.
- Staff SOP for responding to adjustment requests.
- Insync record flag or note for agreed communication/support needs.
- Examples of longer appointments, quiet slots, written summaries, remote consultations, support-person arrangements, or form assistance.
- Training records for equality, accessibility, consent, communication, and dignity.
- Complaints/feedback reviewed for access barriers.
- Governance meeting action where access issues led to improvement.

If a public page promises an adjustment but no internal process proves delivery, that is a broken CQC loop.

## Cognitive And Sensory Access Checks

Use these as concrete audit prompts:

- Is the patient told what will happen, in order, before the appointment?
- Are treatment risks explained in plain language as well as clinically accurate terms?
- Are abbreviations expanded on first use?
- Is there a written summary after consultations where needed?
- Are patients allowed longer processing time?
- Are there alternatives to telephone contact?
- Can patients request a quieter time, reduced waiting-room stimulation, remote consultation, or support person?
- Are forms broken into manageable sections?
- Are patients asked only for information that is necessary?
- Are reference numbers, appointment times, and aftercare steps written down, not only spoken?
- Are time limits avoided? If unavoidable, is there warning, extension, and saved data?
- Are error messages in forms specific, neutral, and helpful?
- Are colour, icons, and labels all used together so meaning is not colour-only?
- Are videos captioned and audio information available as text?
- Can text be enlarged or spacing changed without breaking the page?
- Is critical information available without relying on hover-only or drag-only interactions?
- Is help placed where people need it?
- Does patient-facing copy say what happens next and when?

## Plain-Language Patient Copy

Patient-facing documents and accessible summaries should:

- Put the answer first.
- Use one idea per sentence.
- Use concrete words.
- Use descriptive headings.
- Use short paragraphs and bullets.
- Explain medical terms.
- Explain numbers, risks, and timeframes in words.
- Say what the patient needs to do next.
- Avoid idioms, sarcasm, pressure, blame, shame, and unnecessary urgency.
- Use left-aligned body text and comfortable spacing.

This differs from the formal Haus Word formatting standard for internal governance documents. Use the internal standard for inspection reports; use this plain-language standard for patient-facing information.

## Depth-First Audit Lenses For Clinic Governance

Adapt the Neurodiversity repo's lenses like this:

| Lens | Clinic audit use |
|---|---|
| Systemiser | Convert policy commitments into IF/THEN rules and check whether forms/logs enforce them. |
| Detail Forensic | Find mismatched dates, expired reviews, missing signatures, typo variants, duplicate references, and inconsistent fields. |
| Pattern Analyst | Infer the clinic's document pattern and identify documents that drift from it. |
| Invariant Guardian | State safety/evidence rules that must always hold and search for violations. |
| Literalist | Read policies exactly as written and identify ambiguous commitments. |
| Consistency Auditor | Compare policy, SOP, form, CMS, website, training, and patient information for contradictions. |
| Completionist | Find missing documents, missing fields, missing logs, missing escalation routes, and missing accessible formats. |
| Failure Analyst | Ask how the clinic would detect a failed control before patient harm or inspection failure. |
| Sensory-Noise Analogue | Separate load-bearing evidence from decorative or duplicated material so the report remains usable. |

For large audits, use these lenses as separate passes where tooling supports it. For small audits, run them inline.

## Invariants For Neurodiversity And Access

These should always hold:

- Patients can request adjustments without having to disclose a diagnosis.
- Adjustment requests are recorded only where necessary, with privacy respected.
- Agreed adjustments are visible to staff who need them and not exposed to people who do not.
- Consent is supported by clear information, sufficient time, and the option to pause or decline.
- Patient-facing information does not rely on medical jargon alone.
- Complaints, booking, and support are not phone-only.
- Website accessibility statements match operational reality.
- Staff know how to respond to sensory overload, anxiety, communication needs, mobility barriers, and support-person requests.
- Children, young people, vulnerable adults, and people with capacity concerns are protected by safeguarding and consent pathways.

Violations should map to Regulation 9, 10, 11, 16, or 17 as applicable, plus Equality Act 2010 where an access barrier may disadvantage disabled people.

## Finding Format For Access Issues

| Field | Required content |
|---|---|
| Access barrier | What blocks, burdens, or risks excluding the person. |
| Who may be affected | Describe needs, not diagnoses, unless the evidence source itself uses a diagnosis. |
| Legal/CQC hook | Equality Act, CQC regulation, CQC key question, or benchmark. |
| Evidence | Page, form, policy, SOP, record, observation, or evidence gap. |
| Impact | Safety, consent, dignity, access, complaint handling, or experience. |
| Action | Practical change with owner, timescale, and proof of completion. |

## Do Not

- Do not infer a patient's condition from behaviour, notes, or appointment patterns.
- Do not make diagnosis disclosure a condition of support.
- Do not describe adjustments as special treatment.
- Do not let website promises outrun clinic SOPs.
- Do not bury access findings as "nice to have" if they affect consent, dignity, safety, or equal access.
