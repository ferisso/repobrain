import { IProjects } from "@/types/Projects";
import APIService from "./APIService";
import { toast } from "react-toastify";


const ProjectService = {
   async getUsersProjects(): Promise<IProjects> {
    const id = await APIService.getUserId()
    const projects = await APIService.request({
      method: 'get',
      route: '/projects/' + id
    })
    return projects?.data.reverse()
  },
  async createProject(project: IProjects) {
    return await APIService.request({
      method: 'post',
      route: '/projects',
      body: project
    })
  },
  async deleteProject(id: string) {
    return await APIService.request({
      method: 'delete',
      route: '/projects/' + id,
    })
  }
}

export default ProjectService