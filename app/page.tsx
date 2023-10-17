'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Home() {

  return (
    <main className={`flex flex-col w-screen h-screen items-center pt-[20vh] bg-main bg-cover`}>
      <h1 className="text-center font-black text-[5rem] font-space leading-none text-zinc-700">
        Significantly <br/>
        Improve Projects
      </h1>
      <small className="text-zinc-500 mt-8 text-base">Manage your projects with RepoBrain</small>
    </main>
  )
}
