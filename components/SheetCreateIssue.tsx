'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import EDITOR_TOOLS from "@/tools/EditorJsTools";
import EditorJS from '@editorjs/editorjs';
import { FormEvent, useEffect, useState } from "react";
import TeamMemberSelect from "./TeamMemberSelect";
import BoardService from "@/service/BoardsService";


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

  const openEvent = (event: boolean) => {
    if (event) {
      setTimeout(() => {
        new EditorJS({
          holder: "editorjs",
          tools: EDITOR_TOOLS,
          placeholder: "Description",
          inlineToolbar: true,
          hideToolbar: false,
        })
      }, 500)
    }
    setIsOpen(event)
  }

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const newIssue = {
      title,
      reporter: reporterId,
      assignee: assigneeId,
      points: !!points ? Number(points) : 0,
      project_id: projectInfo.id
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
          <div id="editorjs" className="px-4 py-1 border rounded-md min-h-[200px]"></div>
          {
            projectInfo?.team_id && (
              <div className="flex gap-4">
                <TeamMemberSelect placeholder="Reporter" teamId={projectInfo.team_id} selectedMember={setReporterId} />
                <TeamMemberSelect placeholder="Assignee" teamId={projectInfo.team_id} selectedMember={setAssigneeId} />
              </div>
            )}
          <div className="flex gap-4">
            <input type="number" className="input-themed" placeholder="Points" onChange={($event) => setPoints($event.target.value)} />
            <input type="number" className="input-themed" placeholder="Label" />
          </div>
          <button className="flex w-full py-3 justify-center items-center bg-teal-500 hover:bg-teal-600 transition-colors text-white rounded-md text-sm" type="submit">
            Create issue
          </button>
        </form>
      </SheetContent>
    </Sheet>
  )
}