"use client"
import { useEffect, useState, useRef } from "react";
import { Upload, X, Trash2, Search, ChevronLeft, ChevronRight, FileText, Check, Loader2, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { documentService } from "../services/api";

export default function DocumentsPage() {
  const [showUploadDialog, setShowUploadDialog] = useState<Boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewerDialog, setShowViewerDialog] = useState(false);
  const [fileName, setFileName] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [documentToDelete, setDocumentToDelete] = useState<any>(null);
  const [documentToView, setDocumentToView] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, scanning, uploading, success
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    const email = localStorage.getItem('verificationEmail');
    setUserEmail(email || '');
  }, []);

  const formatFileType = (fileType: string) => {
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('spreadsheetml')) return 'Excel';
    if (fileType.includes('wordprocessingml')) return 'Word';
    if (fileType.includes('presentationml')) return 'PowerPoint';
    if (fileType.includes('image')) return 'Image';
    return fileType.split('/').pop()?.toUpperCase() || fileType;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    fetchDocuments();
  }, [currentPage]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentService.listDocuments();
      console.log(response);
      setDocuments(response.data.documents);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch documents");
      setLoading(false);
    }
  };
  console.log(documents);

  const openUploadDialog = () => {
    setShowUploadDialog(true);
    setUploadStatus("idle");
    setSelectedFile(null);
    setFileName("");
  };

  const closeUploadDialog = () => {
    setShowUploadDialog(false);
    setFileName("");
    setSelectedFile(null);
    setUploadStatus("idle");
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!allowedTypes.includes(file.type)) {
        setError("Only PDF and XLSX files are allowed");
        return;
      }

      // Check file size (20MB)
      if (file.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB");
        return;
      }

      setSelectedFile(file);
      setFileName(file.name.split('.')[0]);
      setError("");
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!selectedFile || !fileName.trim()) {
      return;
    }
    
    try {
      setUploadStatus("scanning");
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('fileName', fileName);

      setUploadStatus("uploading");
      console.log(formData.get('file'));
      console.log(formData.get('fileName'));
      await documentService.upload(formData);

      setUploadStatus("success");
      fetchDocuments();
      
      setTimeout(() => {
        closeUploadDialog();
      }, 1500);
    } catch (error) {
      setError("Failed to upload document");
      setUploadStatus("idle");
    }
  };

  const openDeleteDialog = (document:any) => {
    setDocumentToDelete(document);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDocumentToDelete(null);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await documentService.deleteDocument(documentToDelete.id);
      fetchDocuments();
      closeDeleteDialog();
    } catch (error) {
      setError("Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  const openViewerDialog = async (document:any) => {
      const response = await documentService.downloadDocument(document.id);
      console.log(response);
      setDocumentToView({
        ...document,
        downloadUrl: response.data.downloadUrl
      });
      setShowViewerDialog(true);
    
  };

  const closeViewerDialog = () => {
    setShowViewerDialog(false);
    setDocumentToView(null);
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

  const renderUploadContent = () => {
    if (uploadStatus === "idle") {
      return (
        <>
          <div className="mb-4 text-[#2A3356]">
            <Upload className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
          <p className="text-black text-center text-sm mb-4">
            Document type should be PDF or XLSX and up to file size 20MB.
          </p>
          
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <Button 
            onClick={handleBrowseClick}
            className="bg-[#2A3356] hover:bg-[#1f2645] text-white font-medium rounded-lg px-6 py-2"
          >
            Browse Files
          </Button>

          {selectedFile && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={() => setSelectedFile(null)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </>
      );
    } else if (uploadStatus === "scanning") {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-t-[#2A3356] border-r-[#2A3356] border-b-gray-200 border-l-gray-200 animate-spin mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="h-6 w-6 text-[#2A3356]" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Scanning Document</h3>
          <p className="text-black text-center text-sm">
            Checking file for viruses and malware...
          </p>
        </div>
      );
    } else if (uploadStatus === "uploading") {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-16 w-16 text-[#2A3356] animate-spin mb-4" />
          <h3 className="text-xl font-semibold mb-2">Uploading Document</h3>
          <p className="text-black text-center text-sm">
            Uploading {selectedFile.name}...
          </p>
          <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5">
            <div className="bg-[#2A3356] h-2.5 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      );
    } else if (uploadStatus === "success") {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload Complete</h3>
          <p className="text-black text-center text-sm">
            Your document has been uploaded successfully!
          </p>
        </div>
      );
    }
  };

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
            className="flex items-center bg-[#2A3356] hover:bg-[#1f2645] text-white h-10 px-4 py-2 rounded-lg"
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
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">File Type</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Uploaded By</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Added On</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#2A3356]" />
                    </td>
                  </tr>
                ) : error || documents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Image 
                          src="/noDocumentsAvailable.png" 
                          alt="No Documents Available" 
                          width={200} 
                          height={200}
                          className="mb-4"
                        />
                        <p className="text-gray-500">
                          {error || "No documents found. Upload your first document!"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedDocuments.map((document, index) => {
                    const isEvenRow = index % 2 === 0;
                    const rowBg = isEvenRow ? 'bg-white' : 'bg-gray-50';

                    return (
                      <tr key={document.id} className={`transition hover:bg-gray-200 ${rowBg}`}>
                        <td className="px-4 py-3 text-xs sm:text-sm text-black">{index + 1}</td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-black">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 flex-shrink-0">
                              <Image src="/File.png" alt="" height={15} width={15} className="object-contain" />
                            </div>
                            <span className="truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">{document.fileName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                              {formatFileType(document.fileType)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">
                          <div className="flex flex-col">
                            <span className="font-medium">You</span>
                            <span className="text-gray-500 text-xs">{userEmail}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">
                          {formatDate(document.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-xs sm:text-sm">
                          <div className="flex space-x-2">
                            <button 
                              className="text-[#2A3356] hover:text-[#1f2645] transition"
                              onClick={() => openViewerDialog(document)}
                            >  <Download className="h-4 w-4" />
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700 transition"
                              onClick={() => openDeleteDialog(document)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div className="px-6 py-4 flex-row justify-self-center gap-7 items-center  border-t border-gray-200">
              <div className="flex items-center mb-3 space-x-4">
                <button 
                  className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full
                        ${currentPage === page ? 'text-white bg-[#2A3356]' : 'text-black hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

            </div>

              <div className="text-right text-sm mr-5 items-center justify-center text-black">
                Total: {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload File Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Upload File</h2>
              <button onClick={closeUploadDialog} className="text-black hover:text-black">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 mb-6 flex flex-col items-center justify-center">
              {renderUploadContent()}
            </div>

            {uploadStatus === "idle" && (
              <>
                <div className="mb-6">
                  <label htmlFor="fileName" className="block text-lg font-medium mb-2">
                    File Name
                  </label>
                  <input
                    type="text"
                    id="fileName"
                    placeholder="Enter file name"
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!selectedFile || !fileName.trim()}
                  className="w-full py-3 bg-[#2A3356] hover:bg-[#1f2645] text-white font-medium rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Upload
                </Button>
              </>
            )}
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
              <h2 className="text-xl font-bold mb-2">Delete Document</h2>
              <p className="text-gray-600">
                Are you sure you want to delete "{documentToDelete.fileName}"? This action cannot be undone.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={closeDeleteDialog}
                disabled={isDeleting}
                className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
              <Button
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
              </Button>
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
              {documentToView.fileType === 'application/pdf' ? (
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
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = documentToView.downloadUrl;
                link.download = documentToView.fileName;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                // Force download by setting Content-Disposition header
                fetch(documentToView.downloadUrl)
                  .then(response => response.blob())
                  .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  });
              }}
              className="w-full py-2 bg-[#2A3356] hover:bg-[#1f2645] text-white font-medium rounded-full"
            >
              Download
            </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}