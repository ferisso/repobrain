'use client'
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "../../../../components/ui/dialog"
import { addTeamMember } from "@/service/TeamMemberService"

export default function Team({ params }: { params: { id: string } }) {
  const route = useRouter() 

  const cancel = () => {
    route.push('/teams')
  }

  const joinTeam = async () => {
    await addTeamMember(params.id)
    .then(res => {
      res && route.push('/teams')
    })
  }

  return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>You received an invite to join Barcelona!</DialogTitle>
            <DialogDescription>
              What you want to do?
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full justify-center items-center gap-2">
            <button className="p-2 bg-zinc-200 rounded-md text-sm"  onClick={cancel}>Cancel</button>
            <button className="p-2 bg-teal-500 text-white rounded-md text-sm" onClick={joinTeam}>Join team</button>
          </div>
        </DialogContent>
      </Dialog>
  )
}