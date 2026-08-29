export function JourneyTime({ value }: { value: string }) {
  return (
    <span className="shrink-0 rounded-full bg-white/[0.08] px-2.5 py-1 text-[9px] font-extrabold tabular-nums text-emerald-100/80">
      {value}
    </span>
  )
}
