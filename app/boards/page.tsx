'use client'

import { signOut, useSession } from "next-auth/react"

export default function Boards() {
  const { data } = useSession({
    required: false
  })
  if (data)
    console.log(data)
  return (
    <div className="flex justify-center w-full gap-8 items-center mt-2 h-full">
      <div className="rounded-full h-16 w-16 bg-slate-600">
        <img src={data?.user?.image || ''} alt="Clients image" className="h-full rounded-full" />
      </div>
      <h2 className="text-teal-600 font-semi text-2xl">
        Seja bem-vindo, {data?.user?.name}
      </h2>
      <button className="p-2 rounded-lg bg-teal-600 text-white" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  )
  return <div></div>
}