import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  FileCheck2,
  Lock,
  Quote,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card, Chip, Kicker, Panel, Ring, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { caregivers } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

const credentials: { title: string; body: string; chip: string }[] = [
  { title: 'Registered Nurse licence', body: 'KNC-RN-4471 · Karnataka Nursing Council', chip: 'Valid' },
  { title: 'Background screening', body: 'Police and two reference checks cleared', chip: 'Cleared' },
  { title: 'Advanced first aid', body: 'Certificate renewed January 2024', chip: 'Valid' },
]

const careHistory: { icon: typeof Users; label: string; value: string }[] = [
  { icon: Users, label: 'Elderly care · recurring visits', value: '41 sessions' },
  { icon: FileCheck2, label: 'Post-operative recovery', value: '29 sessions' },
]

export function P11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const c = caregivers[0]
  const [sheet, setSheet] = useState<'none' | 'offer'>('none')
  const close = () => setSheet('none')
  const initials = c.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  return (
    <Screen>
      <AppBar title="Caregiver profile" onBack={() => navigate('/patient/p10')} />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[18px] font-black tracking-tight text-emerald-100">
                        {initials}
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-[#0B231C] shadow-md">
                        <BadgeCheck className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <Kicker>Caregiver · Ayvaa verified</Kicker>
                      <h2 className="mt-1.5 truncate text-[19px] font-extrabold leading-tight tracking-tight text-white">{c.name}</h2>
                      <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] font-semibold text-emerald-100/55">
                        <Stethoscope className="h-3 w-3 shrink-0" aria-hidden />
                        {c.role} · {c.years} yrs
                      </p>
                    </div>
                    <Ring value={c.rating / 5} size={68} stroke={6} id="p11-rating">
                      <span className="text-[14px] font-extrabold tabular-nums leading-none text-white">{c.rating}</span>
                      <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.14em] text-emerald-200/50">rating</span>
                    </Ring>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { v: '4.9', l: 'Rating' },
                      { v: String(c.visits), l: 'Visits' },
                      { v: '100%', l: 'On time' },
                    ].map((s) => (
                      <div key={s.l} className="rounded-2xl bg-white/[0.06] px-2 py-2.5 text-center">
                        <div className="text-[14px] font-extrabold tabular-nums leading-none text-white">{s.v}</div>
                        <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-emerald-100/45">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-1" aria-label="5 star rating">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Credentials" trailing={<Chip intent="success">All verified by Ayvaa</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {credentials.map((cred, i) => (
                  <div key={cred.title}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <Tile icon={ShieldCheck} tone="success" />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{cred.title}</div>
                        <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">{cred.body}</div>
                      </div>
                      <Chip intent="success" icon={ShieldCheck}>
                        {cred.chip}
                      </Chip>
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="What families say" trailing={<Chip intent="success">Verbatim</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[22px] bg-[#0B231C] p-5 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <Quote className="h-5 w-5 fill-emerald-300/40 text-emerald-300/40" aria-hidden />
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-200/50">5.0 · Feb</span>
                  </div>
                  <p className="mt-2.5 font-serif text-pretty text-[14px] font-medium leading-relaxed text-white/90">
                    Cared for my mother for four months. Punctual every single day, and her notes helped her doctors a lot.
                  </p>
                  <div className="mt-3.5 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-200">
                      I
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-emerald-50/80">Iyer family</span>
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-emerald-100/40">Post-op care</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Recent care delivered" trailing={<Chip intent="neutral">70 sessions</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {careHistory.map((h, i) => (
                  <div key={h.label}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <Tile icon={h.icon} tone={i === 0 ? 'success' : 'info'} size="sm" />
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-[#0B211B]/70">{h.label}</span>
                      <span className="shrink-0 text-[13px] font-extrabold tabular-nums tracking-tight text-[#0B211B]">{h.value}</span>
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={Lock} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  {c.name.split(' ')[0]} delivers care only under your signed consent and care plan. Every visit is verified and logged.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of profile" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setSheet('offer')}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          Send offer to {c.name.split(' ')[0]}
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        </motion.button>
      </FootBar>

      <AnimatePresence>
        {sheet === 'offer' && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet === 'offer' && (
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
              <Tile icon={Star} tone="success" size="lg" />
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Send offer to {c.name.split(' ')[0]}?</div>
                <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                  Availability is re-checked on acceptance · you are notified the moment she responds
                </div>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                aria-label="Close sheet"
              >
                <X className="h-4 w-4" aria-hidden />
              </motion.button>
            </div>

            <div className="rounded-3xl bg-[#0B231C] p-4">
              <div className="flex flex-col gap-2.5">
                {[
                  { k: 'Caregiver', v: `${c.name.split(' ')[0]} · ${c.role}` },
                  { k: 'Licence', v: 'RN · verified' },
                  { k: 'Typical response', v: 'Under 10 minutes' },
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
                close()
                notify({
                  title: 'Offer sent',
                  body: `${c.name} will respond within minutes · availability re-checked on acceptance`,
                  kind: 'ok',
                })
                navigate('/patient/p12')
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
            >
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              Send the offer
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={close}
              className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
            >
              Not yet
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
