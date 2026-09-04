import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { Card, Tile } from '@/components/base/phone/kit'
import { OptionRow, OptionCheckBox } from '@/components/base/phone/option-row'
import { SCOPES } from '@/data/patientConsent'
import { cn } from '@/lib/utils'

interface ScopesCardProps {
  grantedIds: string[]
  location: boolean
  disabled: boolean
  onToggleScope: (id: string) => void
  onToggleLocation: () => void
}

export function ScopesCard({ grantedIds, location, disabled, onToggleScope, onToggleLocation }: ScopesCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-2 p-3">
        {SCOPES.map((scope) => {
          const Icon = scope.icon
          const granted = grantedIds.includes(scope.id)
          return (
            <OptionRow
              key={scope.id}
              selected={granted}
              onSelect={() => onToggleScope(scope.id)}
              disabled={disabled}
              align="start"
              tapScale={0.99}
              className={cn('gap-3.5 p-4 duration-200', disabled && 'cursor-not-allowed opacity-60')}
              selectedClassName="bg-emerald-500/[0.06] hover:bg-emerald-500/[0.1]"
              unselectedClassName="bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.06]"
              leading={<Tile icon={Icon} tone={granted ? 'success' : 'neutral'} />}
              title={scope.label}
              titleClassName="block text-[13.5px] font-extrabold tracking-tight"
              selectedTitleClassName="text-[#0B211B]"
              unselectedTitleClassName="text-[#0B211B]/55"
              sub={scope.detail}
              subClassName="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/50"
              trailing={<OptionCheckBox on={granted} />}
            />
          )
        })}

        <div
          className={cn(
            'flex items-center gap-3.5 rounded-2xl p-4 transition-colors duration-200',
            disabled && 'opacity-60',
            location ? 'bg-emerald-500/[0.06]' : 'bg-[#0B211B]/[0.03]',
          )}
        >
          <Tile icon={MapPin} tone={location ? 'success' : 'neutral'} />
          <span className="min-w-0 flex-1">
            <span
              className={cn(
                'block text-[13.5px] font-extrabold tracking-tight',
                location ? 'text-[#0B211B]' : 'text-[#0B211B]/55',
              )}
            >
              Location tracking during visits
            </span>
            <span className="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/50">
              Optional. Verifies arrivals against the care address on the visit log.
            </span>
          </span>
          <button
            type="button"
            onClick={disabled ? undefined : onToggleLocation}
            disabled={disabled}
            aria-pressed={location}
            aria-label="Toggle location tracking"
            className={cn(
              'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300',
              disabled && 'cursor-not-allowed opacity-60',
              location ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]',
            )}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 34 }}
              className={cn(
                'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_6px_rgba(11,33,27,0.3)]',
                location ? 'left-6' : 'left-1',
              )}
            />
          </button>
        </div>
      </div>
    </Card>
  )
}
