'use client'
import { ChartLineDown, FolderDashed, Plus } from "@phosphor-icons/react";

export default function Reports() {
  return (
    <>
    <div className="flex justify-between items-center">
      <span>
        <h2 className="text-3xl text-zinc-900/80 font-semibold">Reports</h2>
        <p className="text-zinc-500 font-light">Here you find your awesome reports</p>
      </span>
      {/* <button className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs">
        <Plus size={18} />
        New project
      </button> */}
    </div>
    <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
      <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
        <ChartLineDown size={32} weight="thin" />
      </div>
      <p>No reports avaiable</p>
      <p className="font-light text-xs text-zinc-500">
        When you start to using the plataform your reports will show here
      </p>
      {/* <button
        className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5 mt-2"
      >
        <Plus size={18} />
        Add project
      </button> */}
    </div>
  </>
  )
}