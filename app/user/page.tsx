"use client"
import { useState } from "react";
import { Upload, X,Trash2 } from "lucide-react";

export default function DocumentsPage() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [fileName, setFileName] = useState("");
  const documents = [
    {
      id: "01",
      fileName: "testing file.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      fileType: "XLSX",
      addedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      fileType: "DOCX",
      addedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "05",
      fileName: "Financial_Summary_2024.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "06",
      fileName: "Payroll_Record_Feb_2025.csv",
      fileType: "CSV",
      addedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "07",
      fileName: "Subscription_Invoice_#12345.pdf",
      fileType: "PDF",
      addedOn: "Apr 10, 2024 09:20 AM",
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

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <div className="border-t-2 mt-16"></div>
      <div className="bg-white rounded-xl p-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Uploaded Documents</h1>
          <div className="flex gap-7">
            <div className="relative w-xs md:max-w-xs h-10">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
              />
            </div>
            <button 
              className="flex items-center bg-[#2A3356] hover:bg-[#1f2645] text-[#F0D687] px-4 py-2 rounded-lg shadow"
              onClick={openUploadDialog}
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border-2 pb-10 bg-gray-100">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left text-lg text-gray-800">
                <th className="px-4 py-3 font-medium">Sr No.</th>
                <th className="px-4 py-3 font-medium">File Name</th>
                <th className="px-4 py-3 font-medium">File Type</th>
                <th className="px-4 py-3 font-medium">Added On</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((document, index) => {
                const isEvenRow = index % 2 === 0;
                const rowBg = isEvenRow ? 'bg-white' : 'bg-gray-100';

                return (
                  <tr key={document.id} className={`transition hover:bg-gray-200 ${rowBg}`}>
                    <td className="px-4 py-4 text-sm text-gray-700">{document.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-700 flex items-center gap-2">
                      <img src="/api/placeholder/15/15" alt="File icon" className="h-4 w-4" />
                      {document.fileName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{document.fileType}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{document.addedOn}</td>
                    <td className="px-4 py-4 text-sm">
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
        </div>
      </div>

      {/* Upload File Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Upload File</h2>
              <button onClick={closeUploadDialog} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 mb-6 flex flex-col items-center justify-center">
              <div className="mb-4 text-[#2A3356]">
                <Upload className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
              <p className="text-gray-500 text-center text-sm">
                Document type should be PDF, XLSX, DOCX etc and upto file size 20MB
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="fileName" className="block text-lg font-medium mb-2">File Name</label>
              <input
                type="text"
                id="fileName"
                placeholder="Enter file name"
                className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-[#2A3356] hover:bg-[#1f2645] text-white font-medium rounded-full"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Search(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}