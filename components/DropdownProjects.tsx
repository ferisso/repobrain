'use client'
import { useQuery } from "react-query";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import ProjectService from "@/service/ProjectService";
import { IProjects } from "@/types/Projects";
import { SpinnerGap } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DropdownProjectsProps {
  selectedProject: (projectId: any) => void
}

export default function DropdownProjects(props: DropdownProjectsProps) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const urlProject = searchParams.get('project_id')

  const { data: projects, isLoading } = useQuery<IProjects[]>('dropdownProjects', async () => {
    return await ProjectService.getUsersProjects();
  }, {
    refetchOnWindowFocus: false
  })

  const selectProject = (projectId: string) => {
    const project = projects?.find(project => project.id == projectId)
    props.selectedProject(project)
    setRouteId(projectId)
  }

  const setRouteId = (projectId: string) => {
    if (urlProject === projectId) return;
    router.push(`/boards?project_id=${projectId}`)
  }

  useEffect(() => {
    if (!!urlProject) {
      selectProject(urlProject)
    }
  }, [projects])

  return (
    <Select onValueChange={selectProject} defaultValue={urlProject ? urlProject : undefined} disabled={isLoading || !projects?.length}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {
          !isLoading && projects
            ? projects.map(project => <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>)
            : <div className="w-full py-2 flex justify-center"><SpinnerGap size={18} className="text-zinc-500 animate-spin" /></div>
        }
      </SelectContent>
    </Select>
  )
}