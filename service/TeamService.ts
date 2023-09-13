import { ITeams } from "@/types/Team"
import APIService from "./APIService"


export async function getTeams() {
  const id = await APIService.getUserId()
  const teams = await APIService.request({
    method: 'get',
    route: '/teams/' + id
  })
  return teams?.data.reverse()
}

export async function createTeam(team: ITeams) {
  return await APIService.request({
    method: "post",
    route: '/teams',
    body: team  
  })
}

export async function deleteTeam(id: string) {
  return await APIService.request({
    method: "delete",
    route: '/teams/' + id,
  })
}