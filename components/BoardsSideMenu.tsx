import { Gear, GearSix, Kanban, UsersFour } from "@phosphor-icons/react";


export default function BoardsSideMenu() {
  return (
    <aside className="flex flex-col gap-2">
      <button className="flex gap-2 items-center font-light text-xs w-40 hover:bg-slate-100 transition-colors py-2 px-3 rounded-lg">
        <Kanban size={20} />
        <p>Projects</p>
      </button>
      <button className="flex gap-2 items-center font-light text-xs w-40 hover:bg-slate-100 transition-colors py-2 px-3 rounded-lg">
        <UsersFour size={20} />
        <p>Team</p>
      </button>
      <button className="flex gap-2 items-center font-light text-xs w-40 hover:bg-slate-100 transition-colors py-2 px-3 rounded-lg">
        <GearSix size={20} />
        <p>Settings</p>
      </button>
    </aside>
  )
}