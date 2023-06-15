'use client'

import MainLoader from "@/components/MainLoader"
import { signOut, useSession } from "next-auth/react"

export default function Boards() {
  const { data } = useSession({
    required: true
  })
  if (data) {
    console.log(data)
    return (
      <div className="flex justify-center w-full text-center items-center mt-2 h-[calc(100vh-2rem)] bg-zinc-50 p-4">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-xl shadow-lg">
          <div className="rounded-full h-16 w-16 bg-slate-600">
            <img src={data?.user?.image || ''} alt="Clients image" className="h-full rounded-full" />
          </div>
          <h2 className="text-zinc-800 font-semi text-xl">
            Seja bem-vindo,
            <span className="text-teal-500 ml-1">
              {data?.user?.name}
            </span>
          </h2>
          <button className="p-2 rounded-lg bg-teal-600 text-white font-light text-sm" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </div>
    )
  }
  return <MainLoader></MainLoader>
}