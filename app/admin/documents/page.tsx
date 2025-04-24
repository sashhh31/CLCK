"use client"
import { Search, ChevronLeft, ChevronRight, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function DocumentsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")

  const documents = [
    {
      id: "01",
      fileName: "testing file.pdf",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "PDF",
      uploadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      uploadedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
      fileType: "XLSX",
      uploadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      uploadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "DOCX",
      uploadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "CSV",
      uploadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "05",
      fileName: "Payroll_Record_Feb_2025.csv",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "PDF",
      uploadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "06",
      fileName: "Annual_Report_2023.pdf",
      uploadedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
      fileType: "PDF",
      uploadedOn: "Apr 8, 2024 11:45 AM",
    },
    {
      id: "07",
      fileName: "Marketing_Budget.xlsx",
      uploadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "XLSX",
      uploadedOn: "Apr 7, 2024 03:20 PM",
    },
    {
      id: "08",
      fileName: "Client_Contracts_2024.zip",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "ZIP",
      uploadedOn: "Apr 5, 2024 09:10 AM",
    },
  ]

  const itemsPerPage = 5;
  const filteredDocuments = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-2">Uploaded Documents</h1>
      <p className="text-black mb-8">Total Documents: {documents.length}</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="flex justify-between mb-6">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-5 pr-4 py-2 border rounded-full" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <Search className="absolute right-5 top-2.5 h-5 w-5 text-black" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Sr No</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">File Name</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Uploaded By</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">File type</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Uploaded On</th>
                <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedDocuments.map((document) => (
                <tr key={document.id}>
                  <td className="px-4 py-4 text-sm">{document.id}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Image src={"../File.png"} alt={""} width={15} height={15}/>
                      {document.fileName}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {document.uploadedBy.avatar ? (
                        <img
                          src={document.uploadedBy.avatar || "/placeholder.svg"}
                          alt={document.uploadedBy.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">{document.uploadedBy.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{document.uploadedBy.name}</p>
                        <p className="text-xs text-black">{document.uploadedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{document.fileType}</td>
                  <td className="px-4 py-4 text-sm">{document.uploadedOn}</td>
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

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center">
            <button 
              className={`p-1 rounded-md ${currentPage > 1 ? 'text-black hover:bg-gray-100' : 'text-black cursor-not-allowed'}`}
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium rounded-full ${
                  currentPage === page
                    ? 'text-white bg-blue-800'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              className={`p-1 rounded-md ${currentPage < totalPages ? 'text-black hover:bg-gray-100' : 'text-black cursor-not-allowed'}`}
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="text-sm text-black">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  )
}
