'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { ChartLine, Folder, GearSix, Kanban, UsersFour } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IAsideModulesMenu {
  icon: JSX.Element,
  name: string,
  path: string,
  isActive: boolean,
}

export default function AsideModulesMenu() { 
  const path = usePathname()

  const [sideMenu, setSideMenu] = useState<IAsideModulesMenu[]>([
    { icon: <Kanban size={20} />, name: 'Boards', path: '/boards', isActive: false },
    { icon: <ChartLine size={20} />, name: 'Reports', path: '/reports', isActive: false },
    { icon: <Folder size={20} />, name: 'Projects', path: '/projects', isActive: false },
    { icon: <UsersFour size={20} />, name: 'Teams', path: '/teams', isActive: false },
    { icon: <GearSix size={20} />, name: 'Settings', path: '/settings', isActive: false },
  ])

  const mapMenu = () => {
    return sideMenu.map(menu => {
      return {
        ...menu,
        isActive: menu.path === path
      }
    })
  }

  useEffect(() => { 
    setSideMenu(mapMenu())
  }, [path])

  return (
    <aside className="flex flex-col gap-2">
      {
        sideMenu.map((menu, key) => (
          <Link
            key={`item-aisde-menu-${key}`}
            className={`${menu.isActive && 'bg-zinc-100'} flex gap-2 items-center font-light text-xs w-40 hover:bg-zinc-100 transition-colors py-2 px-3 rounded-md`}
            href={menu.path}
          >
            {menu.icon}
            <p>{menu.name}</p>
          </Link>
        ))
      }
    </aside>
  )
}