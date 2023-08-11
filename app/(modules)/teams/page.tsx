/* eslint-disable react/no-unescaped-entities */
'use client'
import { UsersThree } from "@phosphor-icons/react"
import { Plus } from "react-feather"
  
export default function Boards() {
  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Teams</h2>
          <p className="text-zinc-500 font-light">Create or manage your teams</p>
        </span>
        <button className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs">
          <Plus size={18} />
          New team
        </button>
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
        <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
          <UsersThree size={32} weight="thin" />
        </div>
        <p>No Teams created</p>
        <p className="font-light text-xs text-zinc-500">
          You don't have any team yet. Starting creating one
        </p>
        <button
          className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5 mt-2"
        >
          <Plus size={18} />
          Add team
        </button>
      </div>
    </>
  )
}