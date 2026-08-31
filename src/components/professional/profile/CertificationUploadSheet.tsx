import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Award, Check, FileImage, FileText, Upload } from 'lucide-react'
import { SheetShell } from '@/components/phone/SheetShell'
import { LifecycleButton, CtaNote } from '@/components/phone/LifecycleButton'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'verifying' | 'added'

type PickedFile = { name: string; size: string; kind: 'image' | 'pdf' }

type Props = {
  category: string | null
  onClose: () => void
  onAdded: (category: string | null, certName: string) => void
}

export function CertificationUploadSheet({ category, onClose, onAdded }: Props) {
  const [file, setFile] = useState<PickedFile | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    const size = f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(f.size / 1024))} KB`
    setFile({ name: f.name, size, kind: isPdf ? 'pdf' : 'image' })
    setStatus('idle')
    e.target.value = ''
  }

  const verify = () => {
    if (!file || status !== 'idle') return
    setStatus('verifying')
    timers.current.push(
      setTimeout(() => {
        setStatus('added')
        const certName = category ?? file.name.replace(/\.[^.]+$/, '')
        timers.current.push(setTimeout(() => onAdded(category, certName), 1100))
      }, 1200),
    )
  }

  const FileIcon = file?.kind === 'pdf' ? FileText : FileImage

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <SheetShell
        icon={Award}
        tone="info"
        title={category ? `Certify ${category}` : 'Upload certification'}
        subtitle="Ayvaa verifies within two working days"
        onClose={onClose}
        footer={
          <div className="flex flex-col gap-2.5">
            <LifecycleButton
              phase={status === 'idle' ? 'idle' : status === 'added' ? 'done' : 'working'}
              tone="accent"
              idleIcon={Upload}
              gated={!file}
              idleLabel={file ? 'Verify certification' : 'Choose a file first'}
              workingLabel="Verifying with Ayvaa…"
              doneLabel="Submitted for review"
              onPress={verify}
            />
            <CtaNote className="font-semibold">Photo or PDF. Documents stay sealed with Ayvaa.</CtaNote>
          </div>
        }
      >
        <div className="flex flex-col gap-3.5">
          {category && (
            <div className="flex items-baseline justify-between gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3">
              <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Category</span>
              <span className="min-w-0 truncate text-right text-[12.5px] font-bold text-[#0B211B]">{category}</span>
            </div>
          )}

          <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={onFile} aria-label="Certification file" />

          {file ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors',
                status === 'added' ? 'bg-emerald-500/[0.08]' : 'bg-[#0B211B]/[0.035]',
              )}
            >
              <span
                className={cn(
                  'grid h-12 w-12 shrink-0 place-items-center rounded-2xl',
                  status === 'added' ? 'bg-emerald-500/[0.12] text-emerald-700' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/60',
                )}
              >
                <FileIcon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]',
                    status === 'added' ? 'text-emerald-700/80' : 'text-[#0B211B]/40',
                  )}
                >
                  {status === 'added' ? (
                    <>
                      File submitted
                      <Check className="h-2.5 w-2.5 shrink-0" strokeWidth={4} aria-hidden />
                    </>
                  ) : (
                    'File attached'
                  )}
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] font-bold text-[#0B211B]/75">{file.name}</span>
                <span className="mt-0.5 block text-[10.5px] font-semibold text-[#0B211B]/45">
                  {file.size} · tap to replace
                </span>
              </span>
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => inputRef.current?.click()}
              className="flex h-[96px] w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.035] text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.06]"
            >
              <Upload className="h-5 w-5" strokeWidth={2.2} aria-hidden />
              <span className="text-[13px] font-bold">Tap to attach a photo or PDF</span>
            </motion.button>
          )}
        </div>
      </SheetShell>
    </>
  )
}
