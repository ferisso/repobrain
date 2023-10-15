'use client'
import BoardsService from "@/service/BoardsService"
import { ArrowLeft} from "lucide-react"
import { useRouter } from "next/navigation"
import { Trash2 } from "react-feather"
import dynamic from 'next/dynamic';
import EditIssue from "@/components/EditIssue"


let EditorJs: any;
if (typeof window !== "undefined") {
  EditorJs = dynamic(() => import('@/components/EditorJsWrapper'), { ssr: false });
}


export default async function Board({ params }: { params: { id: string } }) {
  const route = useRouter()
  const boards = await BoardsService.getBoardsById(params.id)
  const board = boards[0] || undefined

  const deleteBoard = async () => {
    await BoardsService.deleteBoard(params.id)
    route.back()
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-2 justify-between items-center py-2">
          <button className="py-2 text-zinc-400 rounded-md hover:text-zinc-500 bg-" onClick={() => route.back()}>
            <ArrowLeft size={24} />
          </button>
          <span className="flex gap-2">
            <button className="p-2 text-red-400 rounded-md hover:bg-red-100/40 hover:text-red-500 text-xs flex gap-1 items-center" onClick={deleteBoard}>
              <Trash2 size={16} /> Delete
            </button>
          </span>
        </div>
        <EditIssue board={board} />
      </div>
    </>
  )
}