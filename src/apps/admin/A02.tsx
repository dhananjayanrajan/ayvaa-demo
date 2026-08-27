import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, Lock, ShieldAlert, X } from 'lucide-react'
import SmoothButton from '@/components/smoothui/smooth-button'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { IconTile, InfoCard, ScreenCard, SectionHeader } from '@/components/phone/ScreenBlocks'
import { Pill } from '@/components/phone/Controls'
import { Textarea } from '@/components/ui/textarea'
import { incidents } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

type Sheet = 'none' | 'photo' | 'escalate' | 'close'

export function A02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [sheet, setSheet] = useState<Sheet>('none')
  const inc = incidents[0]

  const escalateActions = [
    { label: 'Page supervisor on call', body: 'On-call supervisor notified immediately', kind: 'info' as const },
    { label: 'Notify family', body: 'Guardian updated on the incident', kind: 'info' as const },
    { label: 'Escalate to senior ops', body: 'Senior operations team now owns this incident', kind: 'warn' as const },
  ]

  return (
    <Screen>
      <AppBar
        title={`Near fall · ${inc.patient}`}
        subtitle={`Raised ${inc.raised} by ${inc.by}`}
        trailing={<Pill tone="error">Critical</Pill>}
      />
      <BodyArea>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={item}>
            <ScreenCard tone="error" className="flex items-start gap-3">
              <IconTile icon={ShieldAlert} tone="destructive" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-destructive">Care plan paused automatically</div>
                <div className="mt-0.5 text-[13px] font-medium leading-snug text-destructive/80">
                  Post-operative care plan · week 4 of 6 · paused until a supervisor closes this incident
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <ScreenCard>
              <div className="text-[13px] font-medium leading-snug text-foreground/80">{inc.summary}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {inc.tags.map((t) => (
                  <Pill key={t} tone="grey">{t}</Pill>
                ))}
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <button
              onClick={() => setSheet('photo')}
              className="flex w-full items-center gap-3 rounded-[20px] border border-border bg-card p-4 text-left"
            >
              <IconTile icon={Lock} tone="error" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-foreground">{inc.photo}</span>
                <span className="block text-xs font-medium text-muted-foreground">View is logged with your name</span>
              </span>
              <Lock className="size-4.5 shrink-0 text-muted-foreground" />
            </button>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Linked records" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard className="p-2">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={CheckCircle2} tone="mint" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{inc.linkedVisit}</div>
                  <div className="text-xs font-medium text-muted-foreground">Visit record · sealed</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 py-1.5">
                <IconTile icon={ShieldAlert} tone="warn" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-foreground">{inc.linkedPlan}</div>
                  <div className="text-xs font-medium text-muted-foreground">Care plan · paused</div>
                </div>
              </div>
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <SectionHeader label="Supervisor decision" />
          </motion.div>
          <motion.div variants={item}>
            <ScreenCard>
              <Textarea defaultValue={inc.decision} className="min-h-24 rounded-[14px] border-border bg-background text-[13px]" />
            </ScreenCard>
          </motion.div>

          <motion.div variants={item}>
            <InfoCard icon={ShieldAlert} body="Closing resumes the care plan and notifies the family and caregiver." />
          </motion.div>

          <motion.div variants={item}>
            <EndOfScroll label="End of incident" />
          </motion.div>
        </motion.div>
      </BodyArea>

      <FootBar>
        <div className="flex gap-2.5">
          <SmoothButton variant="destructive" shape="pill" size="lg" className="flex-1" onClick={() => setSheet('escalate')}>
            Escalate higher
          </SmoothButton>
          <SmoothButton variant="default" shape="pill" size="lg" className="flex-1" onClick={() => setSheet('close')}>
            Close incident
          </SmoothButton>
        </div>
      </FootBar>

      <AnimatePresence>
        {sheet !== 'none' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet('none')}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'photo' && (
          <motion.div
            key="photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col bg-[rgba(15,26,22,0.92)] p-5 pb-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-white/60">Incident photo</span>
              <button
                onClick={() => setSheet('none')}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white"
                aria-label="Close photo"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-4 grid flex-1 place-items-center rounded-[20px] bg-white/5">
              <Lock className="size-12 text-white/30" />
            </div>
            <div className="mt-4 flex flex-col gap-2 rounded-[20px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-white/60">Captured</span>
                <span className="font-bold text-white">9:38 AM · hallway camera</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-white/60">Viewed by</span>
                <span className="font-bold text-white">You · logged in audit</span>
              </div>
            </div>
            <SmoothButton
              variant="default"
              shape="pill"
              size="lg"
              className="mt-4 w-full"
              onClick={() => {
                setSheet('none')
                notify({ title: 'Access logged', body: 'Your view of this photo is written to the audit record', kind: 'info' })
              }}
            >
              Close and log my access
            </SmoothButton>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(sheet === 'escalate' || sheet === 'close') && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3 rounded-t-[24px] border border-border bg-card p-5 pb-7 shadow-[0_-10px_40px_rgba(0,0,0,0.22)]"
          >
            <div className="mx-auto h-1 w-[34px] shrink-0 rounded-full bg-border" />
            {sheet === 'escalate' ? (
              <>
                <div className="flex items-center gap-3">
                  <IconTile icon={ShieldAlert} tone="warn" />
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold text-foreground">Escalate this incident</div>
                    <div className="text-xs font-medium text-muted-foreground">Choose who takes it next</div>
                  </div>
                  <button onClick={() => setSheet('none')} aria-label="Close">
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>
                {escalateActions.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => {
                      setSheet('none')
                      notify({ title: a.label, body: a.body, kind: a.kind })
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[14px] p-3.5 text-left transition-colors',
                      a.kind === 'warn' ? 'bg-error-bg hover:bg-error-bg/80' : 'bg-tonal hover:bg-mint',
                    )}
                  >
                    <span className={cn('text-sm font-bold', a.kind === 'warn' ? 'text-destructive' : 'text-foreground')}>
                      {a.label}
                    </span>
                    <ChevronArrow />
                  </button>
                ))}
                <div className="text-center text-xs font-medium text-muted-foreground">
                  Every escalation is timestamped in the audit record.
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <IconTile icon={CheckCircle2} tone="mint" />
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold text-foreground">Close this incident?</div>
                    <div className="text-xs font-medium text-muted-foreground">
                      Closing resumes the care plan and notifies the family and caregiver.
                    </div>
                  </div>
                  <button onClick={() => setSheet('none')} aria-label="Close">
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>
                <ScreenCard tone="tonal" className="p-3">
                  <div className="text-[13px] font-medium leading-snug text-foreground/80">{inc.decision}</div>
                </ScreenCard>
                <SmoothButton
                  variant="default"
                  shape="pill"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setSheet('none')
                    notify({ title: 'Incident closed', body: 'Care plan resumed · family and caregiver notified', kind: 'ok' })
                    navigate('/admin/a01')
                  }}
                >
                  Confirm close
                </SmoothButton>
                <SmoothButton variant="outline" shape="pill" size="lg" className="w-full" onClick={() => setSheet('none')}>
                  Keep it open
                </SmoothButton>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}

function ChevronArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4.5 shrink-0 text-muted-foreground">
      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
