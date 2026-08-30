import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, MessageSquare, Phone, Radio } from 'lucide-react'
import { Card } from '@/components/phone/kit'
import { ConnectButton } from './ConnectButton'
import { LIVE_VISIT, formatElapsed } from '@/data/patientLiveVisit'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

interface CaregiverCardProps {
  elapsedSeconds: number
}

type RequestPhase = 'idle' | 'working' | 'done'

export function CaregiverCard({ elapsedSeconds }: CaregiverCardProps) {
  const { notify } = useDemo()
  const { name, first, initial, role, visitsWithFamily, rating } = LIVE_VISIT.caregiver
  const [requestPhase, setRequestPhase] = useState<RequestPhase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const requestUpdate = () => {
    if (requestPhase !== 'idle') return
    setRequestPhase('working')
    timers.current.push(setTimeout(() => setRequestPhase('done'), 800))
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Update requested', body: `${first} will reply in your secure chat within minutes`, kind: 'ok' }),
        900,
      ),
    )
  }

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-[14px] font-extrabold text-white shadow-[0_10px_22px_-10px_rgba(5,150,105,0.8)]">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold tracking-tight text-[#0B211B]">{name}</div>
            <div className="mt-0.5 truncate text-[11.5px] font-medium text-[#0B211B]/55">{role}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Visits with family</div>
            <div className="mt-1 text-[12.5px] font-extrabold leading-none tabular-nums text-[#0B211B]">
              {visitsWithFamily}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0B211B]/[0.04] px-3.5 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Family rating</div>
            <div className="mt-1 text-[12.5px] font-extrabold leading-none tabular-nums text-[#0B211B]">{rating}</div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-[#0B231C] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              <span className="truncate text-[12px] font-bold text-emerald-50/85">With {LIVE_VISIT.patientFirst} now</span>
            </span>
            <span className="shrink-0 text-[15px] font-extrabold leading-none tabular-nums text-emerald-200">
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline justify-between gap-3">
            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/45">On site since</span>
            <span className="text-right text-[12px] font-bold tabular-nums text-emerald-50/90">{LIVE_VISIT.startedAt}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <ConnectButton
            icon={MessageSquare}
            label="Message"
            workingLabel="Opening chat…"
            doneLabel="Chat open"
            variant="soft"
            notifyTitle="Chat opened"
            notifyBody={`Secure chat with ${first} over Ayvaa`}
          />
          <ConnectButton
            icon={Phone}
            label="Call"
            workingLabel="Connecting…"
            doneLabel="On the line"
            variant="solid"
            notifyTitle={`Calling ${first}`}
            notifyBody="Secure Ayvaa line, number never shared"
          />
        </div>

        <motion.button
          type="button"
          whileTap={requestPhase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={requestUpdate}
          disabled={requestPhase !== 'idle'}
          aria-disabled={requestPhase !== 'idle'}
          className={cn(
            'mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12.5px] font-extrabold transition-colors',
            requestPhase === 'done'
              ? 'bg-emerald-500/[0.16] text-emerald-800'
              : requestPhase === 'working'
                ? 'cursor-wait bg-emerald-500/[0.06] text-emerald-700/50'
                : 'bg-[#0B211B]/[0.05] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.08]',
          )}
        >
          {requestPhase === 'idle' && (
            <>
              <Radio className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Ask for a quick update
            </>
          )}
          {requestPhase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending request…
            </>
          )}
          {requestPhase === 'done' && (
            <>
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              Update requested
            </>
          )}
        </motion.button>
      </div>
    </Card>
  )
}
