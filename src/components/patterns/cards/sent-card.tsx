import { AnimatePresence, motion } from 'motion/react'
import { MailCheck, PhoneCall } from 'lucide-react'
import { Card, Tile } from '@/components/base/phone/kit'
import { StatusStrip } from '@/components/base/phone/status-strip'
import type { CallState } from '../actions'
import { SentActions } from '../actions'
import { ValidityMeter } from './validity-meter'

export function SentCard({
  remaining,
  callState,
  onCall,
}: {
  remaining: number
  callState: CallState
  onCall: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Card intent="success">
        <div className="p-4">
          <div className="flex items-center gap-3.5">
            <Tile icon={MailCheck} tone="success" size="lg" />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Reset link sent
              </div>
              <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">
                Check your inbox, sent just now
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ValidityMeter remaining={remaining} />
          </div>

          <SentActions callState={callState} onCall={onCall} />

          <AnimatePresence>
            {callState === 'done' && (
              <StatusStrip icon={PhoneCall} title="Call requested" align="start" className="mt-3 px-3.5">
                A coordinator calls you within 10 minutes
              </StatusStrip>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  )
}

export type { CallState } from '../actions'
