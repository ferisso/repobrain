'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Kanban, User } from "@phosphor-icons/react";
import Link from "next/link";

export default function Home() {

  return (
    <main className={`flex flex-col w-screen h-screen items-center justify-between pt-[20vh] bg-main bg-cover overflow-hidden`}>
      <div className="flex flex-col gap-8">
        <h1 className="text-center font-black text-[5rem] font-space leading-none text-zinc-700">
          Significantly <br/>
          Improve Projects
        </h1>
        <small className="text-zinc-500 text-base text-center">Manage your projects with RepoBrain</small>
        <div className="flex justify-center gap-8">
          <button
            className="flex items-center justify-center gap-1 border text-white border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/5">
            <User size={18} />
            Create an account
          </button>
          <Link
            href={'/boards'}
            className="flex items-center justify-center gap-1 text-white border bg-teal-500 border-teal-500 py-2 px-4 rounded-md text-xs hover:bg-teal-500/80">
            <Kanban size={18} />
            Check my boards
          </Link>
        </div>
      </div>
      <div className="flex relative">
        <Image className="w-[60vw] relative top-10 rounded-lg border-2 border-teal-300 shadow-xl shadow-cyan-500/90" width={1000} height={1000} src={'/img/board.png'} alt="" />
        <Image className="absolute w-72 left-[-3rem] rounded-lg border shadow-lg shadow-rose-500/30" width={7000} height={7000} src={'/img/report.png'} alt=""/>
        <Image className="absolute w-64 right-[-5rem] top-24 rounded-lg border shadow-lg shadow-purple-500/40" width={7000} height={7000} src={'/img/report2.png'} alt=""/>
      </div>
    </main>
  )
}
