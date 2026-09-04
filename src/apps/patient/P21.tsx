import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, Screen } from '@/components/base/phone/screen'
import { Section, rise, stagger } from '@/components/base/phone/kit'
import { useRouter } from '@/lib/router'
import { useDemo } from '@/lib/store'
import {
  AUDIT_ENTRIES,
  ENTRY_POOL,
  RECORD_DOCS,
  VAULT_FACTS,
  changeCount,
  deniedCount,
  viewCount,
  type AuditEntry,
  type AuditFilter,
} from '@/data/patientRecords'
import { VaultHero } from '@/components/patterns/heroes/vault-hero'
import { RecordsCard } from '@/components/patterns/cards/records-card'
import { AuditTimeline } from '@/components/patterns/lists/audit-timeline'
import { AuditLogSheet } from '@/components/patterns/sheets/audit-log-sheet'
import { RecordsExportSheet } from '@/components/patterns/sheets/records-export-sheet'

type SheetId = 'none' | 'log' | 'export'

const ENTRY_INTERVAL_MS = 9000
const RECORDING_MS = 4000

export function P21() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [entries, setEntries] = useState<AuditEntry[]>(AUDIT_ENTRIES)
  const [freshId, setFreshId] = useState<string | null>(null)
  const [sheet, setSheet] = useState<SheetId>('none')
  const [sheetFilter, setSheetFilter] = useState<AuditFilter>('all')
  const poolIndex = useRef(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  useEffect(() => {
    const id = setInterval(() => {
      const seq = poolIndex.current
      poolIndex.current += 1
      const next = ENTRY_POOL[seq % ENTRY_POOL.length]
      const entry: AuditEntry = { ...next, id: `${next.id}-${seq}`, fresh: true }
      setEntries((prev) => [entry, ...prev.map((e) => ({ ...e, fresh: false }))])
      setFreshId(entry.id)
      timers.current.push(setTimeout(() => setFreshId(null), RECORDING_MS))
      notify({
        title: 'New ledger entry',
        body: `${entry.title} sealed to the audit record`,
        kind: 'info',
      })
    }, ENTRY_INTERVAL_MS)
    return () => clearInterval(id)
  }, [notify])

  const openLog = (filter: AuditFilter) => {
    setSheetFilter(filter)
    setSheet('log')
  }

  return (
    <Screen>
      <AppBar
        title="Care records"
        subtitle={`${VAULT_FACTS.patientFirst}, ${VAULT_FACTS.planCategory.toLowerCase()} plan`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setSheet('export')}
            aria-label="Export records"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.09]"
          >
            <Download className="size-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl"
          />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <VaultHero
                latest={entries[0]}
                recording={freshId !== null}
                viewCount={viewCount(entries)}
                changeCount={changeCount(entries)}
                deniedCount={deniedCount(entries)}
                retention={VAULT_FACTS.retention}
                onOpenLog={openLog}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Documents and consent" />
            </motion.div>

            <motion.div variants={rise}>
              <RecordsCard docs={RECORD_DOCS} onRequireConsent={() => navigate('/patient/p22')} />
            </motion.div>

            <motion.div variants={rise}>
              <Section
                label="Audit ledger"
                trailing={
                  <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/40">
                    {entries.length} entries
                  </span>
                }
              />
            </motion.div>

            <motion.div variants={rise}>
              <AuditTimeline entries={entries} freshId={freshId} onOpenAll={() => openLog('all')} />
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Every access to these records is logged forever" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSheet('none')}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'log' && (
          <AuditLogSheet
            key={`log-${sheetFilter}`}
            entries={entries}
            initialFilter={sheetFilter}
            onClose={() => setSheet('none')}
            onOpenConsent={() => {
              setSheet('none')
              navigate('/patient/p22')
            }}
          />
        )}
        {sheet === 'export' && <RecordsExportSheet key="export-sheet" onClose={() => setSheet('none')} />}
      </AnimatePresence>
    </Screen>
  )
}
