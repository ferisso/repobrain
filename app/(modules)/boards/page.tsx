/* eslint-disable react/no-unescaped-entities */
'use client'
import DialogRegisterBoard from "@/components/DialogRegisterBoard"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapTrifold } from "@phosphor-icons/react"
import { getSession, useSession } from "next-auth/react"
import { useEffect } from "react"
import { Plus } from "react-feather"

export default function Boards() {
  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Boards</h2>
          <p className="text-zinc-500 font-light">Select the project to see the board</p>
        </span>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Repobrain</SelectItem>
            <SelectItem value="dark">E-Parking</SelectItem>
            <SelectItem value="system">NLW</SelectItem>
            <DialogRegisterBoard />
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
        <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
          <MapTrifold size={32} weight="thin" />
        </div>
        <p>No boards created</p>
        <p className="font-light text-xs text-zinc-500">
          You don't have any boards yet. Starting creating one
        </p>
        <button
          className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5 mt-2"
        >
          <Plus size={18} />
          Add board
        </button>
      </div>
    </>
  )
}