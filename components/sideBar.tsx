'use client'

import { FileText, CreditCard, Video, Download, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const links = [
    { href: '/user', label: 'Documents', icon: FileText },
    { href: '/user/subscription', label: 'Subscription Plan', icon: CreditCard },
    { href: '/user/education', label: 'Education', icon: Video },
    { href: '/user/downloads', label: 'Downloads', icon: Download },
  ]

  return (
    <div className="w-64 bg-[#2A3356] text-white flex flex-col">
      <div className="p-6 mt-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo1.png" alt="Logo" height={150} width={150} />
        </Link>
      </div>

      <nav className="flex-col px-4 mb-6 py-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-3 text-sm rounded-md group transition-all duration-200 ${
                isActive 
                  ? 'bg-[#3A4366] text-[#F0D687]' 
                  : 'hover:bg-[#3A4366]'
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 transition-colors ${
                  isActive 
                    ? 'text-[#F0D687]' 
                    : 'text-gray-300 '
                }`}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      <Link href="./profile">
        <div className="p-4 border-t border-[#3A4366] cursor-pointer">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white text-[#2A3356] flex items-center justify-center font-bold">
              K
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Alex Havaidai</p>
              <p className="text-xs text-gray-300">alexhavaidai23@gmail.com</p>
            </div>
            <ChevronRight className="ml-auto h-5 w-5 text-gray-300" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar