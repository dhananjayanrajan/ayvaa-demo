import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  Chip,
  Tile,
  rise,
} from '@/components/phone/kit'
import { Overline } from '@/components/phone/Overline'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import { escalatedTickets } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface EscalationTicketCardProps {
  notify: NotifyFn
}

export function EscalationTicketCard({ notify }: EscalationTicketCardProps) {
  const [e1] = escalatedTickets
  const [note, setNote] = useState('')
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [])

  const handleNoteChange = (value: string) => {
    setNote(value)
    setSaveState('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      setSaveState('saved')
    }, 800)
  }

  const handleReply = () => {
    notify({
      title: 'Reply sent',
      body: note ? `Priya Sharma notified · ${note}` : 'Priya Sharma notified · decision shared',
      kind: 'ok',
    })
  }

  return (
    <motion.div variants={rise}>
      <Card>
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={MessageSquare} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">{e1.title}</span>
                <Chip intent="warning" dot>{e1.waiting}</Chip>
              </div>
              <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/55">{e1.meta}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {e1.chips.map((chip) => (
              <Chip key={chip} intent="neutral">
                {chip}
              </Chip>
            ))}
          </div>

          <PhaseHero theme={PHASE_THEME.emerald} className="mt-4">
            <QuotePanel
              bare
              kicker="In her words"
              glyph
              quote={e1.quote ?? ''}
              footer={
                <>
                  <div aria-hidden className="my-3.5 h-px bg-white/[0.08]" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
                      {e1.quoteBy}
                    </span>
                    <Chip intent="success" icon={CheckCircle2}>
                      Verbatim
                    </Chip>
                  </div>
                </>
              }
            />
          </PhaseHero>

          <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <Overline icon={ShieldCheck}>Your decision</Overline>
            <Textarea
              value={note}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Write a note for the care team…"
              className="mt-2.5 min-h-24 w-full resize-none rounded-2xl border-0 bg-white p-3.5 text-[13px] font-medium leading-relaxed text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30"
            />
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[10px] font-bold text-[#0B211B]/40">
                Written to the audit record with your name
              </span>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] transition-colors ${
                  saveState === 'saved'
                    ? 'bg-emerald-500/[0.12] text-emerald-700'
                    : saveState === 'saving'
                      ? 'bg-amber-500/[0.12] text-amber-700'
                      : 'bg-[#0B211B]/[0.05] text-[#0B211B]/40'
                }`}
              >
                {saveState === 'saved' && <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />}
                {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Auto-saved' : 'Auto-saved'}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleReply}
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Reply to family
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                notify({ title: 'Re-match queued', body: 'A calmer nurse will be offered Friday slot · family not told yet', kind: 'ok' })
              }
              className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-all duration-200 hover:bg-[#0B211B]/[0.09] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Re-match quietly instead
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
