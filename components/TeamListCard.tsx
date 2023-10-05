import { ITeams } from "@/types/Team"
import { CheckCircle, Copy, Delete, Edit, Edit2, MoreVertical, Trash } from "react-feather"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TeamService from "@/service/TeamService"
import { toast } from "react-toastify"
import AvatarList from "./AvatarList"
import { useState } from "react"
import { useSession } from "next-auth/react"

interface TeamListCardProps {
  team: ITeams,
  refreash?: () => void
  isLoading?: boolean
}

export default function TeamListCard({ team, refreash, isLoading }: TeamListCardProps) {
  const [linkCopied, setLinkCopied] = useState(false)
  const { data: userSession } = useSession()
  const deletingTeam = (id: string) => {
    TeamService.deleteTeam(id)
      .then(res => {
        if (res?.data) {
          toast.success('Team deleted')
        }
        refreash && refreash()
      })
      .catch(err => {
        console.log(err)
        toast.error('Error on deleting the team')
      })
  }

  const copyLink = (id: string) => {
    const string = `${window.location.origin}/teams/${id}`
    navigator.clipboard.writeText(string);
    setLinkCopied(true)
    setTimeout(() => {
      setLinkCopied(false)
    }, 3500)
  }


  return (
    <div
      className="w-full border rounded-md p-3 text-sm flex justify-between min-h-[64px] items-center"
    >
      <div className="flex gap-4 items-center">
        <div className="flex flex-col">
          <p className="flex items-center gap-2">
            {team.name}
          </p>
          <span className="text-zinc-400 text-xs">
            {team.description}
          </span>
        </div>
        <AvatarList users={team.members} />
      </div>
      {userSession?.user.id === team.user_id && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="h-8 w-8 flex justify-center items-center border rounded-md hover:bg-zinc-50 outline-none"
              aria-label="more information"
              disabled={isLoading}
            >
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28">
            <div className="flex flex-col gap-1 text-xs">
              <button className="w-full p-2 flex text-start gap-2 items-center hover:bg-zinc-50 rounded-md" onClick={() => copyLink(team.id)}>
                {
                  linkCopied
                    ? (
                      <>
                        <CheckCircle size={16} className="text-green-500" />
                        Link Copied
                      </>
                    )
                    : (
                      <>
                        <Copy size={16} />
                        Copy invite
                      </>
                    )
                }
              </button>
              <button className="w-full p-2 flex text-start gap-2 items-center hover:bg-zinc-50 rounded-md">
                <Edit size={16} />
                Edit
              </button>
              <button
                className="w-full p-2 flex text-start gap-2 items-center hover:bg-red-50 rounded-md text-red-500"
                onClick={() => deletingTeam(team.id)}
              >
                <Trash size={16} />
                Delete
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

    </div>
  )
}