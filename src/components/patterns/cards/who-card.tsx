import { ChevronRight, ShieldCheck } from 'lucide-react'
import { Card, Chip } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { lovedOnes } from '@/data/seed'

export function WhoCard({ who, onOpen }: { who: number; onOpen: () => void }) {
  const person = lovedOnes[who]
  return (
    <Card intent="success">
      <div className="p-5">
        <Row
          leading={
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[16px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(16,185,129,0.7)]">
              {person.name.charAt(0)}
            </span>
          }
          title={person.name}
          titleClassName="text-[15px] font-extrabold leading-snug tracking-tight"
          titleMeta={<Chip intent="success">Selected</Chip>}
          subtitle={`Age ${person.age}, ${person.category}, consent on file`}
          subtitleClassName="text-xs font-semibold leading-snug text-[#0B211B]/50"
          trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
          showChevron={false}
          surface="none"
          padding="none"
          className="gap-3.5"
          onClick={onOpen}
        />

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-500/[0.06] px-4 py-3.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
          <span className="min-w-0 flex-1 text-pretty text-[12px] font-semibold leading-snug text-[#0B211B]/70">
            Your confirmation becomes a signed consent record before any caregiver is dispatched.
          </span>
        </div>
      </div>
    </Card>
  )
}
