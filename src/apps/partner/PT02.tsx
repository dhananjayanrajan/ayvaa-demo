import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  ReceiptText,
  Send,
  Stethoscope,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  LiveDot,
  Meter,
  Section,
  Tile,
  TimeChip,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { TileTone } from '@/components/phone/kit'
import { partner, referrals } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const alerts: { icon: LucideIcon; tone: TileTone; title: string; body: string; time: string }[] = [
  { icon: CheckCircle2, tone: 'success', title: 'Offer accepted', body: 'Ramesh Rao · caregiver confirmed for Friday', time: '8:12 AM' },
  { icon: ReceiptText, tone: 'ink', title: 'Invoice settled', body: 'Feb statement paid in full · PDF ready', time: 'Yesterday' },
  { icon: Users, tone: 'warning', title: 'Staff request', body: 'Kavitha Nair wants to join under Sunrise', time: 'Mon' },
]

function QuickTile({
  icon,
  tone,
  label,
  value,
  onClick,
}: {
  icon: LucideIcon
  tone: TileTone
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex min-w-0 flex-1 flex-col items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] p-3.5 transition-colors hover:bg-[#0B211B]/[0.07]"
    >
      <Tile icon={icon} tone={tone} size="sm" />
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-extrabold tracking-tight text-[#0B211B]">{label}</span>
        <span className="mt-0.5 block truncate text-[9.5px] font-bold text-[#0B211B]/45">{value}</span>
      </span>
    </motion.button>
  )
}

export function PT02() {
  const { navigate } = useRouter()
  const { notify, markAllRead } = useDemo()
  const [sheetOpen, setSheetOpen] = useState(false)
  const activeCount = referrals.filter((r) => r.status === 'active').length
  const matchingCount = referrals.length - activeCount

  const rail: { label: string; value: number; width: number; tone: 'success' | 'warning' | 'info' }[] = [
    { label: 'Referred', value: partner.referred, width: 1, tone: 'success' },
    { label: 'Matching', value: matchingCount, width: Math.max(0.15, matchingCount / Math.max(1, partner.referred)), tone: 'warning' },
    { label: 'Staff', value: partner.staffOnAyvaa, width: Math.min(1, partner.staffOnAyvaa / 20), tone: 'info' },
  ]

  return (
    <Screen>
      <AppBar
        title="Care partnership"
        subtitle={partner.location}
        trailing={
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setSheetOpen(true)}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#F4F8F6]" />
            </motion.button>
            <AgentAvatar seed="sunrise" size={42} />
          </div>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="relative shrink-0">
                      <span aria-hidden className="absolute -inset-1 rounded-full bg-emerald-400/15 blur-md" />
                      <span className="relative block">
                        <AgentAvatar seed="sunrise" size={38} />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-extrabold tracking-tight text-white">Sunrise Multispeciality</div>
                      <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-100/45">
                        <LiveDot className="text-emerald-300" />
                        Care partner since 2024
                      </div>
                    </div>
                    <Chip intent="live" light dot>
                      Live
                    </Chip>
                  </div>

                  <div className="mt-5 flex items-end gap-5">
                    <div className="min-w-0 shrink">
                      <span className="bg-gradient-to-br from-emerald-200 via-teal-200 to-emerald-300 bg-clip-text text-[54px] font-black leading-none tracking-tighter text-transparent">
                        {partner.activeCare}
                      </span>
                      <div className="mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/45">
                        patients in care
                      </div>
                      <Chip intent="success" light icon={UserPlus} className="mt-2.5 border-transparent">
                        +2 this week
                      </Chip>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-3 pb-0.5">
                      {rail.map((m) => (
                        <div key={m.label}>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/50">{m.label}</span>
                            <span className="text-[11px] font-extrabold tabular-nums text-emerald-50/85">{m.value}</span>
                          </div>
                          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.width * 100}%` }}
                              transition={{ duration: 0.7, ease: 'easeOut' }}
                              className={cn(
                                'h-full rounded-full bg-gradient-to-r',
                                m.tone === 'success' && 'from-emerald-400 to-teal-300',
                                m.tone === 'warning' && 'from-amber-400 to-orange-300',
                                m.tone === 'info' && 'from-sky-400 to-blue-300',
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center rounded-2xl bg-white/[0.06] px-3.5 py-3">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                      <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
                        {partner.referred} referred
                      </span>
                    </div>
                    <span aria-hidden className="relative mx-2.5 h-px w-6 shrink-0 bg-emerald-300/40">
                      <motion.span
                        className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-teal-300"
                        animate={{ x: [-4, 26], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </span>
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                      <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
                        {partner.activeCare} in care
                      </span>
                    </div>
                    <span aria-hidden className="relative mx-2.5 h-px w-6 shrink-0 bg-emerald-300/40">
                      <motion.span
                        className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-sky-300"
                        animate={{ x: [-4, 26], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                      />
                    </span>
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
                      <span className="truncate text-[10px] font-extrabold uppercase tracking-[0.1em] text-emerald-100/60">
                        {partner.sessionsThisMonth} sessions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent="success">
                <div className="p-4">
                  <div className="flex items-center gap-3.5">
                    <Tile icon={UserPlus} tone="live" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                        Refer a patient for home care
                      </div>
                      <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                        4-step wizard · guardian consents before matching
                      </div>
                    </div>
                    <Chip intent="success">2 min</Chip>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/partner/pt03')}
                    className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                  >
                    <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                    Start referral
                  </motion.button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex gap-2.5">
                <QuickTile
                  icon={Users}
                  tone="info"
                  label="Staff"
                  value={`${partner.staffOnAyvaa} on Ayvaa`}
                  onClick={() => navigate('/partner/pt05')}
                />
                <QuickTile
                  icon={ReceiptText}
                  tone="warning"
                  label="Billing"
                  value="Up to date"
                  onClick={() => navigate('/partner/pt07')}
                />
                <QuickTile
                  icon={Stethoscope}
                  tone="ink"
                  label="Sessions"
                  value={`${partner.sessionsThisMonth} done`}
                  onClick={() => notify({ title: 'Sessions', body: `${partner.sessionsThisMonth} verified sessions this month`, kind: 'info' })}
                />
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Referred patients" trailing={<Chip intent="neutral">{referrals.length} tracked</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {referrals.map((r, i) => {
                  const active = r.status === 'active'
                  return (
                    <div key={r.id}>
                      {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => navigate('/partner/pt04')}
                        className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                      >
                        <AgentAvatar seed={r.name} size={44} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
                            {r.name} · {r.age}
                          </div>
                          <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                            {r.condition} · {r.caregiver ?? 'Awaiting match'}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Meter
                              value={active ? 0.33 : 0.12}
                              intent={active ? 'success' : 'warning'}
                              delay={0.2 + i * 0.1}
                              className="w-20"
                            />
                            <span className="text-[9px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">{r.progress}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <Chip intent={active ? 'success' : 'warning'} dot={!active}>
                            {active ? 'Active' : 'Matching'}
                          </Chip>
                          <TimeChip>{r.visits}</TimeChip>
                        </div>
                        <ChevronRight
                          className="h-3.5 w-3.5 shrink-0 self-center text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                          aria-hidden
                        />
                      </motion.button>
                    </div>
                  )
                })}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Billing" trailing={<Chip intent="success">Up to date</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate('/partner/pt07')}
                className="group block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={ReceiptText} tone="ink" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">February invoice</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">31 sessions · paid Feb 28</div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="font-mono text-[14px] font-black tabular-nums tracking-tight text-[#0B211B]">₹96,400</span>
                      <Chip intent="success">Paid</Chip>
                    </div>
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of partnership" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheetOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            key="alerts"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={Bell} tone="warning" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Partner alerts</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Everything that moved while you were away</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setSheetOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close alerts"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="flex flex-col">
              {alerts.map((a, i) => (
                <div key={a.title}>
                  {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                  <div className="flex items-center gap-3 px-1 py-3.5">
                    <Tile icon={a.icon} tone={a.tone} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{a.title}</div>
                      <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">{a.body}</div>
                    </div>
                    <TimeChip>{a.time}</TimeChip>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                markAllRead()
                setSheetOpen(false)
                notify({ title: 'All caught up', body: 'No new partner alerts today', kind: 'ok' })
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Mark all as read
            </motion.button>
            <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
              Alerts are quiet between 9 PM and 8 AM unless urgent.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
