import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, ShieldAlert, X } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, Screen } from '@/components/phone/Screen'
import { Tile, rise, stagger } from '@/components/phone/kit'
import { lovedOnes } from '@/data/seed'
import { incidentCauses } from '@/data/professionalCare'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { IncidentHero } from '@/components/professional/incidents/IncidentHero'
import { SeveritySelector } from '@/components/professional/incidents/SeveritySelector'
import { TriggerPreview } from '@/components/professional/incidents/TriggerPreview'
import { CausePicker } from '@/components/professional/incidents/CausePicker'
import { DescriptionInput } from '@/components/professional/incidents/DescriptionInput'
import { PhotoAttach } from '@/components/professional/incidents/PhotoAttach'
import { SubmitButton, type SubmitStatus } from '@/components/professional/incidents/SubmitButton'
import { SubmittedPanel } from '@/components/professional/incidents/SubmittedPanel'
import { SEVERITIES, SEVERITY_CONFIG, type Severity } from '@/data/incidentData'

type Photo = { name: string; size: string; url: string }

export function PR08() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const [severity, setSeverity] = useState<Severity>('Moderate')
  const [cause, setCause] = useState(incidentCauses[0])
  const [draft, setDraft] = useState('')
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const photoUrl = useRef<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      if (photoUrl.current) URL.revokeObjectURL(photoUrl.current)
    },
    [],
  )

  const cfg = SEVERITY_CONFIG[severity]
  const canSubmit = severity === 'Minor' || (draft.trim().length > 0 && photo !== null)

  const resumeVisit = () => navigate('/professional/pr06')

  const clearAttachments = () => {
    setCause(incidentCauses[0])
    setDraft('')
    setPhoto(null)
    setSubmitted(false)
    setStatus('idle')
  }

  const pickSeverity = (s: Severity) => {
    if (s === severity) return
    setSeverity(s)
    clearAttachments()
    notify({
      title: `${s} severity selected`,
      body: SEVERITY_CONFIG[s].effects[0].text,
      kind: s === 'Critical' ? 'warn' : 'info',
    })
  }

  const attachPhoto = (file: Photo) => {
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current)
    photoUrl.current = file.url
    setPhoto(file)
    notify({ title: 'Photo attached', body: `${file.name} · ${file.size} · access is logged`, kind: 'ok' })
  }

  const submit = () => {
    if (!canSubmit) {
      notify({
        title: 'Report incomplete',
        body: 'Write a description and attach a photo before submitting',
        kind: 'warn',
      })
      return
    }
    if (status !== 'idle') return
    setStatus('sealing')
    timers.current.push(
      setTimeout(() => {
        setStatus('sealed')
        setSubmitted(true)
        notify({
          title: `${severity} incident submitted`,
          body: 'Sealed on submission · linked to visit and care plan',
          kind: cfg.submitKind,
        })
      }, 1100),
    )
  }

  const submittedCta = () => {
    if (severity === 'Minor') {
      notify({ title: 'Visit resumed', body: 'Guided walk continues from 8 of 15 min', kind: 'ok' })
      navigate('/professional/pr06')
    } else {
      navigate('/professional/pr04')
    }
  }

  return (
    <Screen>
      <AppBar
        title={`Visit with ${father.name.split(' ')[0]}`}
        subtitle="Reporting an incident"
        onBack={resumeVisit}
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-400/[0.14] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <IncidentHero config={cfg} />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {!submitted && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={resumeVisit}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.45)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <motion.div
        key="sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.4)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={submitted ? Check : ShieldAlert} tone={submitted ? cfg.tile : 'danger'} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {submitted ? `${severity} incident filed` : 'Report patient incident'}
              </div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {submitted
                  ? `Sealed on submission · linked to this visit and ${father.name.split(' ')[0]}'s care plan`
                  : 'Links to this visit and his care plan automatically'}
              </div>
            </div>
            {!submitted && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={resumeVisit}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
                aria-label="Close and resume visit"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            )}
          </div>
        </div>

        <div className={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-3.5', submitted ? 'pb-6' : 'pb-4')}>
          {submitted ? (
            <SubmittedPanel severity={severity} config={cfg} photo={photo?.name ?? null} />
          ) : (
            <div className="flex flex-col gap-3">
              <SeveritySelector severities={SEVERITIES} severity={severity} onSelect={pickSeverity} />

              <TriggerPreview config={cfg} severity={severity} />

              <CausePicker causes={incidentCauses} cause={cause} config={cfg} onSelect={setCause} />

              <DescriptionInput draft={draft} config={cfg} onChange={setDraft} />

              <PhotoAttach photo={photo} config={cfg} onAttach={attachPhoto} />
            </div>
          )}
        </div>

        <div className="shrink-0 px-5 pb-6 pt-3.5">
          {submitted ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={submittedCta}
              className={cn(
                'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white',
                cfg.cta,
              )}
            >
              {severity === 'Minor' ? 'Resume the visit' : 'Back to sessions'}
            </motion.button>
          ) : (
            <>
              <SubmitButton
                severityLabel={severity.toLowerCase()}
                ctaClass={cfg.cta}
                disabled={!canSubmit}
                status={status}
                onPress={submit}
              />
              <p className="mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">
                Due within one hour of the event · {cfg.note}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </Screen>
  )
}
