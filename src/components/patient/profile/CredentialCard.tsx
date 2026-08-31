import { useState } from 'react'
import { BadgeCheck, FileCheck2, HeartPulse, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
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
    <Row
      leading={
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.1] text-emerald-600">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
        </span>
      }
      title={credential.title}
      titleClassName="text-[13.5px] font-bold leading-snug"
      subtitle={credential.summary}
      subtitleClassName="text-[11px] font-semibold leading-snug text-[#0B211B]/45"
      chip={{ label: credential.status, intent: 'success', className: '' }}
      expandable
      chevronInTrailing
      open={open}
      onToggle={onToggle}
      className="items-start"
      showChevron={false}
      expansion={
        <div className="mx-3 mb-3.5 rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
          {credential.details.map((detail) => (
            <div key={detail.label} className="mt-2.5 first:mt-0">
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
      }
      expansionClassName="px-0 pb-0"
    />
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
