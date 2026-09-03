# 07e — COMPONENT CATALOG: DOMAIN COMPOSITIONS — CARE DELIVERY

**Part 5a of 6** of the component catalog (07e care delivery · 07f platform domains). **Owns completely:** every catalog composition that wires healthcare entities to composites and flows for care delivery — matching, booking, visits, meds, consent, records, billing.
**Status:** v1.0 — proposed. Ratification seals as R25.
**Provenance:** [R] = ratified · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.

---

## 1 — What qualifies as a domain composition (the F1 fence)

The corpus died by promoting screen fragments to components. The catalog admits a composition ONLY when ALL hold [M — I7]:

1. **Consumed by ≥2 screens**, or 1 screen + a documented reuse trajectory.
2. **Owns entity semantics or flow** — a state map keyed to a 02 §5 entity treatment, or a multi-component flow — not layout convenience.
3. **The assembly test:** could the screen assemble it from primitives (07a–07d) + the entity treatment (02 §5) without losing anything? If yes, it is NOT a composition — it is screen assembly, and building it as a component is F1.
4. Types against entity lifecycles; **never invents states**.
5. Data wiring is declared (which data module, which derivations per 06 §3), never re-implemented.

## 2 — Two-tier entries [D]

- **Deep entries** (§4) — behavioral nuclei: compositions whose state/flow logic exceeds what their primitives carry.
- **Recipe register** (§5) — everything else: declared as assembly (primitives + treatment + notes), NOT second-class — they are proven complete by the assembly test (§1.3), so a full entry would restate their parts.

## 3 — Domain set discipline & flow ownership

3.1 **[M]** One domain family per domain; a single barrel re-exports its compositions and sheets; screens import from barrels only; data modules stay in the data layer (06). Cross-role by default — a composition consumed by two roles carries ZERO role conditionals (F4 fence); a role fork requires 09 admission.

3.2 **[M]** Naming: noun-typed by what is presented with the closed intent suffixes (`VisitCard`, `DoseRow`, `ConsentScopeSheet`). Name collisions resolved by naming by ROLE IN FLOW, not by screen (§4.10).

3.3 **[M]** Ownership split — **screen**: which step/sheet is open, persisted record state, navigation · **composition**: arc presentation and staged consequences (timing is presentation — resolution arrives via the flow's data, 06 §7), its data-state rendering · **flow spanning screens** (booking): the family declares the step contract + what persists at each step (D4) — the screens coordinate through that contract.

3.4 **[M/D] Clock ownership:** a live/ticking value is owned ONCE by the highest composition displaying it; children receive derived or formatted values. Two siblings ticking the same clock is a defect. (Resolves the census question: LiveVisitHero takes `elapsedSeconds` — in the catalog, the LiveVisit family owns the clock, the hero receives it.)

3.5 **[M/D] Demo life (A8 mechanics):** every screen lives by STAGED CONSEQUENCE — user action → arc → fan-out. Simulation cadences (streamed entries) live in compositions (StreamList, StreamList-hosting families); clocks in their owning composition (3.4); simulation data lives in data modules. **Screens never hand-roll simulation timers** — that is the wrapper pattern reborn. Simulation drives arc resolution as DATA: a demo flow feeds `status` through composition-declared constants (06 §7.1) — never a control-internal clock. Independent animation loops beside staged consequences are banned (05 §1.4).

---

## 4 — Deep entries (behavioral nuclei)

### 4.1 MatchCard ★

**Identity** — matching · booking-request entity (02 §5.5) · the offer-broadcast card.
**Recipe** [M — census] — shell card (Mode B per stakes) · StatusPill · Meter (offer window) · composition branches per state.
**Flow** [M — the A4 reference]: idle = send control · matching = live status strip (broadcast) · offered = countdown chip (attention as window closes) · accepted = confirmation strip · expired/no-offer = risk + **mandatory alternatives surface** (02 §5.5 — never a dead end). Compositions switch per state; tint-only flips are defects.
**Declaration** — deltas: Q12 (live matching), Q4 (countdown), expiry recovery per 02. Evidence: MatchCard census `cardTone` one-map.

### 4.2 BookingWizard family

**Identity** — booking · booking request · the multi-step care request (P09→P12).
**Recipe** [C/M] — Stepper (progress) + category grid + ScheduleCard (TimeSheet) + EstimateCard + WhoSheet + ReviewSummary (FactRows) + consent block + LifecycleButton confirm.
**Flow** [M/D] — steps: category → schedule → who → review+consent → confirm. Each step gates the next (04 §5); per-step state persists (D4 — returning keeps entries); the confirm is medium-weight (LifecycleButton), the CONSENT inside is the binding-COMMITTING act (§4.3 — heavy verb, light surface) — weights never blend. Success hands to matching (§4.1).
**Declaration** — deltas: Q10 per-step persistence; wizard declares its step contract (03 §3 naming per step).

### 4.3 ConsentCard + ConsentScopeSheet

**Identity** — consent · consent entity (02 §5.3) · pending/seal split made tangible.
**Recipe** [M — census] — Row list (scopes) + Switch-free approvals (`approvals: Record<ConsentId, boolean>` state) + Meter (consentProgress — single source) + ConsentScopeSheet (SheetShell + OptionRow set) + LifecycleButton seal.
**Flow** [R/M] — edits create PENDING changes ("2 pending" chip on the sealed surface); **seal commits** ("Seal 2 changes" → "Sealing your consent" → "Consent sealed") — the binding-COMMITTING class (02 §3.3): light-surface confirm, concrete consequences stated, heavy verb, no shell, no hold; care runs on the sealed version; gated state IS the reason ("No pending changes to seal") [M]; withdrawal = HoldConfirmButton + risk-shell ceremony — the binding-DESTRUCTIVE class (07c §8, 02 §3.3). Scopes never flip the sealed record instantly (AP71).
**Declaration** — deltas: pending/sealed duality visible on one surface; Q10 per-scope persistence.

### 4.4 DoseRow + DoseSchedule

**Identity** — meds · dose entity (02 §5.2) · the medication day surface.
**Recipe** [M] — state-branched rows (StepList discipline): todo quiet · **due = attention-fill working surface** · taken = positive chip + TimeChip · refused = risk chip + reason · missed = risk + escalation; DueDoseCard (the working dose) + DoseDetailSheet (record taken/refused via LifecycleButton) + RefillCard (Meter, ticking where time-based) + MedLogCard (history).
**Flow** [M/D — staged] — due dose → nudge arc → record → done flip → fan-out (log, refill counters, day tally) in ONE pass (A8). Refusal records a reason — never silent absence (MAR).
**Declaration** — deltas: dose arc staging; Q11 on the log.

### 4.5 VitalsCard + VitalsSheet

**Identity** — visits · vital readings (visit records) · presentation + input.
**Recipe** [M — the I5 precedent] — per-reading rows with tone translated from `vitalIntent(reading)` classification (data-layer classification — `normal`/`borderline`/`abnormal`; the owning map translates via 02 §4.2, 06 §2.4 — the data layer never assigns tone tokens); VitalsSheet: Field inputs + review state → record arc.
**Flow** [D] — normal = neutral · borderline = attention · abnormal = risk + "discuss/link incident" path (02 person-safety hook). Input review state persists per session (Q10).
**Declaration** — deltas: units exact + attached (03 §4); abnormal announces assertively (04 §6).

### 4.6 VisitCard family

**Identity** — visits · visit entity (02 §5.1) · Upcoming / Completed / Missed presentations.
**Recipe** [M — census] — UpcomingCard (active wash + absolute time + reschedule/cancel) · CompletedCard (ExpandRow + FactRows, filterable) · MissedCard (risk + **platform-initiated re-dispatch strip** — the reliability promise is platform voice, never user-chased).
**Flow** [M] — list filters via SegmentedTabs + FilterSheet (initial-per-entry, Q10); `applyVisitFilters` single-source (badge, list, empty diagnosis from one call — 06 §3.4); EmptyTabState cause-typed [M].
**Declaration** — deltas: reschedule transforms slots live (TimeSheet preview-against-sealed-series).

### 4.7 LiveVisit family ★

**Identity** — visits · visit entity, in-progress · the live surface (exemplar 2's domain).
**Recipe** [M] — LiveVisitHero (PageHero phase: active, ticking) + LiveStepCard (active step, live dot) + VisitSoFarSheet (ledger so far) + StreamList ledger + notify-at-sign-off toggle.
**Flow** [R/M/D] — family owns the clock (3.4): elapsed ticks, sign-off ETA counts down, **zero flips state → completing** (02 §4.4); laps/entries arrive per cadence as staged consequences; caregiver card takes derived elapsed (no second interval).
**Declaration** — deltas: Q4/Q14 on ticking stats; Q12 live; assertive announce on arrival.

### 4.8 VisitSummary family

**Identity** — visits · sealed visit · the certificate (exemplar 1's carrier domain).
**Recipe** [M — census] — SummaryHero (positive phase) + SessionLedgerCard + CareDeliveredCard (ExpandRow, CARE_STEPS) + CaregiverNoteCard (QuotePanel) + VitalsCard + PaymentBreakdownCard + ShareSummaryButton (real export, 06 §6.2).
**Flow** [R/M] — sealed presentation; pending edits re-open the seal arc ("Seal visit summary" — 03 bank); everything derives from the sealed record (D4 — reopening shows sealed).
**Declaration** — deltas: sealed = the payment gate (02 §5.1); share is a real artifact.

### 4.9 RateVisitSheet

**Identity** — review · visit rating · private modal flow.
**Recipe** [M — census] — SheetShell + StarPicker (07c §10, controlled) + HighlightTags (multi-select, family hue — never emerald) + Field note + LifecycleButton submit; RatingHero mirrors submitted state.
**Flow** [M] — submitted persists (Q10 — reopen shows done); draft state persists per entry; private: no sharing nags.
**Declaration** — deltas: ratings are informational stakes; submitted = positive.

### 4.10 PaymentSheet + the PaymentCard resolution

**Identity** — billing · payment entity (02 §5.7) · the capture-arc sheet — the binding-DESTRUCTIVE ceremony surface (02 §3.3).
**Recipe** [M] — SheetShell whose pre-commit composition is the risk-shell ceremony: consequences stated concretely before the act (what captures, when it settles, how it reverses), the FactRows breakdown, method row; the confirm control is HoldConfirmButton at/above the capture threshold (entity-module constant, 06 §2.3; value OPEN — 07c §15) and LifecycleButton below it. Arc copy: "Pay ₹{amount}" → "Processing payment" → "Payment complete" (03 §8 — the act is capture; the control labels it Pay).
**Flow** [M] — resolution via controlled `status` derived from the payment record's lifecycle (02 §5.7, 06 §7 — never a timer); the failed branch runs the completion chain to risk (05 §4.3): the recovery surface (retry/refund) enters as part of the chain, retry re-enters at working (06 §7.4); per-method mode state persists (Q10); estimates labeled exactly until final (03 §6); money never ambiguous.
**C7 resolution [D]** — the corpus's two `PaymentCard`s were different compositions: **PaymentMethodCard** (method + action — review/checkout context) and **PaymentBreakdownCard** (fact breakdown — summary context). Named by role in flow (3.2); NOT converged — different compositions, A3 rule.

## 5 — Recipe register (care delivery)

| Composition | Domain | Assembles from | Treatment/notes |
|---|---|---|---|
| DispatchSequence | matching | Stepper + StepList | dispatch steps [M] |
| OfferList / OfferExpiredState | matching | Row + Meter (ticking countdown, 07d §10) + EmptyState | expiry recovery mandatory [R] |
| CaregiverProfile dossier | matching | PageHero light + FactRows + CredentialCard | verified dossier [C] |
| CredentialsCheck detail | matching | ExpandRow + FactRows + StatusPill | background-check facts [C] |
| ScheduleCard / WhoSheet | booking | TimeSheet + Field + OptionRow | wizard steps [M] |
| PrescriptionRow / RxList | meds | Row + ExpandRow + Meter (days left) | expiry attention → risk [R] |
| AddPrescriptionSheet | meds | Field + file tile + LifecycleButton | upload real files (06 §6) |
| RecordsVault | records | PageHero + DocRow list + AuditTimeline + SearchSheet | consent-gated; **`missing` data-state exemplar item lives here** (02 §1.3 — open, exemplar 3) |
| AuditTimeline | records | MiniTimeline + StatusPill | access history; every entry = who/what/when [C] |
| RecordsExportSheet | records | SheetShell + LifecycleButton | real Blob export (06 §6.2) |
| ConsentVersionHistory | consent | MiniTimeline + FactRows | versioned, witness rows [C] |
| WithdrawalCeremony | consent | PageHero risk + HoldConfirmButton | binding arc §3.3 [R] |
| BillingLedger | billing | Section bands + ReceiptRow + StatStrip | visit-linked [C] |
| InvoiceDetail | billing | SheetShell + FactRows + LifecycleButton | tax breakdown [C] |
| EmergencyActions | patient | action-first call surface + ConnectButton (direct dial) | call-first [C] |
| SupportTicket flow | support | SheetShell + Field + StreamList replies | SLA states per 02 informational |
| NotificationFeed | notifications | StreamList + Row + FilterSheet | read state fans out; mark-all one pass [M] |
| ProfileEditor | profile | Field set + LifecycleButton | inline edit, dirty-check gating [C] |
| LovedOnesManager | profile | Row + SheetShell + permissions OptionRows | family plan [C] |

## 6 — Rules (07e)

- **[M]** Compositions never re-implement primitive behavior (a composition hand-rolling its own action timing, streaming mechanics, or validation is a defect — the behavior lives once, 07a–07d).
- **[M]** Every composition declares its entity treatment reference (02 §5) and its data sources (06 §3) — a composition that formats, parses, or derives at render is a 06 defect.
- **[M]** Every consequential flow inside a composition runs the 02 §4.1 arc with 03 bank copy; compositions never invent copy patterns.
- **[M]** The register (§5) is the admission record: adding a row requires the §1 bar; adding a deep entry requires the flow evidence that merits it.

## 7 — Open items (07e)

| Item | Status | Owner |
|---|---|---|
| Clock ownership = highest displaying composition | SEALED [D] — vetoable | user |
| PaymentCard C7 resolution (two named compositions) | SEALED [D] — vetoable | user |
| RecordsVault `missing`-state specifics | OPEN — exemplar 3 | build phase |
| Wizard per-step persistence granularity | OPEN | walkthrough |
| StreamList cadence defaults per family | OPEN — demo constants | build phase |
| Deep-entry promotions from the register (which earn flow evidence) | OPEN | 09 admission |
