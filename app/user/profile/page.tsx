"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Pencil } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [verificationStep, setVerificationStep] = useState(0)
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])

  // Handle code input change
  const handleCodeChange = (index:number, value:any) => {
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

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="bg-gray-100 border h-[600px] rounded-3xl shadow-sm p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/placeholder.svg?height=100&width=100"
              alt="User"
              className="h-24 w-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-bold">Alexender Alex</h2>
            <p className="text-sm text-gray-800">admin@clckbookkeeping.com</p>
            <div className="mt-2 px-3 py-1 bg-gray-300 rounded-full text-sm text-gray-700">Super Admin</div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("personal")}
              className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
            >
              <span>Personal Info</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveSection("password")}
              className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
            >
              <span>Change Password</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setActiveSection("email")
                setVerificationStep(0)
              }}
              className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
            >
              <span>Change Email</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 bg-gray-100 border rounded-3xl shadow-sm p-6">
          {activeSection === "password" && (
            <>
              <div className="mb-8">
                <h1 className="font-semibold text-3xl">Change Password</h1>
                <p className="text-base mt-2">
                  Enter your old and new password to change your password
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-base font-semibold mb-1">
                    Old Password
                  </label>
                  <Input id="currentPassword" type="password" placeholder="Current Password" />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <div>
                    <label htmlFor="newPassword" className="block text-base font-semibold mb-1">
                      New Password
                    </label>
                    <Input id="newPassword" type="password" placeholder="New Password" className="rounded-3xl w-80" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-base font-semibold mb-1">
                      Confirm New Password
                    </label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm New Password" className="rounded-3xl w-80" />
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button className="bg-[#2A3356] rounded-3xl mt-6 text-[#F0D687] text-base hover:bg-[#2A3356]/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </>
          )}

          {activeSection === "personal" && (
            <>
              <div className="flex items-start mb-8 gap-6">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=120&width=120"
                    alt="User"
                    className="h-32 w-32 rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-[#2A3356] rounded-full flex items-center justify-center">
                    <Pencil className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="First Name" defaultValue="Alexender" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Last name" defaultValue="Alex" />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  defaultValue="admin@clckbookkeeping.com"
                  disabled
                />
              </div>

              <div className="flex justify-start">
                <Button className="bg-[#2A3356] rounded-3xl mt-24 text-[#F0D687] text-base hover:bg-[#2A3356]/90">
                  Save Changes
                </Button>
              </div>
            </>
          )}

          {activeSection === "email" && (
            <>
              <div className="mb-6">
                <h1 className="font-semibold text-3xl">Change Email Address</h1>
                <p className="text-base mt-2">
                  Enter your email address
                </p>
              </div>

              {verificationStep === 1 && (
                <>
                  <div className="">
                    <label htmlFor="newEmail" className="block text-base font-semibold mb-2">
                      New Email Address
                    </label>
                    <Input 
                      id="newEmail" 
                      type="email" 
                      placeholder="Enter new email address" 
                      className="bg-white"
                    />
                  </div>
                  
                  <div className="flex justify-start">
                    <Button 
                      className="bg-[#2A3356] rounded-3xl mt-14 text-white text-base hover:bg-[#2A3356]/90"
                      
                    >
                      Update
                    </Button>
                  </div>
                </>
              )}

              {verificationStep === 0 && (
                <>
                  <div className="mb-8">
                    <label htmlFor="currentEmail" className="block text-base font-semibold mb-2">
                      Email Address
                    </label>
                    <Input 
                      id="currentEmail" 
                      type="email" 
                      value="admin@clckbookkeeping.com"
                      className="bg-gray-200"
                      disabled
                    />
                    <div className="mt-2">
                      <button className="text-[#2A3356] font-medium">
                        Send Code
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex justify-center gap-4 mt-8">
                      {[0, 1, 2, 3].map((index) => (
                        <Input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          maxLength={1}
                          value={verificationCode[index]}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          className="w-12 h-12 text-center text-xl rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-16">
                    <Button 
                      className="bg-[#2A3356] rounded-3xl w-32 text-white text-base hover:bg-[#2A3356]/90"
                      onClick={() => setVerificationStep(1)}
                    >
                      Verify
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}