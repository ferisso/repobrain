/* eslint-disable react/no-unescaped-entities */
'use client'
import { UsersThree } from "@phosphor-icons/react"
import DialogCreateTeams from "@/components/DialogCreateTeams"
import { useQuery } from "react-query"
import TeamListCard from "@/components/TeamListCard"
import { ITeams } from "@/types/Team"
import { getTeams } from "@/service/TeamService"
import { Plus } from "@phosphor-icons/react"

export default function Teams() {
  const { data: teams, refetch, isLoading } = useQuery<ITeams[]>('teams', async () => {
    return await getTeams()
  })

  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Teams</h2>
          <p className="text-zinc-500 font-light">Create or manage your teams</p>
        </span>
        <DialogCreateTeams refreash={() => refetch()}>
          <button className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs">
            <Plus size={18} />
            New team
          </button>
        </DialogCreateTeams>
      </div>
      {
        teams?.length ?
          <div className="flex flex-col gap-2 border rounded-md p-2 mt-4 w-full min-h-[400px]">
            {teams?.map(team => <TeamListCard key={team.id} team={team} refreash={() => refetch()} isLoading={isLoading} />)}
          </div>
          : (
            <div className="mt-4 w-full h-full min-h-[400px] flex justify-center items-center flex-col gap-3 border border-dashed text-center p-4 rounded-md">
              <div className="h-16 w-16 rounded-full flex justify-center items-center bg-zinc-100">
                <UsersThree size={32} weight="thin" />
              </div>
              <p>No Teams created</p>
              <p className="font-light text-xs text-zinc-500">
                You don't have any team yet. Starting creating one
              </p>
              <button
                className="flex items-center justify-center gap-1 text-teal-500 border border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5 mt-2"
              >
                <Plus size={18} />
                Add team
              </button>
            </div>
          )
      }
    </>
  )
}