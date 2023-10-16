import ChipIssueLabels from "@/components/ChipIssueLabels"
import TeamMemberSelect from "@/components/TeamMemberSelect"
import { ArrowRight } from "lucide-react"
import dynamic from 'next/dynamic';
import PriorityDots from "@/components/PriorityDots"
import { IBoards } from "@/types/Boards"
import { useState } from "react";
import BoardService from "@/service/BoardsService";
import IssueLabelSelect from "./IssueLabelSelect";


let EditorJs: any;
if (typeof window !== "undefined") {
  EditorJs = dynamic(() => import('@/components/EditorJsWrapper'), { ssr: false });
}

export default function EditIssue({ board }: { board: IBoards }) {
  const [title, setTitle] = useState('')
  const statusOptions = {
    0: { text: 'Blocked', classOption: 'border-red-500 text-red-500' },
    1: { text: 'To do', classOption: 'border-orange-500 text-orange-500' },
    2: { text: 'In progress', classOption: 'border-blue-500 text-blue-500' },
    3: { text: 'Code review', classOption: 'border-indigo-500 text-indigo-500' },
    4: { text: 'Ready for test', classOption: 'border-amber-500 text-amber-500' },
    5: { text: 'Done', classOption: 'border-emerald-500 text-emerald-500' },
  }

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  const saveIssue = debounce(({ key, value }: { key: string, value: string }) => {
    const newBoard = {
      id: board.id,
      [key]: value
    }
    BoardService.updateBoard(newBoard)
  }, 500);

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center">
          <input
            className="text-xl text-zinc-900/80 font-semibold outline-none w-full"
            defaultValue={board?.title}
            onChange={(e) => saveIssue({ key: 'title', value: e.target.value })}
          />
          {
            (board.onBoardStatus || board.onBoardStatus == 0) && (
              <div
                className={
                  `rounded-full border max-w-[100px] w-full px-2 py-1 
                  flex justify-center text-xs 
                  ${statusOptions[board.onBoardStatus].classOption}`
                }
              >
                {statusOptions[board.onBoardStatus].text}
              </div>
            )
          }
          <IssueLabelSelect selectIssue={(e) => saveIssue({ key: 'label', value: e })} className="max-w-[150px]" value={board.label} />
          <PriorityDots priority={board.priority} />
        </div>
        <div className="flex gap-2 items-center">
          <TeamMemberSelect
            placeholder="Reporter"
            teamId={board?.project?.team_id}
            selectMember={(e) => saveIssue({ key: 'reporter', value: e })}
            selectedMember={board?.reporter}
          />
          <div className="flex justify-center items-center w-10 text-zinc-600">
            <ArrowRight size={24} />
          </div>
          <TeamMemberSelect
            placeholder="Assignee"
            teamId={board?.project?.team_id}
            selectMember={(e) => saveIssue({ key: 'assignee', value: e })}
            selectedMember={board?.assignee}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 border rounded-md p-2 mt-4 w-full min-h-[400px]">
        {
          EditorJs &&
          <EditorJs
            data={board.description && JSON.parse(board.description)}
            setData={(e: string) => saveIssue({ key: 'description', value: e })}
          />
        }
      </div>
    </>
  )
}