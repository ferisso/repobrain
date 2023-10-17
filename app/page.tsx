'use client'
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import Logo from "@/components/Logo";

export default function Home() {

  return (
    <main className={`bg-main bg-cover overflow-hidden`}>
      <div className="fixed top-0 h-10 w-full">
        <div className="container py-2 flex items-center justify-between">
          <Logo width="60" className="-mt-1" />
          <Link href="/login" className="rounded-md px-2 py-1 flex items-center justify-center border border-zinc-800 text-sm hover:bg-white/20">
            Sign in
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-screen h-screen items-center pt-[12vh] container">
        <h1 className="text-center font-semibold text-[5rem] leading-none text-zinc-800">
          Significantly <br />
          Improve Projects
        </h1>
        <small className="text-zinc-500 mt-8 text-base">Manage your projects with RepoBrain</small>
        <div className="flex gap-4 mt-9">
          <a className="bg-zinc-800 rounded-xl w-52 h-12 flex items-center justify-center  gap-2 text-white font-medium hover:bg-zinc-900" href="https://github.com/ferisso/repobrain">
            <GithubIcon size={20} />
            See on Github
          </a>
          <Link href="/login" className="rounded-xl w-52 h-12 flex items-center justify-center border-2 border-zinc-800 font-medium hover:bg-white/20">
            Join us
          </Link>
        </div>
        <div className="bg-board h-full w-full bg-cover mt-16 rounded-t-2xl border relative">
          <Image className="absolute top-4 -left-20 w-72 rounded-lg border shadow-lg shadow-teal-500/30" width={7000} height={7000} src={'/img/report.png'} alt="" />
          <Image className="absolute top-60 -right-20 w-64 rounded-lg border shadow-lg shadow-purple-500/40" width={7000} height={7000} src={'/img/report2.png'} alt="" />
        </div>
      </div>
    </main>
  )
}
