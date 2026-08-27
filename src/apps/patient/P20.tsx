import { motion } from 'motion/react'
import {
  BedDouble,
  ChevronRight,
  ClipboardList,
  Droplets,
  HeartPulse,
  Lock,
  Pill as PillIcon,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Upload,
} from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { ActionRow, IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Separator } from '@/components/ui/separator'
import { lovedOnes, medications, prescribers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

function iconFor(purpose: string) {
  if (purpose.includes('Blood pressure')) return HeartPulse
  if (purpose.includes('Diabetes')) return Droplets
  if (purpose.includes('Cholesterol')) return BedDouble
  return ClipboardList
}

export function P20() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const active = medications.filter((m) => !m.low)
  const low = medications.find((m) => m.low)

  return (
    <Screen>
      <AppBar
        title="Prescriptions"
        subtitle={`${father.name} · four active prescriptions`}
        onBack={() => navigate('/patient/p19')}
        trailing={
          <button
            onClick={() => notify({ title: 'Add prescription', body: 'Only verified doctors can be added', kind: 'info' })}
            className="grid size-10.5 shrink-0 place-items-center rounded-full bg-tonal text-foreground/70 transition-colors hover:bg-mint"
            aria-label="Add prescription"
          >
            <Plus className="size-5" />
          </button>
        }
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <InfoCard
              icon={ShieldCheck}
              body="Only prescriptions from verified doctors can be added. Every change is checked by the nurse before the next dose."
            />
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Active prescriptions" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              {active.map((m, i) => {
                const Icon = iconFor(m.purpose)
                return (
                  <div key={m.id}>
                    {i > 0 && <Separator className="mx-3 my-2.5 bg-border/70" />}
                    <button
                      onClick={() => notify({ title: `${m.name} ${m.dose}`, body: `${m.prescriber} · ${m.schedule}`, kind: 'info' })}
                      className="flex w-full items-center gap-3 px-2 py-1.5 text-left"
                    >
                      <IconTile icon={Icon} tone="mint" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold text-foreground">
                          {m.name} {m.dose}
                        </div>
                        <div className="truncate text-xs font-medium text-muted-foreground">
                          {m.schedule} · {m.prescriber} · {m.stock}
                        </div>
                      </div>
                      <ChevronRight className="size-4.5 shrink-0 text-muted-foreground" />
                    </button>
                  </div>
                )
              })}
            </ScreenCard>
          </motion.div>

          {low && (
            <>
              <motion.div variants={item}>
                <SectionHeader label="Needs attention" />
              </motion.div>
              <motion.div variants={item}>
                <ScreenCard tone="error" className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <IconTile icon={PillIcon} tone="destructive" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-destructive">{low.name} · running low</div>
                      <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                        {low.stock} · refill prescribed by {low.prescriber}
                      </div>
                    </div>
                  </div>
                  <SmoothButton
                    variant="outline"
                    shape="pill"
                    className="w-full bg-card"
                    onClick={() => notify({ title: 'Refill ordered', body: 'Sunrise pharmacy will deliver within 24 hours', kind: 'ok' })}
                  >
                    <ShoppingCart className="size-4" /> Order refill from pharmacy
                  </SmoothButton>
                </ScreenCard>
              </motion.div>
            </>
          )}

          <motion.div variants={item}>
            <SectionHeader label="Prescription documents" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={ClipboardList} tone="error" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">Insulin prescription · {prescribers[1].split(' · ')[0]}</div>
                  <div className="text-xs font-medium text-muted-foreground">Uploaded March 10 · every view is logged</div>
                </div>
                <Lock className="size-4.5 shrink-0 text-muted-foreground" />
              </div>
              <Separator className="mx-3 my-2.5 bg-border/70" />
              <ActionRow
                icon={Upload}
                title="Upload a new prescription"
                subtitle="Photo or PDF from your doctor"
                onClick={() => notify({ title: 'Upload', body: 'Camera or file picker opens here', kind: 'info' })}
              />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of prescriptions" />
          </motion.div>
        </motion.div>
      </BodyArea>
    </Screen>
  )
}
