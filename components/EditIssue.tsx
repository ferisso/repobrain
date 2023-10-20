import TeamMemberSelect from "@/components/TeamMemberSelect"
import { ArrowRight, GithubIcon } from "lucide-react"
import dynamic from 'next/dynamic';
import { IBoards } from "@/types/Boards"
import BoardService from "@/service/BoardsService";
import IssueLabelSelect from "./IssueLabelSelect";
import { useSession } from "next-auth/react";
import GitHubAPIService from "@/service/GitHubAPIService";
import { toast } from "react-toastify";
import { useState } from "react";


let EditorJs: any;
if (typeof window !== "undefined") {
  EditorJs = dynamic(() => import('@/components/EditorJsWrapper'), { ssr: false });
}

export default function EditIssue({ board }: { board: IBoards }) {
  const { data } = useSession()
  const [createdIssue, setCreatedIssue] = useState<any>()
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

  const createIssueOnGithub = async () => {
    await GitHubAPIService.CreateIssueBasedOnBoard(board.id)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          toast.success('Issue created on Github!')
          setCreatedIssue(res.data)
        }
      })
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center">
          <input
            className="text-xl text-zinc-900/80 font-semibold outline-none w-full border-b hover:border-zinc-300 focus:border-zinc-400 transition-colors p-1"
            defaultValue={board?.title}
            onChange={(e) => saveIssue({ key: 'title', value: e.target.value })}
          />
          <IssueLabelSelect selectIssue={(e) => saveIssue({ key: 'label', value: e })} className="max-w-[150px]" value={board.label} />
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
          {
            (board.onBoardStatus || board.onBoardStatus == 0) && (
              <div
                className={
                  `rounded-full border px-2 py-1 
                  flex justify-center text-xs text-center
                  ${statusOptions[board.onBoardStatus].classOption}`
                }
              >
                {statusOptions[board.onBoardStatus].text}
              </div>
            )
          }
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-xs text-zinc-600">Priority</label>
          <input
            className="outline-none border transition-colors p-1 rounded-md w-12 text-sm"
            defaultValue={board?.priority}
            min={0}
            max={5}
            type="number"
            onChange={(e) => saveIssue({ key: 'priority', value: Number(e.target.value) })}
          />
          <label className="text-xs text-zinc-600">Points</label>
          <input
            className="outline-none border transition-colors p-1 rounded-md w-12 text-sm"
            defaultValue={board?.points}
            type="number"
            onChange={(e) => saveIssue({ key: 'points', value: Number(e.target.value) })}
          />
          {
            board?.issue_id || createdIssue ?
              <a href={board?.issue_url ? board.issue_url : createdIssue?.html_url} target="_blank" rel="noopener noreferrer" aria-label="Github issue">
                <GithubIcon size={22} className="text-zinc-600 hover:text-zinc-800" />
              </a>
              : data?.user.access_token && (
                <button
                  className="text-sm rounded-md py-1 px-2 text-teal-500 hover:bg-teal-50"
                  onClick={() => createIssueOnGithub()}
                >
                  Create issue on github
                </button>
              )
          }
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