# MINED — consent-records

auto-extracted from legacy corpus — requirements evidence only (R6). object-literal tone maps dumped raw; props surfaces as member lists; everything else summarized.

### src/apps/patient/P21.tsx (164 lines)
imports: AppBar ← @/components/phone/AppBar | BodyArea, EndOfScroll, Screen ← @/components/phone/Screen | Section, rise, stagger ← @/components/phone/kit | useRouter ← @/lib/router | useDemo ← @/lib/store | AUDIT_ENTRIES, ENTRY_POOL, RECORD_DOCS, VAULT_FACTS, changeCount, deniedCount, viewCount, type AuditEntry, type AuditFilter, ← @/data/patientRecords | VaultHero ← @/components/records/RecordsSet | RecordsCard ← @/components/records/RecordsSet | AuditTimeline ← @/components/records/RecordsSet | AuditLogSheet ← @/components/records/RecordsSet | RecordsExportSheet ← @/components/records/RecordsSet
exports: P21
state: AUDIT_ENTRIES | null | 'none' | 'all'   effects:2 timers:1 machines:0

### src/components/records/RecordsSet.tsx (761 lines)
imports: SheetShell ← @/components/phone/SheetShell | Card, Chip, Tile, TimeChip ← @/components/phone/kit | AUDIT_ENTRIES, AUDIT_FILTERS, type AuditEntry, type AuditFilter, type AuditKind, FILTER_LABELS, RECORD_DOCS, type RecordDoc, VAULT_FACTS, buildExportLines, changeCount, deniedCount, filterCountOf, filterEntries, lockedCount, viewCount ← @/data/patientRecords | SegmentedTabs ← @/components/phone/SegmentedTabs | cn ← @/lib/utils | Row ← @/components/phone/Row | ExpandRow ← @/components/phone/ExpandRow | useDemo ← @/lib/store | AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroHighlight, HeroTopRow ← @/components/phone/HeroCells
exports: AuditLogSheet, AuditTimeline, DarkTimeChip, DocRow, LedgerBar, RecordsCard, RecordsExportSheet, VaultHero
state: initialFilter | null | null | 'idle'   effects:1 timers:3 machines:0
props `AuditLogSheetProps`: entries: AuditEntry[] · initialFilter: AuditFilter · onClose: () => void · onOpenConsent: () => void
props `AuditTimelineProps`: entries: AuditEntry[] · freshId: string | null · onOpenAll: () => void
props `DocRowProps`: doc: RecordDoc · open: boolean · onToggle: () => void · onRequireConsent?: () => void
props `LedgerBarProps`: entries: AuditEntry[] · freshId: string | null · onSelect: (id: string) => void
props `RecordsCardProps`: docs: RecordDoc[] · onRequireConsent: () => void
props `RecordsExportSheetProps`: onClose: () => void
props `VaultHeroProps`: latest: AuditEntry · recording: boolean · viewCount: number · changeCount: number · deniedCount: number · retention: string · onOpenLog: (filter: AuditFilter) => void
tone block `HERO_TONE`:
```tsx
{
  sealed: {
    pillTone: 'emerald' as const,
    pillLabel: 'Sealed',
    pillLive: false,
    panel: 'bg-emerald-400/[0.12]',
    panelLabel: 'text-emerald-200/60',
    hint: 'Every open, change and refusal leaves a permanent mark',
  },
  recording: {
    pillTone: 'sky' as const,
    pillLabel: 'Recording',
    pillLive: true,
    panel: 'bg-sky-400/[0.12]',
    panelLabel: 'text-sky-200/70',
    hint: 'A new entry is being written to the ledger right now',
  },
}
```

### src/components/patient/records/AuditLogSheet.tsx (149 lines)
imports: SheetShell ← @/components/phone/SheetShell | TimeChip ← @/components/phone/kit | AUDIT_FILTERS, FILTER_LABELS, VAULT_FACTS, changeCount, deniedCount, filterCountOf, filterEntries, viewCount, type AuditEntry, type AuditFilter, type AuditKind, ← @/data/patientRecords | SegmentedTabs ← @/components/phone/SegmentedTabs | cn ← @/lib/utils
exports: AuditLogSheet
state: initialFilter   effects:0 timers:0 machines:0
props `AuditLogSheetProps`: entries: AuditEntry[] · initialFilter: AuditFilter · onClose: () => void · onOpenConsent: () => void

### src/components/patient/records/AuditTimeline.tsx (139 lines)
imports: Card, Chip, Tile, TimeChip ← @/components/phone/kit | Row ← @/components/phone/Row | AuditEntry, AuditKind ← @/data/patientRecords | cn ← @/lib/utils
exports: AuditTimeline
state: null   effects:0 timers:0 machines:0
props `AuditTimelineProps`: entries: AuditEntry[] · freshId: string | null · onOpenAll: () => void

### src/components/patient/records/DarkTimeChip.tsx (10 lines)
exports: DarkTimeChip
state: (none)   effects:0 timers:0 machines:0

### src/components/patient/records/DocRow.tsx (89 lines)
imports: Card, Chip, TimeChip ← @/components/phone/kit | ExpandRow ← @/components/phone/ExpandRow | RecordDoc ← @/data/patientRecords
exports: DocRow
state: (none)   effects:0 timers:0 machines:0
props `DocRowProps`: doc: RecordDoc · open: boolean · onToggle: () => void · onRequireConsent?: () => void

### src/components/patient/records/LedgerBar.tsx (67 lines)
imports: AuditEntry, AuditKind ← @/data/patientRecords | cn ← @/lib/utils
exports: LedgerBar
state: (none)   effects:0 timers:0 machines:0
props `LedgerBarProps`: entries: AuditEntry[] · freshId: string | null · onSelect: (id: string) => void

### src/components/patient/records/RecordsCard.tsx (55 lines)
imports: Card, Chip, Tile ← @/components/phone/kit | lockedCount, type RecordDoc ← @/data/patientRecords
exports: RecordsCard
state: null   effects:0 timers:0 machines:0
props `RecordsCardProps`: docs: RecordDoc[] · onRequireConsent: () => void

### src/components/patient/records/RecordsExportSheet.tsx (148 lines)
imports: SheetShell ← @/components/phone/SheetShell | AUDIT_ENTRIES, RECORD_DOCS, VAULT_FACTS, buildExportLines ← @/data/patientRecords | useDemo ← @/lib/store | cn ← @/lib/utils
exports: RecordsExportSheet
state: 'idle'   effects:1 timers:3 machines:0
props `RecordsExportSheetProps`: onClose: () => void

### src/components/patient/records/VaultHero.tsx (165 lines)
imports: AccentHero ← @/components/phone/AccentHero | StatusPill ← @/components/phone/StatusPill | HeroTopRow, HeroHighlight ← @/components/phone/HeroCells | AuditEntry, AuditFilter, AuditKind ← @/data/patientRecords | cn ← @/lib/utils
exports: VaultHero
state: (none)   effects:0 timers:0 machines:0
props `VaultHeroProps`: latest: AuditEntry · recording: boolean · viewCount: number · changeCount: number · deniedCount: number · retention: string · onOpenLog: (filter: AuditFilter) => void
tone block `HERO_TONE`:
```tsx
{
  sealed: {
    pillTone: 'emerald' as const,
    pillLabel: 'Sealed',
    pillLive: false,
    panel: 'bg-emerald-400/[0.12]',
    panelLabel: 'text-emerald-200/60',
    hint: 'Every open, change and refusal leaves a permanent mark',
  },
  recording: {
    pillTone: 'sky' as const,
    pillLabel: 'Recording',
    pillLive: true,
    panel: 'bg-sky-400/[0.12]',
    panelLabel: 'text-sky-200/70',
    hint: 'A new entry is being written to the ledger right now',
  },
}
```

### src/data/patientRecords.ts (226 lines)
exports: VAULT_FACTS, RecordDoc, RECORD_DOCS, AuditKind, AuditEntry, AUDIT_ENTRIES, ENTRY_POOL, viewCount, changeCount, deniedCount, lockedCount, AUDIT_FILTERS, AuditFilter, FILTER_LABELS, filterEntries, filterCountOf, buildExportLines
parsers: buildExportLines(docs: RecordDoc[], entries: AuditEntry[]): string
state: (none)   effects:0 timers:0 machines:0

### src/data/patientAudit.ts (27 lines)
exports: AuditKind, PatientAuditEntry, patientAuditEntries, patientDocuments
state: (none)   effects:0 timers:0 machines:0

## domain census (12 files, 2000 lines)
spring pairs: (none)
stiffness singles: (none)
damping singles: (none)
durations: 0.35×4  0.25×2  0.3×2  0.4×2  0.2×1
eases: easeOut×8
curves: (none)
repeats: (none)
delays: 0.05×2
whileTap: scale: 0.96×2  scale: 0.98×2  scale: 0.985×2  scale: 0.9×1
whileHover: (none)
rounded: rounded-2xl×28  rounded-full×10  rounded-xl×8  rounded-lg×2
text-px: text-[12.5px]×19  text-[9px]×19  text-[10px]×15  text-[12px]×14  text-[13px]×8  text-[10.5px]×6  text-[11.5px]×6  text-[15px]×4  text-[11px]×2  text-[14px]×2  text-[19px]×2  text-[20px]×2
tracking: tracking-[0.14em]×9  tracking-[0.16em]×6  tracking-[0.12em]×4  tracking-[0.18em]×4
spacing: gap-3×26  gap-2×18  mt-1×14  mt-2×14  px-4×14  mt-3.5×10  mt-0.5×9  gap-1.5×8  mt-5×8  py-4×8  gap-2.5×6  gap-3.5×6  mt-1.5×6  mt-3×6  p-4×6  p-5×6  py-3.5×6  gap-5×4
spacing-arbitrary: (none)
opacity /NN: 80×15  40×13  60×13  55×12  65×12  45×9  50×8  70×8  30×4  75×2
opacity /[0.0N]: 12×12  03×10  06×6  05×5  09×5  18×4  2×4  16×3  04×2  08×2  11×2  14×2
weights: bold×48  extrabold×23  semibold×18  medium×16
tabular-nums total: 17
