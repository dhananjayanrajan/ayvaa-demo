import { motion } from 'motion/react'
import { Check, Clock, Pill, Plus, Syringe } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill as PillTag } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { lovedOnes, medications } from '@/data/seed'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export function P19() {
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const taken = medications.filter((m) => m.takenToday)
  const due = medications.find((m) => !m.takenToday && !m.low)
  const nurseMeds = medications.filter((m) => m.schedule.includes('nurse') || m.low)

  return (
    <Screen>
      <AppBar
        title="Medicine schedule"
        subtitle={`${father.name} · Wednesday, March 13`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <button
            onClick={() => navigate('/patient/p20')}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Manage prescriptions"
          >
            <Plus className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="mint" className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.9px] text-brand-ink/70">Today's doses</div>
                  <div className="mt-0.5 text-2xl font-black text-brand-ink">
                    {taken.length} of {medications.length} taken
                  </div>
                </div>
                <span className="grid size-16 place-items-center rounded-full bg-white">
                  <Pill className="size-8 text-primary" />
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/65">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${(taken.length / medications.length) * 100}%` }} />
              </div>
              <div className="text-xs font-medium text-brand-ink/90">
                {medications.length - taken.length} doses remain · evening at 8:00 PM
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Morning · given by nurse" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {taken.map((m, i) => (
                <div key={m.id}>
                  {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                      <Check className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">
                        {m.name} {m.dose}
                      </div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {m.purpose} · given 8:05 AM by Lakshmi
                      </div>
                    </div>
                    <PillTag tone="ok">Taken</PillTag>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          {due && (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Afternoon" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#33739E] text-white">
                    <Clock className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-foreground">
                      {due.name} {due.dose}
                    </div>
                    <div className="truncate text-xs font-medium text-muted-foreground">
                      {due.purpose} · due now with lunch
                    </div>
                  </div>
                  <PillTag tone="warn">Due</PillTag>
                </ScreenCard>
              </motion.div>
            </>
          )}

          <motion.div variants={item}>
            <SectionHeader label="Evening" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {nurseMeds.map((m, i) => (
                <div key={m.id} className={cn(i > 0 && 'mt-1')}>
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <IconTile icon={Syringe} tone={i % 2 === 0 ? 'tonal' : 'mint'} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-foreground">
                        {m.name} {m.dose}
                      </div>
                      <div className="truncate text-xs font-medium text-muted-foreground">
                        {m.purpose} · nurse administered at 8:30 PM
                      </div>
                    </div>
                    <PillTag tone={m.low ? 'warn' : 'grey'}>{m.low ? 'Low' : 'Nurse'}</PillTag>
                  </div>
                </div>
              ))}
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard
              icon={Check}
              body="Every nurse-given dose is checked against the prescription and logged permanently."
            />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of medicine schedule" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
