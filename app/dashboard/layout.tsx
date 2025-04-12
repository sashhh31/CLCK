'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  BarChart3,
  Users,
  FileText,
  CreditCard,
  Video,
  Mail,
  Bell,
  Download,
  UserCog,
  ChevronRight,
} from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navItems = [
    { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { href: '/dashboard/users', icon: Users, label: 'Users' },
    { href: '/dashboard/documents', icon: FileText, label: 'Documents' },
    { href: '/dashboard/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { href: '/dashboard/education-content', icon: Video, label: 'Education Content' },
    { href: '/dashboard/emails', icon: Mail, label: 'Emails' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { href: '/dashboard/downloads', icon: Download, label: 'Downloads' },
    { href: '/dashboard/roles', icon: UserCog, label: 'Roles' },
  ];
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#2A3356] text-white flex flex-col h-screen fixed left-0 top-0 overflow-hidden">
                     <div className="p-6">
        <Link href="/" className="flex items-center">
          <Image src="/logo1.png" alt="Logo" height={150} width={150} />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-3 text-sm rounded-md group transition-all duration-200 ${
                active ? 'bg-[#3A4366] text-yellow-400' : 'hover:bg-[#3A4366]'
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 transition-colors ${
                  active ? 'text-yellow-400' : 'text-gray-300 group-hover:text-white'
                }`}
              />
              {label}
            </Link>
          );
        })}
      </nav>
<Link href="/dashboard/profile">
      <div className="p-4 border-t border-[#3A4366]">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white text-[#2A3356] flex items-center justify-center font-bold">
            K
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">SuperAdmin</p>
            <p className="text-xs text-gray-300">admin123@gmail.com</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-gray-300" />
        </div>
      </div>
</Link>
    </div>

      {/* Main content */}
      <div className="flex-1 ml-64 overflow-auto">{children}</div>
    </div>
  )
}
