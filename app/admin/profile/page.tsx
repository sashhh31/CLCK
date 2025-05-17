"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Pencil } from "lucide-react"
import Link from "next/link"
import { authService } from "@/app/services/api"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
}

export default function ProfilePage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: ""
  })
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoadingUser(true)
      const response = await authService.getUserProfile()
      const userData = response.data.user
      
      setFormData(prev => ({
        ...prev,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || ""
      }))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch user data",
        variant: "destructive"
      })
      // Redirect to login if unauthorized
      if (error.response?.status === 401) {
        router.push('/login')
      }
    } finally {
      setIsLoadingUser(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      })
      return
    }

    try {
      setIsLoading(true)
      await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })
      
      toast({
        title: "Success",
        description: "Password updated successfully"
      })
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update password",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePersonalInfoUpdate = async () => {
    try {
      setIsLoading(true)
      await authService.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName
      })
      
      toast({
        title: "Success",
        description: "Personal information updated successfully"
      })
      
      // Refresh user data
      await fetchUserData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update personal information",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingUser) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3356]"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>

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
            <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
            <p className="text-sm text-black">{formData.email}</p>
            <div className="mt-2 px-3 py-1 bg-gray-300 rounded-full text-sm text-black">Super Admin</div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setShowPasswordForm(false)}
              className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
            >
              <span>Personal Info</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowPasswordForm(true)}
              className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-md"
            >
              <span>Change Password</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 bg-gray-100 border rounded-3xl shadow-sm p-6">
          {showPasswordForm ? (
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
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <div>
                    <label htmlFor="newPassword" className="block text-base font-semibold mb-1">
                      New Password
                    </label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="New Password" 
                      className="rounded-3xl w-80"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-base font-semibold mb-1">
                      Confirm New Password
                    </label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm New Password" 
                      className="rounded-3xl w-80"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button 
                    className="bg-[#2A3356] rounded-3xl mt-6 text-[#F0D687] text-base hover:bg-[#2A3356]/90"
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
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
                  <Input 
                    id="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Last name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
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
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="flex justify-start">
                <Button 
                  className="bg-[#2A3356] rounded-3xl mt-24 text-[#F0D687] text-base hover:bg-[#2A3356]/90"
                  onClick={handlePersonalInfoUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
