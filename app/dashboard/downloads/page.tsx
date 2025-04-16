import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import Image from "next/image"
export default function DownloadsPage() {
  const downloads = [
    {
      id: "01",
      fileName: "testing file.pdf",
      downloadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      downloadedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
      fileType: "XLSX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      downloadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "DOCX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      downloadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "CSV",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "05",
      fileName: "Payroll_Record_Feb_2025.csv",
      downloadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
  ]

  return (
    <div className="p-8">
                     <div className="border-t-2 mt-14"></div>
      <h1 className="text-3xl font-bold mb-2">Downloads</h1>
      <p className="text-gray-500 mb-8">Total Downloads : 120</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input type="text" placeholder="Search" className="w-full pl-6 pr-4 py-2 border rounded-full" />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Sr No</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">File Name</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Downloaded By</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">File type</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Downloaded On</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {downloads.map((download) => (
                <tr key={download.id}>
                  <td className="px-4 py-4 text-sm">{download.id}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                    <Image src={"../File.png"} alt={""} width={15} height={15}/>
                    {download.fileName}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {download.downloadedBy.avatar ? (
                        <img
                          src={download.downloadedBy.avatar || "/placeholder.svg"}
                          alt={download.downloadedBy.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-500">{download.downloadedBy.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{download.downloadedBy.name}</p>
                        <p className="text-xs text-gray-500">{download.downloadedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{download.fileType}</td>
                  <td className="px-4 py-4 text-sm">{download.downloadedOn}</td>
                  <td className="px-4 py-4 text-sm">
                    <button className="text-red-500">
                    <Image src={"../Delete.png"} alt={""} width={15} height={15}/>
                    </button>
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
