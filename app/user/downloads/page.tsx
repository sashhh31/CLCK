"use client"
import { useState } from "react"
import { Search, Trash2, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const downloads = [
    {
      id: "01",
      fileName: "testing file.pdf",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
      downloadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      fileType: "XLSX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
      downloadedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      fileType: "DOCX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
      downloadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      fileType: "CSV",
      downloadedOn: "Apr 10, 2024 09:20 AM",
      downloadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "05",
      fileName: "Payroll_Record_Feb_2025.csv",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
      downloadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "06",
      fileName: "Subscription_Invoice_#12345.pdf",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
      downloadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
    },
  ]

  const itemsPerPage = 5;
  const filteredDownloads = downloads.filter(download => 
    download.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const paginatedDownloads = filteredDownloads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Downloaded Files</h1>
      <p className="text-black mb-8">Total Downloads: {downloads.length}</p>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:max-w-md">
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full pl-5 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-black" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black">Sr No</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black">File Name</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black hidden md:table-cell">Downloaded By</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black hidden md:table-cell">File Type</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black hidden md:table-cell">Downloaded On</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedDownloads.map((download) => (
                <tr key={download.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-xs sm:text-sm">{download.id}</td>
                  <td className="px-4 py-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 flex-shrink-0">
                        <Image 
                          src="/File.png" 
                          alt="" 
                          height={15} 
                          width={15} 
                          className="object-contain"
                        />
                      </div>
                      <span className="truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">{download.fileName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex items-center">
                      {download.downloadedBy.avatar ? (
                        <img
                          src={download.downloadedBy.avatar}
                          alt={download.downloadedBy.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">{download.downloadedBy.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-medium">{download.downloadedBy.name}</p>
                        <p className="text-xs text-black">{download.downloadedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs sm:text-sm hidden md:table-cell">{download.fileType}</td>
                  <td className="px-4 py-4 text-xs sm:text-sm hidden md:table-cell">{download.downloadedOn}</td>
                  <td className="px-4 py-4 text-xs sm:text-sm">
                    <div className="flex space-x-2">
                      <button className="text-red-500 hover:text-red-700 transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-[#2A3356] hover:text-[#1f2645] transition">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
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
            <div className="text-sm text-black">
              Total : 01 Pages
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
