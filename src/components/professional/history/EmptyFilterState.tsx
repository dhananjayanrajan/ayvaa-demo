import { Search } from 'lucide-react'

export function EmptyFilterState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[26px] bg-white px-6 py-10 text-center shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35">
        <Search className="h-6 w-6" strokeWidth={2.2} aria-hidden />
      </span>
      <p className="text-[14px] font-extrabold tracking-tight text-[#0B211B]/70">Nothing matches this filter</p>
      <p className="text-xs font-medium text-[#0B211B]/45">Try All to see the full history</p>
    </div>
  )
}
