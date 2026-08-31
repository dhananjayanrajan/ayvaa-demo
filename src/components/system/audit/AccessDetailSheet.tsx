import { useState } from 'react'
import { motion } from 'motion/react'
import {
  BadgeCheck,
  Check,
  Clock,
  Copy,
  Download,
  Eye,
  FileCheck2,
  Flag,
  FolderOpen,
  Gavel,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { BottomSheet } from '@/components/phone/SheetShell'
import { Overline } from '@/components/phone/Overline'
import { FactTile, FactTileGrid } from '@/components/phone/FactTile'
import { MiniTimeline } from '@/components/phone/MiniTimeline'
import { Chip, Panel, Tile } from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { useRouter } from '@/lib/router'
import type { AccessEntry, AccessKind } from '@/data/system/auditLog'
import { cn } from '@/lib/utils'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

const KIND_THEME: Record<AccessKind, { intent: Intent; tile: TileTone; chipLabel: string; banner: string; accent: string }> = {
  view: { intent: 'info', tile: 'info', chipLabel: 'Viewed', banner: 'bg-sky-500/[0.07]', accent: 'bg-sky-500/[0.08]' },
  change: { intent: 'warning', tile: 'warning', chipLabel: 'Changed', banner: 'bg-amber-500/[0.07]', accent: 'bg-amber-500/[0.1]' },
  consent: { intent: 'success', tile: 'success', chipLabel: 'Consented', banner: 'bg-emerald-500/[0.07]', accent: 'bg-emerald-500/[0.08]' },
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter((w) => w !== '·')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const sealTimeline = [
  { title: 'Accessed', note: 'The reason was already attached the moment the record opened', done: true },
  { title: 'Sealed instantly', note: 'Hashed and chained before the screen finished loading', done: true },
  { title: 'Patient-visible', note: 'This exact entry appears in the family audit log today', done: true },
]

interface AccessDetailSheetProps {
  entry: AccessEntry | null
  flagged: boolean
  onClose: () => void
  onFlag: (id: string) => void
  notify: NotifyFn
}

export function AccessDetailSheet({ entry, flagged, onClose, onFlag, notify }: AccessDetailSheetProps) {
  const { navigate } = useRouter()
  const [copied, setCopied] = useState(false)

  if (!entry) return <BottomSheet open={false} onClose={onClose}>{null}</BottomSheet>

  const kind = KIND_THEME[entry.kind]

  const downloadReceipt = () => {
    const receipt = [
      'AYVAA ACCESS RECEIPT',
      '================================',
      `Entry: ${entry.id}`,
      `Action: ${entry.action}`,
      `Person: ${entry.who} (${entry.role})`,
      `Document: ${entry.document}`,
      `When: ${entry.time}`,
      `Reason: ${entry.reason}`,
      `Device: ${entry.device}`,
      `Consent basis: ${entry.basis}`,
      'Sealed to the Ayvaa immutable ledger',
    ].join('\n')
    const blob = new Blob([receipt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ayvaa-access-${entry.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
    notify({
      title: 'Receipt downloaded',
      body: `${entry.id} · every field of the record included`,
      kind: 'ok',
    })
  }

  const copyReference = async () => {
    const ref = `ayvaa-access://${entry.id}`
    try {
      await navigator.clipboard.writeText(ref)
    } catch {
      const el = document.createElement('textarea')
      el.value = ref
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      icon={Eye}
      title={entry.action}
      subtitle={`Access record · ${entry.id}`}
      footer={
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={downloadReceipt}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="break-words">Download access receipt</span>
        </motion.button>
      }
    >
      <div className={cn('flex items-start gap-3 rounded-2xl p-4', kind.banner)}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[14px] font-black tracking-tight text-brand-ink">
          {initialsOf(entry.who)}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[13.5px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
              {entry.who}
            </span>
            <Chip intent={kind.intent} className="border-transparent">
              {kind.chipLabel}
            </Chip>
          </div>
          <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{entry.role}</p>
          <p className="mt-1 text-[11px] font-semibold text-[#0B211B]/40">{entry.time}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline icon={BadgeCheck}>Access details</Overline>
        <FactTileGrid className="mt-3">
          <FactTile icon={Eye} label="Kind" value={kind.chipLabel} />
          <FactTile icon={Clock} label="When" value={entry.time} />
          <FactTile icon={ShieldCheck} label="Status" value="Sealed" />
          <FactTile icon={FileCheck2} label="Retention" value="10 years" />
        </FactTileGrid>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline icon={FileCheck2}>What was accessed</Overline>
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-3">
          <Tile icon={FileCheck2} tone="ink" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
              {entry.document}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/55">
              Sensitive record · access requires a recorded reason
            </div>
          </div>
          <Chip intent="success" icon={Check} className="shrink-0 border-transparent">
            Verified
          </Chip>
        </div>
      </div>

      <Panel intent={kind.intent === 'info' ? 'neutral' : kind.intent} className="mt-4 p-3.5">
        <Overline icon={Gavel}>Recorded reason</Overline>
        <p className={cn('mt-2 rounded-xl p-3 break-words text-[12.5px] font-medium leading-relaxed text-[#0B211B]/85', kind.accent)}>
          {entry.reason}
        </p>
      </Panel>

      <Panel intent="neutral" className="mt-3 p-3.5">
        <Overline icon={ShieldCheck}>Consent basis</Overline>
        <p className="mt-2 text-pretty break-words text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">
          {entry.basis}
        </p>
      </Panel>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline icon={Smartphone}>Device</Overline>
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-3">
          <Tile icon={Smartphone} tone="neutral" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">
              {entry.device}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/55">
              Device identity and location captured with the access
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Seal trail</Overline>
        <MiniTimeline className="mt-3" items={sealTimeline} />
      </div>

      <div className="mt-4 flex gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={copyReference}
          aria-label="Copy access reference"
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
            copied
              ? 'bg-emerald-500/[0.12] text-emerald-700'
              : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B]',
          )}
        >
          {copied ? (
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          ) : (
            <Copy className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          )}
          <span className="truncate">{copied ? 'Copied' : 'Copy reference'}</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onClose()
            navigate('/patient/p21')
          }}
          aria-label="Open family records"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] px-3 py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <FolderOpen className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Family records</span>
        </motion.button>
      </div>

      <motion.button
        type="button"
        whileTap={flagged ? undefined : { scale: 0.97 }}
        onClick={() => {
          if (!flagged) onFlag(entry.id)
        }}
        disabled={flagged}
        aria-label={flagged ? 'Entry flagged for review' : 'Flag entry for supervisor review'}
        className={cn(
          'mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
          flagged
            ? 'bg-emerald-500/[0.12] text-emerald-700'
            : 'bg-rose-500/[0.08] text-rose-700 hover:bg-rose-500/[0.14]',
        )}
      >
        {flagged ? (
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
        ) : (
          <Flag className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        )}
        <span className="break-words">
          {flagged ? 'Flagged · supervisors notified' : 'Flag for supervisor review'}
        </span>
      </motion.button>

      <div className="mt-3.5 flex items-center justify-center gap-1.5 px-4 text-center">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600/70" aria-hidden />
        <span className="text-[10.5px] font-semibold leading-snug text-[#0B211B]/40">
          The patient sees this exact entry in their own audit log. Secrecy and care do not mix.
        </span>
      </div>
    </BottomSheet>
  )
}
