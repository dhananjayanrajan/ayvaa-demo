import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { motion } from 'motion/react'
import { Check, ChevronRight, ClipboardList, FileImage, Loader2, Lock, RefreshCw, Upload } from 'lucide-react'
import { Card, MiniBadge, TimeChip } from '@/components/base/phone/kit'
import { Row } from '@/components/base/phone/row'
import { RX_DOCUMENTS } from '@/data/patientPrescriptions'
import { formatFileSize } from '@/data/patientIdentity'
import { useDemo } from '@/lib/store'

type Phase = 'idle' | 'scanning' | 'done'

interface UploadedFile {
  name: string
  size: string
}

export function DocumentsCard() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const [file, setFile] = useState<UploadedFile | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    e.target.value = ''
    if (!selected) return
    setFile({ name: selected.name, size: formatFileSize(selected.size) })
    setPhase('scanning')
    timers.current.push(setTimeout(() => setPhase('done'), 1400))
    timers.current.push(
      setTimeout(() => notify({ title: 'Prescription uploaded', body: 'Nurse verifies it before the next dose', kind: 'ok' }), 1900),
    )
  }

  return (
    <Card>
      <div className="flex flex-col gap-1.5 p-4">
        {RX_DOCUMENTS.map((doc) => (
          <Row
            key={doc.title}
            icon={ClipboardList}
            tone="neutral"
            tileSize="lg"
            title={doc.title}
            titleClassName="text-[14px] font-extrabold"
            subtitle={doc.doctor}
            subtitleClassName="text-[11px] text-[#0B211B]/55"
            trailing={
              <span className="flex shrink-0 flex-col items-end gap-1.5">
                <MiniBadge icon={Lock} tone="amber">
                  Locked
                </MiniBadge>
                <TimeChip>{doc.uploadedAt}</TimeChip>
              </span>
            }
            surface="inset"
            padding="even"
            className="gap-3.5"
            hoverClassName="hover:bg-[#0B211B]/[0.05]"
            showChevron={false}
            onClick={() => notify({ title: doc.title, body: 'View logged to the audit trail', kind: 'info' })}
          />
        ))}

        {phase === 'idle' && (
          <Row
            leading={
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0B211B]/[0.06] text-[#0B211B]/60">
                <Upload className="h-5 w-5" strokeWidth={2.4} aria-hidden />
              </span>
            }
            title="Upload prescription"
            titleClassName="text-[14px] font-extrabold"
            subtitle="Photo or PDF, nurse checked"
            subtitleClassName="text-[11px] text-[#0B211B]/45"
            surface="inset"
            padding="even"
            className="gap-3.5"
            hoverClassName="hover:bg-[#0B211B]/[0.05]"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25" aria-hidden />}
            onClick={() => inputRef.current?.click()}
          />
        )}

        {phase === 'scanning' && (
          <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.12] text-emerald-600">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold tracking-tight text-[#0B211B]">Checking with the nurse</span>
                <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">Verifying the prescription before use</span>
              </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#0B211B]/[0.07]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                transition={{ duration: 1.3, ease: 'easeInOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              />
            </div>
          </div>
        )}

        {phase === 'done' && file && (
          <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
            <div className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white">
                <Check className="h-5 w-5" strokeWidth={2.6} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold tracking-tight text-[#0B211B]">Uploaded</span>
                <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">Nurse checks it before the next dose</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 w-full rounded-xl bg-white px-3 py-2.5 text-left transition-colors hover:bg-white/80"
            >
              <span className="flex items-center gap-2">
                <FileImage className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-[#0B211B]">{file.name}</span>
              </span>
              <span className="mt-2 flex items-center gap-1.5 pl-6">
                <MiniBadge icon={FileImage} tone="neutral">
                  {file.size}
                </MiniBadge>
                <MiniBadge icon={RefreshCw} tone="neutral">
                  Replace
                </MiniBadge>
              </span>
            </button>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} />
    </Card>
  )
}
