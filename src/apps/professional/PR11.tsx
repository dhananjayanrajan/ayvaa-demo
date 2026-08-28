import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Award,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Eye,
  Landmark,
  Lock,
  Pencil,
  Plus,
  ShieldCheck,
  Star,
  Stethoscope,
  X,
} from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, Screen } from '@/components/phone/Screen'
import { Card, Chip, Hero, Kicker, Panel, Section, Tile, rise, stagger } from '@/components/phone/kit'
import { availability, certifications, professional, professionalSkills } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

const publicFacts: { k: string; v: string }[] = [
  { k: 'Licence', v: 'RN · verified, valid to Mar 2027' },
  { k: 'Experience', v: `${professional.years} years in clinical care` },
  { k: 'Rating', v: `${professional.rating} across ${professional.visits} visits` },
  { k: 'Background', v: 'Cleared · re-checked every year' },
]

export function PR11() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [previewOpen, setPreviewOpen] = useState(false)
  const openDays = availability.filter((d) => !d.off)
  const initials = professional.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  return (
    <Screen>
      <AppBar
        title="Professional profile"
        onBack={() => navigate('/professional/pr01')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setPreviewOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/60"
            aria-label="Preview what families see"
          >
            <Eye className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <Hero>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-[22px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[18px] font-black tracking-tight text-emerald-100">
                    {initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Kicker>Your identity · verified</Kicker>
                    <h2 className="mt-1.5 truncate text-[19px] font-extrabold leading-tight tracking-tight text-white">
                      {professional.name}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] font-semibold text-emerald-100/55">
                      <Stethoscope className="h-3 w-3 shrink-0" aria-hidden />
                      {professional.role}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
                  {[
                    { v: professional.rating, l: 'Rating' },
                    { v: professional.visits.toLocaleString('en-IN'), l: 'Visits' },
                    { v: `${professional.years} yrs`, l: 'Experience' },
                  ].map((s) => (
                    <div key={s.l} className="flex min-w-0 flex-col items-center gap-1 px-2">
                      <span className="text-[16px] font-extrabold tabular-nums leading-none text-white">{s.v}</span>
                      <span className="text-[8.5px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{s.l}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Chip intent="success" light icon={BadgeCheck} className="border-transparent">Licence verified</Chip>
                  <Chip intent="success" light icon={Star} className="border-transparent">Top-rated caregiver</Chip>
                </div>
              </Hero>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Certifications" trailing={<Chip intent="success">{certifications.filter((c) => c.status === 'valid').length} valid</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                {certifications.map((c, i) => (
                  <div key={c.name}>
                    {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <Tile icon={Award} tone={c.status === 'valid' ? 'success' : 'warning'} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">{c.name}</div>
                        <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                          {c.status === 'valid' ? 'Verified by Ayvaa · current' : 'Uploaded · review within 2 days'}
                        </div>
                      </div>
                      <Chip intent={c.status === 'valid' ? 'success' : 'warning'} dot={c.status !== 'valid'}>
                        {c.status === 'valid' ? 'Valid' : 'In review'}
                      </Chip>
                    </div>
                  </div>
                ))}
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => notify({ title: 'Upload certification', body: 'Photo or PDF · Ayvaa verifies within two working days', kind: 'info' })}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={Plus} tone="ink" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">Add a certification</div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                      Unlocks new care categories once verified
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Skills & care categories" trailing={<Chip intent="neutral">{professionalSkills.length} matched</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex flex-wrap gap-2">
                {professionalSkills.map((s) => (
                  <motion.button
                    key={s}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => notify({ title: s, body: 'Part of your matched categories · offers key off this', kind: 'info' })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.12] px-3.5 py-2 text-[12px] font-bold text-emerald-700"
                  >
                    <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                    {s}
                  </motion.button>
                ))}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => notify({ title: 'Add category', body: 'New categories need a matching certification first', kind: 'info' })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0B211B]/[0.045] px-3.5 py-2 text-[12px] font-bold text-[#0B211B]/55"
                >
                  <Plus className="h-3 w-3" strokeWidth={3} aria-hidden />
                  Add disability care
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Preferences" trailing={<Chip intent="neutral">Yours to control</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <Card>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/professional/pr05')}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={CalendarDays} tone="info" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">Availability</div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">
                      {openDays.length} days open · {openDays[0]?.day} from {openDays[0]?.hours}
                    </div>
                  </div>
                  <Chip intent="success" dot>
                    Matching
                  </Chip>
                </motion.button>
                <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => navigate('/professional/pr10')}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <Tile icon={Landmark} tone="success" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-bold tracking-tight text-[#0B211B]">Payout account</div>
                    <div className="mt-0.5 truncate text-[11px] font-semibold text-[#0B211B]/45">{professional.bank} ••4821 · verified</div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#0B211B]/20" aria-hidden />
                </motion.button>
              </Card>
            </motion.div>

            <motion.div variants={rise}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => notify({ title: 'Edit profile', body: 'Name, photo and contact details are editable any time', kind: 'info' })}
                className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/70"
              >
                <Pencil className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Edit profile details
              </motion.button>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="success" className="flex items-start gap-3 p-4">
                <Tile icon={ShieldCheck} tone="success" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Families see your verified facts only — licence status, experience and rating. Documents stay sealed with Ayvaa.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="End of profile" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>

      <AnimatePresence>
        {previewOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
            className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewOpen && (
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.45 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[86%] flex-col rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
          >
            <div className="shrink-0 px-5 pt-4">
              <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-7 pt-3">
              <div className="flex items-start gap-3">
                <Tile icon={Eye} tone="ink" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">What families see</div>
                  <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Your public card on every offer they receive</div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setPreviewOpen(false)}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
                  aria-label="Close preview"
                >
                  <X className="h-4 w-4" aria-hidden />
                </motion.button>
              </div>

              <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[16px] font-black tracking-tight text-emerald-100">
                      {initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[16px] font-extrabold tracking-tight text-white">{professional.name}</div>
                      <div className="truncate text-[11px] font-semibold text-emerald-100/55">{professional.role} · Ayvaa verified</div>
                    </div>
                    <Chip intent="success" light icon={BadgeCheck} className="shrink-0 border-transparent">
                      Verified
                    </Chip>
                  </div>

                  <div className="mt-4 flex flex-col gap-2.5">
                    {publicFacts.map((f) => (
                      <div key={f.k} className="flex items-center gap-2.5">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-200">
                          <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                        </span>
                        <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-100/45">{f.k}</span>
                        <span className="min-w-0 flex-1 truncate text-right text-[12px] font-bold text-emerald-50/90">{f.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="min-w-0 flex-1 text-[10.5px] font-semibold text-emerald-100/60">
                      Documents stay sealed · families never see files, only facts
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setPreviewOpen(false)
                  notify({ title: 'Profile shared', body: 'Your verified card is attached to every offer automatically', kind: 'ok' })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
              >
                <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Looks right · keep it live
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
