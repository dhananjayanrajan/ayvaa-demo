import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Fingerprint, ScanSearch } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { AuditHero } from '@/components/audit/AuditSet'
import type { ChainPhase } from '@/components/audit/AuditSet'
import { AccessLogCard } from '@/components/audit/AuditSet'
import { AccessDetailSheet } from '@/components/audit/AuditSet'
import { StateDiffCard } from '@/components/transactions/TransactionsSet'
import { SealChainCard } from '@/components/audit/AuditSet'
import { auditEntries } from '@/data/seed'
import type { AccessEntry } from '@/data/system/auditLog'

const VERIFY_MS = 620

export function S06() {
  const { notify, pushTrail } = useDemo()
  const { navigate } = useRouter()
  const [chainPhase, setChainPhase] = useState<ChainPhase>('sealed')
  const [verifiedCount, setVerifiedCount] = useState(0)
  const [filter, setFilter] = useState<'all' | 'view' | 'change' | 'consent'>('all')
  const [flagged, setFlagged] = useState<string[]>([])
  const [sheetEntry, setSheetEntry] = useState<AccessEntry | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const verifyChain = () => {
    clearTimers()
    setVerifiedCount(0)
    setChainPhase('verifying')
    notify({
      title: 'Verifying the chain',
      body: 'Re-hashing every entry against its recorded seal',
      kind: 'info',
    })

    for (let i = 1; i <= auditEntries.length; i++) {
      schedule(() => setVerifiedCount(i), i * VERIFY_MS)
    }
    schedule(() => {
      setChainPhase('verified')
      notify({
        title: 'Chain verified',
        body: 'Every seal intact · zero tampering detected',
        kind: 'ok',
      })
    }, auditEntries.length * VERIFY_MS + 250)
  }

  const onAccessTap = (entry: AccessEntry) => {
    setSheetEntry(entry)
  }

  const onFlag = (id: string) => {
    const entry = sheetEntry
    setFlagged((prev) => (prev.includes(id) ? prev : [...prev, id]))
    pushTrail({
      time: 'Now',
      title: 'Access flagged for review',
      body: entry ? `${entry.action} · ${entry.who} · sent to supervisors` : 'Access entry sent to supervisors',
      state: 'done',
    })
    notify({
      title: 'Flagged for review',
      body: 'Supervisors paged · the entry stays sealed and visible either way',
      kind: 'warn',
    })
  }

  const onLogTap = (title: string, body: string) => {
    notify({ title, body, kind: 'info' })
  }

  const chainChip = () => {
    if (chainPhase === 'verified')
      return <Chip intent="success" className="border-transparent">All seals match</Chip>
    if (chainPhase === 'verifying')
      return <Chip intent="warning" dot className="border-transparent">Verifying</Chip>
    return <Chip intent="info">5 sealed entries</Chip>
  }

  const diffChip = () => {
    if (chainPhase === 'verified')
      return <Chip intent="success" className="border-transparent">Change verified</Chip>
    if (chainPhase === 'verifying')
      return <Chip intent="warning" dot className="border-transparent">Re-hashing</Chip>
    return <Chip intent="warning" className="border-transparent">1 change today</Chip>
  }

  return (
    <Screen>
      <AppBar
        title="Nothing hides, even reads"
        subtitle="Access log · diff viewer · seal chain"
        onBack={() => navigate('/system/s04')}
        trailing={<AgentAvatar seed="ayvaa-system" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <AuditHero
                phase={chainPhase}
                verifiedCount={verifiedCount}
                totalCount={auditEntries.length}
                onVerify={verifyChain}
              />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Access log" trailing={<Chip intent="info" className="border-transparent">Reason recorded</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <AccessLogCard filter={filter} flagged={flagged} onFilter={setFilter} onEntryTap={onAccessTap} />
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Diff viewer" trailing={diffChip()} />
            </motion.div>

            <StateDiffCard verifyPhase={chainPhase} />

            <motion.div variants={rise}>
              <Section label="Seal chain" trailing={chainChip()} />
            </motion.div>

            <motion.div variants={rise}>
              <SealChainCard
                phase={chainPhase}
                verifiedCount={verifiedCount}
                onEntryTap={onLogTap}
              />
            </motion.div>

            {chainPhase === 'sealed' && (
              <motion.div variants={rise}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={verifyChain}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <ScanSearch className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  Verify the whole chain
                </motion.button>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={Fingerprint} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Trust is not a promise, it is a ledger. Who saw what, what changed, and the mathematical proof that nothing was quietly rewritten.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of audit console" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AccessDetailSheet
        entry={sheetEntry}
        flagged={sheetEntry ? flagged.includes(sheetEntry.id) : false}
        onClose={() => setSheetEntry(null)}
        onFlag={onFlag}
        notify={notify}
      />
    </Screen>
  )
}
