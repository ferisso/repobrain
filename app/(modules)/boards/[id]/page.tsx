'use client'
import BoardsService from "@/service/BoardsService"
import { ArrowArcLeft } from "@phosphor-icons/react"
import { ArrowLeft, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { Delete, Trash, Trash2 } from "react-feather"


export default async function Board({ params }: { params: { id: string } }) {
  const route = useRouter()
  const boards = await BoardsService.getBoards(params.id)
  const board = boards.length ? boards[0] : undefined

  const deleteBoard = async () => {
    await BoardsService.deleteBoard(params.id)
    route.back()
  }
  
  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">
            {board?.title}
          </h2>
          <p className="text-zinc-500 font-light">
            {board?.createdAt?.toString()}
          </p>
        </span>
        <div className="flex gap-2">
          <button className="p-2 text-zinc-400 rounded-md hover:bg-zinc-50 hover:text-zinc-500" onClick={() => route.back()}>
            <ArrowLeft size={20} />
          </button>
          <button className="p-2 text-teal-400 rounded-md hover:bg-teal-100/40 hover:text-teal-500 text-xs flex gap-1 items-center" onClick={() => route.back()}>
            <Pencil size={16} /> Edit
          </button>
          <button className="p-2 text-red-400 rounded-md hover:bg-red-100/40 hover:text-red-500 text-xs flex gap-1 items-center" onClick={deleteBoard}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 border rounded-md p-2 mt-4 w-full min-h-[400px]">
      </div>
    </>
  )
}