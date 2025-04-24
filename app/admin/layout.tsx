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
  Menu,
  X,
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (href: string) => pathname === href;

  const navItems = [
    { href: '/admin', icon: BarChart3, label: 'Dashboard' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/documents', icon: FileText, label: 'Documents' },
    { href: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { href: '/admin/education-content', icon: Video, label: 'Education Content' },
    { href: '/admin/emails', icon: Mail, label: 'Emails' },
    { href: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { href: '/admin/downloads', icon: Download, label: 'Downloads' },
    { href: '/admin/roles', icon: UserCog, label: 'Roles' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed md:fixed top-4 left-4 z-50 p-2 rounded-md bg-[#2A3356] text-white md:hidden"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:fixed w-64 bg-[#2A3356] text-white flex flex-col h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0' : '-left-64'
        } md:left-0 z-40`}
      >
        <div className="p-4 md:p-6">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo1.png" 
              alt="Logo" 
              height={150} 
              width={150}
              className="w-auto h-8 md:h-10"
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm rounded-md group transition-all duration-200 ${
                  active ? 'bg-[#3A4366] text-yellow-400' : 'hover:bg-[#3A4366]'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    active ? 'text-yellow-400' : 'text-black group-hover:text-white'
                  }`}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        <Link href="/admin/profile" onClick={() => isMobile && setIsSidebarOpen(false)}>
          <div className="p-4 border-t border-[#3A4366]">
            <div className="flex items-center">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-[#2A3356] flex items-center justify-center font-bold text-sm md:text-base">
                K
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">SuperAdmin</p>
                <p className="text-xs text-black">admin123@gmail.com</p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-black" />
            </div>
          </div>
        </Link>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'} overflow-auto`}>
        {children}
      </div>
    </div>
  );
}
