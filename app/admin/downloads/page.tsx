"use client"
import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
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
  downloadedBy: DownloadedBy;
}

interface ApiResponse {
  status: string;
  data: {
    documents: Download[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [downloads, setDownloads] = useState<Download[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalDownloads, setTotalDownloads] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDownloads()
  }, [currentPage])

  const fetchDownloads = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await documentService.getAllDownloadedDocuments(currentPage, 5)
      console.log('API Response:', response)
      
      if (response && typeof response === 'object' && 'data' in response) {
        const apiResponse = response as ApiResponse
        if (apiResponse.data?.documents && Array.isArray(apiResponse.data.documents)) {
          setDownloads(apiResponse.data.documents)
          setTotalPages(apiResponse.data.pagination.pages)
          setTotalDownloads(apiResponse.data.pagination.total)
        } else {
          setError("Invalid response format: documents array is missing")
        }
      } else {
        setError("Invalid response format from server")
      }
    } catch (error) {
      console.error('Error fetching downloads:', error)
      setError(error instanceof Error ? error.message : "Failed to fetch downloads")
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

  const filteredDownloads = downloads.filter(download => 
    download.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (error) {
    return (
      <div className="p-8">
        <div className="text-red-500">{error}</div>
        <button 
          onClick={() => fetchDownloads()} 
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
      <h1 className="text-3xl font-bold mb-2">Downloads</h1>
      <p className="text-black mb-8">Total Downloads : {totalDownloads}</p>

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
        ) : filteredDownloads.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No downloads found
          </div>
        ) : (
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
                {filteredDownloads.map((download, index) => (
                  <tr key={download.id}>
                    <td className="px-4 py-4 text-sm">{(currentPage - 1) * 5 + index + 1}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Image src="/File.png" alt="File icon" width={15} height={15}/>
                        {download.fileName}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">{download.downloadedBy.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{download.downloadedBy.name}</p>
                          <p className="text-xs text-black">{download.downloadedBy.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{download.fileType}</td>
                    <td className="px-4 py-4 text-sm">
                      {download.createdAt ? new Date(download.createdAt).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-red-500">
                        <Image src="/Delete.png" alt="Delete" width={15} height={15}/>
                      </button>
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
    </div>
  )
}
