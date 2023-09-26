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
import { useEffect, useState } from "react";
import TeamMemberSelect from "./TeamMemberSelect";
import { useQuery } from "react-query";


interface SheetCreateIssueProps {
  projectInfo: any
  children: React.ReactNode
}

export default function SheetCreateIssue({ projectInfo, children }: SheetCreateIssueProps) {
  const [initialize, setInitialize] = useState(false)

  const openEvent = (event: boolean) => {
    console.log(projectInfo)
    if (event) {
      new EditorJS({
        holder: "editorjs",
        tools: EDITOR_TOOLS,
        placeholder: "Description",
        inlineToolbar: true,
        hideToolbar: false

      })
      setInitialize(event)
    }
  }

  return (
    <Sheet onOpenChange={openEvent}>
      <SheetTrigger>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-[50%] w-[468px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create issue</SheetTitle>
          <SheetDescription>
            Fill the fields bellow to create a new issue in <strong className="font-bold text-orange-500 underline">{ projectInfo?.name }</strong>
          </SheetDescription>
        </SheetHeader>
        <form className="flex flex-col gap-4 mt-4">
          <input type="text" className="input-themed" placeholder="Title" />
          <div id="editorjs" className="px-4 py-1 border rounded-md min-h-[200px]"></div>
          {
            projectInfo?.team_id && (
            <div className="flex gap-4">
              <TeamMemberSelect placeholder="Reporter" teamId={projectInfo.team_id} />
              <TeamMemberSelect placeholder="Assignee" teamId={projectInfo.team_id} />
            </div>
          )}
          <div className="flex gap-4">
            <input type="number" className="input-themed" placeholder="Points" />
            <input type="number" className="input-themed" placeholder="Label" />
          </div>
          <button className="flex w-full py-3 justify-center items-center bg-teal-500 hover:bg-teal-600 transition-colors text-white rounded-md text-sm">
            Create issue
          </button>
        </form>
      </SheetContent>
    </Sheet>
  )
}