'use client'
import { FormEvent, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog"
import { useSession } from "next-auth/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ITeams } from "@/types/Team"
import { useQuery } from "react-query"
import { getTeams } from "@/service/TeamService"
import { createProject } from "@/service/ProjectService"
import { Spinner } from "@phosphor-icons/react"

interface DialogCreateProjectProps {
  children: React.ReactNode;
  refreash?: () => void
}

export default function DialogCreateProject({ children, refreash }: DialogCreateProjectProps) {
  const [repos, setRepos] = useState<Array<any>>()
  const [openDialog, setOpenDialog] = useState(false)
  const [hasGithub, setHasGithub] = useState(true)
  const [selectedRepo, setSelectedRepo] = useState<any>()
  const [selectedTeam, setSelectedTeam] = useState<string>()
  const [buttonLoader, setButtonLoader] = useState<boolean>(false)
  // TODO: Replace FormField and React Hook Form from https://ui.shadcn.com/docs/components/form
  const [errorMsgs, setErrorMsgs] = useState({
    repos: '',
    teams: ''
  })
  const session = useSession()

  const getRepos = async () => {
    const accessToken = session.data?.user.access_token
    if (!accessToken) {
      setHasGithub(false)
      return
    }
    const response = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const repositories = await response.json();
      setRepos(repositories)
    } else {
      throw new Error("Failed to fetch user repositories");
    }
  }

  const { data: teams, isLoading } = useQuery<ITeams[]>('teams', async () => {
    return await getTeams()
  })

  const submitForm = async (e: FormEvent) => {
    // TODO: Replace to FormField and React Hook Form from https://ui.shadcn.com/docs/components/form
    e.preventDefault()
    if (!selectedRepo && !selectedTeam) {
      setErrorMsgs({
        repos: 'Please select a repository',
        teams: 'Please select a team'
      })
      return
    }
    if (!selectedRepo) {
      setErrorMsgs({
        repos: 'Please select a repository',
        teams: ''
      })
      return
    }
    if (!selectedTeam) {
      setErrorMsgs({
        repos: '',
        teams: 'Please select a team'
      })
      return
    }
    setErrorMsgs({
      repos: '',
      teams: ''
    })
    setButtonLoader(true)
    const selectedRepoData = repos?.find(repo => repo.node_id === selectedRepo)
    const newProject = {
      name: selectedRepoData.name,
      url: selectedRepoData.url,
      team_id: selectedTeam
    }
    await createProject(newProject)
      .finally(() => {
        setButtonLoader(false)
        setOpenDialog(false)
        refreash && refreash()
      })
  }

  useEffect(() => {
    getRepos()
  }, [])

  return (
    <Dialog open={openDialog} onOpenChange={(e: boolean) => setOpenDialog(e)}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adding project</DialogTitle>
          <DialogDescription>
            Please select repository and the team to work on it
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-2" onSubmit={submitForm}>
          <p className="text-xs text-zinc-500 ml-2">Github repository</p>
          <Select onValueChange={(e) => setSelectedRepo(e)} disabled={!hasGithub}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a repository" />
            </SelectTrigger>
            <SelectContent className="overflow-y-auto max-h-48">
              {
                repos?.map(repo => <SelectItem value={repo.node_id} key={repo.node_id}>{repo.full_name}</SelectItem>)
              }
            </SelectContent>
          </Select>
          <span className="text-xs text-red-500 ml-2 -mt-1">
            {!!errorMsgs.repos && errorMsgs.repos}
            { !hasGithub && 'Login with github to show your projects' }
          </span>
          <p className="text-xs text-zinc-500 ml-2">Team</p>
          <Select onValueChange={(e) => setSelectedTeam(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent className="overflow-y-auto max-h-48">
              {
                teams?.map(team => <SelectItem value={team.id} key={team.id}>{team.name}</SelectItem>)
              }
            </SelectContent>
          </Select>
          <span className="text-xs text-red-500 ml-2 -mt-1">
            {!!errorMsgs.teams && errorMsgs.teams}
          </span>
        </form>

        <DialogFooter>
          <button
            className="text-white bg-teal-500 py-2 px-4 rounded-md text-xs flex justify-center min-w-[115px]"
            onClick={submitForm}
          >
            {buttonLoader ? <Spinner size={16} className="animate-spin" /> : 'Create project'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}