# 07f — COMPONENT CATALOG: DOMAIN COMPOSITIONS — PLATFORM & SHARED

**Part 6 of 6** of the component catalog. **Owns completely:** professional operations (offers, sessions, availability, earnings), shared care-ops (incidents), partner surfaces, admin oversight, system observation surfaces, and the auth/identity families.
**Status:** v1.0 — proposed. Ratification seals as R26.
**Provenance:** [R] = ratified · [C] = old canon (spirit) · [M] = mined evidence · [D] = derived — vetoable.
**Qualification:** the 07e §1 bar applies verbatim. Two-tier entries (07e §2) apply.

---

## 1 — Deep entries (behavioral nuclei)

### 1.1 OffersInbox ★

**Identity** — professional ops · booking/offer entities (02 §5.5) · the dispatch surface.
**Recipe** [M — census] — live dispatch screen: OfferCard (Row + countdown Meter) · AcceptedOffersCard · DeclinedOffersCard · expiry states.
**Flow [M — the re-check arc is the nucleus]:** offer arrives (live, countdown) → **accept** → *re-check against current availability* → confirmed (offer → scheduled) **or** blocked (re-check result: conflict shown + block-time path) → decline (reason, before expiry) → expiry = risk chip + recovery (02 §5.5: never a dead end). The re-check result is a distinct state with its own composition — never a silent failure [C — S02/S05 mirror this from the system side].
**Declaration** — deltas: Q4 countdown, Q12 live arrival, conflict state declares what conflicted; accept is medium-weight (LifecycleButton — offers are commitments, not binding ceremony).
**Open** — decline-reason typing (free text vs cause list) [D: cause list + optional note].

### 1.2 SessionRunner ★

**Identity** — professional ops · visit entity in-progress (02 §5.1) · the professional's working surface.
**Recipe** [M — census PR06/PR07] — CheckInHero (GPS check-in/out + travel info) → ChecklistCard (interactive items, conditional tasks surface on trigger) → entry sheets (Vitals/MedVerification/Notes as per-mode tabbed recorder, per-mode save lifecycle [M]) → SignOffButton.
**Flow [M/R — the gate law]:** check-in (location-verified or reasoned fallback [D]) → execute checklist → record (vitals via 07e §4.5 law, meds verified-or-refused per MAR, notes as QuotePanel-ready verbatim) → **sign-off GATED on completion: the disabled control states exactly what's missing** ("2 checklist items, 1 vitals set remaining" — 04 §5) → done → session seals (payment gate, 02 §5.1) → handback to next session. Abandon mid-session = incident path, never a silent exit [R — return-path law at surface level].
**Declaration** — deltas: Q8 arc on every record action; sign-off is THE gate demonstration for the catalog; med verification carries refusal-first-class law; conditional checklist tasks appear with entrance motion (05 §4.1), never pre-listed as disabled.
**Open** — GPS-fallback reason typing; offline behavior (out of demo scope — noted for real project).

### 1.3 AvailabilityEditor

**Identity** — professional ops · availability · weekly grid with save lifecycle.
**Recipe** [M — census PR05] — DayEditorCard rows (WindowOption sets) + TimeOffCard exceptions + SaveAvailabilityButton (dirty-check gate: "No changes to save" / "Save 3 edits" → saved state persists, Q10).
**Flow** [D] — edits create a dirty set (count derives — one source) → save arc → persisted weekly state; exceptions (time-off) carry their own dates and block offer re-checks (§1.1 integration — the two compositions reference each other's data, never re-derive).
**Declaration** — deltas: grid edits are light-weight (instant local state); the save is the only arc.

### 1.4 IdentityVerificationJourney

**Identity** — shared (patient + professional) · verification entity (02 §5.6) · the multi-step identity flow.
**Recipe** [M — census P03/P04/PR02] — OTP step (OtpInput + ticking validity) → document step (capture tiles — declared assembly: Tile + real file facts per 06 §6.1) → selfie step (capture + confidence feedback) → submitted state → in-review (active chip) → verified/rejected (+ reason, resubmit path).
**Flow** [R] — each step gates the next (04 §5); rejection states the reason and the resubmit path (02 §5.6 — never a dead end); pending state persists across sessions (D4 — returning shows in-review, never resets to start).
**Declaration** — deltas: journey position announces ("Step 2 of 3"); capture surfaces are real inputs (fake capture buttons banned, AP27).

### 1.5 ApprovalQueue (shared: partner staff + admin professional approvals)

**Identity** — shared platform pattern · verification entity at queue scale · ONE pattern, two consumers [D — the corpus built it twice: PT05 approval queue, A03 professional approvals].
**Recipe** [M — census both] — queue of ApprovalCards (CheckTile checklists: credential/status/verification items) → detail review (documents per §1.4 law) → decision arc: approve (positive, recorded) / reject (risk + typed reason — reason is REQUIRED, never bare rejection) / request-more (attention + what's missing).
**Flow** [M/D] — decision state persists (A03 census: decision-state tracking); queue counts derive from queue data (one source with badges); thematic approval cards = per-decision-state tone via the one-map (02 §4.2), not decoration.
**Declaration** — deltas: reject without reason is unrepresentable (the decision control gates on it — 04 §5); bulk decisions OUT (each case is individual — safety surfaces) [D].

### 1.6 IncidentReportFlow (shared: professional, patient, admin-triaged)

**Identity** — shared care-ops · incident entity (02 §5.4) · severity-driven reporting.
**Recipe** [M — census PR08 + P31] — CausePicker (typed causes) + SeveritySelector (severity-driven hue system [M — the whole-surface tone-map precedent]) + DescriptionInput (real textarea, dirty-gated) + PhotoAttach (real files, 06 §6.2) + optional witness row → submitted panel → escalation (notify supervisor [M]).
**Flow** [R] — severity drives intensity (02 §6: higher severity steps toward shell for person-safety), never tone (risk throughout — tone steps at meaning boundaries); submission = the report exists + escalation affordance; admin triage continues the entity lifecycle (A02/A11 — same record, different role surface).
**Placement note** [D] — admitted in 07f despite care-delivery subject matter because the flow spans three roles (professional reports, patient reports, admin triages): cross-role shared → platform-shared family. Cross-referenced from 07e (MissedCard §4.6 — incidents link back to visits; VisitSummary §4.8).

---

## 2 — Auth family (recipes + one law)

**[R/C] Biometric-first for professionals** (PR01 census): unlock = biometric prompt → fallback passcode Field; 2FA setup surface (PR13-class) pairs with device verification. Patients: P01 signup (guardian onboarding, review sheet) → P02 sign-in (while-you-away digest — session preview content [M]) → OTP → identity journey (§1.4). Partners: institutional login (PT01) + SSO/role selection [D — SSO is config-gated per partner, not a second auth system].
**Register:**

| Composition | Assembles from | Notes |
|---|---|---|
| SignupWizard (guardian) | Field set + ConsentBlock + ReviewSummary sheet + LifecycleButton | setup strip per 04 §5.4 [M] |
| SignIn (patient) | DigestHero + PasswordCard + BiometricUnlock | digest = real session data [M] |
| ProfessionalUnlock | BiometricUnlock + Field fallback | biometric-first [C] |
| PasswordRecovery | RecoveryHero + Field + SendLinkButton + validity countdown | zero flips state + resend [M] |
| TwoFactorSetup | OtpInput + Switch per-device | QR/secret real display [D] |
| TermsAcceptance | Checkbox + versioned document rows | versioned, never pre-checked [R] |

---

## 3 — Recipe register (platform)

| Composition | Domain | Assembles from | Treatment/notes |
|---|---|---|---|
| ProfessionalProfile | pro ops | PageHero light + CertificationsCard + AddCertificationRow | just-added rows (Q11) [M]; skills cloud; preferences |
| SessionHistoryDossier | pro ops | DossierHero + ContinuityBar + MonthTimeline + ExpandRow records | continuity-bar per story [M — PR12] |
| EarningsWallet | pro ops | StatStrip + SessionEarningsCard + RatingStrip + filters | payout entity: accrued state [M] |
| PayoutFlow | pro ops | SheetShell + FactRows + BankAccountFieldSet (declared assembly: Field set + validation, 07c §1) + LifecycleButton ("Transfer ₹{n}") | payout arc 02 §5.8; receipt on done [M] |
| PartnerHub | partner | PageHero + ReferredPatientList + PartnerQuickActions + billing card | live pipeline [M] |
| ReferralWizard | partner | BookingWizard contract (07e §4.2) + PartnerCareCategoryGrid + ClinicalRecommendation + DischargeRecords | 4-step; same per-step persistence law [M] — NOT a second wizard implementation |
| PartnerPatientChart | partner | PageHero + RecoveryTrajectory + CareGoalsCard + consent note | referral consent gates chart depth [M] |
| StaffRoster | partner | StaffList + ApprovalQueue (§1.5) + StaffDetailSheet | permissions via OptionRows [M] |
| PerformanceScorecard | partner | PageHero + PerformanceKpis + Stars + FamilyFeedbackCard + export | read-only oversight [M] |
| PartnerBilling | partner | StatementCarousel + UsageLedgerCard + InvoiceDetail sheet | corporate statements [M] |
| AdminDashboard | admin | PageHero + LiveSessionsCard + AttentionList + IncidentOverview | live attention fan-in [M] |
| AuditConsole | admin/system | LedgerChainHero + AuditEntryList + AccessDetailSheet | immutable chain presentation; access log w/ diff [M] |
| ConsentTracking | admin | DueReviewCard + CycleStep + WithdrawalCard | consent entity at fleet scale [M] |
| RetentionPolicyEditor | admin | PolicyEditor (Field set) + DeletionQueueList + CryptoDeletionCard | **theme re-mapped [D]: corpus emerald/teal was decoration drift — policy surfaces read neutral/attention by state (draft/applied/enforcing), positive only on applied-confirm** |
| EscalationDesk | admin | EscalationHeroCard + EscalationTicketCard + SLA timers | SLA countdowns tick; breach flips state [M] |
| AnalyticsSurfaces | admin | RevenueHero + ChartBars / spark variant (07d §14) + ReportBuilder sheet | every visual encodes real data; scheduled reports via LifecycleButton |
| TransactionConsole | system | TransactionStepList + StateDiffCard + RollbackTraceCard + PaymentHero | operator view of S04/S07 laws — **system surfaces obey every law in this suite; observing does not exempt** [M] |
| RecheckConsole | system | RecheckHero + RulesList + ResolutionCard | observer of §1.1's arc [M] |
| NotificationDelivery | system | NotificationFeed + IncidentTimelineCard + DeliveryHealthCard | per-channel delivery states [M] |
| EventTrail | system | StepList + ExecutionTrail + fan-out visualization | the I3 law as a surface [M] |
| FailureDrills | system | FailureDrillCard + SheetShell triggers | demo-only teaching surfaces, marked demo-only [D] |

---

## 4 — Rules (07f)

- **[M]** Shared patterns are built ONCE (§1.5/§1.6): a role surface consuming the shared composition adds role data, never a role fork (F4 fence at composition level).
- **[M]** System/observer surfaces obey every law in this suite — observation is a presentation context, not an exemption (the corpus's system screens drifted looser; that drift is dead).
- **[M]** Professional working surfaces (§1.1–1.3) are safety-relevant: every gate states what's missing, every blocked path gives the way forward, abandonment routes to incident — never silent.
- **[M]** Money compositions (payouts, partner billing) run the payment-arc copy bank (03 §8) — "Transfer ₹{n}", never bare "Confirm" (`withdraw` is reserved for the consent act, 03 §2).
- **[M]** Demo-only surfaces (failure drills) are marked as such in data, never styled differently — tone follows state, not specialness (02 §3.5).

## 5 — Open items (07f)

| Item | Status | Owner |
|---|---|---|
| Decline-reason typing (offers) | OPEN [D: cause list + note] | walkthrough |
| GPS fallback reason set | OPEN | 09 admission per region law |
| Offline session behavior | OPEN — real project | out of demo scope |
| Bulk decisions in queues | SEALED [D: banned] — vetoable | user |
| SSO depth (role selection vs full SSO) | OPEN | partner config ruling |
| ApprovalQueue: one shared entry vs two role entries | SEALED [D: one shared] — vetoable | user |
