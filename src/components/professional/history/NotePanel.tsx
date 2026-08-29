import { ShieldCheck } from 'lucide-react'
import { Chip } from '@/components/phone/kit'

type Props = {
  note: string
}

export function NotePanel({ note }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4 shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
            <ShieldCheck className="h-3 w-3" strokeWidth={2.5} aria-hidden />
            Your note
          </div>
          <Chip intent="success" light className="border-transparent">
            Verbatim
          </Chip>
        </div>
        <p className="mt-2 font-serif text-pretty text-[13.5px] font-medium leading-relaxed text-white/90">
          &ldquo;{note}&rdquo;
        </p>
        <p className="mt-2 text-[9.5px] font-semibold text-emerald-100/45">
          Delivered to the family exactly as written.
        </p>
      </div>
    </div>
  )
}
