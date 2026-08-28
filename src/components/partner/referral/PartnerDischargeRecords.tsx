import { Chip, Section } from '@/components/phone/kit'
import AnimatedFileUpload from '@/components/smoothui/animated-file-upload'

interface PartnerDischargeRecordsProps {
  files: { name: string; size: string }[]
  onFilesSelected: (files: File[]) => void
}

export function PartnerDischargeRecords({
  files,
  onFilesSelected,
}: PartnerDischargeRecordsProps) {
  return (
    <>
      <Section
        label="Discharge records"
        trailing={
          <Chip intent={files.length > 0 ? 'success' : 'warning'} dot={files.length === 0} className="border-transparent">
            {files.length > 0 ? `${files.length} attached` : 'Pending'}
          </Chip>
        }
      />
      <AnimatedFileUpload
        accept=".pdf"
        onFilesSelected={onFilesSelected}
      />
    </>
  )
}
