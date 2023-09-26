'use client'
import { useQuery } from "react-query";
import DialogCreateProject from "./DialogCreateProject";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import { getUsersProjects } from "@/service/ProjectService";
import { IProjects } from "@/types/Projects";
import { Skeleton } from "./ui/skeleton";
import { SpinnerGap } from "@phosphor-icons/react";

interface DropdownProjectsProps {
  selectedProject: (projectId: any) => void
}

export default function DropdownProjects(props: DropdownProjectsProps) {

  const { data: projects, isLoading, refetch } = useQuery<IProjects[]>('dropdownProjects', async () => {
    return await getUsersProjects()
  })

  const selectProject = (projectId: string) => {
    const project = projects?.find(project => project.id == projectId)
    props.selectedProject(project)
  }

  return (
    <Select onValueChange={selectProject}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {
          !isLoading && projects
            ? projects.map(project => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)
            : <div className="w-full py-2 flex justify-center"><SpinnerGap size={18} className="text-zinc-500 animate-spin" /></div>
        }
        {!projects?.length || <SelectSeparator />}
        <DialogCreateProject>
          <button className="w-full rounded-sm text-sm hover:bg-zinc-100 text-teal-500 py-2">
            New project
          </button>
        </DialogCreateProject>
      </SelectContent>
    </Select>
  )
}