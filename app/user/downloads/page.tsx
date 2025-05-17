"use client"
import { useState, useEffect } from "react"
import { Search, Trash2, Download, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { documentService } from "@/app/services/api"

interface DownloadedBy {
  name: string;
  email: string;
}

interface Download {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  downloaded: boolean;
  createdAt: string;
  downloadedBy?: DownloadedBy;
  downloadUrl?: string;
}

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [downloads, setDownloads] = useState<Download[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")
  const [showViewerDialog, setShowViewerDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [documentToView, setDocumentToView] = useState<Download | null>(null)
  const [documentToDelete, setDocumentToDelete] = useState<Download | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const getReadableFileType = (mimeType: string) => {
    const typeMap: { [key: string]: string } = {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
      'application/vnd.ms-excel': 'XLS',
      'application/pdf': 'PDF',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
      'application/vnd.ms-powerpoint': 'PPT',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
      'text/plain': 'TXT',
      'image/jpeg': 'JPG',
      'image/png': 'PNG',
      'image/gif': 'GIF',
      'application/zip': 'ZIP',
      'application/x-rar-compressed': 'RAR'
    }
    return typeMap[mimeType] || mimeType.split('/').pop()?.toUpperCase() || 'Unknown'
  }

  useEffect(() => {
    const email = localStorage.getItem('verificationEmail') || 'N/A'
    setUserEmail(email)
    fetchDownloads()
  }, [currentPage])

  const fetchDownloads = async () => {
    try {
      setLoading(true)
      const response = await documentService.getDownloadedDocuments(currentPage, 5)
      // Add downloadedBy information to each document
      const documentsWithUser = response.data.documents.map((doc: Download) => ({
        ...doc,
        downloadedBy: {
          name: 'You',
          email: userEmail
        }
      }))
      setDownloads(documentsWithUser)
      setTotalPages(response.data.pagination.pages)
    } catch (error) {
      console.error('Error fetching downloads:', error)
    } finally {
      setLoading(false)
    }
  }

  const openViewerDialog = async (document: Download) => {
    try {
      const response = await documentService.downloadDocument(document.id)
      setDocumentToView({
        ...document,
        downloadUrl: response.data.downloadUrl
      })
      setShowViewerDialog(true)
    } catch (error) {
      console.error('Error opening document:', error)
    }
  }

  const closeViewerDialog = () => {
    setShowViewerDialog(false)
    setDocumentToView(null)
  }

  const openDeleteDialog = (document: Download) => {
    setDocumentToDelete(document)
    setShowDeleteDialog(true)
  }

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false)
    setDocumentToDelete(null)
  }

  const handleDelete = async () => {
    if (!documentToDelete) return
    
    try {
      setIsDeleting(true)
      await documentService.softDeleteDocument(documentToDelete.id)
      fetchDownloads() // Refresh the list after deletion
      closeDeleteDialog()
    } catch (error) {
      console.error('Error removing document from downloads:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const filteredDownloads = downloads.filter(download => 
    download.fileName.toLowerCase().includes(searchQuery.toLowerCase())
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
                setCurrentPage(1);
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
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black hidden md:table-cell">Uploaded By</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black hidden md:table-cell">File Type</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black hidden md:table-cell">Uploaded On</th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center">Loading...</td>
                </tr>
              ) : filteredDownloads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center">No downloads found</td>
                </tr>
              ) : (
                filteredDownloads.map((download, index) => (
                  <tr key={download.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-xs sm:text-sm">{index + 1}</td>
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
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">Y</span>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium">You</p>
                          <p className="text-xs text-black">{userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs sm:text-sm hidden md:table-cell">{getReadableFileType(download.fileType)}</td>
                    <td className="px-4 py-4 text-xs sm:text-sm hidden md:table-cell">
                      {new Date(download.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-xs sm:text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openViewerDialog(download)}
                          className="text-[#2A3356] hover:text-[#1f2645] transition"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteDialog(download)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                {currentPage}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm text-black">
              Total: {totalPages} Pages
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer Dialog */}
      {showViewerDialog && documentToView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full h-[90vh] max-w-6xl flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{documentToView.fileName}</h2>
              <button onClick={closeViewerDialog} className="text-black hover:text-black">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              {documentToView.fileType.includes('pdf') ? (
                <iframe
                  src={documentToView.downloadUrl}
                  className="w-full h-full"
                  title="PDF Viewer"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    Excel files can only be downloaded. Please use the download button.
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  if (!documentToView.downloadUrl) return;
                  const link = document.createElement('a')
                  link.href = documentToView.downloadUrl
                  link.download = documentToView.fileName
                  link.target = '_blank'
                  link.rel = 'noopener noreferrer'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
                className="w-full py-2 bg-[#2A3356] hover:bg-[#1f2645] text-white font-medium rounded-full"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && documentToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Remove from Downloads</h2>
              <p className="text-gray-600">
                Are you sure you want to remove "{documentToDelete.fileName}" from your downloads? You can still access it from your documents.
              </p>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={closeDeleteDialog}
                disabled={isDeleting}
                className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Removing...
                  </div>
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
