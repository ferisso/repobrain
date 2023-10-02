/* eslint-disable react/no-unescaped-entities */
'use client'
import DropdownProjects from "@/components/DropdownProjects"
import { Plus } from "react-feather"
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getBoards } from "@/service/BoardsService"
import SheetCreateIssue from "@/components/SheetCreateIssue"
import { IBoards } from "@/types/Boards";

export default function Boards() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [layout, setLayout] = useState<any>()
  const { data: boards, isLoading, refetch } = useQuery("boards", async () => {
    if (selectedProject) {
      return await getBoards(selectedProject.id)
    }
  }, {
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
  const { data } = useSession()

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const layouss = [
    { x: 0, y: 0, w: 1, h: 1, title: 'Fix homepage title size', ticket: 99, label: 'bug' },
    { x: 1, y: 0, w: 1, h: 1, title: 'Implement modal to add company', ticket: 201, label: 'enhancement' },
    { x: 2, y: 0, w: 1, h: 1, title: 'Create component to general titles', ticket: 123, label: 'enhancement' },
    { x: 3, y: 0, w: 1, h: 1, title: 'Remove unused code from the repo', ticket: 432, label: 'help wanted' },
    { x: 4, y: 0, w: 1, h: 1, title: 'Implement modal to confirm delete', ticket: 87, label: 'bug' },
    { x: 5, y: 0, w: 1, h: 1, title: 'Fix homepage flicker layout', ticket: 870, label: 'bug' },
  ];

  useEffect(() => {
    refetch()
  }, [selectedProject, refetch])


  useEffect(() => {
    const newLayout = boards?.map((board: IBoards) => {
      return {
        ...board,
        i: board.id,
        x: board.onBoardStatus,
        y: 0,
        w: 1,
        h: 1,
      }
    })
    console.log(newLayout)
    setLayout(newLayout)
  }, [boards])

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'documentation':
        return 'bg-[#0075ca]'
      case 'enhancement':
        return 'bg-[#7057ff]'
      case 'help wanted':
        return 'bg-[#008672]'
      case 'bug':
        return 'bg-[#d73a4a]'
      default:
        break;
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="text-3xl text-zinc-900/80 font-semibold">Boards</h2>
          <p className="text-zinc-500 font-light">
            Select the project to see the board
          </p>
        </span>
        <DropdownProjects selectedProject={setSelectedProject} />
      </div>
      <div className="flex justify-end">
        <SheetCreateIssue projectInfo={selectedProject}>
          <button disabled={!selectedProject} className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs w-fit self-end mt-2 hover:bg-teal-600 disabled:bg-zinc-300">
            <Plus size={18} />
            Open issue
          </button>
        </SheetCreateIssue>
      </div>
      <div className="mt-4 w-full h-full min-h-[400px] flex flex-col gap-3 border text-center p-4 rounded-md">
        <div className="flex justify-between gap-[10px] p-[10px] text-zinc-900">
          <span className="board-col-title">Blocked</span>
          <span className="board-col-title">To do</span>
          <span className="board-col-title">In progress</span>
          <span className="board-col-title">Code review</span>
          <span className="board-col-title">Ready for tests</span>
          <span className="board-col-title">Done</span>
        </div>
        {
          layout && (
            <ResponsiveGridLayout
              className="w-full"
              layouts={{ lg: layout }}
              cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
              rowHeight={140}
              isResizable={false}
            >
              {layout?.map((l: any) => (
                <div className="flex flex-col justify-between bg-zinc-100 p-3 rounded-md text-left cursor-move" key={l.id}>
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-800 mb-2">{l.title}</span>
                    <div className={`rounded-full text-[8px] ${getLabelColor(l.label)} w-fit px-1 py-px text-white`}>{l.label}</div>
                  </div>

                  <div className="flex justify-between">
                    <div className="px-1 py-px bg-teal-100 w-fit text-[10px] rounded-md text-teal-400 font-bold h-fit">
                      <a href="https://github.com/Raggiiz/movieters/issues/1" target="_blank">{l.points}</a>
                    </div>
                    <Image className="rounded-full w-5 h-5" src={data?.user?.image || ""} alt="Assignee image" width={20} height={20} />
                  </div>
                </div>
              ))}
            </ResponsiveGridLayout>
          )
        }
      </div>
    </>
  );
}