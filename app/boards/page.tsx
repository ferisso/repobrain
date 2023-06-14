'use client'

import { useSession } from "next-auth/react"

export default function Boards() {
  const { data } = useSession({
    required: true
  })
  return (
    <div>
      boards route
      {JSON.stringify(data)}
    </div>
  )
}