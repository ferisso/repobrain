import { Gear, GearSix, Kanban, UsersFour } from "@phosphor-icons/react";

interface IAsideModulesMenuProps {
  items: Array<IAsideModulesMenu>,
}

export interface IAsideModulesMenu {
  icon: JSX.Element,
  name: string,
  isActive: boolean,
}

export default function AsideModulesMenu(props: IAsideModulesMenuProps) {
  return (
    <aside className="flex flex-col gap-2">
      {
        props.items.map((menu, key) => (
          <button 
            key={`item-aisde-menu-${key}`}  
            className={`${menu.isActive && 'bg-zinc-100'} flex gap-2 items-center font-light text-xs w-40 hover:bg-zinc-100 transition-colors py-2 px-3 rounded-lg`}
          >
            {menu.icon}
            <p>{menu.name}</p>
          </button>
        ))
      }
    </aside>
  )
}