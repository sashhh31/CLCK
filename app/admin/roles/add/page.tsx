import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"
import Link from "next/link"

export default function AddRolePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Add User Role</h1>

      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 h-8 w-8 bg-[#2A3356] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium mb-1">
              User Name
            </label>
            <Input id="userName" placeholder="Enter Name" />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium mb-1">
              Designation
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="accountant">Accountant</SelectItem>
                <SelectItem value="user">Regular User</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input id="email" type="email" placeholder="Enter Email Address" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Input id="password" type="password" placeholder="Enter Password" />
              <button className="absolute right-3 top-2.5">
                <Eye className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/dashboard/roles"
            className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </Link>
          <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90">Add</Button>
        </div>
      </div>
    </div>
  )
}
