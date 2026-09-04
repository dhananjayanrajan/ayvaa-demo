import { motion } from 'motion/react'
import { AlertTriangle, Check, Droplets, HeartPulse, History, MapPin, Phone, Siren, X } from 'lucide-react'
import { AppBar } from '@/components/base/phone/app-bar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/base/phone/screen'
import { Chip, Panel, Section, Tile, rise, stagger } from '@/components/base/phone/kit'
import { emergency, lovedOnes } from '@/data/seed'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'

function RoseRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.1em] text-rose-100/45">{k}</span>
      <span className="truncate font-mono text-[12px] font-bold text-rose-50/90">{v}</span>
    </div>
  )
}

export function P32() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const father = lovedOnes[0]
  const first = father.name.split(' ')[0]

  return (
    <Screen>
      <AppBar
        title="Emergency help"
        subtitle={`For ${father.name} · stay calm, help is here`}
        onBack={() => navigate('/patient/p06')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/patient/p06')}
            aria-label="Close emergency screen"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-rose-500/[0.1] text-rose-600"
          >
            <X className="size-[18px]" strokeWidth={2.4} aria-hidden />
          </motion.button>
        }
      />
      <BodyArea>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-rose-500/[0.18] blur-3xl" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col gap-4 pt-1">
            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] p-5 shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-red-400/10 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative flex flex-col items-center text-center">
                  <span className="relative grid h-[72px] w-[72px] place-items-center">
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-rose-500/30" />
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-red-500 shadow-[0_16px_32px_-12px_rgba(244,63,94,0.8)]">
                      <Siren className="h-7 w-7 text-white" strokeWidth={2.4} aria-hidden />
                    </span>
                  </span>
                  <div className="mt-3 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
                    <AlertTriangle className="h-3 w-3" aria-hidden />
                    Ambulance · one tap
                  </div>
                  <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
                    Call {emergency.ambulance}{' '}
                    <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">now</span>
                  </h2>
                  <p className="mt-1 text-[12px] font-medium leading-relaxed text-rose-100/60">
                    Dispatched straight to your address · this call is logged with the time.
                  </p>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      notify({ title: `Calling ${emergency.ambulance}`, body: 'Ambulance dispatched to your address', kind: 'error' })
                    }
                    className="mt-4 flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 py-4 text-base font-extrabold text-white shadow-[0_22px_44px_-18px_rgba(225,29,72,0.8)]"
                  >
                    <Phone className="h-5 w-5 shrink-0" strokeWidth={2.6} aria-hidden />
                    <span className="truncate">Call {emergency.ambulance} · Ambulance</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="Immediate help" trailing={<Chip intent="danger" dot>Priority</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
                <div className="relative p-5">
                  <div className="flex items-center gap-3.5">
                    <span className="relative shrink-0">
                      <span className="grid h-12 w-12 place-items-center rounded-[18px] bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-[0_10px_22px_-10px_rgba(244,63,94,0.8)]">
                        <HeartPulse className="h-5 w-5" strokeWidth={2.4} aria-hidden />
                      </span>
                      <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-rose-300 ring-2 ring-[#230D14]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#230D14]" />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[15px] font-extrabold tracking-tight text-white">{emergency.caregiverOnSite}</div>
                      <div className="mt-0.5 truncate text-[11.5px] font-semibold text-rose-100/55">
                        On site now · first aid trained · call her first
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        notify({
                          title: `Calling ${emergency.caregiverOnSite.split(' ')[0]}`,
                          body: 'Priority line · connecting immediately',
                          kind: 'error',
                        })
                      }
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]"
                    >
                      <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Call nurse</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() =>
                        notify({ title: emergency.hospital, body: 'Directions opening · records shared on arrival', kind: 'error' })
                      }
                      className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
                    >
                      <MapPin className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                      <span className="truncate">Hospital</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Section label="While you wait" trailing={<Chip intent="neutral">From his record</Chip>} />
            </motion.div>

            <motion.div variants={rise}>
              <div className="relative overflow-hidden rounded-[26px] border border-rose-200/10 bg-[#230D14] shadow-[0_28px_64px_-30px_rgba(60,10,25,0.7)]">
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-rose-500/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
                <div className="relative p-5">
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
                    <Droplets className="h-3 w-3" aria-hidden />
                    Hospital-ready facts · {first}
                  </div>
                  <div className="mt-3 flex flex-col gap-2.5">
                    <RoseRow k="Blood type" v={emergency.blood} />
                    <RoseRow k="Allergic to" v={emergency.allergy} />
                    <RoseRow k="Conditions" v="Hypertension · monitored" />
                    <RoseRow k="Current meds" v="Amlodipine 5 mg daily" />
                    <RoseRow k="Hospital" v={emergency.hospital.split(',')[0]} />
                  </div>

                  <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
                    <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
                      Contacts notified
                    </span>
                    <span className="shrink-0 font-mono text-[10px] font-bold tabular-nums text-rose-200/70">
                      {emergency.contacts.length} people
                    </span>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
                    <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-rose-200/60">Auto-notified just now</div>
                    <div className="mt-2.5 flex flex-col gap-2.5">
                      {emergency.contacts.map((c) => (
                        <div key={c} className="flex items-center gap-2.5">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-400/20 text-rose-200">
                            <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-rose-50/85">{c}</span>
                          <span className="shrink-0 font-mono text-[9.5px] font-bold uppercase tracking-wide text-rose-200/50">just now</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <div className="flex items-center gap-3.5 rounded-[24px] bg-white p-4 shadow-[0_1px_2px_rgba(11,33,27,0.06),0_14px_32px_-22px_rgba(11,33,27,0.25)]">
                <Tile icon={Droplets} tone="neutral" size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">Vitals from today</div>
                  <div className="mt-0.5 truncate text-[11px] font-medium text-[#0B211B]/55">
                    128/76 · 72 bpm · recorded 2:10 PM by the nurse
                  </div>
                </div>
                <Chip intent="neutral">Sealed</Chip>
              </div>
            </motion.div>

            <motion.div variants={rise}>
              <Panel intent="danger" className="flex items-start gap-3 p-4">
                <Tile icon={History} tone="danger" />
                <p className="min-w-0 flex-1 pt-0.5 text-pretty text-xs font-medium leading-relaxed text-[#0B211B]/65">
                  Opening this screen and calling for help is logged with the time, so there is a record of exactly what
                  happened.
                </p>
              </Panel>
            </motion.div>

            <motion.div variants={rise}>
              <EndOfScroll label="Emergency record sealed" />
            </motion.div>
          </motion.div>
        </div>
      </BodyArea>
      <FootBar>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/patient/p06')}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/75"
        >
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">I am safe · close</span>
        </motion.button>
      </FootBar>
    </Screen>
  )
}
