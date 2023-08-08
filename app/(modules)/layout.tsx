'use client'
import Header from "@/components/Header"
import MainLoader from "@/components/MainLoader"
import { useSession } from "next-auth/react"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = useSession({
    required: true
  })
  return (
    data && data?.user ? (
      <>
        <Header />
        <div className="container mx-auto px-14 py-4">
          {children}
        </div>
      </>
    )
    : <MainLoader />
  )
}