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
import AvatarList from "@/components/AvatarList"
import { useSearchParams, useRouter } from "next/navigation";
import { MapTrifold } from "@phosphor-icons/react"

export default function Boards() {
  const router = useRouter()
  const params = useSearchParams()
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const { data: boards, isLoading, refetch, isFetching } = useQuery("boards", async () => {
    if (params.has('project_id')) {
      return await BoardService.getBoards(params.toString())
    }
  }, {
    refetchOnMount: true,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    refetch()
  }, [params, refetch]);


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
      {
        selectedProject && (
          <div className="flex justify-between items-center mt-2">
            <span className="flex gap-2 items-center">
              <input type="text" className="input-themed h-9 w-48 rounded-md ml-[2px]" placeholder="Search" />
              <AvatarList users={selectedProject?.team?.members} isSelectable />
            </span>
            <SheetCreateIssue projectInfo={selectedProject} refetch={refetch}>
              <div className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs w-fit self-end mt-2 hover:bg-teal-600 disabled:bg-zinc-300">
                <Plus size={18} />
                Open issue
              </div>
            </SheetCreateIssue>
          </div>
        )
      }
      {
        selectedProject ? (
          <div className="mt-4 w-full h-full min-h-[400px] flex flex-col gap-3 border text-center p-4 rounded-md overflow-x-auto mb-8">
            {
              isLoading ? <MainLoader fullscreen={false} /> : <DevTrack boards={boards} />
            }
          </div>
        )
          :
          (
            <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
              <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
                <MapTrifold size={32} weight="thin" />
              </div>
              <p>Select the project</p>
              <p className="font-light text-xs text-zinc-500 max-w-xs">
               To see a board select a project in the top right corner, if you don't have any create a new one
              </p>
              <button
                className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5 mt-2"
                onClick={() => router.push('/projects')}
              >
                <Plus size={18} />
                Create a project
              </button>
            </div>
          )
      }
    </>
  );
}