import type React from "react"
import { Inter } from "next/font/google"
import SidebarNavigation from "@/components/dashboard/sidebar/sidebar-navigation"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dashboard - Learning Management System",
  description: "A simple dashboard application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex h-screen">
            <div className="w-64 border-r">
              <SidebarNavigation />
            </div>
            <main className="flex-1 overflow-auto p-6">{children} 
            <Toaster position="top-center" />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
