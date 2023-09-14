'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react'
import MainLoader from '@/components/MainLoader'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/service/QueryService'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>REPO Brain</title>
      </head>
      <body className={inter.className}>
        <Suspense fallback={<MainLoader />}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <SessionProvider>
              {children}
            </SessionProvider>
          </QueryClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
