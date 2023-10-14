'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FormEvent, useState } from "react";
import TeamMemberSelect from "./TeamMemberSelect";
import BoardService from "@/service/BoardsService";
import IssueLabelSelect from "./IssueLabelSelect";
import dynamic from 'next/dynamic';
import { Checkbox } from "@/components/ui/checkbox"
import GitHubAPIService from "@/service/GitHubAPIService";



let EditorJs: any;
if (typeof window !== "undefined") {
  EditorJs = dynamic(() => import('./EditorJsWrapper'), { ssr: false });
}

interface SheetCreateIssueProps {
  projectInfo: any,
  refetch?: () => void
  children: React.ReactNode
}

export default function SheetCreateIssue({ projectInfo, refetch, children }: SheetCreateIssueProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reporterId, setReporterId] = useState<string>()
  const [assigneeId, setAssigneeId] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [priority, setPriority] = useState<string>()
  const [points, setPoints] = useState<string>()
  const [label, setLabel] = useState<string>()
  const [createIssue, setCreateIssue] = useState<boolean>(false)

  const openEvent = (event: boolean) => {
    setIsOpen(event)
  }

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const newIssue = {
      project_id: projectInfo.id,
      title,
      description,
      reporter: reporterId,
      assignee: assigneeId,
      priority: !!priority ? Number(priority) : 0,
      points: !!points ? Number(points) : 0,
      label
    }

    await BoardService.createBoard(newIssue)
      .then(() =>  refetch && refetch())
      .then(() =>  {
        if (createIssue) {
          const githubIssue = mountIssueGithub()
          GitHubAPIService.CreateNewIssue(githubIssue)
        }
      })
      .then(() => setIsOpen(false))
  }

  const mountIssueGithub = () => {
    return {
      owner: 'ferisso',
      repo: 'repobrain',
      title,
      body: description,
      labels: label ? [label.toLowerCase()] : undefined
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={openEvent}>
      <SheetTrigger>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-[50%] w-[468px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create issue</SheetTitle>
          <SheetDescription>
            Fill the fields bellow to create a new issue
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 mt-4" onSubmit={submitForm}>
          <input type="text" className="input-themed" placeholder="Title" onChange={($event) => setTitle($event.target.value)} required />
          {EditorJs && <EditorJs setData={setDescription} />}
          {
            projectInfo?.team_id && (
              <div className="flex gap-4">
                <TeamMemberSelect placeholder="Reporter" teamId={projectInfo.team_id} selectMember={setReporterId} required />
                <TeamMemberSelect placeholder="Assignee" teamId={projectInfo.team_id} selectMember={setAssigneeId} required />
              </div>
            )}
          <div className="flex gap-4">
            <input type="number" className="input-themed" placeholder="Priority" min={0} max={5} onChange={($event) => setPriority($event.target.value)} />
            <input type="number" className="input-themed" placeholder="Points" onChange={($event) => setPoints($event.target.value)} />
          </div>
          <IssueLabelSelect selectIssue={setLabel} />
          <div className="flex items-center gap-2">
            <Checkbox 
              id="newIssue" 
              className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 h-5 w-5" 
              onCheckedChange={(e: boolean) => setCreateIssue(e)} 
            />
            <label htmlFor="newIssue" className="text-sm text-zinc-700">
              Create issue in  
              <strong className="font-semibold underline text-orange-500 ml-1">
                 {projectInfo?.name}
              </strong>
            </label>
          </div>
          <button className="flex w-full py-3 justify-center items-center bg-teal-500 hover:bg-teal-600 transition-colors text-white rounded-md text-sm" type="submit">
            Create issue
          </button>
        </form>
      </SheetContent>
    </Sheet>
  )
}