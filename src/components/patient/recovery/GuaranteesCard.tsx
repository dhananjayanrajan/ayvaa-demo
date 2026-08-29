import { Card, Tile } from '@/components/phone/kit'
import { guarantees } from '@/data/patientRecovery'

export function GuaranteesCard() {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        {guarantees.map((g) => {
          const Icon = g.icon
          return (
            <div key={g.key} className="flex items-start gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-3.5 py-3">
              <Tile icon={Icon} tone={g.key === 'visits' ? 'success' : 'info'} />
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                  {g.title}
                </div>
                <p className="mt-0.5 text-pretty text-[11px] font-semibold leading-snug text-[#0B211B]/45">
                  {g.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
