import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, CheckCircle2, ClipboardList, HeartPulse, Lock, Pill as PillIcon, ScanLine, TrendingDown } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Chip, Field } from '@/components/phone/Controls'
import { lovedOnes } from '@/data/seed'
import { medVerification, quickTags, sessionNote } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

type Mode = 'vitals' | 'meds' | 'notes'

const modeLabels: Record<Mode, { title: string; subtitle: string }> = {
  vitals: { title: 'Record vital signs', subtitle: 'Saved to the visit log and compared with last visit' },
  meds: { title: 'Give Amlodipine 5 mg', subtitle: 'Once daily, morning · prescribed by Dr. Venkatesh' },
  notes: { title: 'Session notes', subtitle: 'The family sees these in the visit summary' },
}

export function PR07() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [mode, setMode] = useState<Mode>('vitals')
  const [checks, setChecks] = useState<string[]>(medVerification)
  const [tags, setTags] = useState<string[]>(['Good mobility', 'Good appetite'])

  const toggleCheck = (v: string) =>
    setChecks((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const allChecked = checks.length === medVerification.length

  const save = () => {
    const messages: Record<Mode, { title: string; body: string }> = {
      vitals: { title: 'Readings saved', body: '128/76 · 72 bpm · 97% · sealed at sign off', kind: 'ok' },
      meds: {
        title: allChecked ? 'Dose confirmed' : 'Verification incomplete',
        body: allChecked ? 'Amlodipine 5 mg given · recorded permanently' : 'Complete all three checks before giving the dose',
        kind: allChecked ? 'ok' : 'warn',
      },
      notes: { title: 'Notes saved', body: 'Written by you alone · sealed at sign off', kind: 'ok' },
    }
    notify(messages[mode])
  }

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle="Entry sheets · step 2 of 5"
        onBack={() => navigate('/professional/pr06')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <IconTile icon={Check} tone="mint" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">Checked in</div>
                <div className="text-xs font-medium text-muted-foreground">GPS matched at 2:02 PM</div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item} className="flex gap-2">
            <Chip on={mode === 'vitals'} onClick={() => setMode('vitals')}>
              <HeartPulse className="size-3.5" /> Vitals
            </Chip>
            <Chip on={mode === 'meds'} onClick={() => setMode('meds')}>
              <PillIcon className="size-3.5" /> Meds
            </Chip>
            <Chip on={mode === 'notes'} onClick={() => setMode('notes')}>
              <ClipboardList className="size-3.5" /> Notes
            </Chip>
          </motion.div>
        </motion.div>
      </BodyArea>

      <AnimatePresence>
        <motion.div
          key="dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)]"
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-50 flex max-h-[86%] flex-col gap-3 overflow-y-auto rounded-t-[24px] border border-border bg-card p-5 pb-7 shadow-[0_-10px_40px_rgba(0,0,0,0.22)]">
        <div className="mx-auto h-1 w-[34px] shrink-0 rounded-full bg-border" />

        <div className="flex items-center gap-3">
          <IconTile
            icon={mode === 'vitals' ? HeartPulse : mode === 'meds' ? PillIcon : ClipboardList}
            tone="mint"
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-foreground">{modeLabels[mode].title}</div>
            <div className="text-xs font-medium text-muted-foreground">{modeLabels[mode].subtitle}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'vitals' && (
            <motion.div key="vitals" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2.5">
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <Field hint="Pressure · 128/76" />
                </div>
                <div className="flex-1">
                  <Field hint="Pulse · 72 bpm" />
                </div>
              </div>
              <div className="flex gap-2.5">
                <div className="flex-1">
                  <Field hint="Oxygen · 97%" />
                </div>
                <div className="flex-1">
                  <Field hint="Temp · 36.7°C" />
                </div>
              </div>
              <ScreenCard tone="mint" className="flex items-center gap-2.5 p-3">
                <TrendingDown className="size-4 shrink-0 fill-current text-brand-ink" />
                <span className="text-xs font-medium text-brand-ink">
                  Blood pressure is 4 points lower than Monday. Within normal range.
                </span>
              </ScreenCard>
            </motion.div>
          )}

          {mode === 'meds' && (
            <motion.div key="meds" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2.5">
              <ScreenCard tone="mint" className="flex flex-col gap-2.5">
                <SectionHeader className="text-brand-ink/70" label="Verification steps · all required" />
                {medVerification.map((v) => (
                  <button key={v} onClick={() => toggleCheck(v)} className="flex w-full items-center gap-2.5 text-left">
                    <span
                      className={cn(
                        'grid size-[22px] shrink-0 place-items-center rounded-[7px] border-2 transition-colors',
                        checks.includes(v) ? 'border-brand-ink bg-brand-ink text-white' : 'border-brand-ink/40 bg-white/60',
                      )}
                    >
                      {checks.includes(v) && <Check className="size-4" />}
                    </span>
                    <span className="text-xs font-medium text-brand-ink">{v}</span>
                  </button>
                ))}
              </ScreenCard>
              <Field
                icon={ScanLine}
                value="Pack barcode scanned · matched"
                hint="Scan pack barcode"
                onClick={() => notify({ title: 'Barcode matched', body: 'Label verified against the prescription', kind: 'ok' })}
              />
              <Field hint="Given with · water" />
              {!allChecked && (
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-warn-ink">
                  <Lock className="size-3.5" /> Confirm button stays honest · complete all three checks first
                </div>
              )}
            </motion.div>
          )}

          {mode === 'notes' && (
            <motion.div key="notes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2.5">
              <button
                onClick={() => notify({ title: 'Notes', body: 'Your words go to the family verbatim', kind: 'info' })}
                className="flex min-h-[120px] w-full items-start gap-2.5 rounded-[14px] border border-border bg-background p-3.5 text-left"
              >
                <ClipboardList className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <span className="text-[13px] font-medium leading-snug text-foreground/85">{sessionNote}</span>
              </button>
              <SectionHeader label="Quick tags" />
              <div className="flex flex-wrap gap-2">
                {quickTags.map((t) => (
                  <Chip key={t} on={tags.includes(t)} onClick={() => toggleTag(t)}>
                    {tags.includes(t) && <Check className="size-3.5" />}
                    {t}
                  </Chip>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <SmoothButton
          variant="default"
          shape="pill"
          size="lg"
          className="w-full"
          onClick={save}
        >
          <CheckCircle2 className="size-4" />
          {mode === 'vitals' ? 'Save readings' : mode === 'meds' ? 'Confirm dose given' : 'Save notes'}
        </SmoothButton>
        <div className="text-center text-xs font-medium text-muted-foreground">
          {mode === 'meds'
            ? 'Dose recording is permanent once saved and cannot be edited later.'
            : 'Sealed once the visit is signed off.'}
        </div>
      </div>
    </Screen>
  )
}
