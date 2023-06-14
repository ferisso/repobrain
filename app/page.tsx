'use client'
import { redirect } from "next/navigation";
export default function Home() {
  redirect('/login');

  return (
    <main className="text-white">
      aa
    </main>
  )
}
