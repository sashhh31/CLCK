"use client"
import { useState } from "react";
import { Upload, X, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DocumentsPage() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  const documents = [
    {
      id: "01",
      fileName: "testing file.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      fileType: "XLSX",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      fileType: "DOCX",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "05",
      fileName: "Financial_Summary_2024.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "06",
      fileName: "Payroll_Record_Feb_2025.csv",
      fileType: "CSV",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
    },
    {
      id: "07",
      fileName: "Subscription_Invoice_#12345.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
      uploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }
  ];

  const openUploadDialog = () => {
    setShowUploadDialog(true);
  };

  const closeUploadDialog = () => {
    setShowUploadDialog(false);
    setFileName("");
  };

  const handleSubmit = () => {
    // Logic to handle file upload
    closeUploadDialog();
  };

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

  const itemsPerPage = 5;
  const filteredDocuments = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="border-t-2 mt-6 mb-2"></div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Uploaded Documents</h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-black" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-9 pr-4 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
          <Button 
            className="flex items-center bg-[#2A3356] hover:bg-[#1f2645] text-[#F0D687] h-10 px-4 py-2 rounded-lg"
            onClick={openUploadDialog}
          >
            <Upload className="h-4 w-4 mr-2" />
            <span className="text-sm">Upload</span>
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">Sr No.</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">File Name</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Uploaded By</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">File Type</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Added On</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedDocuments.map((document, index) => {
                  const isEvenRow = index % 2 === 0;
                  const rowBg = isEvenRow ? 'bg-white' : 'bg-gray-50';

                  return (
                    <tr key={document.id} className={`transition hover:bg-gray-200 ${rowBg}`}>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black">{document.id}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 flex-shrink-0">
                            <Image src="/File.png" alt="" height={15} width={15} className="object-contain" />
                          </div>
                          <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">{document.fileName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">
                        <div className="flex items-center">
                          {document.uploadedBy.avatar ? (
                            <img
                              src={document.uploadedBy.avatar}
                              alt={document.uploadedBy.name}
                              className="h-8 w-8 rounded-full mr-3"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-black">{document.uploadedBy.name.charAt(0)}</span>
                            </div>
                          )}
                          <div>
                            <p className="text-xs sm:text-sm font-medium">{document.uploadedBy.name}</p>
                            <p className="text-xs text-black">{document.uploadedBy.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">{document.fileType}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">{document.addedOn}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm">
                        <div className="flex space-x-2">
                          <button className="text-red-500 hover:text-red-700 transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-[#2A3356] hover:text-[#1f2645] transition">
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
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
        </CardContent>
      </Card>

     

      {/* Upload File Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Upload File</h2>
              <button onClick={closeUploadDialog} className="text-black hover:text-black">
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-10 mb-4 sm:mb-6 flex flex-col items-center justify-center">
              <div className="mb-4 text-[#2A3356]">
                <Upload className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Upload Document</h3>
              <p className="text-black text-center text-xs sm:text-sm">
                Document type should be PDF, XLSX, DOCX etc and upto file size 20MB
              </p>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <label htmlFor="fileName" className="block text-sm sm:text-lg font-medium mb-2">File Name</label>
              <input
                type="text"
                id="fileName"
                placeholder="Enter file name"
                className="w-full px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            
            <Button
              onClick={handleSubmit}
              className="w-full py-2 bg-[#2A3356] hover:bg-[#1f2645] text-white font-medium rounded-full"
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}