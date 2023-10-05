import { IUsers } from "./User"

export interface ITeams {
  id: string,
  user_id: string,
  name: string,
  description?: string
  members?: ITeamMembers[]
}


export interface ITeamMembers {
  id: string,
  user: IUsers,
  team?: {
    id: string,
    user_id: string,
    name: string,
    description?: string,
    created_at?: string,
    updated_at?: string
  }
}