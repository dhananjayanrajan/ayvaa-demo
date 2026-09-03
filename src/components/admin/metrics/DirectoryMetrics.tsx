import { Stat } from '@/components/phone/kit'

export function DirectoryMetrics() {
  return (
    <div className="mt-5 grid grid-cols-3 divide-x divide-white/[0.08]">
      <Stat label="Patients" value="1,284" dot="bg-emerald-300" />
      <Stat label="Pros" value="642" dot="bg-teal-300" />
      <Stat label="Partners" value="415" dot="bg-sky-300/80" />
    </div>
  )
}
