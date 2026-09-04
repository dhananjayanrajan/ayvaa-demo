import { useState } from 'react'
import { Bell, BellOff } from 'lucide-react'
import { Tile } from '@/components/base/phone/kit'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

export function AlertToggleRow() {
  const { notify } = useDemo()
  const [alertMe, setAlertMe] = useState(true)

  const toggle = () => {
    const next = !alertMe
    setAlertMe(next)
    notify({
      title: next ? 'Arrival alerts on' : 'Arrival alerts off',
      body: next ? 'We will ping you the moment money lands.' : 'You can re-enable any time before 6 PM.',
      kind: 'info',
    })
  }

  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3.5">
      <Tile icon={alertMe ? Bell : BellOff} tone={alertMe ? 'success' : 'neutral'} size="sm" />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Alert me when it lands</div>
        <div className="mt-0.5 text-pretty text-[10.5px] font-semibold leading-relaxed text-[#0B211B]/45">
          Push and SMS the second the bank confirms
        </div>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={alertMe}
        aria-label="Toggle arrival alerts"
        className={cn(
          'relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
          alertMe ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
        )}
      >
        <span
          className={cn(
            'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)] transition-all duration-200',
            alertMe ? 'left-6' : 'left-1',
          )}
        />
      </button>
    </div>
  )
}
