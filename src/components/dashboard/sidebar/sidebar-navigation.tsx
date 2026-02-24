"use client"
import Link from "next/link"
import { Home, Users, LogOut, Briefcase, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ConfirmationModal } from "../confirmationModal/ConfirmationModal"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch } from "@/redux/store"
import { logOut } from "@/redux/ReduxFunction"

interface SidebarProps {
  className?: string
  currentPath?: string
}

export default function SidebarNavigation({ className }: SidebarProps) {
  const route = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pathname = usePathname()
  const dispatch = useDispatch<AppDispatch>()

  const handleLogOut = () => {
    dispatch(logOut())
    Cookies.remove("accessToken")
    route.push("/login")

  }

  const menuItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Staff",
      href: "/dashboard/staff",
      icon: Users,
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: Briefcase,
    },
    {
      name: "Appointments",
      href: "/dashboard/appointments",
      icon: Clock,
    },
    {
      name: "Queue",
      href: "/dashboard/queue",
      icon: Clock,
    },
    // {
    //   name: "User list",
    //   href: "/dashboard/users",
    //   icon: Users,
    // },
    // {
    //   name: "Profile",
    //   href: "/dashboard/profile",
    //   icon: User,
    // },
  ]

  return (
    <div className={cn("flex flex-col  items-center h-full bg-green-50 py-4 px-3", className)}>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${pathname === item.href ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}

            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <button onClick={() => setIsModalOpen(true)} className="flex font-semibold items-center gap-3 px-3 py-2 mt-auto rounded-md text-sm text-red-400 border border-red-200 hover:bg-red-50 transition-colors">
        <LogOut className="h-5 w-5 text-red-500" />
        Log Out
      </button>
      {/* Confirmation Modal */}
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleLogOut} />
    </div>
  )
}