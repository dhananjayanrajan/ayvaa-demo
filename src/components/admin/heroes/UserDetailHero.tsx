import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { cn } from '@/lib/utils'
import { TONE } from '@/data/admin/a13Data'
import type { UserStatus } from '@/data/admin/a13Data'

type Props = { id: string; name: string; initials: string; role: string; joined: string; email: string; phone: string; status: UserStatus }

export function UserDetailHero({ id, name, initials, role, joined, email, phone, status }: Props) {
  const tone = TONE[status]
  return (
    <AccentHero tone={tone.hero}>
      <div className="flex items-start justify-between gap-3"><span className={cn('text-[9px] font-extrabold uppercase tracking-[0.22em]', tone.overline)}>Record #{id}</span><StatusPill tone={tone.pill} label={tone.statusLabel} live={status === 'active'} /></div>
      <div className="mt-4 flex items-start gap-3"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-black text-white">{initials}</span><div className="min-w-0 flex-1"><h2 className="break-words text-[19px] font-extrabold leading-snug tracking-tight text-white">{name}</h2><p className={cn('mt-0.5 text-[12px] font-medium leading-relaxed', tone.subText)}>{role}</p><p className={cn('text-[12px] font-medium leading-relaxed', tone.subText)}>Joined {joined}</p></div></div>
      <div className="mt-4 space-y-2"><div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className={cn('shrink-0 text-[9px] font-bold uppercase tracking-[0.14em]', tone.label)}>Email</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{email}</span></div><div className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5"><span className={cn('shrink-0 text-[9px] font-bold uppercase tracking-[0.14em]', tone.label)}>Phone</span><span className="min-w-0 break-words text-right font-mono text-[12px] font-bold text-white">{phone}</span></div></div>
    </AccentHero>
  )
}
