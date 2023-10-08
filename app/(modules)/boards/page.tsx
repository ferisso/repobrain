/* eslint-disable react/no-unescaped-entities */
'use client'
import DropdownProjects from "@/components/DropdownProjects"
import { Plus } from "react-feather"
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import BoardService from "@/service/BoardsService"
import SheetCreateIssue from "@/components/SheetCreateIssue"
import DevTrack from "@/components/DevTrack";
import MainLoader from "@/components/MainLoader"

export default function Boards() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const { data: boards, isLoading, refetch } = useQuery("boards", async () => {
    if (selectedProject) {
      return await BoardService.getBoards(selectedProject.id)
    }
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    refetch()
  }, [selectedProject, refetch])

  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Boards</h2>
          <p className="text-zinc-500 font-light">
            Select the project to see the board
          </p>
        </span>
        <DropdownProjects selectedProject={setSelectedProject} />
      </div>
      <div className="flex justify-end">
        <SheetCreateIssue projectInfo={selectedProject} refetch={refetch}>
          <div className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs w-fit self-end mt-2 hover:bg-teal-600 disabled:bg-zinc-300">
            <Plus size={18} />
            Open issue
          </div>
        </SheetCreateIssue>
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex flex-col gap-3 border text-center p-4 rounded-md overflow-x-auto mb-8">
        {
          isLoading ? <MainLoader fullscreen={false} /> : <DevTrack boards={boards} />
        }
      </div>
    </>
  );
}