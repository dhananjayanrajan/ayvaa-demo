import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, Edit3, ImagePlus, Send, ShieldAlert, X } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { ScreenCard } from '@/components/phone/ScreenBlocks'
import { Chip } from '@/components/phone/Controls'
import { lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

const severities = ['Minor', 'Moderate', 'Critical'] as const
const causes = ['Near fall', 'Medication', 'Behaviour', 'Equipment']

export function P31() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [severity, setSeverity] = useState<string>('Critical')
  const [cause, setCause] = useState('Near fall')
  const [photo, setPhoto] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <Screen>
      <AppBar
        title="Visit in progress"
        subtitle="Guided walk · third step of five"
        onBack={() => navigate('/patient/p16')}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-brand-ink">
                <Check className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-foreground">Arrival verified</div>
                <div className="text-xs font-medium text-muted-foreground">Location matched at 2:02 PM</div>
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
              <div className="text-base font-bold text-foreground">{severity} incident reported</div>
              <div className="max-w-[280px] text-center text-[13px] font-medium leading-snug text-muted-foreground">
                Linked to this visit and {father.name.split(' ')[0]}'s care plan. Supervisors were notified within seconds.
                {severity === 'Critical' && ' The care plan is paused until a supervisor reviews it.'}
              </div>
              <SmoothButton
                variant="default"
                shape="pill"
                size="lg"
                className="mt-2 w-full"
                onClick={() => navigate(severity === 'Critical' ? '/patient/p31b' : '/patient/p16')}
              >
                {severity === 'Critical' ? 'View what happens now' : 'Back to visit'}
              </SmoothButton>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-[46px] shrink-0 place-items-center rounded-[14px] bg-error-bg text-destructive">
                  <ShieldAlert className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-foreground">Report an incident</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Links automatically to this visit and care plan
                  </div>
                </div>
                <button onClick={() => navigate('/patient/p16')} aria-label="Close">
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

              <div className="flex gap-2">
                {causes.map((c) => (
                  <Chip key={c} on={cause === c} onClick={() => setCause(c)}>
                    {c}
                  </Chip>
                ))}
              </div>

              <button
                onClick={() => notify({ title: 'Description', body: `${cause} · ${severity.toLowerCase()} · during guided walk`, kind: 'info' })}
                className="flex min-h-[86px] w-full items-start gap-2.5 rounded-[14px] border border-border bg-background p-3.5 text-left"
              >
                <Edit3 className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <span className="text-[13px] font-medium leading-snug text-muted-foreground">
                  Describe what happened, who was present, and what was done immediately after.
                </span>
              </button>

              <button
                onClick={() => {
                  setPhoto(true)
                  notify({ title: 'Photo attached', body: 'hallway-rug.jpg · access is logged', kind: 'info' })
                }}
                className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full border border-border bg-card px-4"
              >
                <ImagePlus className="size-5 shrink-0 text-primary" />
                <span className="text-sm font-bold text-primary">
                  {photo ? 'hallway-rug.jpg attached' : 'Attach photos or vitals reading'}
                </span>
              </button>

              <SmoothButton
                variant={severity === 'Critical' ? 'destructive' : 'default'}
                shape="pill"
                size="lg"
                className="w-full"
                onClick={() => {
                  setSubmitted(true)
                  notify({
                    title: `${severity} incident submitted`,
                    body: 'Linked to visit and care plan · supervisors notified',
                    kind: severity === 'Critical' ? 'error' : 'warn',
                  })
                }}
              >
                <Send className="size-4" /> Submit {severity.toLowerCase()} incident
              </SmoothButton>
              <div className="text-center text-xs font-medium text-muted-foreground">
                Supervisors are notified within seconds of submission.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Screen>
  )
}
