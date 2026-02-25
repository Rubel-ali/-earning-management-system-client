"use client";

import Link from "next/link";
import {
  Users,
  LogOut,
  Briefcase,
  GraduationCap,
  Shield,
  Video,
  Tags,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ConfirmationModal } from "../confirmationModal/ConfirmationModal";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/redux/store";
import { logOut } from "@/redux/ReduxFunction";
import { IoAnalytics } from "react-icons/io5";
import { FaBarsProgress } from "react-icons/fa6";

interface SidebarProps {
  className?: string;
}

export default function SidebarNavigation({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Get Role From Redux
  const role = useSelector((state: RootState) => state.Auth.role);

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("token"); // ✅ correct cookie name
    router.push("/login");
  };

  // ✅ Role Based Menu
  const roleMenus: Record<string, any[]> = {
    SUPER_ADMIN: [
      { name: "Dashboard", href: "/dashboard/super-admin", icon: Shield },
      { name: "Users", href: "/dashboard/super-admin/users", icon: Users },
      { name: "Analytics", href: "/dashboard/super-admin/analytics", icon: IoAnalytics },
    ],

    ADMIN: [
      { name: "Dashboard", href: "/dashboard/admin", icon: Briefcase },
      { name: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
      { name: "Instructors", href: "/dashboard/admin/instructors", icon: Users },
    ],

    INSTRUCTOR: [
      { name: "Dashboard", href: "/dashboard/instructor", icon: Briefcase },
      { name: "Courses", href: "/dashboard/instructor/courses", icon: GraduationCap },
      { name: "Lessons", href: "/dashboard/instructor/lessons", icon: Video },
      { name: "Categories", href: "/dashboard/instructor/categories", icon: Tags },
      { name: "Analytics", href: "/dashboard/instructor/analytics", icon: IoAnalytics },
    ],

    STUDENT: [
      { name: "Dashboard", href: "/dashboard/student", icon: GraduationCap },
      { name: "My Courses", href: "/dashboard/student/courses", icon: Briefcase },
      { name: "Progress", href: "/dashboard/student/progress", icon: FaBarsProgress },
    ],
  };

  const menuItems = roleMenus[role] || [];

  return (
    <div
      className={cn(
        "flex flex-col items-center h-full bg-green-50 py-4 px-3",
        className
      )}
    >
      <nav className="space-y-1 w-full">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-green-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex font-semibold items-center gap-3 px-3 py-2 mt-auto rounded-md text-sm text-red-400 border border-red-200 hover:bg-red-50 transition-colors"
      >
        <LogOut className="h-5 w-5 text-red-500" />
        Log Out
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogOut}
      />
    </div>
  );
}