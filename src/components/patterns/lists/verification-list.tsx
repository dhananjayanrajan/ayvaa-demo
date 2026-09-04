import { Check } from 'lucide-react'
import { Card } from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'
import type { CheckItem } from '@/data/admin/a12Data'

type Props = { checks: CheckItem[] }

export function VerificationList({ checks }: Props) {
  return (
    <Card>
      <div className="p-4">
        <div className="flex flex-col gap-3">
          {checks.map((check) => {
            const isOk = check.status === 'ok'
            const isRunning = check.status === 'running'
            return (
              <div key={check.id} className="flex items-start gap-3">
                <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', isOk ? 'bg-emerald-500 text-white' : isRunning ? 'bg-amber-400' : 'bg-[#0B211B]/[0.1]')}>
                  {isOk ? <Check className="h-3 w-3" strokeWidth={3.5} /> : isRunning ? <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" /></span> : <span className="h-2 w-2 rounded-full bg-[#0B211B]/30" />}
                </span>
                <div className="min-w-0 flex-1"><div className="break-words text-[13px] font-bold tracking-tight text-[#0B211B]">{check.label}</div><div className="mt-0.5 break-words text-[11px] font-medium text-[#0B211B]/55">{check.sub}</div></div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
