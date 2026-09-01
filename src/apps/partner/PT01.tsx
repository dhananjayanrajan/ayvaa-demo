import { motion } from 'motion/react'
import { ArrowRight, Building2, Fingerprint, KeyRound, Lock, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Chip, Hero, Kicker, LiveDot, rise, stagger } from '@/components/phone/kit'
import { PartnerCredentialCard } from '@/components/auth/AuthSet'
import { partner } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const trust: { icon: LucideIcon; label: string }[] = [
  { icon: Lock, label: 'Encrypted session' },
  { icon: ShieldCheck, label: 'Org-tied access' },
  { icon: KeyRound, label: 'Fully logged' },
]

export function PT01() {
  const { notify } = useDemo()
  const { navigate } = useRouter()

  return (
    <Screen>
      <AppBar
        title="ayvaa+"
        subtitle="Partner access"
        trailing={
          <Chip intent="success" icon={Lock}>
            Secure
          </Chip>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex flex-col items-center pt-1 text-center">
                  <div className="relative">
                    <span aria-hidden className="absolute -inset-3 rounded-[30px] bg-emerald-400/20 blur-xl" />
                    <span className="relative grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_16px_32px_-14px_rgba(16,185,129,0.8)]">
                      <Building2 className="h-7 w-7 text-white" strokeWidth={2.2} aria-hidden />
                    </span>
                    <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white shadow-md">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} aria-hidden />
                    </span>
                  </div>
                  <Kicker>
                    <span className="mt-3">Partner portal</span>
                  </Kicker>
                  <h2 className="mt-2 text-[21px] font-extrabold leading-tight tracking-tight text-white">
                    Welcome back
                  </h2>
                  <p className="mt-1 text-[13px] font-bold text-emerald-100/80">{partner.name}</p>
                  <p className="text-[11px] font-medium text-emerald-100/45">{partner.location} · verified partner</p>
                  <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 text-[10px] font-bold text-emerald-100/70">
                    <LiveDot className="text-emerald-300" />
                    Last sign-in · today, 8:42 AM
                  </span>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <PartnerCredentialCard
                partnerName={partner.name}
                partnerEmail={partner.email}
                onNotify={notify}
              />
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  notify({ title: 'Signed in', body: `Welcome back, ${partner.name} care team`, kind: 'ok' })
                  navigate('/partner/pt02')
                }}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-[15px] font-extrabold tracking-tight text-white shadow-[0_20px_40px_-18px_rgba(5,150,105,0.8)]"
              >
                Sign in securely
                <ArrowRight className="h-4.5 w-4.5 shrink-0" strokeWidth={2.4} aria-hidden />
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-center gap-3 px-2">
                <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.08]" />
                <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#0B211B]/30">or</span>
                <span aria-hidden className="h-px flex-1 bg-[#0B211B]/[0.08]" />
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => notify({ title: 'SSO started', body: 'Redirecting to your identity provider…', kind: 'info' })}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75"
              >
                <Fingerprint className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Continue with SSO
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-center justify-between gap-2">
                  {trust.map((t, i) => (
                    <div key={t.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
                        <t.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                      </span>
                      <span className="text-center text-[8.5px] font-extrabold uppercase leading-tight tracking-[0.12em] text-emerald-50/60">
                        {t.label}
                      </span>
                      {i < trust.length - 1 && <span aria-hidden className="hidden" />}
                    </div>
                  ))}
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of sign in" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <button
          type="button"
          className="w-full text-center text-[13px] font-extrabold text-emerald-700"
          onClick={() => notify({ title: 'Access request sent', body: 'Your hospital admin will approve provisioning', kind: 'info' })}
        >
          New here? Request partner access
        </button>
      </FootBar>
    </Screen>
  )
}
