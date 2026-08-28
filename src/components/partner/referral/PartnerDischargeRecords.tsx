import { Chip, Section } from '@/components/phone/kit'
import AnimatedFileUpload from '@/components/smoothui/animated-file-upload'

interface PartnerDischargeRecordsProps {
  files: number
  onFilesSelected: (files: File[]) => void
}

export function PartnerDischargeRecords({ files, onFilesSelected }: PartnerDischargeRecordsProps) {
  return (
    <>
      <Section
        label="Discharge records"
        trailing={<Chip intent={files > 0 ? 'success' : 'warning'} dot={files === 0}>{files > 0 ? `${files} attached` : 'Pending'}</Chip>}
      />
      <AnimatedFileUpload
        accept=".pdf"
        onFilesSelected={onFilesSelected}
      />
    </>
  )
}
