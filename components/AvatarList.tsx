'use client'
import { ITeamMembers } from "@/types/Team"
import AvatarCard from "./AvatarCard"
import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

interface AvatarListProps {
  users?: ITeamMembers[]
  isSelectable?: boolean
}

export default function AvatarList({ users, isSelectable }: AvatarListProps) {
  const [selectedUser, setSelectedUser] = useState<ITeamMembers>()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectUser = (member: ITeamMembers) => {
    if (!isSelectable) return;

    if (member.id === selectedUser?.id) {
      setSelectedUser(undefined)
      removeRouteQuery()
      return;
    }
    setSelectedUser(member)
    addRouteQuery(member.user.id)
  }

  const addRouteQuery = (memberId: string) => {
    if (searchParams.has('project_id')) {
      const projectValue = searchParams.get('project_id')
      router.push(`${pathname}?project_id=${projectValue}&assignee=${memberId}`)
      return;
    }
    router.push(`${pathname}?assignee=${memberId}`)
  }

  const removeRouteQuery = () => {
    if (searchParams.has('project_id')) {
      const projectValue = searchParams.get('project_id')
      router.push(`${pathname}?project_id=${projectValue}`)
      return;
    }
    router.push(pathname)
  }

  const verifyRouteQuery = () => {
    if (!searchParams.has('assignee')) return;
    const memberId = searchParams.get('assignee')
    const userSelected = users?.find(member => member.user.id === memberId);
    setSelectedUser(userSelected);
  }

  useEffect(() => {
    isSelectable && verifyRouteQuery()
  }, [users])

  return (
    !users?.length
      ? <div className=""></div>
      : (
        <div className="flex items-center">
          {
            users?.map((members: ITeamMembers, key) => {
              return (
                <div 
                  key={key} 
                  style={{ marginLeft: key && '-8px' }} 
                  className={ isSelectable && members.id === selectedUser?.id ? `border-2 border-teal-600 rounded-full` : ''} 
                  onClick={() => selectUser(members)}
                >
                  <AvatarCard user={members.user} />
                </div>
              )
            })
          }
        </div>
      )
  )
}