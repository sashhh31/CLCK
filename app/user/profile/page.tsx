"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Pencil, Menu, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [verificationStep, setVerificationStep] = useState(0)
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle code input change
  const handleCodeChange = (index:number, value:string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)
      
      // Auto-focus next input if value is entered
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
               <div className="border-t-2 mt-6 mb-2"></div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Profile</h1>
        
        {/* Mobile menu toggle */}
        <Button 
          className="md:hidden bg-gray-100 hover:bg-gray-200 text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="ml-2">Menu</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar - Desktop */}
        <Card className="hidden md:block h-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full mb-4 overflow-hidden">
                    <img
                  src="/sarah.png"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">Alexender Alex</h2>
              <p className="text-sm text-black text-center">admin@clckbookkeeping.com</p>
              <div className="mt-2 px-3 py-1 bg-gray-200 rounded-full text-sm text-black">Super Admin</div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSectionChange("personal")}
                className={`w-full text-left flex items-center justify-between p-3 rounded-md ${
                  activeSection === "personal" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <span>Personal Info</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSectionChange("password")}
                className={`w-full text-left flex items-center justify-between p-3 rounded-md ${
                  activeSection === "password" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <span>Change Password</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  handleSectionChange("email")
                  setVerificationStep(0)
                }}
                className={`w-full text-left flex items-center justify-between p-3 rounded-md ${
                  activeSection === "email" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <span>Change Email</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - Mobile */}
        {isMobileMenuOpen && (
          <Card className="md:hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img
                    src="/sarah.png"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Alexender Alex</h2>
                  <p className="text-xs text-black">admin@clckbookkeeping.com</p>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => handleSectionChange("personal")}
                  className={`w-full text-left flex items-center justify-between p-2 rounded-md ${
                    activeSection === "personal" ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span>Personal Info</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleSectionChange("password")}
                  className={`w-full text-left flex items-center justify-between p-2 rounded-md ${
                    activeSection === "password" ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span>Change Password</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    handleSectionChange("email")
                    setVerificationStep(0)
                  }}
                  className={`w-full text-left flex items-center justify-between p-2 rounded-md ${
                    activeSection === "email" ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                >
                  <span>Change Email</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Card className="md:col-span-2">
          <CardContent className="p-4 sm:p-6">
            {activeSection === "password" && (
              <>
                <div className="mb-6 sm:mb-8">
                  <h2 className="font-semibold text-xl sm:text-2xl mb-2">Change Password</h2>
                  <p className="text-sm sm:text-base text-black">
                    Enter your old and new password to change your password
                  </p>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                      Old Password
                    </label>
                    <Input id="currentPassword" type="password" placeholder="Current Password" className="rounded-lg" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex-1">
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <Input id="newPassword" type="password" placeholder="New Password" className="rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm New Password" className="rounded-lg" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeSection === "personal" && (
              <>
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border border-gray-300 overflow-hidden">
                      <img
                        src="/sarah.png"
                        alt="User"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="absolute top-0 right-0 h-6 w-6 sm:h-8 sm:w-8 bg-[#2A3356] rounded-full flex items-center justify-center">
                      <Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="First Name" defaultValue="Alexender" className="rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Last name" defaultValue="Alex" className="rounded-lg" />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    defaultValue="admin@clckbookkeeping.com"
                    disabled
                    className="rounded-lg"
                  />
                </div>

                <div className="flex justify-start mt-6 sm:mt-8">
                  <Button className="bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90">
                    Save Changes
                  </Button>
                </div>
              </>
            )}

            {activeSection === "email" && (
              <>
                <div className="mb-4 sm:mb-6">
                  <h2 className="font-semibold text-xl sm:text-2xl mb-2">Change Email Address</h2>
                  <p className="text-sm sm:text-base text-black">
                    Enter your email address
                  </p>
                </div>

                {verificationStep === 1 && (
                  <>
                    <div className="mb-6">
                      <label htmlFor="newEmail" className="block text-sm font-medium mb-2">
                        New Email Address
                      </label>
                      <Input 
                        id="newEmail" 
                        type="email" 
                        placeholder="Enter new email address" 
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="flex justify-start mt-6 sm:mt-8">
                      <Button 
                        className="bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90"
                      >
                        Update
                      </Button>
                    </div>
                  </>
                )}

                {verificationStep === 0 && (
                  <>
                    <div className="mb-6">
                      <label htmlFor="currentEmail" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input 
                        id="currentEmail" 
                        type="email" 
                        value="admin@clckbookkeeping.com"
                        className="bg-gray-200 rounded-lg"
                        disabled
                      />
                      <div className="mt-2">
                        <button className="text-[#2A3356] text-sm font-medium">
                          Send Code
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
                        {[0, 1, 2, 3].map((index) => (
                          <Input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={verificationCode[index]}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6 sm:mt-8">
                      <Button 
                        className="bg-[#2A3356] rounded-lg w-24 sm:w-32 text-white text-sm hover:bg-[#2A3356]/90"
                        onClick={() => setVerificationStep(1)}
                      >
                        Verify
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}