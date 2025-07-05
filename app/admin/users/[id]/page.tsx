"use client"
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Trash2, Upload, Mail, Plus, X, Paperclip, Info } from "lucide-react";
import { useParams } from "next/navigation";
import { adminService, AdminUser, AdminDocument, AdminEmail } from "@/app/services/api";

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("downloads");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<AdminDocument | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [downloadedFiles, setDownloadedFiles] = useState<AdminDocument[]>([]);
  const [emails, setEmails] = useState<AdminEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  // Form states
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailAttachments, setEmailAttachments] = useState<File[]>([]);
  const [uploadFileName, setUploadFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Add state for delete and ban/unban dialogs
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isBanningUser, setIsBanningUser] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await adminService.getUserDetails(userId);
      setUser(response.data.user as AdminUser);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchDocuments = async (page = 1) => {
    try {
      const response = await adminService.getUserDocuments(userId, page);
      setDocuments(response.data.documents as AdminDocument[]);
      setTotalPages(response.data.pagination.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const fetchDownloadedFiles = async (page = 1) => {
    try {
      const response = await adminService.getUserDownloadedFiles(userId, page);
      setDownloadedFiles(response.data.documents as AdminDocument[]);
      setTotalPages(response.data.pagination.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching downloaded files:", error);
    }
  };

  const fetchEmails = async (page = 1) => {
    try {
      const response = await adminService.getUserEmails(userId, page);
      setEmails(response.data.emails as AdminEmail[]);
      setTotalPages(response.data.pagination.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    switch (activeTab) {
      case "downloads":
        fetchDownloadedFiles();
        break;
      case "documents":
        fetchDocuments();
        break;
      case "emails":
        fetchEmails();
        break;
    }
    setLoading(false);
  }, [activeTab, userId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEmailAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEmailAttachments(Array.from(e.target.files));
    }
  };

  const handleUploadDocument = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("fileName", uploadFileName || selectedFile.name);

    try {
      await adminService.uploadDocument(userId, formData);
      setShowUploadDialog(false);
      setSelectedFile(null);
      setUploadFileName("");
      fetchDocuments();
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailSubject || !emailMessage) return;
    setIsSendingEmail(true);

    const formData = new FormData();
    formData.append("subject", emailSubject);
    formData.append("message", emailMessage);
    formData.append("userId", userId);
    emailAttachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      await adminService.sendEmail(formData);
      setShowEmailDialog(false);
      setEmailSubject("");
      setEmailMessage("");
      setEmailAttachments([]);
      fetchEmails();
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      await adminService.deleteDocument(documentId);
      setShowDeleteDialog(false);
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      switch (activeTab) {
        case "downloads":
          fetchDownloadedFiles(newPage);
          break;
        case "documents":
          fetchDocuments(newPage);
          break;
        case "emails":
          fetchEmails(newPage);
          break;
      }
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    setIsDeletingUser(true);
    try {
      await adminService.deleteUser(userId);
      setShowDeleteUserDialog(false);
      // Redirect to users list after deletion
      window.location.href = '/admin/users';
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeletingUser(false);
    }
  };

  // Handle ban/unban user
  const handleBanUnbanUser = async () => {
    setIsBanningUser(true);
    try {
      await adminService.banUser(userId);
      setShowBanDialog(false);
      fetchUserDetails(); // Refresh user info
    } catch (error) {
      console.error('Error banning/unbanning user:', error);
    } finally {
      setIsBanningUser(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "downloads":
        return (
          <>
            <div className="relative w-full max-w-md mb-6">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">File Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">File type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Downloaded On</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {downloadedFiles.map((file) => (
                    <tr key={file.id}>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 mr-2 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                          {file.fileName}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{file.fileType}</td>
                      <td className="px-4 py-4 text-sm">{new Date(file.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          className="text-red-500"
                          onClick={() => {
                            setSelectedDocument(file);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "documents":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-800 text-white rounded-lg"
                onClick={() => setShowUploadDialog(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">File Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">File type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Uploaded On</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {documents.map((file) => (
                    <tr key={file.id}>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 mr-2 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                          {file.fileName}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{file.fileType}</td>
                      <td className="px-4 py-4 text-sm">{new Date(file.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm">
                        <button
                          className="text-red-500"
                          onClick={() => {
                            setSelectedDocument(file);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "emails":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-800 text-white rounded-lg"
                onClick={() => setShowEmailDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Send Email
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Subject</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Attached Document</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Sent On</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {emails.map((email) => (
                    <tr key={email.id}>
                      <td className="px-4 py-4 text-sm">{email.subject}</td>
                      <td className="px-4 py-4 text-sm max-w-xs truncate">{email.message}</td>
                      <td className="px-4 py-4 text-sm">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 mr-2 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                          {email.attachments.map((att) => att.filename).join(", ")}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{new Date(email.sentAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Users Detail Page</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-2xl text-black">
                  {user?.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold">{user?.email.split('@')[0]}</h2>
              <p className="text-sm text-black">{user?.email}</p>
            </div>

            <div className="text-sm text-black mb-4">
              Added On : {user ? new Date(user.createdAt).toLocaleDateString() : ''}
            </div>

            <div className="space-y-2">
              <button
                className={`flex items-center justify-between w-full p-3 rounded-md ${
                  activeTab === "downloads" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("downloads")}
              >
                <span>Downloads</span>
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                className={`flex items-center justify-between w-full p-3 rounded-md ${
                  activeTab === "documents" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("documents")}
              >
                <span>Documents</span>
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                className={`flex items-center justify-between w-full p-3 rounded-md ${
                  activeTab === "emails" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("emails")}
              >
                <span>Emails</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Ban/Unban User Button */}
            {user && (
              <button
                className={`flex items-center justify-center w-full mt-4 p-2 ${user.status === 'banned' ? 'text-green-600 border border-green-600 hover:bg-green-50' : 'text-yellow-600 border border-yellow-600 hover:bg-yellow-50'} rounded-md`}
                onClick={() => setShowBanDialog(true)}
              >
                {user.status === 'banned' ? 'Unban User' : 'Ban User'}
              </button>
            )}

            {/* Delete User Button */}
            <button
              className="flex items-center justify-center w-full mt-6 p-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
              onClick={() => setShowDeleteUserDialog(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </button>
          </div>

          <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-6">
            {renderContent()}

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
      </div>

      {/* Upload Document Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-8">Add Document</h2>

              <div className="border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center mb-6">
                <Upload className="h-12 w-12 text-blue-900 mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Upload Document</h3>
                <p className="text-sm text-black text-center">
                  Document type should be PDF, XLSX, DOCX etc and upto file size 20MB
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg cursor-pointer"
                >
                  Select File
                </label>
                {selectedFile && (
                  <p className="mt-2 text-sm text-black">{selectedFile.name}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">File Name</label>
                <input
                  type="text"
                  placeholder="Enter file name"
                  className="w-full p-3 border border-gray-300 rounded-full"
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 py-3 bg-gray-200 rounded-full font-medium"
                  onClick={() => setShowUploadDialog(false)}
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 bg-blue-900 text-yellow-300 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleUploadDocument}
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-300 mr-2"></div>
                      Uploading...
                    </div>
                  ) : (
                    'Add'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Document Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6 flex flex-col items-center">
              <div className="bg-blue-900 rounded-full p-4 mb-4">
                <Info className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 mb-2">Delete Document?</h2>
              <p className="text-black text-center mb-8">
                Are you sure you want to Delete This document??
              </p>

              <div className="flex w-full space-x-4">
                <button
                  className="flex-1 py-3 border border-gray-300 rounded-full font-medium"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 bg-blue-900 text-yellow-300 rounded-full font-medium"
                  onClick={() => selectedDocument && handleDeleteDocument(selectedDocument.id)}
                >
                  Yes I am Sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Email Dialog */}
      {showEmailDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Email</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  className="w-full p-3 border border-gray-300 rounded-full"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <textarea
                  placeholder="Enter message"
                  className="w-full p-3 border border-gray-300 rounded-xl h-32"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                ></textarea>
              </div>

              <input
                type="file"
                className="hidden"
                id="email-attachments"
                multiple
                onChange={handleEmailAttachment}
              />
              <label
                htmlFor="email-attachments"
                className="flex items-center w-full p-3 border border-gray-300 rounded-full mb-6 cursor-pointer"
              >
                <Paperclip className="h-5 w-5 mr-2 text-black" />
                <span className="text-black">Attach document</span>
              </label>
              {emailAttachments.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-black">Selected files:</p>
                  <ul className="mt-2">
                    {emailAttachments.map((file, index) => (
                      <li key={index} className="text-sm text-black">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  className="flex-1 py-3 bg-gray-200 rounded-full font-medium"
                  onClick={() => setShowEmailDialog(false)}
                  disabled={isSendingEmail}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 bg-blue-900 text-yellow-300 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendEmail}
                  disabled={isSendingEmail || !emailSubject || !emailMessage}
                >
                  {isSendingEmail ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-300 mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Dialog */}
      {showDeleteUserDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6 flex flex-col items-center">
              <div className="bg-red-500 rounded-full p-4 mb-4">
                <Trash2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-500 mb-2">Delete User?</h2>
              <p className="text-black text-center mb-8">Are you sure you want to delete this user? This action cannot be undone.</p>
              <div className="flex w-full space-x-4">
                <button
                  className="flex-1 py-3 border border-gray-300 rounded-full font-medium"
                  onClick={() => setShowDeleteUserDialog(false)}
                  disabled={isDeletingUser}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDeleteUser}
                  disabled={isDeletingUser}
                >
                  {isDeletingUser ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ban/Unban User Dialog */}
      {showBanDialog && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6 flex flex-col items-center">
              <div className={`rounded-full p-4 mb-4 ${user.status === 'banned' ? 'bg-green-600' : 'bg-yellow-600'}`}> 
                <Info className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{user.status === 'banned' ? 'Unban User?' : 'Ban User?'}</h2>
              <p className="text-black text-center mb-8">
                {user.status === 'banned' ? 'Are you sure you want to unban this user?' : 'Are you sure you want to ban this user?'}
              </p>
              <div className="flex w-full space-x-4">
                <button
                  className="flex-1 py-3 border border-gray-300 rounded-full font-medium"
                  onClick={() => setShowBanDialog(false)}
                  disabled={isBanningUser}
                >
                  Cancel
                </button>
                <button
                  className={`flex-1 py-3 ${user.status === 'banned' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'} rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={handleBanUnbanUser}
                  disabled={isBanningUser}
                >
                  {isBanningUser ? (user.status === 'banned' ? 'Yes, Unban' : 'Yes, Ban') : (user.status === 'banned' ? 'Yes, Unban' : 'Yes, Ban')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}