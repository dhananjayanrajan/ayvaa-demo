import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BadgeCheck, ChevronDown, FileCheck2, HeartPulse, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Card, Chip } from '@/components/phone/kit'
import type { Credential } from '@/data/patientCaregiverProfile'

const rowIcons: Record<string, LucideIcon> = {
  'rn-licence': ShieldCheck,
  background: FileCheck2,
  'first-aid': HeartPulse,
}

interface CredentialRowProps {
  credential: Credential
  open: boolean
  onToggle: () => void
}

function CredentialRow({ credential, open, onToggle }: CredentialRowProps) {
  const Icon = rowIcons[credential.id] ?? ShieldCheck

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.1] text-emerald-600">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{credential.title}</span>
          <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-[#0B211B]/45">{credential.summary}</span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
          <Chip intent="success">{credential.status}</Chip>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mx-3 mb-3.5 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
              {credential.details.map((detail, i) => (
                <div key={detail.label} className={i === 0 ? '' : 'mt-2.5'}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">
                      {detail.label}
                    </span>
                    <span className="truncate text-[12px] font-bold text-[#0B211B]/80">{detail.value}</span>
                  </div>
                </div>
              ))}
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-500/[0.08] px-3 py-2">
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
                <span className="text-[10.5px] font-bold text-emerald-800">
                  Verified against the issuing registry before listing
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CredentialCard({ credentials }: { credentials: Credential[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <Card>
      <div className="flex flex-col py-1">
        {credentials.map((credential) => (
          <CredentialRow
            key={credential.id}
            credential={credential}
            open={openId === credential.id}
            onToggle={() => setOpenId((prev) => (prev === credential.id ? null : credential.id))}
          />
        ))}
      </div>
    </Card>
  )
}
