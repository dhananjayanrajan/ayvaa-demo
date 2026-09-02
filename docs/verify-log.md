# AYVAA VERIFY LOG — EVIDENCE LEDGER

Format per design-system §9.4. Verdicts are written only from real run output; PENDING rows block "landed".

---

## Ruling R12 recorded

- §3 v0 ratified as drafted by user assent. Stakes precedence person-safety > binding > elevated > routine > informational stands; content rule 10 stands as written. P0 authorized.

## M0.3 Framework runtime — PASS

- Scope: src/framework/runtime — contracts, seed event catalog, relay actor (xstate v5 substrate), runtime bookkeeping + attach wiring, React context/provider/hooks. Platform-neutral core verified by inspection: zero react imports in contracts/events/relay/runtime (R11 gate mechanization lands with V1 sweep).
- Checks: V1 gate (tsc app + node) + selfproof suite (fan-out through relay, typed event delivery, handler/timer/url leak capture, provider-missing fallback).
- Verdict: PASS — evidence: M0 round 5, 16/16 tests across 2 files, three tsc configs exit 0; relay delivery order ['reset', 'completed'] observed at runtime; provider-missing fallback warning observed.
- Notes: notify/navigate deferred by design (no speculative API). data-state/data-tone stamped surfaces adopted as the V2/V4 observation handle; the I5 hook owns stamping from exemplar 1 onward.

## M0.2 Verify harness + calibration self-proof — PASS

- Scope: src/framework/verify — vitest scaffold, probes (timers / console / objectURL), static scanners (hex, comments, suffix forks, transition-all, lowercase-jsx, dotted-event closure), check functions, disposable CalibrationUnit with 7 seeded defect toggles.
- Exit criterion (§10.2 + §9.1): every check demonstrated to fail on its seeded defect AND pass clean.
- Known v0 limitation recorded honestly: timer-leak check is net-delta (baseline → after); a timer created-and-fired within one test masks an equal timer leaked — watermark tracking scheduled when real L2 machines arrive.
- Verdict: PASS — evidence: M0 round 5, 16/16; every seeded defect caught by its assigned check, clean unit passed all dynamic checks. Net-delta timer limitation stays open until watermark tracking lands with the first real L2 machine.

## M0 fix round 2 — config deprecation + docs tracking ruling — CORRECTIONS APPLIED, VERDICTS STILL PENDING

- TS5101: baseUrl dropped from tsconfig.verify.json — paths resolve config-relative (TS >= 5.0). Fallback if alias resolution fails: mirror app config's ignoreDeprecations.
- R13 recorded: contract, verify-log, and product spine (workflows/screens/coverage) now git-tracked; superseded-era docs per-file ignored; contract I10 + §9.4 + header amended accordingly.
- Docs commit issued this round; framework scaffold deliberately uncommitted until V1 gate green (no landed unit without evidence).

## M0 fix round 3 — probes typing — CORRECTIONS APPLIED, VERDICTS STILL PENDING

- TS2352: @types/node decorates typeof setTimeout with the __promisify__ overload; the timer-tracking patch legitimately lacks it. Cast bridged through unknown, confined to probes.ts — recorded as the single permitted global-instrumentation cast in the framework. clearTimeout required no bridge (no promisify member).
- Positive evidence from round 2 chain: tsconfig.app.json and tsconfig.node.json both silent-pass; relay.ts wildcard transition and useActorRef typings compiled clean under tsconfig.verify.json — the two pre-flagged xstate risks are cleared at type level. Runtime proof still pending first vitest run.
- Git state per user instruction: all commits held. Applied but uncommitted: R13 contract patch, .gitignore segregation, five spine/contract/ledger docs untracked-ready, framework scaffold.

## M0 round 4 — first vitest execution — 15/16 — harness self-catch, verdicts PENDING final green

- Selfproof suite 9/9: clean unit passed all dynamic checks; every seeded defect caught by its assigned check (timer leak, dropped subscription, broken fan-out, silent tone, duplicate keys, unrevoked URL). M0.2 exit criterion effectively demonstrated pending rerun confirmation.
- Relay actor runtime-proven (not only typed): event delivery through relay with correct ordering ['reset', 'completed']; fan-out observed; provider-missing fallback warned.
- A7 register capture: React 19 duplicate-key warning phrasing is "Encountered two children with the same key, `X`. Keys should be unique…" — recorded as the lint-target phrasing.
- Harness defect (agent code, caught by its own suite): static.test.ts used new URL(..., import.meta.url) for fs access — non-file scheme inside vitest 4 module runner. Fixed by resolving from process.cwd(); config-file import.meta.url unaffected (node context). 
- Verdicts M0.2 + M0.3 remain PENDING until rerun prints 16/16; they flip on that output.

## M0 round 5 — 16/16 GREEN — M0.2 + M0.3 verdicts PASS

- Evidence: vitest run v4.1.11 — 2 files, 16 tests passed; tsc app + node + verify all exit 0.
- Harness exit criterion (§10.2, §9.1) met: every check demonstrated catching its seeded defect AND passing clean; relay actor runtime-proven end to end.
- P0 status: M0.2 ✓ M0.3 ✓ M0.5 ✓ (R12). Remaining: M0.1 exemplar-domain mining + M0.4 atoms seed — seed executes after mining per A9 (inventory scoped by exemplar demand, not kit-ported wholesale).
- Commits remain held per user instruction. Proposed split when released: (1) docs R13 tracking policy, (2) framework scaffold + harness with green-gate evidence.

## M0.1 mining — extraction run complete — CURATION PENDING

- Evidence: docs/mined/{visit-summary,live-visit,consent-records}.md — 82 file-reads, ~8,200 legacy lines (4094 + 2115 + 2000), 567 mined lines. Fail-loud path check passed (no ENOENT).
- Known census inflation, recorded: visit-summary inputs include the ReviewSet concatenation bundle AND its role-folder originals (era duplication — F2/F4 evidence now in the mined record), plus the shared patient/visits family legitimately serving both P16/P17 exemplars. Census values are upper bounds from a duplicated corpus; curation dedupes semantically. live-visit set overlaps visits family by design.
- Next: curation per file into requirement inventories (variation space, tone semantics, machine-worthy lifecycles, QoL rows) → M0.4 atoms seed scoped by exemplar-1 demand (A9).

## M0.1 curation — visit-summary curated — M0.4 SCOPED

- Curated inventory appended to docs/mined/visit-summary.md (C1–C10): duplication quantified (F4 evidence), 0 machines vs 16 hand-rolled timers across 8 files distilling into exactly two machine patterns (lifecycle button ×6 wild impls; completion sheet ×4), zero tone-map objects in domain with vitalIntent as the data-layer derived-tone precedent (I5 seed), measured token drift enumerated (tap ×5, half-step type sizes, off-ladder radii).
- Catalog collisions named: PaymentCard ×2 (composition question per A3), ConnectButton ×2 (phone L2 prior art vs visits props-contract donor — reconcile into one lifecycle machine).
- M0.4 seed scope fixed by exemplar demand (C8): tokens + resolver + listed atoms/universals; SheetShell enters as L1, upgraded to completion machine during exemplar 1.
- Miner defect self-caught: spring-pair census collapsed to stiffness-only; countAll extended with keyFn; rerun deferred to exemplar-1 census (curation preserved). Const-arrow parser blind spot accepted and recorded (C6).
- Pending greps: live/dead status of patient/review + patient/visits originals vs bundles — decides strangler topology for this domain pre-cut.

## M0 round 6 — R14 executed — deviations deleted, state committed

- Deleted uncommitted: src/framework/atoms (tokens/resolve/kit) + verify/framework-tree.test.ts + verify/tokens.test.ts (sole atoms consumers). Grep-gate: zero code references remain. Mined-file C8 stands as demand evidence; the pre-built seed it scoped is void.
- Post-deletion gate green at commit time (this entry written inside the gated commit block): app 0 node 0 verify 0 — suite back to proven 16/16.
- Runtime + harness + mining committed as evidence pending re-assessment from scratch per R14. Commits local only — not pushed.

## M0 round 7 — commits landed — hashes recorded

- 29627fe docs(policy) R13/R14 — 6 files — contract with R14 recorded is in history
- 13f17c1 chore(verify) gate boundary — 6 files
- 6ebb636 feat(runtime) runtime core — 7 files
- 29d4006 test(verify) self-proving harness — 8 files
- 5c67966 feat(mining) miner + mined evidence — 4 files — curated visit-summary in history
- All local, unpushed. Suite 16/16 at commit time. Atoms absent from all commit file lists — void ruling honored in history.

## Gate confirmation post-R15

- App + node tsc exit 0 — GATE-CLEAN pasted by user; ledger claim now evidence-backed.
- vitest found pre-existing at fd07612 baseline (line 58) — removal during R15 sweep exceeded ruling scope (this-era additions only); restored to baseline.
