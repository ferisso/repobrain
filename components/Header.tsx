/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { data } = useSession()

  const [routes, setRoutes] = useState([
    { name: 'Documentation', path: '/boards'},
    { name: 'Go premium', path: '/boards'},
    { name: 'Support', path: '/settings' },
  ])

  return (
    <header className="h-14 w-full border-b bg-whiteborder-zinc-200 sticky top-0 z-50">
      <div className="flex justify-between items-center px-14 h-full container mx-auto">
        <div className="flex gap-10 items-center text-zinc-800/70 text-xs font-light">
          <button>
            <Logo width="60" height="40" className="-mt-2" />
          </button>
          {
            routes.map((route, key) =>
              <Link href={route.path} key={key} className="font-normal hover:text-zinc-800">
                {route.name}
              </Link>
            )
          }
        </div>
        <button className="rounded-full h-8 w-8 overflow-hidden" onClick={() => signOut()}>
          <Image src={data?.user?.image || ''} alt="Clients image" width={32} height={32}/>
        </button> 
      </div>
    </header>
  )
}