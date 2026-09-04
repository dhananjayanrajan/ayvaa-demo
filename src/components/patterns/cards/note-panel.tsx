import { ShieldCheck } from 'lucide-react'
import { Chip } from '@/components/base/phone/kit'
import { QuotePanel } from '@/components/base/phone/quote-panel'
import { PhaseHero, PHASE_THEME } from '@/components/base/phone/phase-hero'

type Props = {
  note: string
}

export function NotePanel({ note }: Props) {
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <QuotePanel
        bare
        kicker="Your note"
        kickerIcon={ShieldCheck}
        quote={note}
        headerTrailing={
          <Chip intent="success" light className="border-transparent">
            Verbatim
          </Chip>
        }
        footer={
          <p className="mt-2 text-[9.5px] font-semibold text-emerald-100/45">
            Delivered to the family exactly as written.
          </p>
        }
      />
    </PhaseHero>
  )
}
