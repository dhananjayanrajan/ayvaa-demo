import { motion } from 'motion/react'
import { ChevronRight, Eye, Lock, PenLine, ShieldAlert, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow, HeroHighlight } from '@/components/phone/HeroCells'
import { DarkTimeChip } from './DarkTimeChip'
import type { AuditEntry, AuditFilter, AuditKind } from '@/data/patientRecords'
import { cn } from '@/lib/utils'

const KIND_UI: Record<AuditKind, { icon: LucideIcon; tile: string }> = {
  view: { icon: Eye, tile: 'bg-sky-400/[0.16] text-sky-200' },
  change: { icon: PenLine, tile: 'bg-emerald-400/[0.18] text-emerald-200' },
  denied: { icon: ShieldAlert, tile: 'bg-rose-400/[0.18] text-rose-200' },
}

const HERO_TONE = {
  sealed: {
    pillTone: 'emerald' as const,
    pillLabel: 'Sealed',
    pillLive: false,
    panel: 'bg-emerald-400/[0.12]',
    panelLabel: 'text-emerald-200/60',
    hint: 'Every open, change and refusal leaves a permanent mark',
  },
  recording: {
    pillTone: 'sky' as const,
    pillLabel: 'Recording',
    pillLive: true,
    panel: 'bg-sky-400/[0.12]',
    panelLabel: 'text-sky-200/70',
    hint: 'A new entry is being written to the ledger right now',
  },
}

interface VaultHeroProps {
  latest: AuditEntry
  recording: boolean
  viewCount: number
  changeCount: number
  deniedCount: number
  retention: string
  onOpenLog: (filter: AuditFilter) => void
}

function TapStat({
  icon: Icon,
  label,
  value,
  onPress,
}: {
  icon: LucideIcon
  label: string
  value: number
  onPress: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="flex items-center justify-between gap-2 rounded-2xl bg-white/[0.06] px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-white/[0.11]"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
          <Icon className="h-3 w-3" aria-hidden />
          {label}
        </span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-1.5 block text-[20px] font-extrabold leading-none tracking-tight text-white tabular-nums"
        >
          {value}
        </motion.span>
      </span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-200/60" aria-hidden />
    </motion.button>
  )
}

export function VaultHero({ latest, recording, viewCount, changeCount, deniedCount, retention, onOpenLog }: VaultHeroProps) {
  const tone = recording ? HERO_TONE.recording : HERO_TONE.sealed
  const ui = KIND_UI[latest.kind]
  const LatestIcon = ui.icon

  return (
    <AccentHero tone={recording ? 'sky' : 'emerald'}>
      <HeroTopRow
        icon={ShieldCheck}
        label="Records vault"
        trailing={<StatusPill tone={tone.pillTone} label={tone.pillLabel} live={tone.pillLive} />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Consent gates the vault, <HeroHighlight>the ledger remembers</HeroHighlight>
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">{tone.hint}</p>

      <div className={cn('mt-4 rounded-2xl p-4 transition-colors duration-500', tone.panel)}>
        <div className="flex items-center justify-between gap-3">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em]', tone.panelLabel)}>
            {recording ? 'Just recorded' : 'Latest entry'}
          </span>
          <DarkTimeChip>{latest.time}</DarkTimeChip>
        </div>
        <motion.div
          key={latest.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-3 flex items-start gap-3"
        >
          <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', ui.tile)}>
            <LatestIcon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-extrabold tracking-tight text-white">{latest.title}</span>
            <span className="mt-0.5 block break-words text-[11px] font-medium leading-snug text-white/60">
              {latest.detail}
            </span>
            <span className="mt-1 block text-[10px] font-semibold text-white/45">By {latest.actor}</span>
          </span>
        </motion.div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <TapStat icon={Eye} label="Views sealed" value={viewCount} onPress={() => onOpenLog('view')} />
        <TapStat icon={PenLine} label="Edits sealed" value={changeCount} onPress={() => onOpenLog('change')} />
      </div>

      {deniedCount > 0 && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => onOpenLog('denied')}
          className="mt-2 flex w-full items-start gap-3 rounded-2xl bg-rose-400/[0.14] px-4 py-3 text-left transition-colors duration-200 hover:bg-rose-400/[0.2]"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-400/[0.2] text-rose-200">
            <ShieldAlert className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-extrabold tracking-tight text-white">
              Access denied {deniedCount === 1 ? 'once' : `${deniedCount} times`}
            </span>
            <span className="mt-0.5 block break-words text-[10.5px] font-semibold leading-snug text-rose-100/60">
              The consent gate blocked these requests, and the refusals stay on record
            </span>
          </span>
          <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-rose-200/70" aria-hidden />
        </motion.button>
      )}

      <div className="mt-2 flex items-start gap-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/70" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/55">
          {retention}
        </span>
      </div>
    </AccentHero>
  )
}
