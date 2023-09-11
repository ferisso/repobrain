import { IProjects } from "@/types/Projects";
import APIService from "./APIService";


export async function getProjects(): Promise<IProjects> {
  const id = await APIService.getUserId()
  const projects = await APIService.request({
    method: 'get',
    route: '/projects/' + id
  })
  return projects.data.reverse()
}

export async function createProject(project: IProjects) {
  return await APIService.request({
    method: 'post',
    route: '/projects',
    body: project
  })
}