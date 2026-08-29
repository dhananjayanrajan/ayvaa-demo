import { AnimatePresence, motion } from 'motion/react'
import {
  Check,
  Link2,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { auditEntries } from '@/data/seed'
import { chainNode } from '@/data/system/auditLog'
import type { ChainPhase } from '@/components/system/audit/AuditHero'
import { cn } from '@/lib/utils'

const HASH_FRAGMENTS = ['a94f…c31d', '7b2e…9a08', 'e1c5…44f7', '39d8…b6a2', 'c07a…18e9']

const NODE_TONE: Record<string, string> = {
  ok: 'bg-emerald-500',
  view: 'bg-sky-500',
  approve: 'bg-emerald-500',
  error: 'bg-rose-500',
  gavel: 'bg-rose-500',
}

interface SealChainCardProps {
  phase: ChainPhase
  verifiedCount: number
  onEntryTap: (title: string, body: string) => void
}

export function SealChainCard({ phase, verifiedCount, onEntryTap }: SealChainCardProps) {
  const stateFor = (i: number) => {
    if (phase === 'verified') return 'done'
    if (phase === 'verifying') return i < verifiedCount ? 'done' : i === verifiedCount ? 'checking' : 'waiting'
    return 'waiting'
  }

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile icon={Link2} tone={phase === 'sealed' ? 'neutral' : phase === 'verifying' ? 'warning' : 'success'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">Seal chain</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {phase === 'sealed' && (
                    <Chip intent="info" className="border-transparent">
                      Ready to verify
                    </Chip>
                  )}
                  {phase === 'verifying' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Verifying
                    </Chip>
                  )}
                  {phase === 'verified' && (
                    <Chip intent="success" icon={Check} className="border-transparent">
                      All seals match
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {chainNode.algorithm}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
          <div className="flex flex-col">
            {auditEntries.map((entry, i) => {
              const state = stateFor(i)
              const last = i === auditEntries.length - 1
              return (
                <motion.button
                  key={entry.id}
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onEntryTap(entry.title, `${entry.body} · seal ${HASH_FRAGMENTS[i]}`)}
                  className="flex gap-3 text-left outline-none focus-visible:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition-all duration-300',
                        state === 'done' && `${NODE_TONE[entry.icon]} shadow-[0_0_12px_rgba(52,211,153,0.35)]`,
                        state === 'checking' && 'bg-amber-400',
                        state === 'waiting' && 'bg-[#0B211B]/[0.08] text-[#0B211B]/30',
                      )}
                    >
                      {state === 'done' && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
                      {state === 'checking' && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.6} aria-hidden />}
                      {state === 'waiting' && <ShieldCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden />}
                    </span>
                    {!last && (
                      <span
                        aria-hidden
                        className={cn(
                          'my-1 w-px flex-1 transition-colors duration-500',
                          state === 'done' ? 'bg-emerald-500/30' : 'bg-[#0B211B]/[0.08]',
                        )}
                      />
                    )}
                  </div>
                  <div className={cn('min-w-0 flex-1', last ? 'pb-0.5' : 'pb-3.5')}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={cn(
                          'break-words text-[13px] font-bold tracking-tight transition-colors duration-300',
                          state === 'waiting' ? 'text-[#0B211B]/40' : 'text-[#0B211B]',
                        )}
                      >
                        {entry.title}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 font-mono text-[9px] font-bold uppercase tracking-wide transition-colors duration-300',
                          state === 'done' ? 'text-emerald-600/70' : 'text-[#0B211B]/25',
                        )}
                      >
                        {HASH_FRAGMENTS[i]}
                      </span>
                    </div>
                    <div
                      className={cn(
                        'mt-0.5 break-words text-[11px] font-medium leading-relaxed transition-colors duration-300',
                        state === 'waiting' ? 'text-[#0B211B]/30' : 'text-[#0B211B]/55',
                      )}
                    >
                      {entry.body}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        <AnimatePresence>
          {phase === 'verified' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-3 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
              <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-emerald-700">
                Every entry hashes to its recorded seal. If anyone had altered even one record, the chain would break here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
