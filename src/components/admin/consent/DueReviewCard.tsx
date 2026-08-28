import { motion } from 'motion/react'
import { CalendarClock, FileText, Phone } from 'lucide-react'
import { Card, Chip, Meter, Panel, Tile, rise } from '@/components/phone/kit'
import { Overline } from '@/components/admin/ui/Overline'
import { TonalButton } from '@/components/admin/ui/TonalButton'
import { CycleStep } from '@/components/admin/consent/CycleStep'
import { consentReview } from '@/data/seed'

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface DueReviewCardProps {
  notify: NotifyFn
}

export function DueReviewCard({ notify }: DueReviewCardProps) {
  const facts: [string, string][] = [
    ['Signed', consentReview.signed],
    ['Pauses', consentReview.pauses],
    ['Reminded', consentReview.reminded],
  ]

  const dueSteps: { label: string; sub: string; done: boolean }[] = [
    { label: 'Signed', sub: String(consentReview.signed), done: true },
    { label: 'Reminded', sub: `${consentReview.reminded}x`, done: true },
    { label: 'Due now', sub: consentReview.due, done: false },
  ]

  return (
    <motion.div variants={rise}>
      <Card intent="warning">
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-400" />
        <div className="p-5">
          <div className="flex items-start gap-3.5">
            <Tile icon={CalendarClock} tone="warning" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">{consentReview.name}</span>
                <Chip intent="warning" dot>{consentReview.due}</Chip>
              </div>
              <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{consentReview.category}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-2">
              <Overline>90-day cycle</Overline>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-700">Day 78 of 90</span>
            </div>
            <Meter value={78 / 90} intent="warning" delay={0.2} className="mt-2" />

            <div className="mt-4 flex items-start justify-between">
              {dueSteps.map((s) => (
                <CycleStep key={s.label} label={s.label} sub={s.sub} done={s.done} />
              ))}
            </div>
          </div>

          <Panel intent="neutral" className="mt-4">
            <div className="grid grid-cols-3 divide-x divide-[#0B211B]/[0.06]">
              {facts.map(([k, v]) => (
                <div key={k} className="flex min-w-0 flex-col items-center gap-1 px-2 py-3">
                  <span className="max-w-full truncate text-[14px] font-extrabold tabular-nums leading-none text-[#0B211B]">{v}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{k}</span>
                </div>
              ))}
            </div>
          </Panel>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {consentReview.pills.map((p) => (
              <Chip key={p} intent="neutral">
                {p}
              </Chip>
            ))}
          </div>

          <div className="mt-4 flex gap-2.5">
            <TonalButton
              tone="neutral"
              icon={FileText}
              onClick={() =>
                notify({ title: 'Record opened', body: `${consentReview.name} · consent history attached`, kind: 'info' })
              }
            >
              View record
            </TonalButton>
            <TonalButton
              tone="primary"
              icon={Phone}
              onClick={() => notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })}
            >
              Call guardian
            </TonalButton>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
