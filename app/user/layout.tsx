import type React from "react"
import SideBar from "@/components/sideBar"

interface UserLayoutProps {
  children: React.ReactNode
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      {/* Main content */}
      <div className="flex-1 overflow-auto md:ml-64">{children}</div>
    </div>
  )
}
