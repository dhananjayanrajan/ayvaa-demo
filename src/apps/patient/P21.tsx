import { motion } from 'motion/react'
import { ChevronRight, FileText, Lock, TrendingUp, Undo2 } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { carePlan, lovedOnes } from '@/data/seed'
import { patientAuditEntries, patientDocuments } from '@/data/patientAudit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P21() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]

  return (
    <Screen>
      <AppBar
        title="Care records"
        subtitle={`${father.name} · ${carePlan.category.toLowerCase()} plan`}
        trailing={
          <button
            onClick={() => notify({ title: 'Records menu', body: 'Export, share with doctor, request changes', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Records menu"
          >
            <FileText className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Plan progress</div>
                  <div className="mt-0.5 text-2xl font-black text-brand-ink">
                    Week {carePlan.week} of {carePlan.weeks}
                  </div>
                </div>
                <Pill tone="ok" className="bg-white/80">
                  <TrendingUp className="size-3.5" /> {carePlan.status}
                </Pill>
              </div>
              <div className="h-2 rounded-full bg-white/65">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${carePlan.progress}%` }} />
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                {carePlan.visitsDone} visits done · 2 incidents resolved · consent active
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Documents and consent" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {patientDocuments.map((d, i) => {
                const locked = 'locked' in d && d.locked
                const chevron = 'chevron' in d && d.chevron
                return (
                  <div key={d.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button
                      onClick={() =>
                        notify({
                          title: d.name,
                          body: locked ? 'Decrypting for you · access logged in the audit record' : 'Opening record',
                          kind: 'info',
                        })
                      }
                      className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                    >
                      <IconTile icon={FileText} tone={locked ? 'error' : 'mint'} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">{d.name}</div>
                        <div className="truncate text-xs font-medium text-muted-foreground">{d.meta}</div>
                      </div>
                      {locked && <Lock className="size-4 shrink-0 text-muted-foreground" />}
                      {chevron && <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />}
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Recent audit activity" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {patientAuditEntries.map((e, i) => {
                const Icon = e.kind === 'view' ? Undo2 : ChevronRight
                return (
                  <div key={e.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <div className="flex items-start gap-3 px-2 py-1.5">
                      <IconTile icon={Icon} tone={e.kind === 'view' ? 'warn' : 'mint'} className="size-9" />
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-bold text-foreground">{e.title}</div>
                        <div className="text-xs font-medium text-muted-foreground">{e.body}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Undo2}
              body="Medical records are kept for ten years. Deleting early is blocked by the system itself."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of records" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
