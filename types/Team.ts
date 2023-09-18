import { IUsers } from "./User"

export interface ITeams {
  id: string,
  name: string,
  description?: string
  members?: ITeamMembers[]
}


export interface ITeamMembers {
  id: string,
  user: IUsers
}