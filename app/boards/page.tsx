'use client'

import { signOut, useSession } from "next-auth/react"

export default function Boards() {
  const { data } = useSession({
    required: true
  })
  return (
    <div>
      boards route
      {JSON.stringify(data)}
      <button className="p-2 rounded-lg bg-teal-600 text-white" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  )
}