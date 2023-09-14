import { IProjects } from "@/types/Projects"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Copy, Edit, MoreVertical, Trash } from "react-feather"
import { deleteProject } from "@/service/ProjectService"

interface ProjectListCardProps {
  project: IProjects,
  refreash?: () => void
}

export default function ProjectListCard({ project, refreash }: ProjectListCardProps) {

  const deleteSelectedProject = async (id: string) => {
    deleteProject(id)
    refreash && refreash()
  }

  return (
    <div className="w-full border rounded-md p-3 text-sm flex justify-between min-h-[64px] items-center">
      <div className="flex flex-col items-start">
        <p>{project.name}</p>
        <span className="text-xs text-zinc-400 underline">
          {project.team.name}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-8 w-8 flex justify-center items-center border rounded-md hover:bg-zinc-50 outline-none"
            aria-label="more information"
          >
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-28">
          <div className="flex flex-col gap-1 text-xs">
            <button className="w-full p-2 flex text-start gap-2 items-center hover:bg-zinc-50 rounded-md">
              <Edit size={16} />
              Edit
            </button>
            <button
              className="w-full p-2 flex text-start gap-2 items-center hover:bg-red-50 rounded-md text-red-500"
              onClick={() => deleteSelectedProject(project.id)}
            >
              <Trash size={16} />
              Delete
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}