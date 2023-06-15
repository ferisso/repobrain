'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react'
import MainLoader from '@/components/MainLoader'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<MainLoader />}>
          <ToastContainer />
          <SessionProvider>
            {children}
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  )
}
