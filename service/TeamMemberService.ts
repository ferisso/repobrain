import APIService from "./APIService";


export async function addTeamMember(teamId: string) {
  return await APIService.request({
    method: "post",
    route: '/members',
    body: { team_id: teamId }  
  })
}