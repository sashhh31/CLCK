"use client"
import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Trash2, Download, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { documentService } from "@/app/services/api"

interface User {
  name: string;
  email: string;
}

interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  downloaded: boolean;
  createdAt: string;
  uploadedBy: User;
  owner: User;
  downloadUrl?: string;
}

interface ApiResponse {
  status: string;
  data: {
    documents: Document[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

// Helper function to format file type
const formatFileType = (fileType: string) => {
  const typeMap: { [key: string]: string } = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
    'application/vnd.ms-excel': 'Excel',
    'application/pdf': 'PDF',
    'application/msword': 'Word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
    'application/vnd.ms-powerpoint': 'PowerPoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint',
    'text/plain': 'Text',
    'image/jpeg': 'Image',
    'image/png': 'Image',
    'image/gif': 'Image',
    'application/zip': 'ZIP',
    'application/x-rar-compressed': 'RAR'
  }
  return typeMap[fileType] || fileType.split('/').pop()?.toUpperCase() || 'Unknown'
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [documents, setDocuments] = useState<Document[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalDocuments, setTotalDocuments] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showViewerDialog, setShowViewerDialog] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [documentToView, setDocumentToView] = useState<Document | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [currentPage])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await documentService.getAllDocuments(currentPage, 5)
      console.log('API Response:', response)
      
      if (response && typeof response === 'object' && 'data' in response) {
        const apiResponse = response as ApiResponse
        console.log('API Response:', apiResponse)
        if (apiResponse.data?.documents && Array.isArray(apiResponse.data.documents)) {
          setDocuments(apiResponse.data.documents)
          setTotalPages(apiResponse.data.pagination.pages)
          setTotalDocuments(apiResponse.data.pagination.total)
        } else {
          setError("Invalid response format: documents array is missing")
        }
      } else {
        setError("Invalid response format from server")
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      setError(error instanceof Error ? error.message : "Failed to fetch documents")
    } finally {
      setLoading(false)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const filteredDocuments = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openDeleteDialog = (document: Document) => {
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
      await documentService.deleteDocument(documentToDelete.id)
      fetchDocuments() // Refresh the list after deletion
      closeDeleteDialog()
    } catch (error) {
      console.error('Error deleting document:', error)
      setError(error instanceof Error ? error.message : "Failed to delete document")
    } finally {
      setIsDeleting(false)
    }
  }

  const openViewerDialog = async (document: Document) => {
    try {
      const response = await documentService.downloadDocument(document.id)
      setDocumentToView({
        ...document,
        downloadUrl: response.data.downloadUrl
      })
      setShowViewerDialog(true)
    } catch (error) {
      console.error('Error opening document:', error)
      setError(error instanceof Error ? error.message : "Failed to open document")
    }
  }

  const closeViewerDialog = () => {
    setShowViewerDialog(false)
    setDocumentToView(null)
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-red-500">{error}</div>
        <button 
          onClick={() => fetchDocuments()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-2">Documents</h1>
      <p className="text-black mb-8">Total Documents : {totalDocuments}</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-6 pr-4 py-2 border rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-black" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No documents found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Sr No</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">File Name</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Uploaded By</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">File type</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Uploaded On</th>
                  <th className="px-4 py-3 text-left text-base font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDocuments.map((doc, index) => (
                  <tr key={doc.id}>
                    <td className="px-4 py-4 text-sm">{(currentPage - 1) * 5 + index + 1}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Image src="/File.png" alt="File icon" width={15} height={15}/>
                        {doc.fileName}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">{doc.uploadedBy.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.uploadedBy.name}</p>
                          <p className="text-xs text-black">{doc.uploadedBy.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                          {formatFileType(doc.fileType)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {formatDate(doc.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openViewerDialog(doc)}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteDialog(doc)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
              {currentPage}
            </div>
            <button 
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
              onClick={handleNextPage}
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

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && documentToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Delete Document</h2>
              <p className="text-gray-600">
                Are you sure you want to delete "{documentToDelete.fileName}"? This action cannot be undone.
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
                    Deleting...
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
                  const link = document.createElement('a');
                  link.href = documentToView.downloadUrl;
                  link.download = documentToView.fileName;
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-full"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
