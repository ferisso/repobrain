import { ITeamMembers } from "@/types/Team";
import APIService from "./APIService";


const TeamMemberService = {
  async getTeamMember(teamId: string): Promise<ITeamMembers[]> {
    const members = await APIService.request({
      method: "get",
      route: '/members/' + teamId,
    })
    return members.data
  },

  async addTeamMember(teamId: string) {
    return await APIService.request({
      method: "post",
      route: '/members',
      body: { team_id: teamId }  
    })
  }
}


export default TeamMemberService