'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Home() {

  const session = useSession()
  console.log(session)
  redirect('/login')

  return (
    <main className="text-white">
      aa
    </main>
  )
}
