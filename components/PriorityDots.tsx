import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PriorityDots({ priority }: { priority: number }) {

  const dotColor = () => {
    switch (priority) {
      case 1:
        return 'bg-emerald-600'
      case 2: 
        return 'bg-yellow-600'
      case 3:
        return 'bg-amber-600'
      case 4:
          return 'bg-orange-600'
      case 5:
          return 'bg-red-600'
      default:
        return 'bg-zinc-600'
    }
  }

  const createPriority = (): Array<number> | [] => {
    const arr = []
    for (let index = 0; index < priority; index++) {
      arr.push(index);
    }
    return arr
  }

  return (
    priority > 0 ?
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger aria-label="Priority dots">
            <div className="flex gap-1">
              {createPriority().map(item => (<div key={`priority-${item}`} className={`h-1.5 w-1.5 ${dotColor()} rounded-full`} />))}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{`Priority level ${priority}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      :
      <></>
  )
}