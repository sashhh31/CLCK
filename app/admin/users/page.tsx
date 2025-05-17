"use client"

import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { adminService, AdminUser, AdminApiResponse } from "@/app/services/api"

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true)
      const response = await adminService.getAllUsers(page)
      setUsers(response.data.users as AdminUser[])
      setTotalPages(response.data.pagination.pages)
      setCurrentPage(page)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Implement search functionality here
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchUsers(newPage)
    }
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-2">Users</h1>
      <p className="text-black mb-8">Total Users : {users.length}</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input 
            type="text" 
            placeholder="Search Users" 
            className="w-full pl-4 pr-4 py-2 border rounded-full"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute right-5 top-2.5 h-5 w-5 text-black" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">User name</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Role</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Added On</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">{user.email.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-medium">{user.email.split('@')[0]}</p>
                          <p className="text-sm text-black">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{user.email}</td>
                    <td className="px-4 py-4 text-sm">{user.role}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'banned' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-sm">
                      <Link href={`/admin/users/${user.id}`} className="text-[#2A3356] hover:underline font-medium">
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
          <div className="flex items-center">
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
              {currentPage}
            </div>
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-sm text-black ml-4">
            Total : {totalPages} Pages
          </div>
        </div>
      </div>
    </div>
  )
}
