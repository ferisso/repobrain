'use client'

import BoardsSideMenu from "@/components/BoardsSideMenu"
import { Plus } from "react-feather"

export default function Boards() {
  return (
    <div className="grid flex-1 flex-col gap-4 grid-cols-[160px_1fr]">
      <BoardsSideMenu />
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Projects</h2>
          <p className="text-zinc-500 font-light">Create or manage your projects</p>
        </span>
        <button className="flex items-center justify-center gap-2 text-white bg-teal-500 py-2 px-4 rounded-md text-sm">
          <Plus size={20} />
          New project
        </button>
        </div>
      </div> 
    </div>
  )
}