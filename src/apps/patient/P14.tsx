import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarDays, ChevronRight, Download, FileText, HeartPulse, Lock, Quote, ShieldCheck } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { lovedOnes, reports } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P14() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [latest, ...earlier] = reports
  const [openIdx, setOpenIdx] = useState<string | null>(null)

  const openReport = (month: string) => {
    const r = reports.find((x) => x.month === month)
    if (!r) return
    setOpenIdx(month)
    notify({ title: `${r.month} opened`, body: 'Opening a report is logged in the audit record', kind: 'info' })
  }

  return (
    <Screen>
      <AppBar
        title="Care reports"
        subtitle={`${father.name} · one report per completed month`}
        onBack={() => navigate('/patient/p13')}
        trailing={
          <button
            onClick={() => notify({ title: 'Download queued', body: 'All reports will be emailed as one PDF', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Download all"
          >
            <Download className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <SectionHeader label="Latest report · open" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{latest.month} · {latest.label}</span>
                <Pill tone={latest.trend === 'improving' ? 'ok' : 'grey'}>
                  {latest.trend === 'improving' ? 'Improving' : 'Steady'}
                </Pill>
              </div>
              <div className="flex flex-col">
                <MetricRow label="Visits completed" value={latest.visits} />
                <Separator className="mx-3 my-2 bg-border/70" />
                {latest.highlights.map((h) => (
                  <MetricRow key={h} label={h.split('·')[0].trim()} value={h.split('·')[1]?.trim() ?? 'Recorded'} />
                ))}
              </div>
              <ScreenCard tone="tonal" className="p-3">
                <div className="flex items-start gap-2.5">
                  <Quote className="size-4 shrink-0 fill-current text-brand-ink" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium leading-snug text-foreground/80">
                      "Ramesh walked the full fifteen minutes without support. Recommend continuing the current plan into month four."
                    </div>
                    <div className="mt-1.5 text-xs font-bold text-muted-foreground">
                      Lakshmi Reddy · sealed report
                    </div>
                  </div>
                </div>
              </ScreenCard>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Earlier reports" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {earlier.map((r, i) => (
                <div key={r.month}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <button
                    onClick={() => openReport(r.month)}
                    className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                  >
                    <IconTile icon={FileText} tone={openIdx === r.month ? 'mint' : 'tonal'} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">{r.month}</div>
                      <div className="truncate text-xs font-medium text-muted-foreground">{r.visits} · {r.highlights[0]}</div>
                    </div>
                    <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Lock}
              body="Reports are sealed when written and can never be edited afterwards. Opening one is always logged."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of reports" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-1.5">
      <span className="text-[13px] font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  )
}
