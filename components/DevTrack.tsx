'use client'
import { IBoards } from "@/types/Boards";
import { useEffect, useState } from "react";
import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import AvatarCard from "./AvatarCard";
import BoardService from "@/service/BoardsService";
import { useRouter } from "next/navigation";
import ChipIssueLabels from '@/components/ChipIssueLabels'

interface DevTrackProps {
  boards?: IBoards[],
}

export default function DevTrack({ boards }: DevTrackProps) {
  const router = useRouter()
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const [layout, setLayout] = useState<any>()

  const openCard = (issueId: string) => {
    router.push('/boards/' + issueId)
  }

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
    setLayout(newLayout)
  }, [boards])

  const changeBoardStatus = async (layout: GridLayout.Layout[], { i: id, x: oldStatus }: GridLayout.Layout) => {
    const realItem = layout.find((item: any) => item.i === id)

    if (!realItem) {
      console.error('Error while searching the id of issue');
      return;
    }

    if (realItem.x == oldStatus) return;

    const board = {
      id: realItem.i,
      status: realItem.x
    }
    await BoardService.updateBoard(board)
  }

  return (
    <>
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
              layouts={{ lg: layout }}
              cols={{ lg: 6, md: 6, sm: 6, xs: 6, xxs: 6 }}
              isResizable={false}
              onDragStop={changeBoardStatus}
              useCSSTransforms={false}
              autoSize={true}
            >
              {layout?.map((l: any, index: number) => (
                <div className="z-0 flex flex-col justify-between p-3 rounded-md text-left cursor-move border shadow-sm min-w-[150px] hover:backdrop-blur-sm" key={l.id} onDoubleClick={() => openCard(l.id)}>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500"># {index + 1}</span>
                    <span className="text-sm mb-2">
                      {
                        l.title.length > 40 ? `${l.title.substring(0, 40)}...` : l.title
                      }
                    </span>
                    {
                      !!l.label && <ChipIssueLabels label={l.label} className="py-0.5 px-2" />
                    }
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="px-3 py-1 rounded-2xl bg-zinc-200 w-fit text-[10px] text-zinc-600 font-bold h-fit">
                      <a>{l.points}</a>
                    </div>
                    <AvatarCard user={l.assignee_info} hoverable={false} />
                  </div>
                </div>
              ))}
            </ResponsiveGridLayout>
        )
      }
    </>
  )
}