
import { TLabels } from "@/types/Labels";
import ChipIssueLabels from "./ChipIssueLabels";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";

interface IssueLabelSelectProps {
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  selectIssue: (label: string) => void
}

export default function IssueLabelSelect({ required, disabled, placeholder = "Select a label", className, value, selectIssue }: IssueLabelSelectProps) {
  const labels: TLabels[] = ['documentation', 'enhancement', 'bug']
  return (
    <Select onValueChange={selectIssue} required={required} disabled={disabled} defaultValue={value}>
      <SelectTrigger className={className}>
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