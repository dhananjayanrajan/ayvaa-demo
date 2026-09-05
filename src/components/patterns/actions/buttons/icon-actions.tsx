import { useEffect, useRef, useState } from 'react'
import { CheckCheck, Download, Share2 } from 'lucide-react'
import { IconLifecycleButton } from '@/components/base/phone/lifecycle-button'
import { summaryShareText } from '@/data/patientVisitSummary'
import { REPORTS, downloadAllLines, downloadTextFile } from '@/data/patientReports'
import { useDemo } from '@/lib/store'

export function MarkAllReadButton({ unreadCount, onPress }: { unreadCount: number; onPress: () => void }) {
  const done = unreadCount === 0
  return <IconLifecycleButton phase={done ? 'done' : 'idle'} icon={CheckCheck} rounded="xl" revert={false} ariaLabel={done ? 'All caught up' : 'Mark all read'} onPress={done ? undefined : onPress} />
}

export function ShareButton() {
  const [phase, setPhase] = useState<'idle' | 'done'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const share = () => {
    if (phase !== 'idle') return
    setPhase('done')
    timer.current = setTimeout(() => setPhase('idle'), 1800)
  }
  return <IconLifecycleButton phase={phase} icon={Share2} revert ariaLabel={phase === 'done' ? 'Booking summary copied' : 'Share booking summary'} onPress={share} />
}

export function ShareSummaryButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(setTimeout(() => { void navigator.clipboard?.writeText(summaryShareText()); notify({ title: 'Summary copied', body: 'Visit record copied to clipboard', kind: 'ok' }) }, 1200))
    timers.current.push(setTimeout(() => setPhase('idle'), 2600))
  }
  return <IconLifecycleButton phase={phase} icon={Share2} revert ariaLabel="Share visit summary" onPress={share} />
}

export function DownloadAllButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => { downloadTextFile(downloadAllLines(), 'ayvaa-care-reports-archive.txt'); setPhase('done') }, 800))
    timers.current.push(setTimeout(() => notify({ title: 'Archive saved', body: `All ${REPORTS.length} sealed reports downloaded as one file`, kind: 'ok' }), 900))
  }
  return <IconLifecycleButton phase={phase} icon={Download} revert={false} ariaLabel={phase === 'done' ? 'Archive saved' : 'Download all reports'} onPress={run} />
}
