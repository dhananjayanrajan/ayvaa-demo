import { useState } from 'react'
import { motion } from 'motion/react'
import { BellRing, ChevronDown, Siren, UserRound } from 'lucide-react'
import {
  Card,
  Chip,
  Expand,
  Panel,
  TimeChip,
  Tile,
  rise,
} from '@/components/base/phone/kit'
import { incidents } from '@/data/seed'
import type { Incident } from '@/data/types'
import { cn } from '@/lib/utils'

type NotifyFn = (payload: {
  title: string
  body: string
  kind: 'ok' | 'warn' | 'info'
}) => void

const severityMeta: Record<
  Incident['severity'],
  { node: string; rail: string; chip: 'danger' | 'warning'; label: string }
> = {
  critical: {
    node: 'bg-gradient-to-br from-rose-500 to-red-500 shadow-[0_6px_14px_-6px_rgba(244,63,94,0.7)]',
    rail: 'bg-rose-500/25',
    chip: 'danger',
    label: 'Critical',
  },
  minor: {
    node: 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_6px_14px_-6px_rgba(245,158,11,0.7)]',
    rail: 'bg-amber-500/25',
    chip: 'warning',
    label: 'Minor',
  },
}

interface IncidentTimelineCardProps {
  notify: NotifyFn
  delivered: boolean
}

export function IncidentTimelineCard({ notify, delivered }: IncidentTimelineCardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <motion.div variants={rise}>
      <Card>
        <div className="p-5 pb-2">
          <div className="flex items-center gap-3">
            <Tile icon={Siren} tone="danger" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">
                Incident timeline
              </div>
              <div className="mt-0.5 text-[11px] font-medium text-[#0B211B]/50">
                {incidents.length} incidents · each linked to its session & plan
              </div>
            </div>
            {delivered ? (
              <Chip intent="danger" dot className="border-transparent">Live</Chip>
            ) : (
              <Chip intent="neutral" className="border-transparent">Idle</Chip>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-rose-500/30 via-amber-500/25 to-transparent"
            />
            <div className="flex flex-col">
              {delivered && (
                <div className="relative flex gap-3">
                  <div className="relative z-10 flex w-[30px] shrink-0 justify-center pt-4">
                    <span
                      aria-hidden
                      className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-emerald-500"
                    >
                      <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pb-4">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 p-3">
                      <div className="flex items-center gap-2">
                        <TimeChip>Now</TimeChip>
                        <span className="min-w-0 flex-1 break-words text-[13px] font-bold tracking-tight text-[#0B211B]">
                          Alert delivered
                        </span>
                        <Chip intent="success" icon={BellRing} className="shrink-0">Paged</Chip>
                      </div>
                      <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#0B211B]/60">
                        Near fall · Mrs. Iyer · fanned out to all 5 destinations in 0.4s
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {incidents.map((inc) => {
                const meta = severityMeta[inc.severity]
                const open = expandedId === inc.id
                return (
                  <div key={inc.id} className="relative flex gap-3">
                    <div className="relative z-10 flex w-[30px] shrink-0 justify-center pt-4">
                      <span
                        aria-hidden
                        className={cn('h-[15px] w-[15px] rounded-full ring-4 ring-white', meta.node)}
                      />
                    </div>
                    <div className="min-w-0 flex-1 pb-4">
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setExpandedId(open ? null : inc.id)
                          if (!open)
                            notify({
                              title: `Supervisor notified · ${inc.patient}`,
                              body: `${inc.raised} · ${inc.tags[0]} · paged to the on-call supervisor`,
                              kind: inc.severity === 'critical' ? 'warn' : 'info',
                            })
                        }}
                        className="group w-full rounded-2xl border border-[#0B211B]/[0.05] bg-white p-3 text-left transition-colors hover:border-[#0B211B]/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        <div className="flex items-start gap-2">
                          <TimeChip>{inc.raised}</TimeChip>
                          <span className="min-w-0 flex-1 break-words text-[13px] font-bold tracking-tight text-[#0B211B]">
                            {inc.patient}
                          </span>
                          <span className="flex shrink-0 items-center gap-1">
                            <Chip intent={meta.chip}>{meta.label}</Chip>
                            <motion.span
                              animate={{ rotate: open ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/25" aria-hidden />
                            </motion.span>
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                          {inc.summary}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          {inc.tags.map((t) => (
                            <span
                              key={t}
                              className="flex items-center gap-1 text-[10px] font-semibold text-[#0B211B]/45"
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  'h-1 w-1 rounded-full',
                                  inc.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500',
                                )}
                              />
                              {t}
                            </span>
                          ))}
                          <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-[#0B211B]/40">
                            <UserRound className="h-3 w-3" aria-hidden />
                            {inc.by}
                          </span>
                        </div>
                      </motion.button>

                      <Expand open={open}>
                        <div className="pt-2.5">
                          <Panel
                            intent={inc.severity === 'critical' ? 'danger' : 'warning'}
                            className="p-4"
                          >
                            <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-600/70">
                              <BellRing className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                              Supervisor received
                            </div>
                            <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-[#0B211B]/80">
                              {inc.decision}
                            </p>
                            <div className="mt-3 space-y-1.5 border-t border-[#0B211B]/[0.06] pt-3">
                              {inc.linkedVisit && (
                                <div className="text-[11px] font-semibold leading-snug text-[#0B211B]/55">
                                  {inc.linkedVisit}
                                </div>
                              )}
                              {inc.linkedPlan && (
                                <div className="text-[11px] font-semibold leading-snug text-[#0B211B]/55">
                                  {inc.linkedPlan}
                                </div>
                              )}
                              {inc.planPaused && (
                                <div className="text-[11px] font-bold text-rose-600/80">
                                  Care plan paused until supervisor closes it
                                </div>
                              )}
                            </div>
                          </Panel>
                        </div>
                      </Expand>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
