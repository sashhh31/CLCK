"use client"

import { useState, useEffect, ChangeEvent, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, Pencil, Menu, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { authService } from "@/app/services/api"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [formData, setFormData] = useState({
    role:"",
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    subscription: {
      plan: "",
      status: "",
      currentPeriodEnd: ""
    },
    profilePicture:{type:"",value: ""}
  })
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoadingUser(true)
      const response = await authService.getUserProfile()
      const userData = response.data.user
      console.log(userData)
      
      setFormData(prev => ({
        ...prev,
        role:userData.role ||  '',
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        subscription: {
          plan: userData.subscription?.plan || "",
          status: userData.subscription?.status || "",
          currentPeriodEnd: userData.subscription?.currentPeriodEnd || ""
        },
        profilePicture:{
          type:userData.profilePicture?.type || "",
          value: userData.profilePicture?.value || ""
        }
      }))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch user data",
        variant: "destructive"
      })
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
        description: "Name updated successfully"
      })
      await fetchUserData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update name",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailUpdate = async () => {
    try {
      setIsLoading(true)
      await authService.changeEmail({
        newEmail: formData.email,
        password: formData.currentPassword // or prompt for password if needed
      })
      toast({
        title: "Success",
        description: "Email updated successfully"
      })
      await fetchUserData()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update email",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Profile picture upload
  const handleProfilePictureClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleProfilePictureChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        setIsLoading(true)
        const response = await authService.uploadProfilePicture(e.target.files[0])
        toast({ title: "Success", description: "Profile picture updated!" })
        await fetchUserData()
      } catch (error: any) {
        toast({ title: "Error", description: error.response?.data?.message || "Failed to upload profile picture", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setIsMobileMenuOpen(false)
  }

  if (isLoadingUser) {
    return (
      <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3356]"></div>
      </div>
    )
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
              <div className="h-20 w-20 rounded-full mb-4 overflow-hidden bg-[#2A3356] flex items-center justify-center">
                {formData.profilePicture?.type === 'initial' ? (
                  <span className="text-2xl text-white">{formData.profilePicture.value}</span>
                ) : formData.profilePicture?.value ? (
                  <img
                    src={formData.profilePicture.value}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-white">
                    {formData.firstName ? formData.firstName.charAt(0) : '?'}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h2>
              <p className="text-sm text-black text-center">{formData.email}</p>
              <div className="mt-2 px-3 py-1 bg-gray-200 rounded-full text-sm text-black">{formData.role}</div>
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
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - Mobile */}
        {isMobileMenuOpen && (
          <Card className="md:hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-[#2A3356] flex items-center justify-center">
                  {formData.profilePicture?.type === 'initial' ? (
                    <span className="text-lg text-white">{formData.profilePicture.value}</span>
                  ) : formData.profilePicture?.value ? (
                    <img
                      src={formData.profilePicture.value}
                      alt="User"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg text-white">
                      {formData.firstName ? formData.firstName.charAt(0) : '?'}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{formData.firstName} {formData.lastName}</h2>
                  <p className="text-xs text-black">{formData.email}</p>
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
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      placeholder="Current Password" 
                      className="rounded-lg"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex-1">
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="New Password" 
                        className="rounded-lg"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="Confirm New Password" 
                        className="rounded-lg"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      className="bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90"
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeSection === "personal" && (
              <>
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border border-gray-300 overflow-hidden bg-[#2A3356] flex items-center justify-center">
                      {formData.profilePicture?.type === 'initial' ? (
                        <span className="text-4xl text-white">{formData.profilePicture.value}</span>
                      ) : formData.profilePicture?.value ? (
                        <img
                          src={formData.profilePicture.value}
                          alt="User"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl text-white">
                          {formData.firstName ? formData.firstName.charAt(0) : '?'}
                        </span>
                      )}
                    </div>
                    <button type="button" className="absolute top-0 right-0 h-6 w-6 sm:h-8 sm:w-8 bg-[#2A3356] rounded-full flex items-center justify-center" onClick={handleProfilePictureClick}>
                      <Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </button>
                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleProfilePictureChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                      First Name
                    </label>
                    <Input 
                      id="firstName" 
                      placeholder="First Name" 
                      className="rounded-lg"
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
                      className="rounded-lg"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-start mt-2 mb-6">
                  <Button 
                    className="bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90"
                    onClick={handlePersonalInfoUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Name"}
                  </Button>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-lg"
                  />
                  <Button
                    className="mt-2 bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90"
                    onClick={handleEmailUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Email"}
                  </Button>
                </div>


                <div className="mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Subscription Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Plan:</span>
                        <span className="text-sm font-medium">{formData.subscription.plan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className="text-sm font-medium capitalize">{formData.subscription.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current Period Ends:</span>
                        <span className="text-sm font-medium">
                          {new Date(formData.subscription.currentPeriodEnd).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start mt-6 sm:mt-8">
                  <Button 
                    className="bg-[#2A3356] rounded-lg text-white text-sm hover:bg-[#2A3356]/90"
                    onClick={handlePersonalInfoUpdate}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}