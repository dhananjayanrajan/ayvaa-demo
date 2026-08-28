import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Fingerprint,
  HeartPulse,
  KeyRound,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Expand, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const trust: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: 'Verified caregivers' },
  { icon: HeartPulse, label: 'GPS-checked visits' },
  { icon: Lock, label: 'Sealed records' },
]

const terms: { title: string; summary: string }[] = [
  {
    title: 'Care terms',
    summary:
      'Sessions are delivered by licence-verified professionals. Care pauses automatically during any incident and resumes only after a supervisor reviews it.',
  },
  {
    title: 'Family privacy promise',
    summary:
      'Medical records stay sealed. Every view — by caregivers, partners or admins — is logged with their name and visible to you in the access log.',
  },
]

function SignupRow({
  icon,
  tone,
  label,
  value,
  mono = false,
  onClick,
  trailing,
}: {
  icon: LucideIcon
  tone: 'neutral' | 'info' | 'success'
  label: string
  value: string
  mono?: boolean
  onClick: () => void
  trailing?: ReactNode
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
    >
      <Tile icon={icon} tone={tone} />
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">{label}</span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]',
            mono && 'font-mono tracking-normal',
          )}
        >
          {value}
        </span>
      </span>
      {trailing}
    </motion.button>
  )
}

export function P01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(true)
  const [openTerm, setOpenTerm] = useState<string | null>(null)
  const [reviewOpen, setReviewOpen] = useState(false)

  return (
    <Screen>
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-2">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-[22px] font-black leading-none tracking-tight text-white">
                      ayvaa<span className="text-emerald-300">+</span>
                    </div>
                    <Chip intent="success" light icon={ShieldCheck} className="border-transparent">
                      Guardian plan
                    </Chip>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="relative shrink-0">
                      <span aria-hidden className="absolute -inset-2.5 rounded-[26px] bg-emerald-400/20 blur-lg" />
                      <motion.span
                        className="relative grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-14px_rgba(16,185,129,0.8)]"
                        animate={{ scale: [1, 1.07, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <HeartPulse className="h-7 w-7 text-white" strokeWidth={2.2} aria-hidden />
                      </motion.span>
                    </div>
                    <h1 className="min-w-0 flex-1 text-balance text-[17px] font-extrabold leading-snug tracking-tight text-white">
                      One guardian account,{' '}
                      <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                        every loved one covered
                      </span>
                    </h1>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {trust.map((t) => (
                      <motion.div
                        key={t.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl bg-white/[0.06] px-2 py-3 text-center"
                      >
                        <t.icon className="mx-auto h-4 w-4 text-emerald-300" strokeWidth={2.2} aria-hidden />
                        <div className="mt-1.5 text-[8px] font-extrabold uppercase leading-tight tracking-[0.1em] text-emerald-100/60">
                          {t.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Create your guardian account" trailing={<Chip intent="neutral">1 minute</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                <SignupRow
                  icon={User}
                  tone="neutral"
                  label="Your full name"
                  value={guardian.name}
                  onClick={() => notify({ title: 'Your name', body: `${guardian.name} · guardian account`, kind: 'info' })}
                />
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <SignupRow
                  icon={Mail}
                  tone="info"
                  label="Email address"
                  value={guardian.email}
                  onClick={() => notify({ title: 'Email', body: `${guardian.email} · used for sign-in`, kind: 'info' })}
                />
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <SignupRow
                  icon={Phone}
                  tone="success"
                  label="Phone number"
                  value={guardian.phone}
                  onClick={() => notify({ title: 'Phone', body: `${guardian.phone} · verified by OTP next`, kind: 'info' })}
                />
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <SignupRow
                  icon={KeyRound}
                  tone="neutral"
                  label="Create a password"
                  value={showPass ? 'ayvaa-family-2026' : '••••••••••'}
                  mono
                  onClick={() => setShowPass((v) => !v)}
                  trailing={
                    <motion.span
                      whileTap={{ scale: 0.9 }}
                      role="button"
                      tabIndex={0}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowPass((v) => !v)
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && setShowPass((v) => !v)}
                      className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                    </motion.span>
                  }
                />
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Card intent={agreed ? 'success' : 'warning'}>
                <button
                  type="button"
                  onClick={() => setAgreed((v) => !v)}
                  className="flex w-full items-start gap-3 p-4 pb-3 text-left"
                >
                  <span
                    className={cn(
                      'mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-lg transition-colors',
                      agreed ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                    )}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 text-pretty text-[12.5px] font-semibold leading-relaxed text-[#0B211B]/75">
                    I agree to the care terms and the family privacy promise.
                  </span>
                </button>

                <div className="flex flex-col gap-2 px-4 pb-4">
                  {terms.map((t) => {
                    const open = openTerm === t.title
                    return (
                      <div key={t.title} className="rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,33,27,0.05)]">
                        <button
                          type="button"
                          onClick={() => setOpenTerm(open ? null : t.title)}
                          className="flex w-full items-center gap-2 px-3.5 py-3 text-left"
                        >
                          <span className="min-w-0 flex-1 text-[12px] font-bold tracking-tight text-[#0B211B]">{t.title}</span>
                          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                            <ChevronDown className="h-3.5 w-3.5 text-[#0B211B]/30" aria-hidden />
                          </motion.span>
                        </button>
                        <Expand open={open}>
                          <p className="px-3.5 pb-3 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">{t.summary}</p>
                        </Expand>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setReviewOpen(true)}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-[15px] font-extrabold tracking-tight text-white shadow-[0_20px_40px_-18px_rgba(5,150,105,0.8)]"
              >
                Create account
                <ArrowRight className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-center gap-3 px-2">
                <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.08]" />
                <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/30">already with us?</span>
                <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.08]" />
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/patient/p02')}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <Fingerprint className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Sign in instead
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Guardians verify once. This protects every medical record and consent in your family plan.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Ayvaa · Hyderabad" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {reviewOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setReviewOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reviewOpen && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex flex-col gap-3.5 rounded-t-[28px] bg-white p-5 pb-7 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div aria-hidden className="mx-auto h-1.5 w-10 shrink-0 rounded-full bg-[#0B211B]/15" />

            <div className="flex items-start gap-3">
              <Tile icon={User} tone="success" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Review your account</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">One last look before we verify your phone</div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setReviewOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close review"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="rounded-3xl bg-[#0B231C] p-4">
              <div className="flex flex-col gap-2.5">
                {[
                  { k: 'Guardian', v: guardian.name },
                  { k: 'Email', v: guardian.email },
                  { k: 'Phone', v: guardian.phone },
                  { k: 'Terms', v: agreed ? 'Accepted' : 'Not accepted' },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-100/45">{r.k}</span>
                    <span className="truncate text-right font-mono text-[12px] font-bold text-emerald-50/90">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setReviewOpen(false)
                notify({ title: 'Account created', body: 'Verify your phone to continue', kind: 'ok' })
                navigate('/patient/p03')
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              Looks right · create it
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setReviewOpen(false)}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
            >
              Let me edit something
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
