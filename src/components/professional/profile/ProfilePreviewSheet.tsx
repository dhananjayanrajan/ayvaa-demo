import { Eye, Lock, ShieldCheck, X } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'
import { PUBLIC_FACTS } from './profileData'
import { motion } from 'motion/react'

type Props = {
  name: string
  role: string
  initials: string
  onClose: () => void
  onConfirm: () => void
}

export function ProfilePreviewSheet({ name, role, initials, onClose, onConfirm }: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={Eye} tone="ink" size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">What families see</div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                Your public card on every offer they receive
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09]"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3.5">
          <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
            <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3.5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-gradient-to-br from-emerald-400/30 to-teal-400/20 text-[16px] font-black tracking-tight text-emerald-100">
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[16px] font-extrabold tracking-tight text-white">{name}</div>
                  <div className="mt-0.5 truncate text-[11px] font-semibold text-emerald-100/55">{role}</div>
                </div>
                <Chip intent="success" light icon={ShieldCheck} className="shrink-0 border-transparent">
                  Verified
                </Chip>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                {PUBLIC_FACTS.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.key} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-200">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">{f.key}</div>
                        <div className="mt-1 text-[13px] font-extrabold tracking-tight text-white">{f.value}</div>
                        <div className="mt-0.5 text-pretty text-[10.5px] font-semibold leading-relaxed text-emerald-100/50">{f.detail}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-white/[0.06] p-3">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 flex-1 text-pretty text-[10.5px] font-semibold leading-relaxed text-emerald-100/60">
                  Documents stay sealed. Families never see files, only these facts.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-5 pb-6 pt-3.5">
          <button
            type="button"
            onClick={onConfirm}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Looks right, keep it live
          </button>
        </div>
      </motion.div>
    </>
  )
}
