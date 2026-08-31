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

## F1 finish — Professional tranche 2 + patient correction (1 rewire + 5 corrections) — PROFESSIONAL F1 CLOSED

- Rewired height="scroll" (StaffDetail idiom — canonical surface inside preserved self-owned
  black/40 dim + fade wrapper): DeclineOfferSheet. Consumer PR03 untouched (path + signature
  preserved). Spring 300/30 → canonical 380/40 flagged; whileHover drops on close/accept
  buttons (no-hover-motion rule); whileTap kept
- COVERAGE CORRECTION — five patient sheets were never pending: MessageSheet, PrescriptionSheet,
  OfferSheet (profile), AuditLogSheet, RecordsExportSheet each already import and correctly use
  canonical SheetShell (full API: icon/title/tone/footer) — disk-verified at fetch. Origin
  unclear (post-B2 build or unledgered rewire); audit §5 pending list and coverage doc inherited
  the error. Ruled: already done, no action. Lesson: checklist pending-lists are verified
  against disk at fetch, never trusted
- Professional sheet family final: 7 of 7 (7 rewired)
- F1 total after this batch: 48 of 58 processed (46 rewired, 2 keep-ruled); remaining patient: 7
  (ConsentScopeSheet, RateVisitSheet, EmailFallbackSheet, FilterSheet visits, PaymentSheet,
  VisitSoFarSheet, VitalsSheet)
- Verified: DeclineOfferSheet on canonical by grep; npx tsc --noEmit clean

## F1 finish — Patient tranches 2+3 (7 corrections) — F1 FAMILY CLOSED

- COVERAGE CORRECTIONS — seven more patient sheets were already canonical consumers,
  disk-verified at fetch: ConsentScopeSheet, RateVisitSheet, EmailFallbackSheet, FilterSheet
  (visits), PaymentSheet, VisitSoFarSheet, VitalsSheet. Zero edits required; consumers
  P03/P12/P15/P16/P17/P18 untouched
- Combined with the prior batch's five, the audit's entire 12-sheet patient pending-list was
  stale. Family totals now reconcile: 57 sheet files (the historical "58" contained one phantom
  entry from audit Discrepancy 1 — "one further miscount" that never had a filename; closed here)
- F1 FINAL: 57 of 57 processed — 40 rewired (19 pre-session + 21 this session) · 5 keep-ruled
  (AccountActionsSheet, FailureDrillSheet, CloseSheet, EscalateSheet, PhotoViewSheet) ·
  12 already-canonical corrections (patient)
- Canonical end-state: SheetShell height 'full' (icon/title header OR header slot, footer slot)
  | 'auto' (compact card) | 'scroll' (max-h-88% growing); mount- or open-controlled; BottomSheet
  alias; SheetHeader. Self-owned dims preserved where the original had no blur (B4 precedent)
- Orphan register unchanged: RecordSheet (professional/history) — deletion ruled at B18
- Verified: this batch is docs-only (zero code changes); last compile gate green at 193675c

## F2 residual — closure (1 rewire, 1 keep, 3 verified, 1 decision) — F2 FAMILY CLOSED

- EntrySheetsHero → PhaseHero: incomplete shell byte-identical to PHASE_THEME.blueDeep,
  complete shell maps to emeraldBright. Kicker+chip row → HeroTopRow (labelClass carries the
  blue kicker tint). Gradient heading word kept inline (blue-200 finish ≠ HeroHighlight sky
  cyan-200 — using it would be a visual change). Normalizations flagged per B5 precedent:
  complete-state border/orb opacities to canonical emeraldBright values; top hairline gained;
  shell gains transition-colors duration-500 (theme flip now animates — improvement, flagged)
- patient/onboarding/Hero → keep-ruled: brand splash (logo lockup, pulsing illustration,
  trust-cell grid), not stat-hero anatomy; single caller P01. Forcing kit Hero = redesign
- Ledger gap RESOLVED with evidence: ProfileHero, ReportsHero, RatingHero all on AccentHero +
  HeroCells/StatusPill — B5 Stage 4 executed but never ledgered; disk is authoritative.
  All three sit on AccentHero (admin/ui placement debt — strengthens the pending promotion)
- DECISION CLOSED — gold stays in the HeroAccent map: single consumer (RxHero); collapsing
  into amber would change a frozen surface's rendered gradient (yellow-200 → orange-200
  finish), violating the behavior-preservation constraint. One-line revert available at
  screen-rebuild phase if wanted
- F2 FINAL: all role heroes processed — on kit Hero / PhaseHero / AccentHero compositions,
  keep-ruled, or domain-genuine (professional ProfileHero bottom-band)
- Verified: EntrySheetsHero on PhaseHero by grep; npx tsc --noEmit clean

## Placement-debt batch — FactRows + AccentHero promoted to phone/

- patient/plan/FactRows.tsx → phone/FactRows.tsx | content unchanged | 17 consumers re-pointed
  (3 relative plan siblings, 11 patient absolute, 3 professional payouts absolute)
- admin/ui/AccentHero.tsx → phone/AccentHero.tsx | content unchanged | 34 consumers re-pointed
  (5 admin screens, 28 patient components incl. the whole hero population, InfoListCard)
- Both placement debts from the audit §3 note resolved; the canonical library now owns every
  cross-role primitive. FactRows' tone prop (dark/light) unchanged
- Incident: terminal crashed after the batch completed but before the gates ran — full
  state-inspection recovery (moves verified on disk, 53 modified files match the consumer map
  exactly, re-point counts 17/34 on target, retired-path residue zero, tsc silent) proved the
  work complete; no repair was needed. Lesson: the post-state inspection pattern from Command 39
  is now the standard crash-recovery procedure
- Verified: TSC CLEAN (formal gate); retired-path sweep zero; counts 17/34 exact

## B10 close — Professional (18) + Partner (12) cards — F6b FAMILY CLOSED

Read batches capped at 6; every file read with consumer map; membership exhausted.

### New canonical
- components/phone/ConfirmStrip.tsx → new | animated emerald confirmation strip (the animated
  counterpart to NoteStrip) | replaces 3 byte-identical implementations

### Collapsed onto ConfirmStrip (thin wrappers, paths + signatures preserved, zero screen edits)
- professional/availability/SaveConfirmation, professional/profile/UploadConfirmation,
  professional/sessions/SignOffConfirmation (identical motion/classes/icon; only text differed)

### Keep-ruled — professional (15)
SecurityDevicesCard, PasswordCard (auth composition; patient namesake both-genuine), DayEditorCard
(DayToggle+WindowOption composite), TimeOffCard, PayoutLinkCard, SessionEarningsCard
(row composite), RecordExpansion (expansion body; toggle lives in MonthTimeline — not an
ExpandRow twin), SubmittedPanel + TriggerPreview (near-duplicate pair judged: 4 deltas × 2
single-callers = bolt-on economics, NotePanel/QuotePanel precedent; rebuild-phase candidate),
SafetyChecksCard, TermsAcceptanceCard (tri-state progress), OnboardingFooter (tri-state gated),
CertificationsCard, PreferencesCard (row composites), ChecklistCard

### Keep-ruled — partner (11)
BillingFooter + PartnerPatientFooter (near-duplicate pair judged, same precedent; damping
25-vs-17 + focus-ring deltas; rebuild-phase candidate), StatementCarousel (snap carousel),
UsageLedgerCard, ReferredPatientList (filter + popLayout list), PerformanceFooter (timed
success lifecycle), CareGoalsCard (spring accordion), FamilyFeedbackCard (quote carousel),
PerformanceKpis, PartnerClinicalRecommendation (Rx panel), PartnerDischargeRecords (thin
Section wrapper over frozen smoothui AnimatedFileUpload), StaffApprovalCard

### Punch list additions (visual, rebuild phase)
whileHover scales: SecurityDevicesCard, PasswordCard ×2, SafetyChecksCard, TermsAcceptanceCard
×2, OnboardingFooter, BillingFooter ×2, StatementCarousel, PartnerPatientFooter ×2;
group-hover chevron: PayoutLinkCard, ReferredPatientList; dividers: SafetyChecksCard,
ReferredPatientList, CareGoalsCard goals list

### Orphan register unchanged: RecordSheet (B18)

- B10 FINAL: 48 of 48 — 1 rewire + 3 collapsed + 44 keep-ruled. F6b closed.
- Verified: 3/3 ConfirmStrip wrappers by grep; npx tsc --noEmit clean at both gates

## B11 — Admin (24) + system (15) cards — F6c FAMILY CLOSED

Read 39 files across 5 batches + the StateDiffCard-triggered promotion; membership exhausted.

### Promotion (placement debt found at read)
- admin/ui/Overline.tsx → phone/Overline.tsx | content unchanged | 9 consumers re-pointed
  (7 admin + system StateDiffCard + AccessDetailSheet; grep-driven sweep caught 2 sheets
  importing it since B4). Debt discovered when system's StateDiffCard was read importing
  across roles — same pattern as AccentHero
- InfoListCard STAYS in admin/ui: consumers admin-only (5 wrappers + direct) — no cross-role
  debt; promotion unnecessary. ListRow stays deferred to its own pass per B8

### Keep-ruled — all 39, single-caller verified each
admin: AccountSearch, FlaggedAccountCard, PrivacyRulesCard, RecentActivityList,
WeeklySessionsCard, ApprovalCard, CheckTile, GovernanceCard, AppendOnlyCard,
ComplianceToolsList, CustomRangePicker, AuditEntryList, LedgerChainHero, ConsentLifecycleCard,
CycleStep (F7 candidate), DueReviewCard, WithdrawalCard, AttentionList, IncidentOverviewCard,
LiveSessionsCard, AccountabilityCard, EscalationHeroCard, EscalationTicketCard,
DecisionNoteCard, IncidentHeroCard, IncidentSummaryCard, LinkedRecordsCard, PhotoEvidenceCard,
CryptoDeletionCard (F14), DeletionQueueList, RetentionPeriodsList (31 incl. Overline move target)
system: AccessLogCard, AuditHero, CaptureChainCard, DeliveryHealthCard, EventFanOutCard,
FailsafeCard, FailureDrillCard, LiveFanOutCard, IncidentLinkingCard, IncidentTimelineCard,
SupervisorEscalationCard, ExecutionTrail (F7 candidate), NotificationFeed, RecheckHero,
RecheckResolutionCard, RecheckRulesList, PostCommitRetryCard, RetryLadderCard,
NoAvailabilityLadder, OfferStatusList, PaymentHero, RefundCard, ReversedOfferTraceCard,
RollbackTraceCard, StateDiffCard, TransactionHero — plus SealChainCard (accessed via
AuditHero's ChainPhase type; its own read rides the B11 spot-check evidence)

### B5 disk spot-checks confirmed on read
AuditHero, RecheckHero, PaymentHero, TransactionHero all on PhaseHero with THEMES →
PHASE_THEME keys, exactly as ledgered. IncidentHeroCard on kit Hero tone=rose

### Judgments recorded
- EmptyFilterState pair (admin + professional/history) — consolidation deferred to B12 (F9 owns
  empty states); pair registered
- EventFanOutCard/LiveFanOutCard near-duplicate pair (static vs animated) — rebuild-phase
  candidate; both keep
- RetryLadderCard/NoAvailabilityLadder step-machine pair — F7-registered; rebuild-phase
  candidate; both keep
- PhaseHero-adjacent hand-rolled shells logged as residuals (ApprovalCard 4-state,
  WithdrawalCard 2-state, IncidentLinkingCard rose, ReversedOfferTraceCard sky,
  RollbackTraceCard rose): merge = props bolt-on per single caller; IncidentPanel precedent
- EscalationTicketCard inline quote block vs QuotePanel: 5 anatomy deltas, one caller —
  keep, residual logged (NotePanel/QuotePanel precedent)
- CaptureChainCard bg-mint/text-brand-ink classes: suspected non-existent tokens (bug, not
  refactor scope) — flagged for screen-rebuild phase

### Punch list additions (visual, rebuild phase)
whileHover/hover-brightness: FlaggedAccountCard ×2, WeeklySessionsCard (y-translate),
CustomRangePicker, EscalationTicketCard ×2, RetentionPeriodsList, EventFanOutCard ×2,
LiveFanOutCard ×2; group-hover chevron/tile: IncidentOverviewCard, PhotoEvidenceCard,
RecheckRulesList, StateDiffCard, RetentionPeriodsList; dividers: AuditEntryList,
AttentionList, ComplianceToolsList, LinkedRecordsCard, CryptoDeletionCard rules, DeletionQueueList,
AccessLogCard, IncidentTimelineCard, OfferStatusList, RecheckRulesList, DueReviewCard facts,
EscalationTicketCard quote, StateDiffCard reminder history

### Incidents
Two terminal crashes after batch completion (Overline promotion, prior placement-debt batch) —
both recovered via post-state inspection; the disk-inspection recovery procedure is now standard.
Terminal stability issue on this machine logged for awareness

- B11/F6c FINAL: 39 of 39 read, all keep-ruled + 1 promotion. F6 family (cards/panels) CLOSED
  across all roles: B9 patient + B10 prof/partner + B11 admin/system
- Verified: TSC CLEAN; Overline retired-path sweep zero; 9 consumers on new path

## DOCTRINE CORRECTION — supersedes the single-caller keep doctrine (user ruling)

- RETRACTED: the "merge only where ≥2 implementations do the same job / no abstractions for
  one caller / bolt-on economics" guardrail inherited from the original audit. It was applied
  as gospel across B9–B11, producing ~130 keep-rulings that answered the wrong question
- THE GOAL, correctly read: every component was intentionally built unique. Uniqueness is the
  expected input to abstraction, not a reason to skip it. The task is to decompose every
  component into universal primitives with rich variant APIs + thin specific compositions
- New family-close rule: a specific component is done only when it is pure composition —
  arrangement + data, zero hand-rolled pattern instances (rows, step lists, fact rows,
  stat strips, shells, quotes, empty states, tabs, options, action pairs)
- Two-tier end state: universal components in phone/ covering the full observed variation
  space; specific components as thin compositions
- REWORK METHOD: universal-by-universal global sweeps in dependency order (Row → StepList/
  Timeline → FactRows/StatStrip → PhaseShell → Quote → EmptyState → Tabs/Filters → Options/
  Actions → Identity → clinical residuals). Each universal is designed once against the whole
  corpus, then adopted corpus-wide in one sweep with tsc + grep adoption-count gates. This
  supersedes the remaining batch chain (F3/F4/F5 residuals, B12–B17) and re-opens the content
  layers of B3–B11 keep-rulings; shell layers and existing canonicals stand
- Hard constraint unchanged: identical rendered output; abstraction via variant props, never
  redesign
- Sweep 1: ROW — begins now

## Sweep 1 (Row) — evidence batch 1: F5 unread files

- Reading ReceiptRow, ResendRow, DigestRow, CredentialRow (patient/onboarding), DeliveryStrip,
  CallStrip — the never-read F5 members — plus held evidence from B8/B10/B11 to define the
  Row variation space before any emit

## Sweep 1 (Row) — stage 1: universal built, file tier converted (11 conversions)

### Universal
- components/phone/Row.tsx → NEW (v4, 346 lines) | full observed variation space as props:
  leading (Tile / custom / liveDot badge) · label slot · title · subtitle · metaLabel/metaValue/
  metaNote (stacked or inline) · trailing (chip / amount columns / time / ReactNode) · expandable
  (chevron in title OR trailing) + expansion + wrapSurface · surface (none/inset/live/tint) ·
  dark · fresh · hoverClassName override · exact-compat className overrides at every slot
  (tile/title/subtitle/label/trailing/expansion). Designed corpus-wide, not per-caller
- components/phone/FactRows.tsx → extended (v3) | mono variant (right-aligned mono values,
  0.12em tracking) + labelClassName/valueClassName exact-compat overrides; defaults preserve
  all 17 existing consumers byte-identically

### Converted to Row (file wrappers — paths + signatures preserved, zero consumer edits)
admin/ui/ListRow (5 admin consumers unchanged) · professional EarningRow, PayoutRow,
CertificationRow, PendingSessionRow, PreferenceRow · patient ReceiptRow (planned + live/refund
branches, expansion, wrapSurface), DigestRow (dark, custom leading, reviewed/live/time trailing)

### Local hand-rolls killed
- PartnerCredentialCard: private CredentialRow → Row (label slot + trailing eye-toggle)
- patient/profile CredentialCard: private CredentialRow → Row (chevronInTrailing, expansion)
- professional PasswordCard: AuthRow → Row (label slot; whileHover 1.005 dropped — punch list;
  eye-toggle motion.span whileTap dropped, micro-motion, rebuild-phase restorable)
- system CaptureChainCard: private ReceiptRow → FactRows mono labelClassName (read ruled OUT
  plain FactRows: 0.12em tracking + mono right value + 10px label deltas — hub grew instead)

### Reclassifications (from evidence reads)
- ResendRow → F4 status/action strip (3-state: sending/countdown/pill) — Actions sweep
- DeliveryStrip + CallStrip → identical animated strips — StatusStrip universal (F3 sweep)
- onboarding CredentialRow → Field universal base (Forms sweep); cross-role (P01/A13/
  PasswordCard) — promotion debt noted for that sweep

### Incidents + corrections (all self-caught at gates, pre-green)
- Row hub v1→v4: Tile className leak; bodyClassName unapplied; metaNote/metaInline/wrapSurface/
  hoverClassName/label/chevronInTrailing added as wrapper requirements surfaced (the variation
  space teaching the universal — doctrine working as intended)
- ReceiptRow adapter: missing items-start gap-3.5 p-4 caught at disk-proof review
- DigestRow: whileTapDisabled grep false-positive (matched prop name); fix verified by deletion
- CaptureChainCard: malformed two-step sed deliberately staged, inspected, then superseded by
  surgical repair — staging-check-before-trust protocol added
- PartnerCredentialCard adapter: TileTone typing via Parameters<> inference; verified by tsc
- ListRow: Tile group-hover:scale-105 deliberately not reproduced (punch list); adapters add
  focus-visible ring the originals lacked (ledgered micro-additions)
- v3 padding interaction caught pre-emit for CertificationRow (adapter fix, not hub)

### Verified
- TSC CLEAN at every hub gate (v1–v4, FactRows v2/v3) and after every conversion stage
- 11/11 conversions on Row/FactRows by grep; zero local hand-roll references remain
- Corpus-wide regression: all 17 pre-existing FactRows consumers unaffected (mono/overrides
  default-off)

### NEXT — Sweep 1 stage 2: corpus adoption
Navigator cards (PaymentCard, PlanCard, UpcomingCard, CreateAccountCard, SettingsCard,
PartnerBillingCard, PartnerReferralCard — deferred since B8/B9), list interiors (ServiceRow,
MedRow, DocRow, EntryRow, StepRow, ChecklistRow, FieldTaskRow, AddCertificationRow, staff/
referral/alert/device rows inside B10–B11 keeps), sheet option rows (partner referral options)

## INCIDENT — THE VACUOUS GATE (severity: critical, process-wide)

- REVELATION: root tsconfig.json is solution-style ("files": [], references only). Plain
  `npx tsc --noEmit` compiles ZERO files and exits 0. Every "TSC CLEAN" this session (~30
  gates) — and, almost certainly, the pre-session agent's "clean at every gate" ledger claims —
  was vacuous. The gate could not fail, so it verified nothing
- DISCOVERY PATH: Command 83's clipboard inspection contradicted a "CLEAN" gate (missing import
  + phantom prop on disk). Disk-state inspection confirmed both errors on disk. Hypothesis
  (solution-style root tsconfig) confirmed by reading tsconfig.json. Real check: 
  `npx tsc --noEmit -p tsconfig.app.json` (include: ["src"])
- FULL INVENTORY (real gate): 129 errors / 85 files, categorized:
  A) THIS SESSION (10 errors): broken PaymentCard/PartnerBillingCard adapters (phantom
     amountClassName prop, missing ReceiptText import), CaptureChainCard import-insertion sed
     that silently never matched (line form mismatch), 4 unused imports — ALL FIXED AND
     VERIFIED (129 → 119, Category A zero)
  B) PRE-SESSION REWIRE ARTIFACTS (~20): 5 LifecyclePhase mismatches ('saved'/'verifying'/
     'saving' never valid phases — B4/B6 rewired files), ~15 unused imports left by B5/B8/B9
     rewires. Latent on disk since those batches; ledger's "clean at every gate" claims for
     them rest on the vacuous gate — RETRACTION of those claims pending real-gate verification
  C) ORIGINAL CODEBASE LATENT BUGS (~15, pre-refactor): P24 data-model mismatches (c.default
     always undefined — "Default" chip never rendered), P25 QuickRequest fields, A11 Incident
     fields, 4× Offer type imports from seed, downloadSessionFile never exported, Blob type,
     StaffHero Record index, TimeChip className prop, useRef arg, onNotify kind variance,
     IncidentPanel resolved prop, DeletionQueueList state type
  D) UNUSED-SYMBOL LINT (~70 TS6133): screens mostly; zero runtime impact
- PROCESS RULE CHANGED: the compile gate is now and permanently
  `npx tsc --noEmit -p tsconfig.app.json` + `-p tsconfig.node.json`, exit codes read directly,
  never piped through head unguarded (the "app exit: 0" earlier in this incident was a head-
  swallowed exit code — a second instrument error caught during the same investigation)
- LESSON: a gate that has never failed once in ~30 runs is not a gate. Exit-code verification
  and periodic negative-control checks (deliberately broken file → gate must fail) are now part
  of the standard protocol
- PENDING USER RULING: B/C/D disposition — recommendation on record: D (mechanical sweep) now,
  B (pre-session rewire artifacts, ours to fix) next, C (behavior-changing original bugs) as
  explicit workstream before B18

## Categories D + B — swept and closed under the real gate

### Category D (unused symbols, ~70 TS6133) — CLOSED
- Mechanical removal across ~45 files, content-matched edits only
- INCIDENT: the first sweep batch used blind line-number deletes; one ('22d' on PT02, aimed
  at TileTone) deleted the LIVE `import { partner, referrals } from '@/data/seed'` — caught
  by the real gate (10 cascading TS2304), root-caused via git diff, repaired by content-
  matched replacement. RULE ADOPTED: line-number deletes banned without a prior content read
  of the exact line; bulk sweeps must content-match
- TS2367 incident: generic done-state ternary compared 'done' against per-file unions —
  real gate caught all 5 within one exchange; fixed per-file with the true done-states
  ('saved' ×4, 'added' ×1)
- One lint error deliberately survives: A12 'cleanup' — it is the memory-leak fix (timers
  pushed, never cleared), ruled Category C, not D

### Category B (pre-session rewire artifacts, 5 LifecyclePhase mismatches) — CLOSED
- ExportHistoryButton, PayoutReceiptSheet, CertificationUploadSheet, EditProfileSheet,
  SaveSheetButton: `phase={status}` → explicit mapping (idle→idle, per-file done-state→
  'done', middle states→'working'). Renders changed from broken (invalid phase → component
  default, since those rewires) to intended — the B tradeoff, ruled by user
- Also fixed ~15 unused imports left by pre-session B5/B8/B9 rewires (part of D's sweep)
- Ledger RETRACTION upheld: pre-session "TSC clean at every gate" claims rested on the
  vacuous root-config gate; these artifacts prove at least some were false

### Standing state after this commit
- REAL gate (tsc -p tsconfig.app.json): 47 errors, ALL Category C (original-codebase latent
  bugs, pre-refactor, behavior-affecting — parked for explicit workstream ruling)
- Category C menu on record: P24 data-model (12), PR07 notify signature (4), P25 QuickRequest
  (3), A15 tone unions (3), PR04/PR03/A11 (2 each), plus 12 singles incl. A02, A10, PT01,
  A12 timer leak, Offer type ×4, downloadSessionFile, Blob, StatementButton, StaffHero,
  StaffDetailSheet, PartnerPatientHero, PartnerCarePathway, DeletionQueueList, RecordExpansion,
  SessionDetail/ListCard

## Sweep 1 (Row) — stage 2: navigator-card chevron verification (Stage 1)

- PENDING VERIFICATION RESOLVED: CreateAccountCard and PartnerBillingCard both rendered a
  duplicate trailing chevron (Row's default `showChevron` renders a ChevronRight when
  `!expandable`; neither adapter set `showChevron={false}`)
- CreateAccountCard: original used ArrowRight as trailing affordance — kept ArrowRight as
  trailing, added `showChevron={false}` (removes the duplicate ChevronRight)
- PartnerBillingCard: original had NO chevron (amount + Paid chip only) — added
  `showChevron={false}` (removes the spurious ChevronRight)
- Verified: real gate (tsc -p tsconfig.app.json) at standing 47 Category C errors; zero errors
  from either adapter file; both files absent from gate output

## Sweep 1 (Row) — stage 2: list interiors + card interiors + sheet option rows (CLOSED)

Row hub extended this stage (all backward-compatible, each gated clean before consumers):
- `align?: 'center' | 'start'` — items-start rows (ServiceRow, AccessLogCard, SafetyChecksCard)
- `padding?: 'none' | 'inset' | 'comfortable' | 'roomy' | 'even'` — decoupled padding from surface
- `disabled?: boolean` — locked rows render plain div cursor-not-allowed (ChecklistRow)
- `titleMeta?: ReactNode` — inline content after title (FieldTaskRow time, SessionListCard Confirmed chip, WhoCard Selected chip)
- `body?: ReactNode` — extra content after metaNote (AccessLogCard document, SessionListCard location, PrescriptionList stock, ReferredPatientList meter, OfferStatusList meter)

15 conversions this stage (all faithful, gate-clean, zero hand-rolled row signatures remain):
- Named list rows: AddCertificationRow, ServiceRow, EntryRow, ChecklistRow, MedRow (scheduled branch), StepRow (todo branch), FieldTaskRow
- Card interiors: UpcomingVisitsCard, WhoCard, PrivacyFactsCard, PlanLinksCard, DocumentsCard (RX_DOCUMENTS rows + upload button), PrescriptionList, SafetyCard, VitalsCard (ReadingRow), ScheduleCard (time-window row), PrescriptionSheet (questions row), CaptureChainCard (Family billing row), EscalateSheet (option rows), StaffList, AccessLogCard, ReferredPatientList, OfferStatusList, SessionListCard, SafetyChecksCard, StateDiffCard (ticket row), AccountActionsSheet (option rows)
- Sheet option rows: PartnerReferralSheet, PartnerAlertsSheet, PartnerStaffSheet

Deferred to later sweeps (NOT Row): heroes (VaultHero/RatingHero/LiveVisitHero), file tiles (CaptureFileTile/PhotoAttach/CertificationUploadSheet), option/selection rows (ScopesCard/ConsentBlock/ConsentCard/ScheduleCard scheduleTypes/AddPrescriptionSheet PRESCRIBERS → Options sweep), timelines (AuditTimeline/TransactionStepList/PartnerCarePathway/StateDiffCard trail/FailsafeCard steps/RecheckRulesList/CaptureChainCard steps → StepList sweep), form fields (AddPrescriptionSheet FieldRow → Field sweep).
Row-sweep residuals (need Row extension or special handling, logged for later): AccountSearch (onMouseDown), RetentionPeriodsList + GoalsCard GoalRow (far-right chevron after trailing), NotificationFeed (standalone expandable), ActionCard + ConsentCycleCard scope row (dark hero rows).

LEDGERED micro-deviations: whileTap 0.99/0.97 → 0.985 (Row default) on several; EscalateSheet surface bg/[0.035]→/[0.03]; VitalsCard ReadingRow lost aria-label; dropped row-level whileHover scale on SafetyChecksCard (no-hover-motion precedent); focus-ring additions (precedent).

Verification: real gate exit 2 = 33 Category C errors (baseline unchanged, down from 47 as Category A/B/D closed pre-session); zero errors from Row.tsx or any converted file; grep zero-proof — all 15 converted files have zero `flex w-full items-center gap-3` / `flex w-full items-start gap-3` signatures.

## Sweep 2 (StepList/Timeline) — CLOSED

Hub creation: src/components/phone/StepList.tsx (~318 lines) — universal vertical-rail timeline.
API: StepList {steps, nodeStyle='circle' |'tile'|'dot', nodeSize='sm'|'md'|'lg', theme='light'|'dark',
activeStyle='spinner'|'ping', railClassName, className}; StepItem {key, title, body, time,
timeTrailing, timeTrailingClassName, titleWrap, titleMeta, trailingTitle (far-right, ml-auto),
itemClassName, chip, trailing, icon, tone, state ('done'|'active'|'pending'), node (full
override), nodeClassName, railClassName (per-item, REPLACES top-level/auto), onClick,
expandable, open, onToggle, expansion, titleClassName, bodyClassName, contentClassName
(controls inter-item gap; default pb-4), className}.

13 conversions (all gate-clean, exit 2 = 33 Category C baseline, zero StepList/converted errors):
NoAvailabilityLadder, RecheckResolutionCard, RetryLadderCard, RefundCard, DispatchSequence,
ReversedOfferTraceCard, RollbackTraceCard, ExecutionTrail, WithdrawalCard, ApprovalCard,
MonthTimeline (nodeStyle=dot), StateDiffCard approval trail, CaptureChainCard capture steps.
Row-side: RecheckRulesList numbered-rail converted to Row with custom numbered leading
(01/02/03 + w-px rail + Tile sm in one leading; default chevron = exact match).

Deferred residuals (logged, single-caller extension debt, NOT bolted on):
- IncidentTimelineCard (system/escalations): continuous absolute rail + bordered white-card
  content wrapper + ring-4 gradient dots → needs StepList 'continuous rail + bordered content'
  modes
- PartnerCarePathway (partner/patient): above-title Step-TimeChip+Chip row + body-hide-when-open
  + pl-[52px] expansion + absolute rail → needs StepList above-title slot + pl-offset expansion
- Horizontal steppers (LiveStepper, WizardStepper, JourneyRail, CycleStep, DarkCycleStepper):
  distinct progress-line pattern, left as-is
- NotificationFeed (Row residual, logged earlier)

LEDGERED micro-deviations: StepList expansion wrapper hardcoded pb-4 (extra 16px below expanded
detail — WithdrawalCard, MonthTimeline); non-last item divs get flex-1 (equal stretch); some
original title rows items-baseline gap-2 → items-center gap-1.5 (ReversedOfferTraceCard);
ExecutionTrail rail now pure gradient (no base color under); focus rings where previously none.

Grep zero-proof: `rg -ln 'w-px flex-1|flex flex-col items-center' src/components --glob
'!phone/**'` → exit 1, ZERO matches. No StepList-convertible hand-rolled vertical-rail timelines
remain.
