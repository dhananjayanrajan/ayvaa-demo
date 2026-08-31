import { useState } from 'react'
import { motion } from 'motion/react'
import { Building2, Eye, EyeOff, KeyRound, Mail } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { Row } from '@/components/phone/Row'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { TileTone } from '@/components/phone/kit'

interface PartnerCredentialCardProps {
  partnerName: string
  partnerEmail: string
  onNotify: (opts: { title: string; body: string; kind: 'ok' | 'warn' | 'error' | 'info' }) => void
}

function CredentialRow({
  icon,
  tone,
  label,
  value,
  mono = false,
  onClick,
  trailing,
}: {
  icon: LucideIcon
  tone: TileTone
  label: string
  value: string
  mono?: boolean
  onClick: () => void
  trailing?: ReactNode
}) {
  return (
    <Row
      icon={icon}
      tone={tone}
      label={label}
      title={value}
      titleClassName={mono ? 'font-mono tracking-normal' : undefined}
      onClick={onClick}
      trailing={trailing}
      hoverClassName="hover:bg-transparent"
      showChevron={false}
    />
  )
}

export function PartnerCredentialCard({ partnerName, partnerEmail, onNotify }: PartnerCredentialCardProps) {
  const [showPass, setShowPass] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <CredentialRow
        icon={Building2}
        tone="neutral"
        label="Organisation"
        value={partnerName}
        onClick={() => onNotify({ title: 'Organisation', body: `${partnerName} · provisioned by admin`, kind: 'info' })}
      />
      <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
      <CredentialRow
        icon={Mail}
        tone="info"
        label="Work email"
        value={partnerEmail}
        onClick={() => onNotify({ title: 'Work email', body: `${partnerEmail} · access last used today`, kind: 'info' })}
      />
      <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
      <CredentialRow
        icon={KeyRound}
        tone="success"
        label="Password"
        value={showPass ? 'sunrise-care-2026' : '••••••••••'}
        mono
        onClick={() => setShowPass((v) => !v)}
        trailing={
          <motion.span
            whileTap={{ scale: 0.9 }}
            role="button"
            tabIndex={0}
            aria-label={showPass ? 'Hide password' : 'Show password'}
            onClick={(e) => {
              e.stopPropagation()
              setShowPass((v) => !v)
            }}
            onKeyDown={(e) => e.key === 'Enter' && setShowPass((v) => !v)}
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          >
            {showPass ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
          </motion.span>
        }
      />
      <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-4 py-3">
        <span className="min-w-0 truncate text-[10.5px] font-semibold text-[#0B211B]/50">
          Two-factor is enforced by your organisation
        </span>
        <Chip intent="success">2FA on</Chip>
      </div>
    </div>
  )
}
