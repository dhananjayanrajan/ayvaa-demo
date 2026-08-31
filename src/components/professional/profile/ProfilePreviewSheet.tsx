import { Eye, Lock, ShieldCheck } from 'lucide-react'
import { Chip } from '@/components/phone/kit'
import { SheetShell } from '@/components/phone/SheetShell'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import { PUBLIC_FACTS } from '@/data/profileData'

type Props = {
  name: string
  role: string
  initials: string
  onClose: () => void
  onConfirm: () => void
}

export function ProfilePreviewSheet({ name, role, initials, onClose, onConfirm }: Props) {
  return (
    <SheetShell
      open
      height="full"
      icon={Eye}
      tone="ink"
      title="What families see"
      subtitle="Your public card on every offer they receive"
      onClose={onClose}
      footer={
        <button
          type="button"
          onClick={onConfirm}
          className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
        >
          <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Looks right, keep it live
        </button>
      }
    >
      <PhaseHero theme={PHASE_THEME.emerald}>
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
      </PhaseHero>
    </SheetShell>
  )
}
