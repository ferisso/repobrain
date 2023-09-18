'use client'
import { IUsers } from "@/types/User"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ITeamMembers } from "@/types/Team"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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
                <HoverCard key={members.id}>
                  <HoverCardTrigger>
                    <Avatar className="h-7 w-7 hover:h-8 hover:w-8 transition-all cursor-pointer" style={{ marginLeft: key && '-8px' }}>
                      <AvatarImage src={members.user.image} />
                      <AvatarFallback>{members.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10" style={{ marginLeft: key && '-8px' }}>
                        <AvatarImage src={members.user.image} />
                        <AvatarFallback>{members.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p>
                        { members.user.name }
                        </p>
                        <a className="text-xs text-zinc-500 underline hover:text-teal-500 cursor-pointer" href={`mailto:${members.user.email}`}>{members.user.email}</a>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )
            })
          }
        </div>
      )
  )
}