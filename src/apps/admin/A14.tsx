import { useEffect, useRef, useState } from 'react'
import { Check, Download, Loader2, ShieldCheck } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { BodyArea, EndOfScroll, FootBar, Screen } from '@/components/phone/Screen'
import { Card } from '@/components/phone/kit'
import { SealedRecordHero } from '@/components/admin/heroes/SealedRecordHero'
import { RecordTimeline } from '@/components/admin/lists/RecordTimeline'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { recordEntries, sealedRecord } from '@/data/admin/a14Data'

type VerifyState = 'idle' | 'working' | 'done'

export function A14() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [verifyState, setVerifyState] = useState<VerifyState>('idle')
  const [exportState, setExportState] = useState<'idle' | 'working' | 'done'>('idle')
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => { const t = timersRef.current; return () => t.forEach(clearTimeout) }, [])

  const verifyRecord = () => {
    if (verifyState !== 'idle') return
    setVerifyState('working')
    timersRef.current.push(setTimeout(() => { setVerifyState('done'); notify({ title: 'Record verified', body: 'All entries match · no tampering detected', kind: 'ok' }) }, 1600))
  }
  const exportRecord = () => {
    if (exportState !== 'idle') return
    setExportState('working')
    timersRef.current.push(setTimeout(() => { setExportState('done'); notify({ title: 'Record exported', body: 'Lifecycle record downloaded · access logged', kind: 'ok' }) }, 1400))
  }

  return (
    <Screen>
      <AppBar title="Record history" subtitle={`Record #${sealedRecord.id}`} onBack={() => navigate('/admin/a05')} />
      <BodyArea>
        <div className="relative flex flex-col gap-4 pt-1">
          <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-12 h-52 rounded-full bg-emerald-400/[0.16] blur-3xl" />
          <SealedRecordHero id={sealedRecord.id} fingerprint={sealedRecord.fingerprint} />
          <Card>
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0"><span className="block text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Lifecycle timeline</span><span className="mt-0.5 block text-[13px] font-bold tracking-tight text-[#0B211B]">{recordEntries.length} linked entries</span></div>
              <button type="button" onClick={verifyRecord} disabled={verifyState !== 'idle'} className={cn('flex shrink-0 items-center justify-center gap-2 rounded-2xl px-3.5 py-2.5 text-[11px] font-bold transition-all', verifyState === 'done' ? 'bg-emerald-500/[0.1] text-emerald-700' : verifyState === 'working' ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70' : 'bg-emerald-500 text-white shadow-[0_10px_20px_-10px_rgba(16,185,129,0.7)]')}>
                {verifyState === 'working' ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" /> : <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />}{verifyState === 'done' ? 'Verified' : verifyState === 'working' ? 'Verifying' : 'Verify record'}
              </button>
            </div>
            <RecordTimeline entries={recordEntries} verified={verifyState === 'done'} />
          </Card>
          <div className="rounded-2xl bg-emerald-500/[0.06] p-3.5"><div className="flex items-start gap-2.5"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} /><p className="min-w-0 flex-1 text-pretty break-words text-[11px] font-bold leading-snug text-emerald-900/80">Each action on this record is appended to the timeline. The record cannot be altered without detection.</p></div></div>
          <EndOfScroll label="End of record history" />
        </div>
      </BodyArea>
      <FootBar><button type="button" onClick={exportRecord} disabled={exportState !== 'idle'} className={cn('flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-all', exportState === 'done' ? 'bg-emerald-500/[0.1] text-emerald-700' : exportState === 'working' ? 'cursor-wait bg-emerald-500/10 text-emerald-600/70' : 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.6)]')}>{exportState === 'working' ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" /> : exportState === 'done' ? <Check className="h-4 w-4 shrink-0" strokeWidth={2.4} /> : <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} />}{exportState === 'idle' ? 'Export record' : exportState === 'working' ? 'Preparing export' : 'Export complete'}</button></FootBar>
    </Screen>
  )
}
