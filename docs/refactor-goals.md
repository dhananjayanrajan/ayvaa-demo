## The Goal

- **Massively reduce the total number of components in the project.** The component tree is bloated with hundreds of redundant, screen-rolled files — duplicates, near-duplicates, and hand-rolled versions of things that should exist once.

- **Consolidate through modular structure — merge, abstract, normalize, and replace.** Not cosmetic reorganization: redundant components get combined into shared primitives, abstracted into canonical families, normalized onto consistent APIs, and where a clearer standard component exists, redundant ones are replaced by it entirely.

- **MASSIVE NORMALIZATION, not nesting dolls (user correction, binding).** The refactor is not
  satisfied by moving code into a universal and leaving a thin wrapper file that just re-renders
  it with props. It means a massive normalization of the components themselves: their folders,
  their file names, and every import that points at them. Pure-config wrappers are DELETED and
  inlined at call sites; same-family files are CONSOLIDATED into one canonical file; folders and
  names are made coherent; every import is re-pointed. The end state is a genuinely smaller,
  navigable tree — not the same tree with imports swapped. Component count must fall.

- **Improve maintainability exponentially.** The library should be navigable, predictable, and reusable — a change lands in one canonical file instead of twenty scattered copies.

- **Guarantee that every page reuses components instead of rebuilding them.** No screen, in any of the five applications, should contain its own private version of a button, hero, sheet, row, chip, card, or meter. Full component reuse is the end-state, enforced across every page and screen.

- **Hold everything to the full quality bar.** Every surface must pass every layer and level of expectation — the original screen-rebuild standards (type scale, state-driven hue, no-divider rule, no hover-translate, lifecycle buttons, gating that states reasons, etc.) now applied as the global baseline for the component library.

- **Massively improve wherever genuinely necessary — but only then.** This is explicitly *not* mild refactoring. Where a component is weak, it gets rebuilt properly. The codebase may not even shrink in size as a result; the point is quality and deduplication, not line-count reduction.

- **Total coverage, not sampling.** The chain loop goes through *every single component file* — read, judged, and either consolidated, migrated, or explicitly ruled as domain-genuine — until literally every file is done.

- **Hard freeze on pages until the end.** Not a single page screen is touched — no redesigns, no visual changes — until the entire component restructure is complete. Screens only ever get mechanical import re-pointing when a batch touches what they consume.

- **Then, and only then, return to rebuilding the page files** — at which point the screens get rebuilt on top of the normalized library, which is the reason the library exists.

## Where we actually stand against that goal

- **Built:** a real canonical library in `phone/` (28 primitives) plus promoted StatusPill —
  this is the foundation the goal requires. Canonical tier: kit, SheetShell, LifecycleButton,
  OptionRow, DarkPanel, HeroCells, PhaseHero, FactTile, MiniTimeline, NoteStrip, ExpandRow,
  QuotePanel, StatusPill, Pager, PhoneFrame, Screen, AppBar, NavBar, PushPreview,
  ScreenshotButton, Splash, FactRows, AccentHero, Overline, ConfirmStrip, Row, StepList,
  StatusStrip, EmptyState.
- **Collapsed:** ~70+ genuine duplicate implementations across sheets, heroes, buttons, rows,
  notices, and cards — plus the universal sweeps (Stages 0-8 closed): Row stage 2 (15
  conversions), StepList (13 timelines), StatStrip (7 divide-x strips), PhaseShell (10 shells
  onto PhaseHero + ProfilePreviewSheet sheet gap closed), StatusStrip (3 strips), Quote (7
  quote blocks).
- **Ruled:** a growing set of domain-genuine components honestly documented as keepers — which
  also serves the goal, since "no force-fitting" is part of it. Under the doctrine reversal,
  keep-rulings are relabeled PENDING DECOMPOSITION; every component is being decomposed into
  universal primitives + thin compositions.
- **Not yet:** full coverage (the universal-by-universal sweep program is at Stage 10 of 17 —
  Tabs/Filters; Options/Actions, Field, Identity, clinical residuals remain), the Category C
  workstream (Stage 15, 47 parked bugs), and B18's final audit — the step that certifies the
  "guarantee" bullet before any screen work
  resumes.
- **Gate:** real gate (tsc -p tsconfig.app.json) standing at 33 errors, pure Category C
  (baseline unchanged since Stage 3).
