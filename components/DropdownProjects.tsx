'use client'
import { useQuery } from "react-query";
import DialogCreateProject from "./DialogCreateProject";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import { getProjects } from "@/service/ProjectService";
import { IProjects } from "@/types/Projects";
import { Skeleton } from "./ui/skeleton";
import { SpinnerGap } from "@phosphor-icons/react";

export default function DropdownProjects() {

  const { data: projects, isLoading, refetch } = useQuery<IProjects[]>('dropdownProjects', async () => {
    return await getProjects()
  })
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {
          !isLoading && projects
            ? projects.map(project => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)
            : <div className="w-full py-2 flex justify-center"><SpinnerGap size={18} className="text-zinc-500 animate-spin" /></div> 
        }
        { !projects?.length || <SelectSeparator /> }
        <DialogCreateProject>
          <button className="w-full rounded-sm text-sm hover:bg-zinc-100 text-teal-500 py-2">
            New project
          </button>
        </DialogCreateProject>
      </SelectContent>
    </Select>
  )
}