import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  KeyRound,
  Lock,
  Mail,
  MailCheck,
  ReceiptText,
  ScanLine,
  ShieldCheck,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Kicker, LiveDot, Panel, Section, Tile, TimeChip, rise, stagger } from '@/components/phone/kit'
import { guardian } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

function FieldRow({
  icon: Icon,
  label,
  value,
  mono = false,
  onClick,
  trailing,
}: {
  icon: LucideIcon
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
      <Tile icon={Icon} tone="info" />
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

export function P02() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)

  const unlock = () => {
    if (scanning) return
    setScanning(true)
    setTimeout(() => {
      notify({ title: 'Unlocked', body: 'Fingerprint matched · welcome back, Priya', kind: 'ok' })
      navigate('/patient/p06')
    }, 1100)
  }

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
                    <Chip intent="live" light dot className="border-transparent">
                      Care moving
                    </Chip>
                  </div>

                  <Kicker>
                    <span className="mt-5">While you were away</span>
                  </Kicker>

                  <div className="mt-3 flex flex-col gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() =>
                        notify({ title: 'Visit completed', body: 'Ramesh · Tue 2:00 PM · Lakshmi · note and vitals sealed', kind: 'info' })
                      }
                      className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-200">
                        <CalendarDays className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-bold text-emerald-50/90">
                          Ramesh's visit completed
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/45">
                          Lakshmi · note and vitals sealed
                        </span>
                      </span>
                      <TimeChip>Tue</TimeChip>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => notify({ title: 'Receipt', body: 'Feb statement paid in full · ₹96,400', kind: 'info' })}
                      className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3 text-left"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-400/15 text-teal-200">
                        <ReceiptText className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-bold text-emerald-50/90">February statement paid</span>
                        <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/45">₹96,400 · settled in full</span>
                      </span>
                      <TimeChip>Feb 28</TimeChip>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={() => notify({ title: 'Next visit', body: 'Ramesh · Friday 9:00 AM · Arjun (RN) · confirmed', kind: 'info' })}
                      className="flex items-center gap-3 rounded-2xl bg-emerald-400/[0.14] px-3.5 py-3 text-left"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.12] text-emerald-100">
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-bold text-white">Next · Friday 9:00 AM</span>
                        <span className="mt-0.5 block truncate text-[10px] font-semibold text-emerald-100/60">
                          Ramesh · Arjun (RN) · confirmed by you
                        </span>
                      </span>
                      <LiveDot className="shrink-0 text-emerald-300" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex flex-col items-center gap-3 rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={unlock}
                  aria-label="Unlock with fingerprint"
                  className="relative grid h-24 w-24 place-items-center rounded-full bg-white/[0.08] text-emerald-200"
                >
                  {!scanning && (
                    <>
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-emerald-400/15"
                        animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-emerald-400/10"
                        animate={{ scale: [1, 1.45], opacity: [0.4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
                      />
                    </>
                  )}
                  {scanning ? (
                    <ScanLine className="h-9 w-9 animate-pulse text-emerald-300" aria-hidden />
                  ) : (
                    <Fingerprint className="h-9 w-9" strokeWidth={1.8} aria-hidden />
                  )}
                </motion.button>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-100/60">
                  {scanning ? 'Matching fingerprint…' : 'Tap to unlock instantly'}
                </span>
                {scanning && (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="h-1 overflow-hidden rounded-full bg-white/10"
                  >
                    <span className="block h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300" />
                  </motion.span>
                )}
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
                <div className="flex items-center justify-between px-4 pt-4">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Or use your password</span>
                  <button
                    type="button"
                    onClick={() => setForgotOpen(true)}
                    className="text-[11px] font-bold text-emerald-700"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="mt-2">
                  <FieldRow
                    icon={Mail}
                    label="Email address"
                    value={guardian.email}
                    onClick={() => notify({ title: 'Email', body: `${guardian.email} · last used today`, kind: 'info' })}
                  />
                  <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                  <FieldRow
                    icon={KeyRound}
                    label="Password"
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
                <div className="p-4 pt-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      notify({ title: 'Welcome back', body: `Signed in as ${guardian.name}`, kind: 'ok' })
                      navigate('/patient/p06')
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
                  >
                    Sign in
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between bg-[#0B211B]/[0.03] px-4 py-3">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <LiveDot className="text-emerald-500" />
                    <span className="truncate text-[10.5px] font-semibold text-[#0B211B]/55">Fingerprint is your default unlock</span>
                  </span>
                  <Chip intent="success">Biometrics on</Chip>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="New to Ayvaa?" />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate('/patient/p01')}
                className="block w-full text-left"
              >
                <Card>
                  <div className="flex items-center gap-3.5 p-4">
                    <Tile icon={Lock} tone="ink" size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Create a guardian account</div>
                      <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Cover every loved one under one verified plan</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-600/60" aria-hidden />
                  </div>
                </Card>
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Your family's medical records stay sealed until your identity is verified.
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
        {forgotOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setForgotOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {forgotOpen && (
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
              <Tile icon={MailCheck} tone="info" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Reset your password</div>
                <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                  A single-use link will go to {guardian.email}
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => setForgotOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close sheet"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setForgotOpen(false)
                notify({ title: 'Reset link sent', body: `Check ${guardian.email} · valid for 30 minutes`, kind: 'ok' })
                navigate('/patient/p05')
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <MailCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Send reset link
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setForgotOpen(false)}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
            >
              I remembered it
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
