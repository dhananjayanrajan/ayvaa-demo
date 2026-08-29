import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SheetShell } from '@/components/professional/payouts/SheetShell'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'saving' | 'saved'

type Props = {
  name: string
  role: string
  onClose: () => void
  onSave: (name: string, role: string) => void
}

export function EditProfileSheet({ name, role, onClose, onSave }: Props) {
  const [draftName, setDraftName] = useState(name)
  const [draftRole, setDraftRole] = useState(role)
  const [status, setStatus] = useState<Status>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const dirty = (draftName.trim() !== name || draftRole.trim() !== role) && draftName.trim().length > 0

  const save = () => {
    if (!dirty || status !== 'idle') return
    setStatus('saving')
    timers.current.push(
      setTimeout(() => {
        setStatus('saved')
        onSave(draftName.trim(), draftRole.trim())
        timers.current.push(setTimeout(onClose, 900))
      }, 1000),
    )
  }

  const inputClass =
    'mt-2 w-full rounded-2xl border-0 bg-white p-3.5 text-[13px] font-medium text-[#0B211B] shadow-inner placeholder:text-[#0B211B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B211B]/15'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <SheetShell
        icon={Pencil}
        tone="info"
        title="Edit profile details"
        subtitle="Families see these on your public card"
        onClose={onClose}
        footer={
          <button
            type="button"
            onClick={save}
            disabled={!dirty || status !== 'idle'}
            aria-disabled={!dirty || status !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors duration-300',
              status === 'saved'
                ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
                : status === 'saving'
                  ? 'cursor-wait bg-[#0B211B]/[0.25]'
                  : dirty
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_18px_36px_-18px_rgba(37,99,235,0.6)]'
                    : 'cursor-not-allowed bg-[#0B211B]/[0.15] text-white/60',
            )}
          >
            {status === 'saving' ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/70" strokeWidth={2.4} aria-hidden />
            ) : status === 'saved' ? (
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
            ) : null}
            {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Profile updated' : 'Save changes'}
          </button>
        }
      >
        <div className="flex flex-col gap-3.5">
          <div className="rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Full name</div>
            <Input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div className="rounded-2xl bg-[#0B211B]/[0.035] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Professional role</div>
            <Input
              value={draftRole}
              onChange={(e) => setDraftRole(e.target.value)}
              placeholder="Your role"
              className={inputClass}
            />
            <p className="mt-2.5 text-[10px] font-bold text-[#0B211B]/40">
              Changing your role may require re-verification of matching certifications.
            </p>
          </div>
        </div>
      </SheetShell>
    </>
  )
}
