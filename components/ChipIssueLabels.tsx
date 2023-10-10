import { TLabels } from "@/types/Labels"


export default function ChipIssueLabels({ label, className }: { label: string, className?: string }) {

  const getLabel = (label: any) => {
    const labelColor: any = {
      documentation: { text: 'Documentation', color: 'bg-[#0075ca]' },
      enhancement: { text: 'Enhancement', color: 'bg-[#7057ff]' },
      bug: { text: 'Bug', color: 'bg-red-500' },
    }
    return labelColor[label] ?? { text: '', color: 'hidden' }
  }

  return (
    <div
      className={`rounded-full ${getLabel(label).color} text-[10px] w-fit px-2 py-1 text-zinc-50 font-medium ${className}`}
    >
      {getLabel(label).text}
    </div>
  )
}