import { motion } from 'motion/react'
import { Mail } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { EmailCodeButton } from '../actions'
import type { EmailSendState } from '../actions'
import { emailFallbackSubtitle } from '@/data/patientVerification'
import { cn } from '@/lib/utils'

export function EmailFallbackSheet({
  email,
  sendState,
  onSend,
  onClose,
}: {
  email: string
  sendState: EmailSendState
  onSend: () => void
  onClose: () => void
}) {
  return (
    <SheetShell
      icon={Mail}
      tone={sendState === 'done' ? 'success' : 'info'}
      title={sendState === 'done' ? 'Code sent by email' : 'Get the code by email'}
      subtitle={sendState === 'done' ? 'Check your inbox for the six digits' : emailFallbackSubtitle}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2.5">
          <EmailCodeButton state={sendState} onPress={onSend} />
          <motion.button
            type="button"
            whileTap={sendState === 'idle' ? { scale: 0.97 } : undefined}
            onClick={onClose}
            disabled={sendState !== 'idle'}
            aria-disabled={sendState !== 'idle'}
            className={cn(
              'w-full rounded-2xl py-3 text-sm font-bold transition-colors',
              sendState === 'idle'
                ? 'bg-[#0B211B]/[0.05] text-[#0B211B]/70'
                : 'cursor-not-allowed bg-[#0B211B]/[0.03] text-[#0B211B]/30',
            )}
          >
            Keep waiting for SMS
          </motion.button>
        </div>
      }
    >
      <div className="rounded-2xl bg-[#0B231C] p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/45">
          Destination
        </div>
        <div className="mt-0.5 break-words font-mono text-[13px] font-bold tracking-tight text-emerald-50/90">
          {email}
        </div>
      </div>
    </SheetShell>
  )
}

export type { EmailSendState } from '../actions'
