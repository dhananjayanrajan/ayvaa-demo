import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, ArrowUpRight, Building2, Eye, HeartHandshake, Inbox, Lock, Phone, Search, ShieldCheck, SlidersHorizontal, Stethoscope, X } from 'lucide-react'
import type { Intent, TileTone } from '@/components/base/phone/kit'
import { Card, Chip, Panel, Tile, rise } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import { Overline } from '@/components/base/phone/overline'
import { flaggedAccount, recentActivity } from '@/data/seed'
import { InfoListCard } from '@/components/patterns/cards/info-list-card'
import { ListRow } from '@/components/patterns/lists/list-row'

const accounts: { id: string; name: string; sub: string; icon: LucideIcon; tone: TileTone }[] = [
  { id: 'rao', name: 'Mr. Ramesh Rao', sub: 'Patient · Banjara Hills', icon: HeartHandshake, tone: 'success' },
  { id: 'iyer', name: 'Mrs. Shanta Iyer', sub: 'Patient · Jubilee Hills', icon: HeartHandshake, tone: 'success' },
  { id: 'deshmukh', name: 'Arjun Deshmukh', sub: 'Professional · RN', icon: Stethoscope, tone: 'info' },
  { id: 'sunrise', name: 'Sunrise Multispeciality', sub: 'Partner · Begumpet', icon: Building2, tone: 'neutral' },
]

interface AccountSearchProps {
  onSelect: (name: string) => void
}

export function AccountSearch({ onSelect }: AccountSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const blurRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const q = query.trim().toLowerCase()
  const results = q ? accounts.filter((a) => `${a.name} ${a.sub}`.toLowerCase().includes(q)) : []

  const closeSoon = () => {
    blurRef.current = setTimeout(() => setOpen(false), 120)
  }
  const keepOpen = () => {
    if (blurRef.current) clearTimeout(blurRef.current)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
      return
    }
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = results[activeIndex]
      if (selected) {
        onSelect(selected.name)
        setQuery('')
        setOpen(false)
      }
    }
  }

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3 ring-1 ring-inset ring-white/10 transition-all duration-200 focus-within:ring-2 focus-within:ring-emerald-300/50',
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-emerald-200/60" aria-hidden />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActiveIndex(0)
          }}
          onFocus={() => setOpen(true)}
          onBlur={closeSoon}
          placeholder="Search name, phone, licence…"
          aria-label="Search accounts"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-white placeholder:text-emerald-100/35 focus:outline-none"
        />
        {query && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onMouseDown={keepOpen}
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-100/70 transition-colors hover:bg-white/20"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" strokeWidth={3} aria-hidden />
          </motion.button>
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
            className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-3xl border border-[#0B211B]/[0.07] bg-white shadow-[0_28px_56px_-24px_rgba(6,40,30,0.45)]"
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
                <motion.button
                  key={a.id}
                  type="button"
                  onMouseDown={keepOpen}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    onSelect(a.name)
                    setQuery('')
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150',
                    i === activeIndex ? 'bg-emerald-500/[0.08]' : 'hover:bg-[#0B211B]/[0.03]',
                  )}
                >
                  <Tile icon={a.icon} tone={a.tone} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{a.name}</span>
                    <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">{a.sub}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-emerald-500/60" aria-hidden />
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface FlaggedAccountCardProps {
  notify: NotifyFn
  onMoreActions: () => void
}

export function FlaggedAccountCard({ notify, onMoreActions }: FlaggedAccountCardProps) {
  return (
    <motion.div variants={rise}>
      <Card intent="danger">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <Tile icon={AlertTriangle} tone="danger" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
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

          
          <div className="flex gap-2.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => notify({ title: 'Family contacted', body: 'Guardian called · outcome logged', kind: 'ok' })}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-3.5 text-[13px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.75)] transition-all duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              <span className="truncate">Contact family</span>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={onMoreActions}
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#0B231C] to-[#123229] text-emerald-200 shadow-[0_12px_24px_-14px_rgba(6,40,30,0.7)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
              aria-label="More actions"
            >
              <SlidersHorizontal className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

const items = [
  { icon: Eye, text: 'Every view is logged with your name' },
  { icon: ShieldCheck, text: 'Flagged accounts are supervisor-only' },
  { icon: Lock, text: 'Access writes to the immutable audit record' },
]

export function PrivacyRulesCard() {
  return (
    <motion.div variants={rise}>
      <InfoListCard
        icon={Eye}
        title="Private by default"
        subtitle="Account access is never silent. Each rule below is enforced by the platform itself."
        items={items}
        footer={
          <>
            <Chip intent="neutral" light icon={Lock}>Audit-grade</Chip>
            <Chip intent="success" light>Zero silent access</Chip>
          </>
        }
      />
    </motion.div>
  )
}

const iconMap: Record<string, LucideIcon> = {
  Partner: Building2,
  Guardian: HeartHandshake,
  RN: Stethoscope,
}

const statusStyle: Record<string, { tile: TileTone; intent: Intent }> = {
  Healthy: { tile: 'success', intent: 'success' },
  None: { tile: 'neutral', intent: 'neutral' },
}

const filterRoleMap: Record<string, string[]> = {
  all: ['Partner', 'Guardian', 'RN'],
  patients: ['Guardian'],
  pros: ['RN'],
  partners: ['Partner'],
}

interface RecentActivityListProps {
  filter: string
  notify: NotifyFn
}

export function RecentActivityList({ filter, notify }: RecentActivityListProps) {
  const allowedRoles = filterRoleMap[filter] ?? []
  const visible = filter === 'all' ? recentActivity : recentActivity.filter((a) => allowedRoles.includes(a.role))

  return (
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
                <ListRow
                  icon={Icon}
                  tone={s.tile}
                  title={a.name}
                  subtitle={a.body}
                  onClick={() => notify({ title: 'Account opened', body: `${a.name} · access logged`, kind: 'info' })}
                  trailing={<Chip intent={s.intent}>{a.pill}</Chip>}
                  showChevron={false}
                />
              </div>
            )
          })
        )}
      </Card>
    </motion.div>
  )
}
