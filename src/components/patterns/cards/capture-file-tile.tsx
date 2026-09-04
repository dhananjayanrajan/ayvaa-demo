import { FileImage, RefreshCw } from 'lucide-react'

export function CaptureFileTile({
  name,
  size,
  onReplace,
}: {
  name: string
  size: string
  onReplace: () => void
}) {
  return (
    <button
      type="button"
      onClick={onReplace}
      className="flex w-full items-center gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.05]"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.12] text-emerald-600">
        <FileImage className="h-4 w-4" strokeWidth={2.2} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-bold tracking-tight text-[#0B211B]">
          {name}
        </span>
        <span className="mt-0.5 block text-[10px] font-bold tabular-nums text-[#0B211B]/45">
          {size} · encrypted on capture
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#0B211B]/[0.05] px-3 py-1.5 text-[10px] font-extrabold text-[#0B211B]/55">
        <RefreshCw className="h-3 w-3" strokeWidth={2.4} aria-hidden />
        Retake
      </span>
    </button>
  )
}
