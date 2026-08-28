import { useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, ChevronRight, Clock, PauseCircle, ShieldCheck, UserCheck, X } from 'lucide-react'
import AgentAvatar from '@/components/smoothui/agent-avatar'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Panel, Section, Stat, rise, stagger } from '@/components/phone/kit'
import { staff } from '@/data/seed'
import type { StaffMember } from '@/data/types'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

export function PT05() {
  const { notify } = useDemo()
  const [list, setList] = useState<StaffMember[]>(staff)
  const pending = list.find((s) => s.status === 'pending')
  const active = list.filter((s) => s.status === 'active')
  const paused = list.filter((s) => s.status === 'paused')

  const decide = (id: string, approve: boolean) => {
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, status: approve ? 'active' : 'paused' } : s)))
    notify(
      approve
        ? { title: 'Staff approved', body: 'Kavitha Nair can now take Ayvaa sessions', kind: 'ok' }
        : { title: 'Request declined', body: 'Kavitha Nair was notified', kind: 'warn' },
    )
  }

  return (
    <Screen>
      <AppBar title="Staff on Ayvaa" subtitle="Sunrise Multispeciality Hospital" />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>Team roster · Sunrise panel</Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  Your people,{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">on Ayvaa</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  You approve who represents Sunrise. Ayvaa verifies everyone before their first session.
                </p>

                <div className="-mt-1 mt-4 flex items-center">
                  {active.slice(0, 3).map((s, i) => (
                    <span key={s.id} className={cn('rounded-full ring-2 ring-[#0B231C]', i > 0 && '-ml-2.5')}>
                      <AgentAvatar seed={s.name} size={36} />
                    </span>
                  ))}
                  {active.length > 3 && (
                    <span className="-ml-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/[0.1] text-[10px] font-extrabold text-emerald-100 ring-2 ring-[#0B231C]">
                      +{active.length - 3}
                    </span>
                  )}
                  <span className="ml-auto text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/40">
                    {active.length + pending ? active.length + (pending ? 1 : 0) + paused.length : 0} total
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  <Stat label="Active" value={active.length} dot="bg-emerald-300" />
                  <Stat label="Pending" value={pending ? 1 : 0} dot="bg-amber-300" />
                  <Stat label="Paused" value={paused.length} dot="bg-white/40" />
                </div>
              </Hero>
            </motion.div>

            {pending && (
              <>
                <motion.div variants={rise}>
                  <Section label="Approval queue" trailing={<Chip intent="warning" dot>1 waiting</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card intent="warning">
                    <div className="p-5">
                      <div className="flex items-center gap-3.5">
                        <span className="rounded-full ring-4 ring-amber-500/20">
                          <AgentAvatar seed={pending.name} size={52} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[15px] font-extrabold tracking-tight text-[#0B211B]">{pending.name}</div>
                          <div className="truncate text-xs font-semibold text-[#0B211B]/55">{pending.role}</div>
                        </div>
                        <Chip intent="warning" dot icon={Clock}>
                          Waiting
                        </Chip>
                      </div>

                      <Panel intent="warning" className="mt-4 p-3.5">
                        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-700/70">Why they want in</div>
                        <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{pending.note}</p>
                      </Panel>

                      <div className="mt-4 flex gap-2.5">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => decide(pending.id, false)}
                          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-rose-500/[0.1] py-3.5 text-[13px] font-bold text-rose-600"
                        >
                          <X className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                          <span className="truncate">Decline</span>
                        </motion.button>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => decide(pending.id, true)}
                          className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                        >
                          <UserCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                          <span className="truncate">Approve</span>
                        </motion.button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <Section label="Active staff" trailing={<Chip intent="success">{active.length} verified</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {active.map((s, i) => (
                  <div key={s.id}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => notify({ title: 'Staff opened', body: `${s.name} · profile and sessions attached`, kind: 'info' })}
                      className="group flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="relative shrink-0">
                        <AgentAvatar seed={s.name} size={44} />
                        <span className="absolute -bottom-0.5 -right-0.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                          <BadgeCheck className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{s.name}</span>
                        <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#0B211B]/45">{s.role}</span>
                      </span>
                      <ChevronRight
                        className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600"
                        aria-hidden
                      />
                    </motion.button>
                  </div>
                ))}
              </Card>
            </motion.div>

            {paused.length > 0 && (
              <>
                <motion.div variants={rise}>
                  <Section label="Paused" trailing={<Chip intent="neutral">{paused.length}</Chip>} />
                </motion.div>

                <motion.div variants={rise}>
                  <Card>
                    {paused.map((s, i) => (
                      <div key={s.id} className={cn(i > 0 && 'border-t border-[#0B211B]/[0.05]')}>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.985 }}
                          onClick={() => notify({ title: 'Staff opened', body: `${s.name} · paused by your admin`, kind: 'info' })}
                          className="flex w-full items-center gap-3 px-4 py-3.5 text-left opacity-60"
                        >
                          <AgentAvatar seed={s.name} size={40} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-bold tracking-tight text-[#0B211B]">{s.name}</span>
                            <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/45">{s.note}</span>
                          </span>
                          <Chip intent="neutral" icon={PauseCircle}>
                            Paused
                          </Chip>
                        </motion.button>
                      </div>
                    ))}
                  </Card>
                </motion.div>
              </>
            )}

            <motion.div variants={rise}>
              <div className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600/70" strokeWidth={2.4} aria-hidden />
                <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                  Every staff member is verified by Ayvaa before their first session. You approve who joins under Sunrise — approvals and
                  declines are both logged.
                </p>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of staff" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
    </Screen>
  )
}
