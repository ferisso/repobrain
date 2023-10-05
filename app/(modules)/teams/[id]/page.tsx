'use client'
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "../../../../components/ui/dialog"
import TeamMemberService from "@/service/TeamMemberService"
import { useQuery } from "react-query"
import AvatarList from "@/components/AvatarList"

export default function Team({ params }: { params: { id: string } }) {
  const route = useRouter() 
  const { data: teamInfo } = useQuery('getTeamInfo', async () => {
    return await TeamMemberService.getTeamMember(params.id)
  })

  const cancel = () => {
    route.push('/teams')
  }

  const joinTeam = async () => {
    await TeamMemberService.addTeamMember(params.id)
    .then(res => {
      res && route.push('/teams')
    })
  }

  return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <span className="font-light">You received an invite to join </span>
              {teamInfo && teamInfo.length ? teamInfo[0].team?.name : '' }
              </DialogTitle>
            <DialogDescription className="text-center">
              What you want to do?
            </DialogDescription>
          </DialogHeader>

          <div className="mb-1 flex justify-center items-center">
            <AvatarList users={teamInfo}></AvatarList>
          </div>

          <div className="flex w-full flex-col justify-center items-center gap-2">
            <button className="p-2 bg-teal-500 text-white rounded-md text-sm" onClick={joinTeam}>Join team</button>
            <button className="p-1 rounded-md text-xs underline"  onClick={cancel}>Cancel</button>
          </div>
        </DialogContent>
      </Dialog>
  )
}