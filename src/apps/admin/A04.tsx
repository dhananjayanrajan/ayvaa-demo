import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Eye,
  HeartHandshake,
  Inbox,
  Lock,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import DropdownMenu from '@/components/smoothui/dropdown-menu'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import {
  Card,
  Chip,
  Hero,
  Kicker,
  Panel,
  Section,
  Stat,
  Tile,
  rise,
  stagger,
} from '@/components/phone/kit'
import type { Intent, TileTone } from '@/components/phone/kit'
import { flaggedAccount, recentActivity } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Partner: Building2,
  Guardian: HeartHandshake,
  RN: Stethoscope,
}

const statusStyle: Record<string, { tile: TileTone; intent: Intent }> = {
  Healthy: { tile: 'success', intent: 'success' },
  None: { tile: 'neutral', intent: 'neutral' },
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'patients', label: 'Patients' },
  { id: 'pros', label: 'Pros' },
  { id: 'partners', label: 'Partners' },
]

const accounts: { id: string; name: string; sub: string; icon: LucideIcon; tone: TileTone }[] = [
  { id: 'rao', name: 'Mr. Ramesh Rao', sub: 'Patient · Banjara Hills', icon: HeartHandshake, tone: 'success' },
  { id: 'iyer', name: 'Mrs. Shanta Iyer', sub: 'Patient · Jubilee Hills', icon: HeartHandshake, tone: 'success' },
  { id: 'deshmukh', name: 'Arjun Deshmukh', sub: 'Professional · RN', icon: Stethoscope, tone: 'info' },
  { id: 'sunrise', name: 'Sunrise Multispeciality', sub: 'Partner · Begumpet', icon: Building2, tone: 'neutral' },
]

const privacyRules: { icon: LucideIcon; text: string }[] = [
  { icon: Eye, text: 'Every view is logged with your name' },
  { icon: ShieldCheck, text: 'Flagged accounts are supervisor-only' },
  { icon: Lock, text: 'Access writes to the immutable audit record' },
]

function Overline({ icon: Icon, children }: { icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">
      {Icon && <Icon className="h-3 w-3" strokeWidth={2.5} aria-hidden />}
      <span>{children}</span>
    </div>
  )
}

function FilterBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[#0B211B]/[0.06] p-1" role="tablist">
      {filters.map((f) => {
        const active = value === f.id
        return (
          <motion.button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={active}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(f.id)}
            className="relative flex-1 rounded-full py-2.5"
          >
            {active && (
              <motion.span
                layoutId="a04-filter"
                transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_8px_18px_-8px_rgba(16,185,129,0.7)]"
              />
            )}
            <span
              className={cn(
                'relative block truncate text-[10px] font-extrabold uppercase tracking-[0.08em]',
                active ? 'text-white' : 'text-[#0B211B]/45',
              )}
            >
              {f.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

function TonalButton({
  tone,
  icon: Icon,
  onClick,
  children,
}: {
  tone: 'primary' | 'neutral'
  icon: LucideIcon
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-[13px] font-bold',
        tone === 'primary'
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)]'
          : 'bg-[#0B211B]/[0.06] text-[#0B211B]/75',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

function AccountSearch({ onSelect }: { onSelect: (name: string) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const blurRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const q = query.trim().toLowerCase()
  const results = q ? accounts.filter((a) => `${a.name} ${a.sub}`.toLowerCase().includes(q)) : []

  const closeSoon = () => {
    blurRef.current = setTimeout(() => setOpen(false), 120)
  }
  const keepOpen = () => {
    if (blurRef.current) clearTimeout(blurRef.current)
  }

  return (
    <div className="relative" onKeyDown={(e) => e.key === 'Escape' && (setOpen(false), setQuery(''))}>
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3 ring-1 ring-inset ring-white/10 transition-shadow focus-within:ring-2 focus-within:ring-emerald-300/50',
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-emerald-200/60" aria-hidden />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={closeSoon}
          placeholder="Search name, phone, licence…"
          aria-label="Search accounts"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-white placeholder:text-emerald-100/35 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onMouseDown={keepOpen}
            onClick={() => setQuery('')}
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-100/70"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" strokeWidth={3} aria-hidden />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && q && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseDown={keepOpen}
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-3xl border border-[#0B211B]/[0.07] bg-white shadow-[0_28px_56px_-24px_rgba(6,40,30,0.45)]"
          >
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-5 py-6 text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35">
                  <Inbox className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-[12.5px] font-bold text-[#0B211B]/60">No match for “{query}”</p>
                <p className="text-[11px] font-medium text-[#0B211B]/40">Try a name, phone or licence number</p>
              </div>
            ) : (
              results.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onMouseDown={keepOpen}
                  onClick={() => {
                    onSelect(a.name)
                    setQuery('')
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.03]',
                    i > 0 && 'border-t border-[#0B211B]/[0.05]',
                  )}
                >
                  <Tile icon={a.icon} tone={a.tone} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{a.name}</span>
                    <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">{a.sub}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-500/60" aria-hidden />
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function A04() {
  const { notify } = useDemo()
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? recentActivity : recentActivity.filter((a) => a.role.toLowerCase() === filter)

  return (
    <Screen>
      <AppBar
        title="Accounts"
        subtitle="Patients · professionals · partners"
        trailing={<AgentAvatar seed="ayvaa-accounts" size={42} />}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Directory · live</Kicker>
                <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  One console,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">every account</span>
                </h2>

                <div className="mt-4">
                  <AccountSearch onSelect={(name) => notify({ title: 'Account opened', body: `Viewing ${name} · access logged`, kind: 'info' })} />
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Patients" value="1,284" dot="bg-emerald-300" />
                  <Stat label="Pros" value="642" dot="bg-teal-300" />
                  <Stat label="Partners" value="415" dot="bg-sky-300/80" />
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="danger" light dot>1 flagged</Chip>
                  <Chip intent="warning" light>3 reviews pending</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <FilterBar value={filter} onChange={setFilter} />
            </motion.div>

            {filter === 'all' && (
              <motion.div variants={rise}>
                <Card intent="danger">
                  <div className="p-5">
                    <div className="flex items-start gap-3.5">
                      <Tile icon={AlertTriangle} tone="danger" size="lg" />
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                            {flaggedAccount.name}
                          </span>
                          <Chip intent="danger" dot>Flagged</Chip>
                        </div>
                        <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/60">
                          {flaggedAccount.body}
                        </p>
                      </div>
                    </div>

                    <Panel intent="warning" className="mt-4 p-3.5">
                      <Overline icon={AlertTriangle}>Active flags · {flaggedAccount.flags.length}</Overline>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {flaggedAccount.flags.map((t) => (
                          <Chip key={t} intent="warning">
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </Panel>

                    <div aria-hidden className="my-4 h-px bg-[#0B211B]/[0.06]" />

                    <div className="flex gap-2.5">
                      <TonalButton
                        tone="primary"
                        icon={Phone}
                        onClick={() => notify({ title: 'Family contacted', body: 'Guardian called · outcome logged', kind: 'ok' })}
                      >
                        Contact family
                      </TonalButton>
                      <DropdownMenu
                        items={[
                          {
                            key: 'area',
                            label: 'Adjust care area',
                            icon: <MapPin className="size-4" />,
                            onSelect: () =>
                              notify({ title: 'Area adjusted', body: 'Care area widened · new offers will reach more professionals', kind: 'info' }),
                          },
                          {
                            key: 'pause',
                            label: 'Pause account',
                            icon: <AlertTriangle className="size-4" />,
                            variant: 'destructive',
                            onSelect: () => notify({ title: 'Account paused', body: 'No new offers until reactivated', kind: 'warn' }),
                          },
                        ]}
                      >
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#0B231C] to-[#123229] text-emerald-200 shadow-[0_12px_24px_-14px_rgba(6,40,30,0.7)]"
                          aria-label="More actions"
                        >
                          <SlidersHorizontal className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
                        </motion.button>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div variants={rise}>
              <Section label="Recent activity" trailing={<Chip intent="neutral">{visible.length} shown</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {visible.length === 0 ? (
                  <div className="p-4">
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-600/20 bg-emerald-500/[0.04] px-6 py-8 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600">
                        <Inbox className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-bold tracking-tight text-[#0B211B]/70">No {filter} activity yet</p>
                        <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/45">
                          Nothing in this filter for the past 7 days
                        </p>
                      </div>
                      <Chip intent="success">Try the All tab</Chip>
                    </div>
                  </div>
                ) : (
                  visible.map((a, i) => {
                    const Icon = iconMap[a.role] ?? Eye
                    const s = statusStyle[a.pill] ?? { tile: 'warning' as TileTone, intent: 'warning' as Intent }
                    return (
                      <div key={i}>
                        {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.985 }}
                          onClick={() => notify({ title: 'Account opened', body: `${a.name} · access logged`, kind: 'info' })}
                          className="group flex w-full items-start gap-3 px-4 py-3.5 text-left"
                        >
                          <Tile icon={Icon} tone={s.tile} />
                          <div className="min-w-0 flex-1">
                            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{a.name}</div>
                            <div className="mt-0.5 line-clamp-2 text-xs font-medium leading-relaxed text-[#0B211B]/55">{a.body}</div>
                          </div>
                          <span className="flex shrink-0 items-center gap-1.5 pt-0.5">
                            <Chip intent={s.intent}>{a.pill}</Chip>
                          </span>
                        </motion.button>
                      </div>
                    )
                  })
                )}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-start gap-3.5">
                  <Tile icon={Eye} tone="white" size="lg" />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Private by default</div>
                    <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
                      Account access is never silent. Each rule below is enforced by the platform itself.
                    </p>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
                  {privacyRules.map((r, i) => (
                    <div key={r.text}>
                      {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                          <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="neutral" light icon={Lock}>Audit-grade</Chip>
                  <Chip intent="success" light>Zero silent access</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of accounts" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
