'use client'
import AsideModulesMenu from "@/components/AsideModulesMenu"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import MainLoader from "@/components/MainLoader"
import { useSession } from "next-auth/react"
import { Suspense } from "react"

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
      <Suspense fallback={<MainLoader />}>
        <Header />
        <div className="container mx-auto px-14 py-4">
          <div className="grid flex-1 flex-col gap-6 grid-cols-[160px_1fr]">
            <AsideModulesMenu />
            <div className="flex w-full flex-1 flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    )
      : <MainLoader />
  )
}