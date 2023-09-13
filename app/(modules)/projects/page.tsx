/* eslint-disable react/no-unescaped-entities */
'use client'
import DialogCreateProject from "@/components/DialogCreateProject"
import ProjectListCard from "@/components/ProjectListCard"
import { getProjects } from "@/service/ProjectService"
import { IProjects } from "@/types/Projects"
import { FolderDashed } from "@phosphor-icons/react"
import { Plus } from "react-feather"
import { useQuery } from "react-query"

export default function Projects() {
  const { data: projects, isLoading, refetch } = useQuery<IProjects[]>('projects', async () => {
    return await getProjects()
  })
  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Projects</h2>
          <p className="text-zinc-500 font-light">Create or manage your projects</p>
        </span>
        <DialogCreateProject refreash={refetch}>
          <button className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs">
            <Plus size={18} />
            New project
          </button>
        </DialogCreateProject>
      </div>
      {
        projects && projects.length ? (
          <div className="mt-4 w-full h-full min-h-[400px] flex items-center flex-col gap-3 border text-center p-4 rounded-md">
            {
              projects.map(project => <ProjectListCard project={project} key={project.id} refreash={refetch} />)
            }
          </div>
        )
          :
          <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
            <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
              <FolderDashed size={32} weight="thin" />
            </div>
            <p>No projects created</p>
            <p className="font-light text-xs text-zinc-500">
              You don't have any projects yet. Starting creating one
            </p>
            <button
              className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5 mt-2"
            >
              <Plus size={18} />
              Add project
            </button>
          </div>
      }
    </>
  )
}