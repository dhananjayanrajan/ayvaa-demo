import { useEffect, useRef, useState } from 'react'
import { MessageSquare, Phone, Radio } from 'lucide-react'
import { Card, LiveDot } from '@/components/phone/kit'
import { DarkPanel } from '@/components/phone/DarkPanel'
import { QuietLifecycleButton } from '@/components/phone/LifecycleButton'
import { ConnectButton } from './ConnectButton'
import { LIVE_VISIT, formatElapsed } from '@/data/patientLiveVisit'
import { useDemo } from '@/lib/store'

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

        <DarkPanel className="mt-3" glow={false}>
          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <LiveDot className="text-emerald-300" />
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
        </DarkPanel>

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

        <QuietLifecycleButton
          phase={requestPhase}
          className="mt-2.5"
          idleIcon={Radio}
          idleLabel="Ask for a quick update"
          workingLabel="Sending request…"
          doneLabel="Update requested"
          doneTone="tint"
          onPress={requestUpdate}
        />
      </div>
    </Card>
  )
}
