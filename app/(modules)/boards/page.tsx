/* eslint-disable react/no-unescaped-entities */
'use client'
import DialogCreateProject from "@/components/DialogCreateProject"
import DropdownProjects from "@/components/DropdownProjects"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapTrifold } from "@phosphor-icons/react"
import { Plus } from "react-feather"
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import { useSession } from "next-auth/react"
import Image from "next/image";

export default function Boards() {

  const { data } = useSession()

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, title: 'Fix homepage title size', ticket: 99, label: 'bug'},
    { i: "b", x: 1, y: 0, w: 1, h: 1, title: 'Implement modal to add company', ticket: 201, label: 'enhancement'},
    { i: "c", x: 2, y: 0, w: 1, h: 1, title: 'Create component to general titles',ticket: 123, label: 'enhancement'},
    { i: "d", x: 3, y: 0, w: 1, h: 1, title: 'Remove unused code from the repo', ticket: 432, label: 'help wanted'},
    { i: "e", x: 4, y: 0, w: 1, h: 1, title: 'Implement modal to confirm delete', ticket: 87, label: 'bug'},
    { i: "f", x: 5, y: 0, w: 1, h: 1, title: 'Fix homepage flicker layout', ticket: 870, label: 'bug'},
    { i: "g", x: 1, y: 1, w: 1, h: 1, title: 'Fix slider in reports page', ticket: 870, label: 'bug'},
  ];

  const getLabelColor = (label: string) => {
    console.log(label)
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
       <DropdownProjects />
      </div>
      <button className="flex items-center justify-center gap-1 text-white bg-teal-500 py-2 px-4 rounded-md text-xs w-fit self-end mt-2">
        <Plus size={18} />
        Open issue
      </button>
      <div className="mt-4 w-full h-full min-h-[400px] flex flex-col gap-3 border border-dashed text-center p-4 rounded-md">
        <div className="flex justify-between gap-[10px] p-[10px] text-zinc-900">
          <span className="board-col-title">Blocked</span>
          <span className="board-col-title">To do</span>
          <span className="board-col-title">In progress</span>
          <span className="board-col-title">Code review</span>
          <span className="board-col-title">Ready for tests</span>
          <span className="board-col-title">Done</span>
        </div>
        <ResponsiveGridLayout
          className="w-full"
          layouts={{ lg: layout }}
          cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
          rowHeight={140}
          isResizable={false}
        >
          {layout.map((l) => (
            <div className="flex flex-col justify-between bg-zinc-100 p-3 rounded-md text-left cursor-pointer" key={l.i}>
              <div className="flex flex-col">
                <span className="text-sm text-zinc-800 mb-2">{l.title}</span>
                <div className={`rounded-full text-[8px] ${getLabelColor(l.label)} w-fit px-1 py-px text-white`}>{l.label}</div>
              </div>
              
              <div className="flex justify-between">
                <div className="px-1 py-px bg-teal-100 w-fit text-[10px] rounded-md text-teal-400 font-bold h-fit">
                  <a href="https://github.com/Raggiiz/movieters/issues/1" target="_blank">{l.ticket}</a>
                </div>
                <Image className="rounded-full w-5 h-5" src={data?.user?.image || ""} alt="Assignee image" width={20} height={20}/>
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </>
  );
}