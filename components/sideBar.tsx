'use client'

import { FileText, CreditCard, Video, Download, ChevronRight, Menu, X, Calendar, Bell } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    // Initial check
    checkScreenSize()
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const links = [
    { href: '/user', label: 'Documents', icon: FileText },
    { href: '/user/subscription', label: 'Subscription Plan', icon: CreditCard },
    { href: '/user/education', label: 'Education', icon: Video },
    { href: '/user/downloads', label: 'Downloads', icon: Download },
    { href: '/user/calendly', label: 'My Calendar', icon: Calendar },
    { href: '/user/notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="md:hidden absolute md:fixed top-4 left-4  bg-[#2A3356]  text-white p-2 rounded-md"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <X size={2} /> : <Menu size={24}  />}
        </button>
      )}
      
      {/* Sidebar */}
      <div 
        className={`${
          isOpen ? 'translate-x-0 ' : '-translate-x-full '
        } fixed md:fixed top-0 left-0 z-40 h-full md:h-screen md:w-64 w-[250px] bg-[#2A3356] text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
       <div className="p-4 md:p-6">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Images/logo1.png" 
              alt="Logo" 
              height={150} 
              width={150}
              className="w-auto h-8 md:h-10"
            />
          </Link>
        </div>

        <nav className="flex-col px-2 md:px-4 mb-4 md:mb-6 py-2 md:py-3 space-y-1 md:space-y-2 overflow-y-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm rounded-md group transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#3A4366] text-[#F0D687]' 
                    : 'hover:bg-[#3A4366]'
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <Icon
                  className={`mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 transition-colors ${
                    isActive 
                      ? 'text-[#F0D687]' 
                      : 'text-gray-300'
                  }`}
                />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto">
          <Link href="/user/profile" onClick={() => isMobile && setIsOpen(false)}>
            <div className="p-3 md:p-4 border-t border-[#3A4366] cursor-pointer">
              <div className="flex items-center">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-[#2A3356] flex items-center justify-center font-bold text-xs md:text-base">
                  K
                </div>
                <div className="ml-2 md:ml-3">
                  <p className="text-xs md:text-sm font-medium truncate">Alex Havaidai</p>
                  <p className="text-[10px] md:text-xs text-gray-300 truncate">alexhavaidai23@gmail.com</p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 md:h-5 md:w-5 text-gray-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar