# Slice-1 Work Packet — Completion Sheet Domain (Exemplar 1)

> The first build-phase slice. Anchored on exemplar 1 (R8): the **Completion Sheet**.
> Builds ONLY the catalog entries the completion-sheet domain consumes, in layer
> order, then rebuilds the two summary screens as pure assemblies.
>
> **No foundation batch. No hex translation table — ever. No foreign-domain entries.**
> The completion-sheet domain is the sealing mechanism for the open values it touches.

## Domain Scope

The completion-sheet domain = the sealed-visit certificate and its rating flow:

- **VisitSummary family** (07e §4.8) — the certificate
- **RateVisitSheet** (07e §4.9) — the private rating flow
- **Shared confirm-arc machinery** — LifecycleButton arc + SheetShell mounting

Screens rebuilt as pure assemblies: **P17 (Visit Summary)** and **P18 (Rate Visit)**.

## Layer Order

Build strictly bottom-up. Each layer consumes only lower layers (I1).

### Step 1.1 — Miner rerun (before the first odometer entry)

Rerun the legacy miner over the completion-sheet domain before any catalog entry ships.
Evidence source: `docs/mined/visit-summary.md` (already mined) + live-visit/consent-records
for the shared confirm-arc. The miner is the requirements quarry (R6) — byte-fidelity is dead.

**Exit:** mined evidence current for the domain; no catalog entry ships before this.

### Step 1.2 — Catalog primitives the domain consumes (07a–07d)

Build/verify the primitives the VisitSummary family and RateVisitSheet assemble from.
These are the substrate the compositions consume — NOT a foundation batch, only what
this domain touches:

| Primitive | Catalog | Notes |
|-----------|---------|-------|
| SheetShell★ | 07a §8 | sheet mounting, Esc, spring variants, Completion choreography |
| PageHero★ / AccentHero | 07a §9 | positive phase for the sealed certificate |
| HeroCells (HeroTopRow, HeroHighlight, StatCell) | 07a §10 | hero composition cells |
| FactRows | 07d | label-value facts |
| StatusPill | 07d | sealed/positive status |
| Row★ | 07b | list rows |
| ExpandRow | 07b | CareDeliveredCard disclosure |
| QuotePanel | 07d | caregiver note |
| StarPicker | 07c §10 | rating control (controlled) |
| LifecycleButton★ | 07c | confirm-arc control |
| Chip, TimeChip, Card, Tile, Section, Panel | 07a/07d | structural atoms |

**Exit:** each primitive present, token-only, anatomy per its catalog entry.

### Step 1.3 — VisitSummary family compositions (07e §4.8)

Build the certificate compositions:

| Composition | Recipe (07e §4.8) |
|-------------|-------------------|
| SummaryHero | positive phase hero |
| SessionLedgerCard | session ledger |
| CareDeliveredCard | ExpandRow + CARE_STEPS |
| CaregiverNoteCard | QuotePanel |
| VitalsCard | per-reading rows, tone from `vitalIntent` classification |
| PaymentBreakdownCard | fact breakdown |
| ShareSummaryButton | real export (06 §6.2) |

**Flow:** sealed presentation; pending edits re-open the seal arc ("Seal visit summary");
everything derives from the sealed record (D4 — reopening shows sealed).

### Step 1.4 — RateVisitSheet + RatingHero + HighlightTags (07e §4.9)

| Composition | Recipe (07e §4.9) |
|-------------|-------------------|
| RateVisitSheet | SheetShell + StarPicker + HighlightTags + Field note + LifecycleButton submit |
| RatingHero | mirrors submitted state |
| HighlightTags | multi-select, family hue — never emerald |

**Flow:** submitted persists (Q10 — reopen shows done); draft persists per entry;
private — no sharing nags; ratings are informational stakes; submitted = positive.

### Step 1.5 — Shared confirm-arc machinery

The confirm-arc is the LifecycleButton lifecycle (idle → working → done → failed) with
the completion chain (05 §4.3). Resolution arrives via the flow's data (06 §7), never a
control-internal clock (R30). SheetShell mounting per 07a §8.

**Exit:** the arc is data-driven; no timer in the control.

### Step 1.6 — Rebuild P17 (Visit Summary) as pure assembly

Assemble P17 from the VisitSummary family + primitives + typed data. Per 08-composition:
one hero, banded sections, urgency-first order, zero behavioral ownership, zero className,
zero hex, zero useState/useEffect/timers in the screen.

### Step 1.7 — Rebuild P18 (Rate Visit) as pure assembly

Assemble P18 from RateVisitSheet + RatingHero + primitives + typed data. Same assembly law.

### Step 1.8 — Walkthrough package

Captures of both rebuilt screens + the user walkthrough (I12 — nothing is done until the
user has seen it). The walkthrough is final authority over the sealed values this domain
touches.

## Verification (per slice)

1. `tsc` (app + node) after every landing — paste raw tail of output.
2. `grep` — zero className, zero hex, zero useState/useEffect/timers in the two rebuilt screens.
3. Captures — render both screens, verify visual compliance.
4. User walkthrough — final.

## Commit Discipline

- One thing in flight (I10). Small, verified landings. Conventional commits.
- Gate after every landing. No bulk sweeps. No cosmetic rebases.
- Grep-gated deletions only.

## Open Values This Slice Seals

| Open value | Owning doc | Sealed by |
|------------|-----------|-----------|
| StarPicker admission | 07c §10 | R32 (already ratified) |
| Share = real artifact | 06 §6.2 | this slice's walkthrough |
| Sealed = payment gate | 02 §5.1 | this slice's walkthrough |
| Confirm-arc copy | 03 bank | this slice's walkthrough |
