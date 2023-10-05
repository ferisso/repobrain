'use client'
import { IUsers } from "@/types/User"
import { ITeamMembers } from "@/types/Team"
import AvatarCard from "./AvatarCard"

interface AvatarListProps {
  users?: ITeamMembers[]
}

export default function AvatarList({ users }: AvatarListProps) {
  return (
    !users?.length
      ? <></>
      : (
        <div className="flex items-center">
          {
            users?.map((members: ITeamMembers, key) => {
              return (
                <div key={key} style={{ marginLeft: key && '-8px' }} >
                  <AvatarCard user={members.user} />
                </div>
              )
            })
          }
        </div>
      )
  )
}