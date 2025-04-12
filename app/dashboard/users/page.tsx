import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "Alex Saprun",
      email: "alexsaprun123@gmail.com",
      downloadedFiles: 123,
      documents: 19,
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sapstar",
      email: "alexsaprun123@gmail.com",
      downloadedFiles: 10,
      documents: 10,
      addedOn: "2025-02-03",
      avatar: null,
    },
    {
      id: 3,
      name: "Naina Nohn",
      email: "alexsaprun123@gmail.com",
      downloadedFiles: 19,
      documents: 20,
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Alexendra",
      email: "alexsaprun123@gmail.com",
      downloadedFiles: 16,
      documents: 210,
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "John Sigma",
      email: "alexsaprun123@gmail.com",
      downloadedFiles: 10,
      documents: 19,
      addedOn: "2025-02-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Users</h1>
      <p className="text-gray-500 mb-8">Total Users : 120</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input type="text" placeholder="Search Users" className="w-full pl-4 pr-4 py-2 border rounded-full" />
          <Search className="absolute right-5 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">User name</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Downloaded Files</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Documents</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Added On</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-500">{user.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{user.downloadedFiles}</td>
                  <td className="px-4 py-4 text-sm">{user.documents}</td>
                  <td className="px-4 py-4 text-sm">{user.addedOn}</td>
                  <td className="px-4 py-4 text-sm">
                    <Link href={`/dashboard/users/${user.id}`} className="text-[#2A3356] hover:underline font-medium">
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                1
              </div>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Total : 01 Pages
            </div>
          </div>
      </div>
    </div>
  )
}
