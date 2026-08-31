import { motion } from 'motion/react'
import { Check, Link2, PauseCircle, Siren } from 'lucide-react'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import { StepList } from '@/components/phone/StepList'
import { rise } from '@/components/phone/kit'
import { incidentLinking } from '@/data/seed'

interface IncidentLinkingCardProps {
  delivered?: boolean
}

const baseIncidents = [
  { title: 'Near fall', detail: 'Mrs. Iyer · Ward B', time: '9:40 AM', tag: 'Fall risk' },
  { title: 'Late dose', detail: 'Mr. Rao · Wing 2', time: '8:12 AM', tag: 'Medication' },
  { title: 'Equipment fault', detail: 'Lift · Block A', time: 'Monday', tag: 'Equipment' },
]

const liveIncident = {
  title: 'Pager escalation',
  detail: 'All supervisors notified',
  time: '9:41 AM',
  tag: 'Live',
}

function ChainNode({ label, state }: { label: string; state: 'linked' | 'paused' }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] py-1 pl-1.5 pr-2.5">
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
          state === 'linked' ? 'bg-emerald-400' : 'bg-rose-400'
        }`}
      >
        {state === 'linked' ? (
          <Check className="h-2 w-2 text-emerald-950" strokeWidth={4} aria-hidden />
        ) : (
          <PauseCircle className="h-2 w-2 text-rose-950" strokeWidth={3.5} aria-hidden />
        )}
      </span>
      <span className="text-[10px] font-bold text-white/80">{label}</span>
    </span>
  )
}

export function IncidentLinkingCard({ delivered = false }: IncidentLinkingCardProps) {
  const incidents = delivered ? [liveIncident, ...baseIncidents] : baseIncidents
  const count = delivered ? incidents.length : incidentLinking.count

  return (
    <motion.div variants={rise}>
      <PhaseHero theme={{ ...PHASE_THEME.rose, shadow: 'shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]' }}>
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
            <Link2 className="h-3 w-3" aria-hidden />
            Incident linking · auto-attached
          </div>
          <h3 className="mt-2 text-balance break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">
            {count} incidents{' '}
            <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">
              linked automatically
            </span>
          </h3>
          <p className="mt-1.5 text-pretty break-words text-[12px] font-medium leading-relaxed text-rose-100/60">
            {incidentLinking.body}
          </p>

          <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
            <span aria-hidden className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
            </span>
            <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
              Escalates to supervisors in 60 seconds
            </span>
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
              Incident timeline
            </div>
            <div className="mt-3 flex flex-col">
              <StepList
                nodeStyle="circle"
                nodeSize="md"
                theme="dark"
                steps={incidents.map((inc) => {
                  const live = inc.tag === 'Live'
                  return {
                    key: inc.title,
                    state: 'done',
                    node: (
                      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                        {live ? (
                          <span aria-hidden className="absolute h-5 w-5 animate-ping rounded-full bg-rose-400/40" />
                        ) : null}
                        <span className={`h-2.5 w-2.5 rounded-full ${live ? 'bg-rose-300' : 'bg-rose-400/80'}`} />
                      </span>
                    ),
                    title: inc.title,
                    titleClassName: 'truncate text-[13px]',
                    time: inc.time,
                    timeTrailing: true,
                    timeTrailingClassName: 'font-extrabold tabular-nums text-rose-100/45',
                    body: inc.detail,
                    bodyClassName: 'truncate text-[11px] font-medium text-rose-100/55',
                    trailing: (
                      <span className="shrink-0 rounded-full bg-white/[0.07] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-rose-100/60">
                        {inc.tag}
                      </span>
                    ),
                    contentClassName: inc.title === incidents[incidents.length - 1].title ? 'pb-0.5' : undefined,
                  }
                })}
              />
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
              {incidentLinking.paged}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <ChainNode label="Session record" state="linked" />
              <ChainNode label="Care plan" state="paused" />
              <ChainNode label="Audit trail" state="linked" />
            </div>
            <div className="mt-3 flex items-center gap-1.5 border-t border-white/[0.08] pt-2.5">
              <Check className="h-3 w-3 shrink-0 text-emerald-400" strokeWidth={3.5} aria-hidden />
              <span className="text-[10.5px] font-semibold text-rose-100/50">
                Closed loop · every incident lands in all three records
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-2xl bg-rose-400/[0.1] p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-400/[0.16]">
                <Siren className="h-3.5 w-3.5 text-rose-200" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">
                  Care plan impact
                </div>
                <p className="mt-1 break-words text-[12.5px] font-medium leading-relaxed text-white/85">
                  {incidentLinking.paused}
                </p>
              </div>
            </div>
          </div>
      </PhaseHero>
    </motion.div>
  )
}
