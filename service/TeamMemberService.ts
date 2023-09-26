import { ITeamMembers } from "@/types/Team";
import APIService from "./APIService";


export async function getTeamMember(teamId: string) {
  const members = await APIService.request({
    method: "get",
    route: '/members/' + teamId,
  })
  return members.data
}

export async function addTeamMember(teamId: string) {
  return await APIService.request({
    method: "post",
    route: '/members',
    body: { team_id: teamId }  
  })
}