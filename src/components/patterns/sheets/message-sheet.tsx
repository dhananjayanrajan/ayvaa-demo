import { useState } from 'react'
import { motion } from 'motion/react'
import { Lock, MessageSquare, Send } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { RX_MESSAGES } from '@/data/patientPrescriptions'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type ChatMessage = { from: 'doctor' | 'family'; text: string; time: string }

export function MessageSheet({ prescriber, onClose }: { prescriber: string; onClose: () => void }) {
  const { notify } = useDemo()
  const [messages, setMessages] = useState<ChatMessage[]>(RX_MESSAGES)
  const [draft, setDraft] = useState('')

  const canSend = draft.trim().length > 0

  const send = () => {
    if (!canSend) return
    setMessages((cur) => [...cur, { from: 'family', text: draft.trim(), time: 'Now' }])
    setDraft('')
    notify({ title: 'Message sent', body: `${prescriber} replies within a few hours`, kind: 'ok' })
  }

  return (
    <SheetShell
      icon={MessageSquare}
      title={prescriber}
      subtitle="Replies within a few hours"
      tone="info"
      onClose={onClose}
      footer={
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send()
            }}
            placeholder="Ask about this prescription…"
            className="min-w-0 flex-1 rounded-2xl border border-[#0B211B]/[0.08] bg-white px-4 py-3 text-[12.5px] font-semibold text-[#0B211B] placeholder:text-[#0B211B]/35 focus:border-emerald-500/40 focus:outline-none"
          />
          <motion.button
            type="button"
            whileTap={canSend ? { scale: 0.94 } : undefined}
            onClick={send}
            disabled={!canSend}
            aria-disabled={!canSend}
            aria-label="Send message"
            className={cn(
              'grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors',
              canSend
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_12px_24px_-12px_rgba(16,185,129,0.8)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/35',
            )}
          >
            <Send className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </motion.button>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5 pb-2">
        <div className="flex items-center gap-2 rounded-xl bg-[#0B211B]/[0.03] px-3 py-2.5">
          <Lock className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/40" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 text-[10.5px] font-bold text-[#0B211B]/55">
            Messages stay in your Ayvaa record, attached to this prescription
          </span>
        </div>

        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'max-w-[85%] rounded-2xl px-3.5 py-2.5',
              m.from === 'doctor' ? 'self-start bg-[#0B211B]/[0.04]' : 'self-end bg-emerald-500/[0.12]',
            )}
          >
            <p className="text-[12px] font-semibold leading-snug text-[#0B211B]/80">{m.text}</p>
            <div
              className={cn(
                'mt-1 text-[9px] font-bold tabular-nums',
                m.from === 'doctor' ? 'text-[#0B211B]/35' : 'text-emerald-700/60',
              )}
            >
              {m.time}
            </div>
          </motion.div>
        ))}
      </div>
    </SheetShell>
  )
}
