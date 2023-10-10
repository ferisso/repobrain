
import { TLabels } from "@/types/Labels";
import ChipIssueLabels from "./ChipIssueLabels";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";

interface IssueLabelSelectProps {
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  selectIssue: (label: string) => void
}

export default function IssueLabelSelect({ required, disabled, placeholder = "Select a label", selectIssue }: IssueLabelSelectProps) {
  const labels: TLabels[] = ['documentation', 'enhancement', 'bug']
  return (
    <Select onValueChange={selectIssue} required={required} disabled={disabled}>
      <SelectTrigger className="max-w-[260px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
          labels.map((label) => (
            <SelectItem key={label} value={label}>
              <ChipIssueLabels label={label} className="py-0.5 px-2" />
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}