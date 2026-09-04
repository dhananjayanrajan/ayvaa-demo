import { BellRing, Eye, FileCheck2, HeartPulse, PauseCircle, Siren, Users, type LucideIcon } from 'lucide-react'
import type { Intent, TileTone } from '@/components/base/phone/kit'

export type Severity = 'Minor' | 'Moderate' | 'Critical'

export const SEVERITIES: Severity[] = ['Minor', 'Moderate', 'Critical']

export type SeverityConfig = {
  tile: TileTone
  chip: Intent
  effects: { icon: LucideIcon; text: string }[]
  note: string
  submitKind: 'warn' | 'error' | 'ok'
  shell: { border: string; bg: string; glowA: string; glowB: string; overline: string; gradient: string; meter: string }
  panel: { bg: string; glow: string; overline: string; dot: string; text: string }
  causeActive: string
  triggerIntent: Intent
  cta: string
  chipLight: Intent
  attach: {
    activeBg: string
    overline: string
    sub: string
    photoBg: string
    photoIcon: string
  }
}

export const SEVERITY_CONFIG: Record<Severity, SeverityConfig> = {
  Minor: {
    tile: 'info',
    chip: 'info',
    effects: [
      { icon: FileCheck2, text: 'Added to this visit record' },
      { icon: Eye, text: 'Reviewed in the weekly quality audit' },
      { icon: HeartPulse, text: 'Care plan stays active' },
    ],
    note: 'minor notes never interrupt anyone’s day',
    submitKind: 'ok',
    shell: {
      border: 'border-blue-200/10',
      bg: 'bg-[#0A1B26]',
      glowA: 'bg-blue-400/20',
      glowB: 'bg-sky-300/10',
      overline: 'text-blue-200/50',
      gradient: 'from-sky-300 to-blue-200',
      meter: 'from-blue-400 to-sky-300',
    },
    panel: {
      bg: 'bg-[#0A1B26]',
      glow: 'bg-blue-400/15',
      overline: 'text-blue-200/50',
      dot: 'bg-blue-400/20 text-blue-200',
      text: 'text-blue-50/85',
    },
    causeActive: 'bg-blue-500/[0.12] text-blue-700',
    triggerIntent: 'info',
    cta: 'bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_18px_36px_-18px_rgba(37,99,235,0.6)]',
    chipLight: 'info',
    attach: {
      activeBg: 'bg-blue-500/[0.08]',
      overline: 'text-blue-700/70',
      sub: 'text-blue-700/60',
      photoBg: 'bg-blue-500/[0.1] text-blue-700',
      photoIcon: 'text-blue-600',
    },
  },
  Moderate: {
    tile: 'warning',
    chip: 'warning',
    effects: [
      { icon: BellRing, text: 'Supervisor paged immediately' },
      { icon: PauseCircle, text: 'Care plan paused until reviewed' },
      { icon: Eye, text: 'Family sees it on their timeline' },
    ],
    note: 'a supervisor is paged the second you submit — expect a call within minutes',
    submitKind: 'warn',
    shell: {
      border: 'border-amber-200/10',
      bg: 'bg-[#241A0B]',
      glowA: 'bg-amber-400/25',
      glowB: 'bg-orange-300/12',
      overline: 'text-amber-200/50',
      gradient: 'from-amber-200 to-orange-100',
      meter: 'from-amber-400 to-orange-300',
    },
    panel: {
      bg: 'bg-[#241A0B]',
      glow: 'bg-amber-400/15',
      overline: 'text-amber-200/50',
      dot: 'bg-amber-400/20 text-amber-200',
      text: 'text-amber-50/85',
    },
    causeActive: 'bg-amber-500/[0.14] text-amber-700',
    triggerIntent: 'warning',
    cta: 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_18px_36px_-18px_rgba(234,88,12,0.6)]',
    chipLight: 'warning',
    attach: {
      activeBg: 'bg-amber-500/[0.1]',
      overline: 'text-amber-700/80',
      sub: 'text-amber-700/60',
      photoBg: 'bg-amber-500/[0.12] text-amber-700',
      photoIcon: 'text-amber-600',
    },
  },
  Critical: {
    tile: 'danger',
    chip: 'danger',
    effects: [
      { icon: Siren, text: 'Supervisor and senior ops paged now' },
      { icon: PauseCircle, text: 'Care plan paused instantly' },
      { icon: Users, text: 'Family notified within minutes' },
    ],
    note: 'this is the highest channel — senior ops picks it up live, day or night',
    submitKind: 'error',
    shell: {
      border: 'border-rose-200/10',
      bg: 'bg-[#230D14]',
      glowA: 'bg-rose-400/25',
      glowB: 'bg-red-300/10',
      overline: 'text-rose-200/50',
      gradient: 'from-rose-200 to-red-100',
      meter: 'from-rose-500 to-red-400',
    },
    panel: {
      bg: 'bg-[#230D14]',
      glow: 'bg-rose-400/15',
      overline: 'text-rose-200/50',
      dot: 'bg-rose-400/20 text-rose-200',
      text: 'text-rose-50/85',
    },
    causeActive: 'bg-rose-500/[0.12] text-rose-700',
    triggerIntent: 'danger',
    cta: 'bg-gradient-to-r from-rose-600 to-red-500 shadow-[0_18px_36px_-18px_rgba(225,29,72,0.6)]',
    chipLight: 'danger',
    attach: {
      activeBg: 'bg-rose-500/[0.08]',
      overline: 'text-rose-700/80',
      sub: 'text-rose-700/60',
      photoBg: 'bg-rose-500/[0.1] text-rose-700',
      photoIcon: 'text-rose-600',
    },
  },
}
