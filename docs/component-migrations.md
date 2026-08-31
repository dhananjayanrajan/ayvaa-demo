# Component Migration Ledger

Append-only. One section per batch. Format: old path → new path | merged-into | deleted | consumers repointed.

## B2 — Sheet architecture

- components/patient/matching/SheetShell.tsx → components/phone/SheetShell.tsx | merged | consumers repointed (path swap)
- components/patient/onboarding/SheetShell.tsx → components/phone/SheetShell.tsx | merged | consumers repointed; prop tileTone renamed to tone
- components/professional/payouts/SheetShell.tsx → components/phone/SheetShell.tsx | merged | consumers repointed (path swap)
- components/admin/ui/BottomSheet.tsx → components/phone/SheetShell.tsx | merged as alias export BottomSheet | consumers repointed (path swap); self-controlled open mode preserved (dim + AnimatePresence embedded when open passed)
- components/admin/ui/SheetHeader.tsx → components/phone/SheetShell.tsx | merged as named export SheetHeader | consumers repointed (path swap); prop sub renamed to subtitle
- Canonical API: icon?, tone (TileTone), title?, subtitle?, onClose, footer?, children, open? (mount-controlled when omitted, self-controlled when passed)
- Deliberate normalizations: fixed h-[86%] frame everywhere (BottomSheet was max-h-[92%]); unified spring stiffness 380 damping 40 (BottomSheet was bounce 0.12 / 0.45s); footer top border dropped
- components/phone/Controls.tsx → deleted | superseded by components/phone/kit.tsx | 0 consumers (grep-verified)
- components/phone/ScreenBlocks.tsx → deleted | superseded by components/phone/kit.tsx | 0 consumers (grep-verified)

## B3 — Patient sheets onto canonical primitives

- components/phone/LifecycleButton.tsx → new | canonical idle→working→done footer CTA (tone: success/warning/danger/info, gated prop, CtaNote companion) | replaces 6 hand-rolled lifecycle footers
- components/phone/OptionRow.tsx → new | canonical selectable option row (OptionCheck companion, emerald/sky accents, icon/initial leading, radio/press roles) | replaces 5 hand-rolled option rows
- components/phone/DarkPanel.tsx → new | canonical dark inset panel (emerald/amber/rose, kicker, kickerTrailing, glow toggle) | replaces 6 hand-rolled dark panels
- patient/plan/FactRows.tsx → normalized | tone prop added (dark default unchanged, light added) | exported FactRow type
- Normalizations flagged: done-state unified to solid emerald-600; working text white/80; WhoSheet gains always-visible empty check track; WhoSheet rows px-3.5 py-3 → px-4 py-3.5; LanguageSheet rows gain whileTap; TimeSheet footer on LifecycleButton family shell; AddPrescription ledger preview orb unified to standard size; AddPrescription prescriber rows deliberately left custom (F12 decision)
- Preserved differences: WithdrawSheet rose panel glow={false} (original had none); CaregiverSheet footer loses duplicated ScrollText icon on second button (copy-paste artifact)
- Rewired: TimeSheet, WhoSheet, FiltersSheet, ServiceSheet, LanguageSheet, DoseDetailSheet, WithdrawSheet, LiveVisitSheet, AddPrescriptionSheet, CaregiverSheet, ConsentSheet, VisitSheet (12)
- Hairline row dividers removed from CaregiverSheet + VisitSheet light fact cards (no-divider rule)
- Verified: npx tsc --noEmit clean

## B4 — Professional/admin/system sheets onto canonical primitives

- components/phone/LifecycleButton.tsx → extended | tone 'accent' added (blue gradient house idiom from ConfirmWithdraw/CertificationUpload/EditProfile); gated style unified to bg-[#0B211B]/[0.08] text-[#0B211B]/40
- components/phone/FactTile.tsx → new | FactTile + FactTileGrid (2-col white fact tiles) | replaces 8 hand-rolled tiles across ConsentRecordSheet and AccessDetailSheet
- components/phone/MiniTimeline.tsx → new | dot-column timeline (done/pending/plain states, trailing slot, hairline connector) | replaces 2 hand-rolled timelines
- Normalizations flagged: dark-panel orb emerald-400/15 → /20 (payout trio); blue-idle done state → solid emerald-600; CtaNote absorbs footer notes (AccountSheet, CertificationUploadSheet, ConfirmWithdrawSheet)
- Preserved differences: EditProfile/CertificationUpload keep self-owned dim layers (parent AnimatePresence wiring untouched); FailureDrillSheet untouched (layoutId pill selector is unique); AccountActionsSheet untouched (rows defer to F5)
- Rewired: AccountSheet, ConfirmWithdrawSheet, PayoutReceiptSheet, CertificationUploadSheet, EditProfileSheet, ConsentRecordSheet, AccessDetailSheet (7); FactRows now imported cross-role (professional ← patient/plan)
- Repairs of pre-existing emit corruption: EditProfileSheet role card had malformed duplicate JSX; AccessDetailSheet header had garbled class string
- Verified: npx tsc --noEmit clean

## B5 — Patient heroes onto canonical hero primitives

- components/phone/HeroCells.tsx → new | HeroTopRow (kicker + trailing), HeroHighlight (canonical gradient map: emerald/amber/sky/rose/gold), StatCell (the 10x-duplicated white stat cell), TapCell (tappable stat cell, emerald/sky)
- Three hand-rolled Hero shells (DigestHero, IdentityHero, RecoveryHero) → kit Hero | shells deleted, inner layouts preserved
- Six local StatCell components deleted (Booking, Match, Plan, LiveVisit, Summary, Visits) plus four inline copies converted (Confirmed fact map, Rating x2, Consent scopes/edits pair)
- MatchHero language button → TapCell; RxHero TONE.gradient and TONE.icon fields deleted (canonical map + icon inheritance)
- Normalizations flagged: kicker /60 to /50; kicker icons inherit kicker color; Rx amber maps to gold gradient (yellow-200) pending user decision on amber collapse; tabular-nums added to Confirmed/Rating values; MatchHero language row gains hover and duration-300
- Deferred with reasons: big-number cells (3 value scales — F8 candidate with Vault TapStat), MedsHero dose rail, SummaryHero acknowledge button (dark idle variant), LiveVisitHero toggle row, Consent FactBlock
- Rewired (21): Booking, Catalogue, Consent, Digest, Feed, Identity, Live, Match, Meds, Plan, ProfileHero (pending), Recovery, Reports (pending), Confirmed, Rating (pending), Review, Rx, LiveVisit, Summary, Visits, Vault
- Repair incident: BookingHero corrupted mid-emit during Stage 2 (4 bad blocks), repaired from git show HEAD reference in a dedicated exchange; garbage file Stage2Test.tsx created and deleted; protocol updated — each heredoc final, no mid-message corrections
- Verified: npx tsc --noEmit clean at every stage gate

## B5 — Patient heroes onto canonical hero primitives

- components/phone/HeroCells.tsx → new | HeroTopRow (kicker + trailing), HeroHighlight (canonical gradient map: emerald/amber/sky/rose/gold), StatCell (the 10x-duplicated white stat cell), TapCell (tappable stat cell, emerald/sky)
- Three hand-rolled Hero shells (DigestHero, IdentityHero, RecoveryHero) → kit Hero | shells deleted, inner layouts preserved
- Six local StatCell components deleted (Booking, Match, Plan, LiveVisit, Summary, Visits) plus four inline copies converted (Confirmed fact map, Rating x2, Consent scopes/edits pair)
- MatchHero language button → TapCell; RxHero TONE.gradient and TONE.icon fields deleted (canonical map + icon inheritance)
- Normalizations flagged: kicker /60 to /50; kicker icons inherit kicker color; Rx amber maps to gold gradient (yellow-200) pending user decision on amber collapse; tabular-nums added to Confirmed/Rating values; MatchHero language row gains hover and duration-300
- Deferred with reasons: big-number cells (3 value scales — F8 candidate with Vault TapStat), MedsHero dose rail, SummaryHero acknowledge button (dark idle variant), LiveVisitHero toggle row, Consent FactBlock
- Rewired (18): Booking, Catalogue, Consent, Digest, Feed, Identity, Live, Match, Meds, Plan, Recovery, Confirmed, Review, Rx, LiveVisit, Summary, Visits, Vault
- Not yet rewired, scheduled B5 Stage 4: ProfileHero, ReportsHero, RatingHero (read with batch 1 of the remaining heroes)
- Repair incident: BookingHero corrupted mid-emit during Stage 2 (4 bad blocks), repaired from git show HEAD reference in a dedicated exchange; garbage file Stage2Test.tsx created and deleted; protocol updated — each heredoc final, no mid-message corrections
- Verified: npx tsc --noEmit clean at every stage gate

## B5 (continued) — Admin/partner/system/professional heroes onto canonical shells

- components/phone/kit.tsx → Hero gains tone prop (emerald/amber/rose) | canonical hero shells now cover the three static hues; emerald byte-identical, amber/rose are hue swaps incl. border/shadow/orbs/hairline
- components/phone/PhaseHero.tsx → new | phase-driven hero shell with transition-colors duration-500 baked in + PHASE_THEME map (emerald/amber/rose/sky/blue/blueDeep/emeraldBright) | replaces 6 hand-rolled phase shells
- components/admin/escalations/WarnHero.tsx → deleted | merged into kit Hero tone=amber | zero remaining consumers (grep-verified)
- IncidentHero's local shell component and admin WatchHero/VaultHeroCard inlined shells → kit Hero tones
- System trio (AuditHero, RecheckHero, TransactionHero) + PaymentHero + EarningsHero + DossierHero → PhaseHero with theme maps reduced to PHASE_THEME keys
- Partner emerald hand-rolls (PartnerStatsHero, BillingHero, PartnerReferralWizardHero) → kit Hero; StaffHero theme-mapped shells → PhaseHero with shells normalized #3A2A0B/#4A1A1A to canonical #241B0C/#230D14
- Normalizations flagged: StaffHero shell hues to canonical values; PaymentHero per-phase inline boxShadow → single PhaseHero shadow; orb opacities unified; AvailabilityHero clock icon tint inherits; EarningsHero/DossierHero hairlines onto theme values; DossierHero resolved state amber→PHASE_THEME.amber
- Untouched with reasons: PerformanceHero, CheckInHero, OnboardingHero, SessionSummaryHero (already on kit Hero); professional ProfileHero (distinct bottom-band composition, not a Hero clone); RevenueHero/LedgerChainHero/RecheckHero divide-x stat strips deferred to F8
- Corruption incidents this batch: 2 (kit.tsx double-emit, restored via git checkout before any consumer ran on it; one bad append to PhaseHero superseded by full clean re-emit in the same exchange). Protocol hardened: canonical hub files get their own message, one block, no sibling emits
- Verified: npx tsc --noEmit clean at every stage gate

## B6 (part 1) — Patient buttons onto canonical lifecycle primitives

- components/phone/LifecycleButton.tsx → extended | IconLifecycleButton (round/square icon-only lifecycle, revert vs hold done states, size prop), QuietLifecycleButton (half-width tint lifecycle), StaticButton (static CTA, success/neutral/amber/danger) | full re-emit, prior API unchanged
- components/admin/ui/Pager.tsx → moved to components/phone/Pager.tsx | content byte-identical, imports repointed
- components/admin/ui/TonalButton.tsx → deleted | consumers A02 + DueReviewCard renamed to StaticButton with tone primary→success; hover-scale dropped per no-hover-motion rule
- Full-width lifecycle CTAs rewired: ContinueButton (gated blocked state), MatchButton, CreateButton, SendLinkButton, ConnectButton (solid→LifecycleButton, soft→QuietLifecycleButton with self-owned phase+notify)
- Icon-only lifecycle rewired: MarkAllReadButton (done-state hold), DownloadAllButton (hold), ShareButton (revert), ShareSummaryButton (revert with working phase and clipboard write preserved)
- SentActions call button → QuietLifecycleButton; mail link stays motion.a
- Static CTAs rewired: SignInAction (neutral), RatingCta (amber), AddVisitButton (success)
- PrimaryAction untouched: 15px/py-4 sizing is a legitimate distinct variant, not dedup
- Normalizations flagged: button weight font-extrabold→font-bold across seven consumers; done-state emerald-500+shadow→solid emerald-600; ContinueButton blocked tone to canonical gated values
- Incidents: ConnectButton corrupted twice mid-message (recovered via git checkout + dedicated single-file re-emit); CreateButton heredoc silently never ran (caught by git status cross-check, re-emitted as sole block); TonalButton rename required a second sed because the first path-swap had already rewritten the import line (lesson: grep current state before crafting sed full-line matches)
- Verified: npx tsc --noEmit clean; TonalButton references zero

## B6 (part 2) — Professional/partner/system buttons onto canonical lifecycle primitives

- Rewired: SaveAvailabilityButton (disabled→gated), WithdrawButton (accent tone), ExportHistoryButton (gray working tone→canonical emerald-600/60), SaveSheetButton (disabled→gated), FinishBar (skip branch preserved as static motion.button), EditProfileButton + IncidentButton (StaticButton neutral), FailureDrillSheet footer (LifecycleButton, destructive→danger tone, whileHover scale dropped per no-hover-motion rule)
- Deferred with reasons: SubmitButton (ctaClass arrives pre-computed from severity config — severity→tone map is an F4 follow-up), SignOffButton (flex-[1.4] row ratio conflicts with w-full base), DayToggle (F10 merge with FilterToggleRow), CheckTile + PartnerQuickActions (F10/F12), PhotoAttach/SeveritySelector/CausePicker (F10/F12)
- Normalizations flagged: disabled-idle opacity-45 → canonical gated treatment; done states emerald-500+shadow → solid emerald-600
- Pre-existing A05.tsx modification (Pager import re-point from part 1 sed) included in commit
- Verified: npx tsc --noEmit clean

## B7 — Status, chips, and notices

- components/phone/NoteStrip.tsx → new | Panel+Tile+paragraph canonical note strip | replaces 9 byte-identical hand-rolls (RecheckNote, ConsentNote, VerificationNote, ReliabilityNotice, PayPolicyNotice, SafetyNotice, PrivacyNotice, 2x SealedNotice)
- Domain note components retained as thin wrappers over NoteStrip (per-domain icon, intent, text preserved; zero consumer changes)
- components/patient/matching/StatusPill.tsx → promoted to components/phone/StatusPill.tsx | content unchanged | absolute and relative imports repointed (MatchHero, MatchCard relative-import blind spot caught by targeted grep)
- professional/sheets/SheetFooterNote.tsx → wrapper over CtaNote | visual preserved
- Deferred with reasons: DarkTimeChip (single consumer, hub edit not worth risk — F3 residual), HighlightTags (F12 tag picker, merges with CausePicker), SectionHeader vs kit Section (state-driven vs static, genuinely different), ListRow (F5), FilterBar (F9)
- Verified: npx tsc --noEmit clean; stale StatusPill references zero

## Ledger correction — retraction of false corruption records

- Earlier entries blaming pre-existing repo corruption (EditProfileSheet role card, AccessDetailSheet header class, and an implied B8-row set) are retracted: arbiter diff against disk proved the files are intact and compiling; the garbling occurred in the read channel between terminal and agent context
- Lesson recorded: tsc clean over the full include set means every file compiles, imported or not — no file can be silently broken on disk; suspected corruption is a channel problem until git diff proves otherwise
- Read protocol amended: batch reads capped at 6 files; any pasted body that looks mangled is suspect by default and gets a sed spot-check before it drives any decision

## B8 — Rows

- components/phone/ExpandRow.tsx → new | canonical expandable row (Tile header, trailing slot, rotating chevron, AnimatePresence expansion, dense/compact modes, fresh entrance) | replaces 3 hand-rolled twins
- MedRow, StepRow, DocRow → rewired onto ExpandRow; scheduled/todo flat variants preserved inline; Med/Step fact panels onto FactRows light (label tone /45→/40 flagged); DocRow chevron moved to canonical slot (position unchanged)
- Kept with reasons: PayoutRow, EarningRow (distinct amount-column variants), PreferenceRow, AddCertificationRow, CertificationRow (fresh state fan-out), ChecklistRow (4-state machine), FieldTaskRow (card-embedded action)
- admin/ui ListRow: promotion to phone deferred — requires hover-scale/chevron-translate violation fixes alongside consumer migration, own pass
- Divider punch list for screen phase: hairline separators in AuditEntryList, RecentActivityList, DeletionQueueList, ReferredPatientList violate no-divider rule; removal is a visual change deferred to rebuild phase
- Read protocol: 6-file cap held; both part reads arrived clean after spot-checks
- Verified: npx tsc --noEmit clean

## B9 (parts 1-2) — Patient visit and review cards

- ExpandRow gains hideChevron prop (full re-emit, sole file in stage, gate held) | CompletedCard rewires with chip-only trailing
- CareDeliveredCard: fifth ExpandRow twin collapsed (chevron in canonical slot, rotation preserved)
- CaregiverCard: quiet update button → QuietLifecycleButton; dark live-status block → DarkPanel glow={false} (original had no orb — preserved difference)
- BookingRecordCard, VisitRecordCard, SummaryCard: hand-rolled fact rows → FactRows (dark on hero, light in cards)
- Incident: CaregiverCard first emit carried invalid as-never icon casts, caught and re-emitted clean in same exchange — protocol allows one immediate full re-emit ONLY when the re-emit is complete and verified; repeated in-message patching remains forbidden
- Kept with reasons: MissedCard, LiveVisitCard, SessionLedgerCard (sub-line TimeCell), VitalsCard, PatientCard, CaregiverNoteCard, ReviewMatchCard, ConsentCard (unique compositions); PaymentCard, PlanCard, UpcomingCard (navigator cards deferred to ListRow promotion pass)
- CompletedCard chevron removal flagged: rotation cue gone from trailing slot; user may request restoration
- Verified: npx tsc --noEmit clean at both gates

## B9 (part 3) — Meds and catalogue cards

- RefillCard, DueDoseCard: hand-rolled amber lifecycle CTAs → LifecycleButton tone=warning (two more twins killed; now 15+ lifecycle implementations retired project-wide)
- DueDoseCard detail button → StaticButton neutral (hover tint matched exactly)
- Kept with reasons: MedLogCard (composite header + grouped MedRow sections), ServiceList (cause-aware dual empty states with remedies — F9 pattern exemplar), ServiceRow (price-column row variant), SettingsCard (navigator, ListRow pass)
- Verified: npx tsc --noEmit clean

## B9 (part 4) — Dashboard and reports cards

- components/phone/QuotePanel.tsx → new | dark quote panel (kicker, serif quote, author footer, badge slot) | replaces 2 hand-rolled quote blocks (CaregiverNoteCard was the first known instance; LatestReportCard conclusion + ReportsListCard expansion adopted)
- MedicationCard, RecoveryCard: two more hand-rolled hero shells → kit Hero (amber/emerald tones); footer button pairs preserved as statics
- ReportsListCard ReportRow: seventh ExpandRow twin collapsed; chevron in canonical slot
- FactRows light adoption: LatestReportCard highlights, ReportsListCard expansion highlights
- Incident: LatestReportCard required three emits to land (missing Quote import, then silent bg-white drift caught by grep gate) — dual grep+tsc verification protocol adopted for any file with a mid-message re-emit
- Verified: npx tsc --noEmit clean; disk state confirmed by grep counts 1/1 before commit

## B9 (part 5, close) — Recovery/verification/auth cards

- No rewires: GuaranteesCard, NextStepsCard (info-row lists already on kit Tile+Chip), SafetyCard (kit Expand with distinct compact header), SentCard (composition of consolidated siblings), CreateAccountCard (navigator, ListRow pass), PasswordCard (CredentialRow composition, F10 territory)
- B9 patient sweep totals: 5 new canonicals (ExpandRow, QuotePanel + prior HeroCells/LifecycleButton family adoption), 20+ hand-rolled twins collapsed across visits, review, meds, dashboard, reports, recovery
- Verified: npx tsc --noEmit clean at every stage gate

## B10 (part 1) — Partner cards

- PartnerPatientHero: last partner emerald hand-rolled hero shell → kit Hero (hairline added per shell unification); useCountUp hook and four-band progress theme preserved as genuinely custom
- Kept with reasons: PartnerCarePathway (state-machine journey accordion with connector rails), PartnerRecoveryTrajectory (animated SVG chart with play-state, F8-adjacent), StaffList (variant-mode avatar list; chevron-translate violation flagged for ListRow pass), PartnerBillingCard + PartnerReferralCard (navigator cards, ListRow pass; PartnerReferralCard whileHover scale flagged for F4 sweep)
- Verified: npx tsc --noEmit clean

## B10 (part 2) — Professional history and offers cards

- No rewires — all six verified as single-purpose compositions on existing primitives
- NotePanel: ruled OUT of QuotePanel absorption (different footer anatomy: caption vs avatar+badge; one caller each — merge would be a props bolt-on)
- IncidentPanel: DarkPanel-adjacent residual (smaller orb, no kicker tint separation; forcing requires a glow-size prop for one caller)
- OfferCard: unique urgency-theme state machine with accept/decline lifecycles; whileHover scales flagged for F4 sweep
- SessionRecordCard, AcceptedOffersCard, DeclinedOffersCard: distinct variants with single callers each
- Verified: npx tsc --noEmit clean (no emits, read-only stage)

## B10 (part 3) — Professional sessions/payouts/auth cards

- No rewires — six single-purpose compositions verified
- ArrivalTimelineCard: MiniTimeline-adjacent residual (gradient connector + emerald active-ping vs canonical amber pending; pendingTone prop for one caller = bolt-on economics)
- StandingCard: light-surface stat trio variant; AccountCard: unique gradient bank-card (sole instance); SessionListCard: divided list (hairlines join divider punch list); LiveSessionCard: unique progress+resume composition; PayoutHistoryCard: thin PayoutRow wrapper
- StandingCard whileHover scale flagged for F4 sweep
- Commit policy change per user: small consolidation batches accumulate into the next substantial commit; ledger records completion continuously

## Ruling 2 — Data-module relocation (12 files)

- 10 pure moves (git mv, content unchanged) → src/data/: availabilityData, sessionRecords,
  historyData, incidentData, payoutData, profileData, sheetData, sessionExecution,
  performanceData, drillOutcomeTheme
- 2 forced renames (collision with pre-existing src/data/types.ts, and with each other):
  partner/performance/types.ts → src/data/partnerPerformanceTypes.ts;
  partner/billing/types.ts → src/data/partnerBillingTypes.ts
- Single content edit in the batch: src/data/performanceData.ts line 1 `./types` →
  `@/data/partnerPerformanceTypes` (a flat move would have silently resolved `./types`
  to the global src/data/types.ts — the wrong module)
- Consumers repointed: 53 files (10 app screens incl. PT06's two imports, 43 component/data
  files; PT06 required a second fix after discovery, see incident below)
- Incident — sweep gap: performanceData was omitted from the consumer-discovery pattern
  (fell between the module-name sweep and the two types.ts sweeps); caught by the post-fix
  retired-path sweep, root-caused, and fixed in a dedicated exchange. Lesson recorded:
  every moved module must appear by bare filename in discovery; relative blind-spot sweep
  added to the standard verification set
- sessionExecution.ts was the 12th module — missed by the original audit list of 11, caught
  by tree cross-check at coverage-checklist build
- Observation (not acted on, per minimal-edit rule): incidentData.ts and drillOutcomeTheme.ts
  import types from @/components/phone/kit — data layer depending on component layer; works
  under the alias, logged for any future layering decision
- Verified: npx tsc --noEmit clean (×2 gates); retired-path sweep zero across all 12 old
  paths; relative-import blind-spot sweep zero; new-path file counts all match expected

## F1 finish — Partner sheets, batch 1 of 3 (6 sheets)

- components/phone/SheetShell.tsx → extended | height prop ('full' default | 'auto' content-height
  mode: flex-col gap-3.5 p-5 pb-7, grabber + compact header inline, children/footer inline) |
  existing API untouched; TSC clean at hub gate before any consumer ran
- Six compact hand-rolled shells (identical retired idiom: y-100% spring bounce 0.12/0.45s,
  rounded-t-[28px] bg-white p-5 pb-7, grabber, X-button header) → SheetShell height="auto":
  PartnerAlertsSheet, PartnerBillingSheet, PartnerDischargeFileSheet, PartnerInfoSheet,
  PartnerMessageSheet, PartnerReferralSheet
- Consumers: zero screen edits required — all six keep paths and export signatures; PT02/PT03/PT04
  import lines unchanged
- PartnerInfoSheet: self-controlled mode via open={!!data}; custom emerald-circle header kept as
  children (dynamic icon — shell header unused, no leading escape-hatch prop added); dim layer now
  canonical
- Preserved differences: referral option rows kept custom (amber/sky circles — OptionRow force-fit
  would be a bolt-on); alerts hairline dividers kept (divider punch list)
- Normalizations flagged: spring bounce 0.12/0.45s → canonical 380/40 (B2 precedent); whileHover
  scales dropped on DischargeFile view/download buttons and Message quick-reply chips (no-hover-motion
  rule, B6 precedent); whileTap kept; Message send-button conditional whileHover scale dropped
- Punch list additions (visual, rebuild phase): PartnerAlertsSheet row dividers; hover states on
  referral rows
- Verified: 6/6 on canonical by grep; npx tsc --noEmit clean

## F1 finish — Partner sheets, batch 2 of 3 (6 sheets)

- components/phone/SheetShell.tsx → extended | height gains 'scroll' mode (max-h-[88%]
  content-height-with-scroll: grabber band pt-4, scrollable interior px-5 pb-7 pt-3 holding
  header AND button inline) | existing 'full'/'auto' paths byte-identical; TSC clean at hub
  gate before any consumer ran. Justified by ≥2 implementations (both billing sheets share
  the idiom); auto sheets untouched by it
- Rewired height="auto": PartnerSessionsSheet, PartnerStaffSheet (canonical Tile header),
  PartnerStatsSheet (surface-only — custom emerald-circle leading kept as children, InfoSheet
  precedent), StaffDetailSheet (canonical surface inside preserved self-owned black/40 dim +
  fade wrapper per B4 EditProfile/CertificationUpload precedent — canonical dim would add
  backdrop-blur, a visual change)
- Rewired height="scroll": BillingInvoiceSheet, BillingUsageReportSheet (the max-h-88% idiom
  the mode was built from)
- Consumers: zero screen edits — all six keep paths and export signatures; PT02/PT05/PT07
  import lines unchanged
- Normalizations flagged: hand-rolled spring bounce 0.12/0.45s → canonical 380/40 (batch-1
  precedent); StaffDetail 300/30 → 380/40; whileHover scales dropped on billing close buttons
  and download/email buttons (no-hover-motion rule, B6 precedent); whileTap kept
- Preserved differences: StaffDetail self-owned dim (no blur); staff rows keep sky-circle
  leading; StaffSheet hairline dividers kept (divider punch list)
- Verified: 6/6 on canonical by grep; npx tsc --noEmit clean

## F1 finish — Partner sheets, batch 3 of 3 (2 rewired + 3 keep-ruled) — PARTNER F1 CLOSED

- Rewired height="auto" (StaffDetail idiom — canonical surface inside preserved self-owned
  black/40 no-blur dim + fade wrapper per B4 precedent): PerformanceFeedbackSheet,
  PerformanceKpiSheet. Consumers: zero screen edits (PT06 unchanged)
- Normalizations flagged: hand-rolled spring 300/30 → canonical 380/40
- Keep-ruled with evidence: CloseSheet, EscalateSheet, PhotoViewSheet are content fragments,
  not shells — consumer A02 already renders all three inside canonical BottomSheet
  (import from phone/SheetShell, grep-verified). No shell duplication exists in these files;
  they are the thin-domain-consumer end-state already
- Partner sheet family final: 14 of 14 processed (14 rewired, 0 keep-ruled-within-partner;
  admin trio's keep-ruling recorded above under admin)
- Verified: both rewires on canonical by grep; npx tsc --noEmit clean

## F1 finish — Professional sheets, tranche 1 (6 sheets)

- components/phone/SheetShell.tsx → extended | full mode gains header?: ReactNode slot
  (symmetric with footer; custom fixed headers + inputs above a scrolling body) | default
  undefined keeps every existing consumer byte-identical; TSC clean at hub gate
- Rewired height="scroll": CredentialsSheet, DevicesSheet (max-h-86% idiom → canonical 88%;
  normalization flagged). whileHover drops on close buttons and Devices sign-out button
  (no-hover-motion rule)
- Rewired height="full" + header slot: RecordSheet (mono-kicker custom header), SearchSheet
  (header incl. search input). Both mount-controlled with self-owned canonical-style dims kept
  inline per B4 precedent (parent owns AnimatePresence; open-mode would rewire parent exits —
  behavior change). RecordSheet footer = lifecycle export button; SearchSheet footer = note
- Rewired height="auto" (StaffDetail idiom, self-owned black/40 dims preserved): ReportSheet,
  SessionDetailSheet. Spring 300/30 → canonical 380/40 flagged
- ORPHAN FINDING — new register: RecordSheet has zero consumers (word-boundary grep, both
  path styles, whole src; only match is ConsentRecordSheet false-positive). Rewire stands;
  deletion deferred to B18 orphan/vendor sweep
- Consumers: zero screen edits — all six keep paths and export signatures; PR01/PR04/PR12
  import lines unchanged
- Verified: 6/6 on canonical by grep; npx tsc --noEmit clean
