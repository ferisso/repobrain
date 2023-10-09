'use client'
import TeamMemberSelect from "@/components/TeamMemberSelect"
import BoardsService from "@/service/BoardsService"
import { ArrowLeft, Pencil, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Delete, Trash, Trash2 } from "react-feather"


export default async function Board({ params }: { params: { id: string } }) {
  const route = useRouter()
  const boards = await BoardsService.getBoards(params.id)
  const board =  boards[0] || undefined

  const deleteBoard = async () => {
    await BoardsService.deleteBoard(params.id)
    route.back()
  }

  const statusOptions = {
    0: { text: 'Blocked', classOption: 'border-red-500 text-red-500' },
    1: { text: 'To do', classOption: 'border-orange-500 text-orange-500' },
    2: { text: 'In progress', classOption: 'border-blue-500 text-blue-500' },
    3: { text: 'Code review', classOption: 'border-indigo-500 text-indigo-500' },
    4: { text: 'Ready for test', classOption: 'border-amber-500 text-amber-500' },
    5: { text: 'Done', classOption: 'border-emerald-500 text-emerald-500' },
  }
  
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 justify-between items-center py-2">
          <button className="py-2 text-zinc-400 rounded-md hover:text-zinc-500 bg-" onClick={() => route.back()}>
            <ArrowLeft size={24} />
          </button>
          <span className="flex gap-2">
            <button className="p-2 text-teal-400 rounded-md hover:bg-teal-100/40 hover:text-teal-500 text-xs flex gap-1 items-center" onClick={() => route.back()}>
              <Pencil size={16} /> Edit
            </button>
            <button className="p-2 text-red-400 rounded-md hover:bg-red-100/40 hover:text-red-500 text-xs flex gap-1 items-center" onClick={deleteBoard}>
              <Trash2 size={16} /> Delete
            </button>
          </span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl text-zinc-900/80 font-semibold">
              {board?.title}
            </h2>
            { 
              (board.onBoardStatus || board.onBoardStatus == 0) && (
                <div className={`rounded-full border py-1 px-2 text-xs ${statusOptions[board.onBoardStatus].classOption}`}>
                  { statusOptions[board.onBoardStatus].text }
                </div>
              )
            }
            {
              board.label && (
                <div className="lowercase rounded-full border border-blue-500 text-blue-500 py-1 px-2 text-xs">
                { board?.label }
              </div>
              )
            }
          </div>
          <div className="flex gap-2 items-center">
            <TeamMemberSelect placeholder="Reporter" teamId={board?.project?.team_id} selectMember={() => { }} selectedMember={board?.reporter} disabled></TeamMemberSelect>
            <div className="flex justify-center items-center w-10 text-zinc-600">
              <ArrowRight size={24} />
            </div>
            <TeamMemberSelect placeholder="Assignee" teamId={board?.project?.team_id} selectMember={() => { }} selectedMember={board?.assignee} disabled></TeamMemberSelect>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border rounded-md p-2 mt-4 w-full min-h-[400px]">
      </div>
    </>
  )
}