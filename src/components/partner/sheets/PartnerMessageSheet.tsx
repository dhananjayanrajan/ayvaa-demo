import { useState } from 'react'
import { motion } from 'motion/react'
import { MessageSquare, Send } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { cn } from '@/lib/utils'

interface PartnerMessageSheetProps {
  onClose: () => void
  onSend: (message: string) => void
}

const quickReplies = [
  'How is the patient doing today?',
  'Please update the care plan.',
  'When is the next visit scheduled?',
  'Can we get a summary of recent progress?',
]

export function PartnerMessageSheet({ onClose, onSend }: PartnerMessageSheetProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
      onClose()
    }
  }

  return (
    <SheetShell
      icon={MessageSquare}
      tone="live"
      title="Message care team"
      subtitle="Send a note to the assigned care team"
      onClose={onClose}
      height="auto"
    >
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply) => (
          <motion.button
            key={reply}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMessage(reply)}
            className="rounded-full bg-[#0B211B]/[0.04] px-3 py-1.5 text-[11px] font-bold text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            {reply}
          </motion.button>
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message…"
        rows={4}
        className="w-full resize-none rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3 text-sm font-medium text-[#0B211B] placeholder:text-[#0B211B]/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />

      <motion.button
        type="button"
        whileTap={{ scale: message.trim() ? 0.98 : 1 }}
        onClick={handleSend}
        disabled={!message.trim()}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-opacity',
          !message.trim() && 'opacity-50'
        )}
      >
        <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Send message
      </motion.button>
    </SheetShell>
  )
}
