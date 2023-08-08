'use client'
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const { data } = useSession()
  const routerName = usePathname()

  const [routes, setRoutes] = useState([
    { name: 'Boards', path: '/boards', isActive: false },
    { name: 'Reports', path: '/reports', isActive: false },
    { name: 'Settings', path: '/settings', isActive: false },
  ])

  const mapRoutes = () => {
   return routes.map(item => {
      return {
        ...item, 
        isActive: routerName === item.path
      }
    })
  }
  
  useEffect(() => {
    const newRoutes = mapRoutes()
    setRoutes(newRoutes)
  }, [routerName])

  return (
    <header className="h-14 w-full border-b bg-whiteborder-zinc-200 sticky top-0 z-50">
      <div className="flex justify-between items-center px-14 h-full container mx-auto">
        <div className="flex gap-10 items-center text-zinc-800/70 text-xs font-light">
          <button>
            <Logo width="60" height="40" className="-mt-2" />
          </button>
          {
            routes.map((route, key) =>
              <Link href={route.path} key={key} className={ route.isActive ? 'font-medium text-teal-500' : 'font-normal hover:text-zinc-800' }>
                {route.name}
              </Link>
            )
          }
        </div>
        <button className="rounded-full h-8 w-8 bg-slate-600" onClick={() => signOut()}>
          <img src={data?.user?.image || ''} alt="Clients image" className="h-full rounded-full" />
        </button>
      </div>
    </header>
  )
}