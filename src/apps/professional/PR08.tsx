import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, Edit3, ImagePlus, Send, ShieldAlert, X } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { IconTile, ScreenCard } from '@/components/phone/ScreenBlocks'
import { Chip } from '@/components/phone/Controls'
import { incidents, lovedOnes } from '@/data/seed'
import { incidentCauses } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const severities = ['Minor', 'Moderate', 'Critical'] as const

export function PR08() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const reference = incidents[0]
  const [severity, setSeverity] = useState<string>('Moderate')
  const [cause, setCause] = useState(incidentCauses[0])
  const [photo, setPhoto] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle="Reporting an incident · walk paused"
        onBack={() => navigate('/professional/pr06')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <IconTile icon={ShieldAlert} tone="warn" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">Guided walk paused</div>
                <div className="text-xs font-medium text-muted-foreground">8 of 15 minutes done · care holds until this is filed</div>
              </div>
            </ScreenCard>
          </motion.div>
        </motion.div>
      </BodyArea>

      <AnimatePresence>
        {!submitted && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)]"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-50 flex max-h-[86%] flex-col gap-3 overflow-y-auto rounded-t-[24px] border border-border bg-card p-5 pb-7 shadow-[0_-10px_40px_rgba(0,0,0,0.22)]">
        <div className="mx-auto h-1 w-[34px] shrink-0 rounded-full bg-border" />
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <span className="grid size-14 place-items-center rounded-full bg-error-bg">
                <ShieldAlert className="size-7 text-destructive" />
              </span>
              <div className="text-base font-bold text-foreground">{severity} incident filed</div>
              <div className="max-w-[280px] text-center text-[13px] font-medium leading-snug text-muted-foreground">
                Linked to this visit and {father.name.split(' ')[0]}'s care plan.
                {severity !== 'Minor' && ' A supervisor was paged immediately and the care plan is paused until reviewed.'}
              </div>
              <SmoothButton
                variant="default"
                shape="pill"
                size="lg"
                className="mt-2 w-full"
                onClick={() => navigate(severity === 'Minor' ? '/professional/pr06' : '/professional/pr04')}
              >
                {severity === 'Minor' ? 'Resume the visit' : 'Back to sessions'}
              </SmoothButton>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <IconTile icon={ShieldAlert} tone="destructive" />
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-foreground">Report patient incident</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Links to this visit and his care plan automatically
                  </div>
                </div>
                <button onClick={() => navigate('/professional/pr06')} aria-label="Close">
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex gap-2">
                {severities.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={cn(
                      'flex-1 rounded-full py-2.5 text-[13px] font-bold transition-colors',
                      severity === s
                        ? s === 'Critical'
                          ? 'bg-error-bg text-destructive'
                          : s === 'Moderate'
                            ? 'bg-warn-bg text-warn-ink'
                            : 'bg-tonal text-foreground'
                        : 'bg-tonal text-foreground/60',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {incidentCauses.map((c) => (
                  <Chip key={c} on={cause === c} onClick={() => setCause(c)}>
                    {cause === c && <Check className="size-3.5" />}
                    {c}
                  </Chip>
                ))}
              </div>

              <button
                onClick={() => notify({ title: 'Description', body: `${cause} · ${severity.toLowerCase()} · logged with your location`, kind: 'info' })}
                className="flex min-h-[86px] w-full items-start gap-2.5 rounded-[14px] border border-border bg-background p-3.5 text-left"
              >
                <Edit3 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <span className="text-[13px] font-medium leading-snug text-muted-foreground">{reference.summary}</span>
              </button>

              <button
                onClick={() => {
                  setPhoto(true)
                  notify({ title: 'Photo attached', body: reference.photo ?? 'hallway-rug.jpg · access is logged', kind: 'info' })
                }}
                className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full border border-border bg-card px-4"
              >
                <ImagePlus className="size-5 shrink-0 text-primary" />
                <span className="text-sm font-bold text-primary">
                  {photo ? `${reference.photo ?? 'photo'} attached` : 'Attach photo of the area'}
                </span>
              </button>

              <ScreenCard tone="mint" className="flex items-center gap-2.5 p-3">
                <ShieldAlert className="size-4 shrink-0 fill-current text-brand-ink" />
                <span className="text-xs font-medium leading-snug text-brand-ink">
                  Moderate and critical reports page a supervisor immediately and pause the care plan until reviewed.
                </span>
              </ScreenCard>

              <SmoothButton
                variant={severity === 'Critical' ? 'destructive' : 'default'}
                shape="pill"
                size="lg"
                className="w-full"
                onClick={() => {
                  setSubmitted(true)
                  notify({
                    title: `${severity} incident submitted`,
                    body: 'Sealed on submission · due within one hour of the event',
                    kind: severity === 'Minor' ? 'warn' : 'error',
                  })
                }}
              >
                <Send className="size-4" /> Submit incident report
              </SmoothButton>
              <div className="text-center text-xs font-medium text-muted-foreground">
                Due within one hour of the event · your report is sealed on submission.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  )
}
