import { ITeams } from "@/types/Team"
import APIService from "./APIService"

const TeamService = {
  async getTeams() {
    const id = await APIService.getUserId()
    const teams = await APIService.request({
      method: 'get',
      route: '/teams/' + id
    })
    return teams?.data.reverse()
  },
  async createTeam(team: ITeams) {
    return await APIService.request({
      method: "post",
      route: '/teams',
      body: team  
    })
  },
  async deleteTeam(id: string) {
    return await APIService.request({
      method: "delete",
      route: '/teams/' + id,
    })
  }
}

export default TeamService