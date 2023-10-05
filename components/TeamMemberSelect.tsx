
import { useQuery } from "react-query";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import TeamMemberService from "@/service/TeamMemberService";
import { ITeamMembers } from "@/types/Team";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect } from "react";

interface TeamMemberSelectProps {
  teamId: string,
  placeholder: string
  selectedMember: (memberId: string) => void
}

export default function TeamMemberSelect({ teamId, placeholder, selectedMember }: TeamMemberSelectProps) {
  const { data: teamMembers } = useQuery<ITeamMembers[]>('teamMembersSelect', async () => {
    return await TeamMemberService.getTeamMember(teamId)
  }, {
    refetchOnWindowFocus: false
  })

  return (
    <Select onValueChange={selectedMember}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
          teamMembers ?
            teamMembers?.map(teamMember => (
              <SelectItem key={teamMember.id} value={teamMember.user.id}>
                <div className="flex gap-2 items-center">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={teamMember.user.image} />
                    <AvatarFallback>{teamMember.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="font-sm">{teamMember.user.name}</span>
                </div>
              </SelectItem>
            ))
            : 'loading...'
        }
      </SelectContent>
    </Select>
  )
}