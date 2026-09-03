# 03 — CONTENT

**Owns completely:** the register (voice), the verb lexicon, copy budgets, numbers & units, time formats, money formats, privacy in copy, the state-copy bank (idle/gated/working/done/failed lines per entity), empty & recovery copy patterns, banned phrasings.
**Status:** v1.0 — proposed. Expands master §3.6 (R12-ratified rules 1–10); nothing here re-opens a ratified rule. [D] expansions vetoable; user ratification seals as R17.
**Provenance tags:** [R] = R12 foundation · [C] = old canon (spirit) · [M] = mined corpus evidence · [D] = derived — vetoable.
**Strength:** **M** = MUST · **S** = SHOULD.

---

## 1 — The register

One voice everywhere [R]: plain, precise, warm-professional. A professional trusts it; a tired family member reads it at a glance.

**[D] Expansion of the R12 register:**

- Second person for the user's actions and data ("your visits"); third person for everyone else, by name where known ("Rani's dose").
- Active voice; real verbs. "We could not process" → "Payment didn't go through."
- Contractions allowed ("didn't", "you're") — the corpus voice already uses them [M].
- Sentence case for all sentences; the uppercase micro-label is a *style*, never a content choice — a sentence written in caps to feel urgent is a defect.
- No exclamation marks. No emoji. Urgency comes from tone tokens (02), never punctuation.
- Warm ≠ coddling: no "Oops!", no apologies without content, no "sorry for the inconvenience" filler. Warmth is clarity + the way out, stated plainly.
- No register switching: the same screen never talks clinical to a professional and baby-talk to a family. One sentence must satisfy both [R].

## 2 — The verb lexicon

Verb weight MUST match stakes — the verb is the first signal of how much an action costs [D, from C §15.2 evidence]:

| Weight | Verbs | Reserved for |
|---|---|---|
| Heavy (binding) | **seal, capture, withdraw** | irreversible commits: consent seal, payment capture, consent withdrawal. A heavy verb always renders in the binding arc (02 §3.3) |
| Medium (consequential, recoverable) | schedule, reschedule, request, report, record | visits, bookings, incidents, doses, vitals |
| Light (reversible) | save, edit, select, add, remove, export, share | drafts, filters, prefs, downloads |

- **[M]** "Seal" is the house verb for committing pending changes to a sealed record — never "submit" or "confirm" for that act (corpus: "Seal 2 changes", "No pending changes to seal").
- **[D]** Verb distinctions (I4/D5): **cancel** = before effect (free); **abort** = kill in-flight (only where killing is meaningful); **undo** = restore prior state, always paired with what it restores ("Undo 1 change"); **renew/re-** = forward recovery of a lapsed thing.
- **[M]** Buttons never say bare "Submit"/"Confirm"/"OK" — they name the effect with real data ("Set morning, 45 minutes", "Pay ₹2,400").
- **[D]** "Record" for adding an observed fact (dose taken, vitals, incident) — the verb says the output is a durable entry, and refusal/denial uses it too so absence is never silent.

## 3 — Copy budgets

Length by surface type [D, from C trailing-pill law]:

| Surface | Budget | Evidence |
|---|---|---|
| Trailing state pill | ≤ 2 words + numerals ("3 of 5 sealed", "Locked", "As sealed") [C] |
| Chip | ≤ 3 words |
| Button / action | ≤ 4 words incl. data ("Seal 2 changes") |
| Sheet title | ≤ 3 words; the entity name moves to the subtitle [C] |
| Hint / gated reason | 1 sentence, inside the control |
| Explanation strip | ≤ 2 short sentences, full-width [C] |
| Empty state | headline (≤ 5 words) + 1 sentence + action label |
| Toast/notify | title ≤ 4 words + body ≤ 1 sentence |

- **[M]** Explanations never live in trailing pills or beside other content — pills carry state only; the sentence gets its own strip (the long-content rule).
- **[S]** If a message needs more than the budget, it is two messages or a redesign — never a shrunk font or an ellipsis.

## 4 — Numbers & units

- **[M/R]** Every numeral derives from data — never spelled-out literals beside computed ones ("Two things wait on you" beside a derived chip is a defect). Copy counts use the same derivation as chips (one source, I6).
- **[D]** Counts in prose are numerals: "2 visits", "3 of 5 sealed". Words only in fixed idioms ("one place").
- **[M]** Part-of-whole is always "N of M" — never "3/5" in prose, never "3 out of a possible 5".
- **[M]** Units exact and attached where precision matters: "500 mg", "98/64", "98.2°". Units never abbreviated inconsistently within a screen.
- **[D]** Distances plain ("14 nearby" style is cell-sized at the data layer; the full detail lives in a full-width row — 01 §3, 07).

## 5 — Time

- **[M/R]** Absolute time is primary where it decides action; relative is secondary. "2:00 PM today" leads, "in 20 min" follows — never relative alone on an actionable window.
- **[C]** Formats: 12-hour clock with AM/PM ("2:00 PM"); dates "Mar 13" (abbreviated month, no leading zero); reading order "Mar 13, 2:00 PM"; ranges "Mar 13 – 29" (spaced en dash); year appears only when it isn't the current one.
- **[C]** Dates are parsed into day/month/time fields at the data layer and reassembled — never sliced from raw strings at render (06 owns the mechanism; this owns the requirement).
- **[M/R]** Countdowns tick; zero flips STATE — new hue, new copy, recovery path — never color alone ("Offer expired — request new matches", not a grey "0:00").
- **[D]** "Today"/"Tomorrow" replace the date when the day is today/next-day and the context is unambiguous; kept alongside the date when schedules cross midnight.
- **[D]** Local time assumed silently — no timezone annotations unless the reader's timezone differs from care delivery (then it is stated once, plainly).

## 6 — Money

- **[M/R]** Exact, currency-prefixed, never silently rounded. "₹2,400" — not "₹2.4k" in a fact cell, not "approx" without the "est." label.
- **[D]** Indian digit grouping (₹1,52,800) — the audience is Indian homecare; veto if the product says otherwise.
- **[M]** Estimates are labeled at the data layer ("Estimated ₹2,400") and the label disappears exactly when the amount becomes final — never "est." on a captured amount.
- **[M/R]** Failure copy pairs fact + reassurance + way out in one breath: "Payment didn't go through — no money left your account. Try again." Refund copy states destination and timing window when known ("Refund to HDFC •• 4821 in 3–5 days").

## 7 — Privacy in copy

- **[M/R]** No raw IDs anywhere in prose. Instruments and documents: last-4 only ("•• 4821"). Records referenced by type + date, never by number ("Your consent record, Mar 13" — not "Consent #A-2291").
- **[M]** Names as the user knows them; no honorifics machinery, no full legal names where a first name is the working name. Other patients are never named to a professional's employer surface beyond what the workflow requires (07 entry-level detail).
- **[D]** Addresses in copy: area-level ("Indira Nagar, Bangalore") — full street addresses render in dedicated address components, not narrative strips.
- **[M]** Health facts in copy are exact but never editorialized: "Refused morning dose" — never "Unfortunately Rani didn't take…" (no-blame law, rule 4).

## 8 — The state-copy bank

The action arc (02 §4.1) with its lines. Every behavioral component's one-map table carries a **copy intent** per state; this bank supplies the patterns. Slot rules: `{n}` and `{thing}` derive from data; working/done lines narrate the same verb [M/C evidence per row].

**Arc patterns:**

| Stage | Pattern | Example |
|---|---|---|
| idle | `{HeavyVerb} {n} {thing}` / `{MediumVerb} {thing}` | "Seal 2 changes" [M] |
| gated | the reason, in the control, imperative | "Pick at least one day to continue" [M] · "No pending changes to seal" [M] |
| working | progressive of the verb, no possessive drift | "Sealing your consent" [M] · "Processing payment" |
| done | past of the verb, outcome stated | "Consent sealed" [M] · "Dose recorded at 8:12 PM" |
| failed | what happened + the way out, one breath | "Payment didn't go through — no money left your account. Try again." |
| handback | done + the return door | "Consent sealed — keep editing" [C] |

**Per-entity bank** (canonical lines; per-screen slots derive counts/amounts):

| Entity | idle | working | done | failed / recovery |
|---|---|---|---|---|
| Visit seal | "Seal visit summary" | "Sealing visit summary" | "Visit sealed" | — (seal doesn't fail; async retry per 06) |
| Dose | "Mark dose taken" | "Recording" | "Dose recorded, 8:12 AM" | refusal: "Refusal recorded" + reason slot |
| Consent | "Seal {n} changes" | "Sealing your consent" | "Consent sealed" | withdrawal: binding arc copy (02 §3.3) |
| Payment | "Pay ₹{amount}" | "Processing payment" | "Payment complete" | "didn't go through — no money left your account" |
| Booking | "Request care" | "Sending request" | "Request sent — matching now" | no-offer: "No match yet — {n} alternatives" (mandatory surface) |
| Verification | "Submit for review" | "Submitting" | "Submitted — review in progress" | rejected: "Not approved — {reason}. Resubmit" |
| Payout | "Withdraw ₹{amount}" | "Withdrawing" | "Withdrawal requested" | — (in-transit is a state, not a failure) |
| Incident | "Report incident" | "Reporting" | "Incident reported" | — (escalation is a link, not an error) |

- **[M]** Gating reasons never duplicate a hint strip — the control is the reason (02 §4.1); a hint exists only for multi-field gates where one control can't carry it.
- **[M]** Working labels never promise speed ("Saving your details", not "Almost done…").

## 9 — Empty & recovery copy

- **[M/C]** Empty states diagnose cause — each cause its own copy, icon, action: search miss ("Nothing matches '{query}'" → "Reset search"), filter exclusion ("Your filters hide every service" → "Clear all filters"), genuinely nothing ("No visits yet" → "Request care").
- **[M/R]** Every risk state ships its recovery in the same view, same voice — the way out is never a separate doc, modal, or "contact support" dead end unless the workflow truly requires a human (then: the human's name/role, not "support").
- **[D]** Recovery actions get forward verbs ("Request new matches", "Renew now", "Retry payment") — never "Go back".

## 10 — Banned phrasings

**[M/R/D] register:**

- "Error", "Oops", "Something went wrong", "Uh oh" — say what happened and the way out (rule 5).
- "Unfortunately…", "We apologize for any inconvenience…" — groveling without content.
- "Please" as filler on every button — warmth comes from clarity; "please" MAY appear once per flow where it is genuinely a request.
- "Are you sure?" as a confirm — confirmation restates the concrete consequence ("This withdraws your consent for care. Your history stays."), never a vague dare.
- Blame or judgment of any person: "failed to take", "non-compliant" → "Refused", "Missed" (rule 4).
- Unexplained professional terms: first use gets the gloss in-line or in the strip ("MAR — the medication record", then plain words).
- Legal fog on binding acts: concrete consequences in the same register, no "hereinafter" (rule 7).
- Marketing superlatives in product surfaces ("best-in-class care") — the product speaks facts.
- "Click here", "Tap here" — the element names its effect.

## 11 — Rule index (MUST summary)

One register, no switching · verb weight matches stakes, heavy verbs reserved · no bare Submit/Confirm/OK · numerals derive from data · "N of M" · units exact · absolute time primary · countdowns tick, zero flips state · money exact + prefixed, estimates labeled · no raw IDs, last-4 only · no-blame · no "error" — fact + way out · confirmation restates consequences · empty states diagnose cause · every risk ships recovery · budgets per surface · working/done narrate the same verb.

## 12 — Open items

| Item | Status | Owner |
|---|---|---|
| Vitals unit set (°C vs °F) and canonical unit strings | OPEN | build phase — data modules |
| Money grouping confirmation (Indian 2,2,3) | OPEN — proposed [D] | user veto |
| Professional-term glossary with glosses | OPEN | build phase per domain |
| Per-screen slot tables (which counts/amounts each screen carries) | OPEN | 07 entries |
| Localization posture (single language assumed) | OPEN | user ruling when needed |
