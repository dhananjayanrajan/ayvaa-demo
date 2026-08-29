import type { LucideIcon } from 'lucide-react'
import {
  CalendarCheck,
  ClipboardCheck,
  Pill as PillIcon,
  ReceiptText,
  ShieldCheck,
  Star,
} from 'lucide-react'
import type { TileTone } from '@/components/phone/kit'
import { consent, lovedOnes, medications, payouts, visits } from '@/data/seed'

export type NotificationEntry = {
  key: string
  icon: LucideIcon
  tone: TileTone
  title: string
  body: string
  time: string
  to: string
  group: 'today' | 'yesterday'
  action: boolean
  unread: boolean
}

export function buildEntries(): NotificationEntry[] {
  const father = lovedOnes[0]
  const confirmed = visits.find((v) => v.status === 'confirmed')
  const nurseFirst = confirmed?.caregiver?.split(' ')[0] ?? 'Your nurse'
  const receipt = payouts.find((p) => p.status === 'paid') ?? payouts[0]
  const lovedFirst = father.name.split(' ')[0]

  return [
    {
      key: 'visit-confirmed',
      icon: CalendarCheck,
      tone: 'success',
      title: `${nurseFirst} confirmed today's visit`,
      body: `Arrives 2:00 PM for ${lovedFirst}`,
      time: '7:44 AM',
      to: '/patient/p15',
      group: 'today',
      action: false,
      unread: true,
    },
    {
      key: 'doses-logged',
      icon: PillIcon,
      tone: 'info',
      title: 'Morning doses logged',
      body: `${medications[0].name} and ${medications[1].name} given`,
      time: '8:10 AM',
      to: '/patient/p19',
      group: 'today',
      action: false,
      unread: false,
    },
    {
      key: 'receipt',
      icon: ReceiptText,
      tone: 'neutral',
      title: `Receipt for ${receipt.date}`,
      body: `${receipt.amount} saved to your records`,
      time: '9:02 AM',
      to: '/patient/p23',
      group: 'today',
      action: false,
      unread: false,
    },
    {
      key: 'visit-summary',
      icon: ClipboardCheck,
      tone: 'success',
      title: 'Visit summary ready',
      body: 'All five care steps completed and signed',
      time: '6:12 PM',
      to: '/patient/p17',
      group: 'yesterday',
      action: false,
      unread: false,
    },
    {
      key: 'consent-review',
      icon: ShieldCheck,
      tone: 'warning',
      title: 'Consent review coming up',
      body: `Re-confirm ${lovedFirst}'s care consent by ${consent.reviewDue}`,
      time: '4:30 PM',
      to: '/patient/p22',
      group: 'today',
      action: true,
      unread: false,
    },
    {
      key: 'rate-visit',
      icon: Star,
      tone: 'warning',
      title: 'How was Monday\u2019s visit?',
      body: 'Your rating helps match the right caregivers',
      time: 'Mon',
      to: '/patient/p18',
      group: 'today',
      action: true,
      unread: false,
    },
  ]
}

export type FilterKey = 'all' | 'action'

export type CaughtUpStats = {
  total: number
  feedCount: number
  actionCount: number
  unreadCount: number
}

export function buildStats(entries: NotificationEntry[]): CaughtUpStats {
  return {
    total: entries.length,
    feedCount: entries.filter((e) => !e.action).length,
    actionCount: entries.filter((e) => e.action).length,
    unreadCount: entries.filter((e) => e.unread && !e.action).length,
  }
}
