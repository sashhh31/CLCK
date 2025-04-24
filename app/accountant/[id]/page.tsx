"use client"
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Trash2, Upload, Mail, Plus, X, Paperclip, Info } from "lucide-react";
import Link from "next/link";

export default function UserDetailPage() {
  const [activeTab, setActiveTab] = useState("documents");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const files = [
    {
      id: "01",
      name: "testing file.pdf",
      type: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "02",
      name: "Tax_Report_2024.pdf",
      type: "XLSX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "03",
      name: "Invoice_March_2025.xlsx",
      type: "DOCX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "04",
      name: "Bookkeeping_Template.docx",
      type: "CSV",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "05",
      name: "Payroll_Record_Feb_2025.csv",
      type: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
  ];

  const subscriptions = [
    {
      id: "01",
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Current"
    },
    {
      id: "02",
      plan: "Professional",
      duration: "Yearly",
      charges: "£ 100",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Current"
    },
    {
      id: "03",
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Past"
    },
    {
      id: "04",
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Current"
    },
    {
      id: "05",
      plan: "Enterpreneur",
      duration: "Monthly",
      charges: "£ 90",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Past"
    }
  ];

  const emails = [
    {
      id: "01",
      subject: "Request To Upload Document",
      email: "Hi, Tristirue nulla aliquet enim tortor at auctor urnanmassa enim nec dui nunc mattis enim ut tellsunaute irure repraeen. enim tortor at auctor urnanmassa. irure repraeen. enim tortor at auctor urnanmassa.",
      attachedDoc: "testing file.pdf, Mytesting file.Docx",
      sentOn: "Apr 10, 2024 09:20 AM"
    },
    {
      id: "02",
      subject: "Request To Upload Document",
      email: "Hi, enim tortor at auctor urnanmassa. irure repraeen. enim tortor at auctor urnanmassa.",
      attachedDoc: "Mytesting file.Docx",
      sentOn: "Apr 10, 2024 09:20 AM"
    },
    {
      id: "03",
      subject: "Request To Upload Document",
      email: "Hi, enim tortor at auctor urnanmassa. irure repraeen. enim tortor at auctor urnanmassa.",
      attachedDoc: "Mytesting file.Docx",
      sentOn: "Apr 10, 2024 09:20 AM"
    }
  ];

  const handleDeleteClick = (file:any) => {
    setSelectedFile(file);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Handle delete functionality here
    setShowDeleteDialog(false);
    setSelectedFile(null);
  };

  const renderContent = () => {
    switch(activeTab) {
     case "emails":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border rounded-full" />
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
                      <td className="px-4 py-4 text-sm max-w-xs truncate">{email.email}</td>
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
                          {email.attachedDoc}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{email.sentOn}</td>
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
                <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border rounded-full" />
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Sr No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">File Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">File type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Uploaded On</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-black">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {files.map((file) => (
                    <tr key={file.id}>
                      <td className="px-4 py-4 text-sm">{file.id}</td>
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
                          {file.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{file.type}</td>
                      <td className="px-4 py-4 text-sm">{file.downloadedOn}</td>
                      <td className="px-4 py-4 text-sm">
                        <button 
                          className="text-red-500"
                          onClick={() => handleDeleteClick(file)}
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
              <img src="/placeholder.svg?height=40&width=40" alt="User" className="h-24 w-24 rounded-full mb-4" />
              <h2 className="text-xl font-bold">Alexender Alex</h2>
              <p className="text-sm text-black">admin@AK.Trading.com</p>
            </div>

            <div className="text-sm text-black mb-4">Added On : Apr 10, 2024</div>

            <div className="space-y-2">
            
              
              <button 
                className={`flex items-center justify-between w-full p-3 rounded-md ${activeTab === "documents" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("documents")}
              >
                <span>Documents</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              
        
              
              <button 
                className={`flex items-center justify-between w-full p-3 rounded-md ${activeTab === "emails" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}
                onClick={() => setActiveTab("emails")}
              >
                <span>Emails</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button className="flex items-center justify-center w-full mt-6 p-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </button>
          </div>

          <div className="md:col-span-3 bg-white rounded-lg shadow-sm p-6">
            {renderContent()}

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

      {/* Upload Document Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-8">Upload File</h2>
              <div className="mb-6">
              <div className="mb-6 relative">
  <label className="block text-sm font-medium mb-2">File Type</label>
  <div className="relative">
    <select
      className="w-full p-3 border border-gray-300 rounded-full bg-white text-sm text-gray-700 appearance-none pr-10"
      defaultValue=""
    >
      <option value="" disabled>Select a file type</option>
      <option value="financial-reporting">Financial Reporting</option>
      <option value="budget-forecasting">Budget and Forecasting</option>
      <option value="tax-preparation">Tax Preparation</option>
      <option value="advanced-invoicing">Advanced Invoicing</option>
    </select>
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>

</div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">File Name</label>
                <input 
                  type="text" 
                  placeholder="Enter enter" 
                  className="w-full p-3 border border-gray-300 rounded-full"
                />
              </div>
              <div className="border border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center mb-6">
                <Upload className="h-12 w-12 text-blue-900 mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Upload File</h3>
                <p className="text-sm text-black text-center">
                  Document type should be PDF, XLSX, DOCX etc and upto file size 20MB
                </p>
              </div>
              
              
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 py-3 bg-gray-200 rounded-full font-medium"
                  onClick={() => setShowUploadDialog(false)}
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-blue-900 text-yellow-300 rounded-full font-medium">
                  Add
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
                  onClick={confirmDelete}
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
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <textarea 
                  placeholder="Enter message" 
                  className="w-full p-3 border border-gray-300 rounded-xl h-32"
                ></textarea>
              </div>
              
              <button className="flex items-center w-full p-3 border border-gray-300 rounded-full mb-6">
                <Paperclip className="h-5 w-5 mr-2 text-black" />
                <span className="text-black">Attach document</span>
              </button>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 py-3 bg-gray-200 rounded-full font-medium"
                  onClick={() => setShowEmailDialog(false)}
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 bg-blue-900 text-yellow-300 rounded-full font-medium">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}