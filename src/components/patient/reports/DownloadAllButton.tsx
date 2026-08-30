import { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import { IconLifecycleButton } from '@/components/phone/LifecycleButton'
import { REPORTS, downloadAllLines, downloadTextFile } from '@/data/patientReports'
import { useDemo } from '@/lib/store'

export function DownloadAllButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        downloadTextFile(downloadAllLines(), 'ayvaa-care-reports-archive.txt')
        setPhase('done')
      }, 800),
    )
    timers.current.push(
      setTimeout(() => {
        notify({ title: 'Archive saved', body: `All ${REPORTS.length} sealed reports downloaded as one file`, kind: 'ok' })
      }, 900),
    )
  }

  return (
    <IconLifecycleButton
      phase={phase}
      icon={Download}
      revert={false}
      ariaLabel={phase === 'done' ? 'Archive saved' : 'Download all reports'}
      onPress={run}
    />
  )
}
