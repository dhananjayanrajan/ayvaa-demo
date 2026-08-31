import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  CreditCard,
  Edit3,
  FileText,
  History,
  ImagePlus,
  Link2,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Meter, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type TopicId = 'scheduling' | 'caregiver' | 'billing' | 'records' | 'other'

const topics: { id: TopicId; label: string; icon: LucideIcon; sub: string; eta: string }[] = [
  { id: 'scheduling', label: 'Scheduling', icon: CalendarDays, sub: 'Times, days, reschedules', eta: '~5 min' },
  { id: 'caregiver', label: 'Caregiver', icon: UserRound, sub: 'Feedback, requests, concerns', eta: '~15 min' },
  { id: 'billing', label: 'Billing', icon: CreditCard, sub: 'Charges, refunds, statements', eta: '~1 hour' },
  { id: 'records', label: 'Records', icon: FileText, sub: 'Documents, access, consent', eta: '~1 hour' },
  { id: 'other', label: 'Something else', icon: Send, sub: 'Anything at all · we route it', eta: '~5 min' },
]

const canned: Record<TopicId, string[]> = {
  scheduling: [
    'Move all Friday visits to 10:00 AM',
    'Pause visits next week only',
    'Add one extra visit this month',
  ],
  caregiver: [
    'Request a different caregiver',
    'Share positive feedback',
    'Raise a concern privately',
  ],
  billing: [
    'Explain a charge on my statement',
    'Where is my refund?',
    'Update billing details',
  ],
  records: [
    'Share records with a new doctor',
    'Download all documents',
    'Question an access log entry',
  ],
  other: ['General question about Ayvaa', 'Feature suggestion', 'Something urgent but not emergency'],
}

type Attach = { id: number; label: string; kind: 'camera' | 'gallery' }

const linkableVisits = [
  { id: 'live', label: 'Today · live now', sub: 'Lakshmi Reddy · in progress' },
  { id: 'recent1', label: 'Mon, Mar 11 · 2:00 PM', sub: 'Lakshmi Reddy · completed' },
  { id: 'recent2', label: 'Fri, Mar 8 · 2:00 PM', sub: 'Lakshmi Reddy · refund issued' },
  { id: 'recent3', label: 'Wed, Mar 6 · 2:00 PM', sub: 'Lakshmi Reddy · completed' },
  { id: 'none', label: 'No visit link', sub: 'General request · not visit specific' },
]

function DarkRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-emerald-50/90">{v}</span>
    </div>
  )
}

export function P26() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [topic, setTopic] = useState<TopicId>('scheduling')
  const [message, setMessage] = useState('')
  const [photos, setPhotos] = useState<Attach[]>([])
  const [picker, setPicker] = useState(false)
  const [attachOpen, setAttachOpen] = useState(false)
  const [linkId, setLinkId] = useState('live')
  const [submitting, setSubmitting] = useState(false)

  const activeTopic = topics.find((t) => t.id === topic)!
  const linked = linkId !== 'none'
  const linkedLabel = linkableVisits.find((v) => v.id === linkId)!.label
  const linkedSub = linkableVisits.find((v) => v.id === linkId)!.sub

  const readiness = useMemo(() => {
    let score = 0.5
    if (message.trim().length >= 10) score += 0.3
    else if (message.trim().length > 0) score += 0.15
    if (linked) score += 0.2
    if (photos.length > 0) score = Math.min(1, score + 0.05)
    return Math.min(1, score)
  }, [message, linked, photos])

  const canSubmit = message.trim().length >= 10

  const addPhoto = (label: string, kind: 'camera' | 'gallery') => {
    const id = Date.now()
    setPhotos((prev) => (prev.length >= 5 ? prev : [...prev, { id, label, kind }]))
    notify({ title: 'Photo attached', body: `${label} · ${Math.min(photos.length + 1, 5)} of 5`, kind: 'ok' })
  }

  const submit = () => {
    if (!canSubmit || submitting) return
    setSubmitting(true)
    notify({
      title: 'Request submitted',
      body: `${activeTopic.label} · ${linked ? linkedLabel : 'no visit link'} · replies in ${activeTopic.eta}`,
      kind: 'ok',
    })
    navigate('/patient/p27')
  }

  return (
    <Screen>
      <AppBar title="New request" subtitle={`Care team replies in ${activeTopic.eta}`} onBack={() => navigate('/patient/p25')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <Kicker>
                  <Send className="h-3 w-3 text-emerald-300/80" aria-hidden />
                  New request · permanent record
                </Kicker>
                <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                  {activeTopic.label},{' '}
                  <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">handled fast</span>
                </h2>
                <p className="mt-1 text-[12px] font-medium leading-relaxed text-emerald-100/55">
                  {activeTopic.sub} · every reply is kept forever.
                </p>

                <div className="mt-4 rounded-2xl bg-emerald-400/[0.1] p-3.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
                    <span className="text-emerald-100/50">Request readiness</span>
                    <span className="tabular-nums text-emerald-200">{Math.round(readiness * 100)}%</span>
                  </div>
                  <Meter value={readiness} intent="success" delay={0.15} className="mt-2" />
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200/70">
                    <History className="h-3 w-3" strokeWidth={2.6} aria-hidden />
                    {canSubmit
                      ? linked
                        ? 'Ready · visit context attached'
                        : 'Ready · no visit linked'
                      : 'Write at least a sentence to submit'}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <span className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5">
                    <activeTopic.icon className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">{activeTopic.label}</span>
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setPicker(true)}
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <Link2 className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">
                      {linked ? linkedLabel : 'No link'}
                    </span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() =>
                      notify({
                        title: `${photos.length} photo${photos.length === 1 ? '' : 's'}`,
                        body: photos.length > 0 ? photos.map((p) => p.label).join(' · ') : 'No photos attached yet',
                        kind: 'info',
                      })
                    }
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <ImagePlus className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">
                      {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                    </span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() =>
                      notify({
                        title: `Reply ETA · ${activeTopic.eta}`,
                        body: `${activeTopic.label} requests are answered by the care team, ${activeTopic.eta} average`,
                        kind: 'info',
                      })
                    }
                    className="flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 transition-colors hover:bg-white/[0.12]"
                  >
                    <Clock className="h-3 w-3 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="whitespace-nowrap text-[10px] font-bold text-emerald-50/85">{activeTopic.eta}</span>
                  </motion.button>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="What is this about" trailing={<Chip intent="info">{activeTopic.eta} reply</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="grid grid-cols-2 gap-2.5">
                {topics.map((t) => {
                  const active = topic === t.id
                  return (
                    <motion.button
                      key={t.id}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setTopic(t.id)
                        notify({ title: t.label, body: `${t.sub} · replies average ${t.eta}`, kind: 'info' })
                      }}
                      className={cn(
                        'relative flex h-[72px] items-center gap-2.5 rounded-2xl p-3.5 text-left transition-colors',
                        active
                          ? 'bg-emerald-500/[0.1] shadow-[0_10px_24px_-14px_rgba(16,185,129,0.8)]'
                          : 'bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)] hover:bg-emerald-500/[0.04]',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                          active
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_6px_14px_-6px_rgba(16,185,129,0.8)]'
                            : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55',
                        )}
                      >
                        <t.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate text-[12px] font-bold leading-tight tracking-tight',
                            active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                          )}
                        >
                          {t.label}
                        </span>
                        <span className="mt-1 block truncate text-[9.5px] font-semibold text-[#0B211B]/40">{t.sub}</span>
                      </span>
                      {active && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_-4px_rgba(16,185,129,0.8)]"
                        >
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Link to a visit" trailing={<Chip intent={linked ? 'success' : 'neutral'}>{linked ? 'Linked' : 'Optional'}</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card intent={linked ? 'success' : 'neutral'}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setPicker(true)}
                  className="flex w-full items-center gap-3.5 p-5 text-left"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.8)]">
                    <CalendarDays className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{linkedLabel}</span>
                      {linkId === 'live' && <Chip intent="live" dot>Live</Chip>}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] font-semibold text-[#0B211B]/55">
                      {linkedSub} · tap to change
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Tell us what you need" trailing={<Chip intent={canSubmit ? 'success' : 'warning'} dot={!canSubmit}>{message.trim().length} chars</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
                    <Edit3 className="h-3 w-3" aria-hidden />
                    Your message · goes to the care team
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                    rows={4}
                    placeholder="Describe what you need — the more detail, the faster we can act."
                    className="mt-3 w-full resize-none rounded-2xl bg-white/[0.08] px-3.5 py-3 font-serif text-pretty text-[13.5px] font-medium leading-relaxed text-white outline-none transition-colors placeholder:text-emerald-100/35 focus:bg-white/[0.12]"
                  />

                  <div className="mt-2 flex items-center justify-between text-[9.5px] font-bold uppercase tracking-[0.1em] text-emerald-100/40">
                    <span>{canSubmit ? 'Ready to send' : 'Minimum 10 characters'}</span>
                    <span className="font-mono tabular-nums">{message.length} / 500</span>
                  </div>

                  <div className="mt-3">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/60">Quick starts · tap to fill</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {canned[topic].map((c) => (
                        <motion.button
                          key={c}
                          type="button"
                          whileTap={{ scale: 0.93 }}
                          onClick={() => {
                            setMessage(c + ' ')
                            notify({ title: 'Draft filled', body: c, kind: 'info' })
                          }}
                          className="flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-2 text-[10.5px] font-bold text-emerald-50/70 transition-colors hover:bg-white/[0.14]"
                        >
                          <Edit3 className="h-3 w-3 shrink-0 text-emerald-300/70" strokeWidth={2.6} aria-hidden />
                          {c}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div aria-hidden className="my-3 h-px bg-white/[0.08]" />

                  <div className="flex items-center justify-between">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/60">Photos · optional</div>
                    <span className="font-mono text-[9.5px] font-bold tabular-nums text-emerald-100/40">{photos.length} / 5</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {photos.map((p) => (
                      <motion.span
                        key={p.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-2 text-[10.5px] font-bold text-emerald-100"
                      >
                        <ImagePlus className="h-3 w-3 shrink-0" strokeWidth={2.6} aria-hidden />
                        {p.label}
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.85 }}
                          onClick={() => setPhotos((prev) => prev.filter((x) => x.id !== p.id))}
                          aria-label={`Remove ${p.label}`}
                          className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/[0.12] text-emerald-100/60"
                        >
                          <X className="h-2.5 w-2.5" aria-hidden />
                        </motion.button>
                      </motion.span>
                    ))}
                    {photos.length < 5 && (
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setAttachOpen(true)}
                        className="flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-2 text-[10.5px] font-bold text-emerald-50/70 transition-colors hover:bg-white/[0.14]"
                      >
                        <ImagePlus className="h-3 w-3 shrink-0" strokeWidth={2.6} aria-hidden />
                        Add photo
                      </motion.button>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-2.5 border-t border-white/[0.08] pt-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[10px] font-extrabold text-emerald-200">
                      P
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold text-emerald-50/80">Priya Sharma · guardian</span>
                    <span className="shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-200">
                      {canSubmit ? 'Ready' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="info" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="info" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Your request and every reply is kept as a permanent record, linked to the visit you choose. The care team
                  never sees your payment details.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of request" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <div className="flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={canSubmit ? { scale: 0.97 } : undefined}
            disabled={!canSubmit}
            onClick={submit}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
              canSubmit
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.06] text-[#0B211B]/30',
            )}
          >
            <span className="truncate">
              {submitting ? 'Submitting…' : canSubmit ? 'Submit request' : 'Write a message to submit'}
            </span>
            {canSubmit && !submitting && <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />}
          </motion.button>
          <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-semibold text-[#0B211B]/45">
            <Clock className="h-3 w-3" aria-hidden />
            {activeTopic.label} requests get replies in {activeTopic.eta} on average
          </div>
        </div>
      </FootBar>

      <AnimatePresence>
        {(picker || attachOpen) && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setPicker(false)
              setAttachOpen(false)
            }}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {picker && (
          <motion.div
            key="picker"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <Link2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Link a visit</div>
                  <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">Context helps the team act faster</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setPicker(false)}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="flex flex-col gap-2">
                {linkableVisits.map((v) => {
                  const active = linkId === v.id
                  return (
                    <motion.button
                      key={v.id}
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        setLinkId(v.id)
                        setPicker(false)
                        notify({
                          title: v.id === 'none' ? 'Visit link removed' : 'Visit linked',
                          body: v.id === 'none' ? 'Request stays as a general ticket' : `${v.label} · ${v.sub}`,
                          kind: v.id === 'none' ? 'info' : 'ok',
                        })
                      }}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors',
                        active ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.055]',
                      )}
                    >
                      <Tile icon={v.id === 'none' ? X : CalendarDays} tone={active ? 'success' : 'neutral'} />
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate text-[13px] font-bold tracking-tight',
                            active ? 'text-emerald-800' : 'text-[#0B211B]/70',
                          )}
                        >
                          {v.label}
                        </span>
                        <span className="block truncate text-[11px] font-medium text-[#0B211B]/50">{v.sub}</span>
                      </span>
                      {active && (
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {attachOpen && (
          <motion.div
            key="attach"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                <ImagePlus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Add photos</div>
                <div className="mt-0.5 truncate text-xs font-medium text-[#0B211B]/55">{photos.length} of 5 attached</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setAttachOpen(false)}
                aria-label="Close sheet"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[#0B231C] p-4">
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Attachment rules</div>
                <div className="mt-3 flex flex-col gap-2.5">
                  <DarkRow k="Formats" v="JPG · PNG · HEIC" />
                  <DarkRow k="Max per request" v="5 photos" />
                  <DarkRow k="Size limit" v="10 MB each" />
                  <DarkRow k="Stored" v="Sealed with the ticket" />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  addPhoto('Camera shot', 'camera')
                  setAttachOpen(false)
                }}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <ImagePlus className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Camera</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  addPhoto('Gallery image', 'gallery')
                  setAttachOpen(false)
                }}
                className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <FileText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Gallery</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
