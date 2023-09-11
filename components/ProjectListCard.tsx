import { IProjects } from "@/types/Projects"

interface ProjectListCardProps {
  project: IProjects
}


export default function ProjectListCard({ project }: ProjectListCardProps) {
  return (
    <div className="w-full border rounded-md p-3 text-sm flex justify-between min-h-[64px] items-center">
      <div className="flex flex-col items-start">
        <p>{project.name}</p>
        <span className="text-xs text-zinc-400 underline">
          {project.team.name}
        </span>
      </div>
    </div>
  )
}