'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FormEvent, useEffect, useState } from "react";
import TeamMemberSelect from "./TeamMemberSelect";
import BoardService from "@/service/BoardsService";
import IssueLabelSelect from "./IssueLabelSelect";
import EditorJsWrapper from "./EditorJsWrapper";


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
  const [points, setPoints] = useState<string>()
  const [label, setLabel] = useState<string>()

  const openEvent = (event: boolean) => {
    setIsOpen(event)
  }

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const newIssue = {
      project_id: projectInfo.id,
      title,
      reporter: reporterId,
      assignee: assigneeId,
      points: !!points ? Number(points) : 0,
      label
    }

    await BoardService.createBoard(newIssue)
      .then(() => {
        refetch && refetch()
        setIsOpen(false)
      })
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
            Fill the fields bellow to create a new issue in <strong className="font-bold text-orange-500 underline">{projectInfo?.name}</strong>
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 mt-4" onSubmit={submitForm}>
          <input type="text" className="input-themed" placeholder="Title" onChange={($event) => setTitle($event.target.value)} required />
          <EditorJsWrapper />
          {
            projectInfo?.team_id && (
              <div className="flex gap-4">
                <TeamMemberSelect placeholder="Reporter" teamId={projectInfo.team_id} selectMember={setReporterId} required />
                <TeamMemberSelect placeholder="Assignee" teamId={projectInfo.team_id} selectMember={setAssigneeId} required />
              </div>
            )}
          <div className="flex gap-4">
            <input type="number" className="input-themed" placeholder="Points" onChange={($event) => setPoints($event.target.value)} />
            <IssueLabelSelect selectIssue={setLabel} />
          </div>
          <button className="flex w-full py-3 justify-center items-center bg-teal-500 hover:bg-teal-600 transition-colors text-white rounded-md text-sm" type="submit">
            Create issue
          </button>
        </form>
      </SheetContent>
    </Sheet>
  )
}