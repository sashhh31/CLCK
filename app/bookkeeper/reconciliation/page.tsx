import { Search, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function ReconciliationPage() {
  const uploads = [
    {
      id: "01",
      fileName: "testing file.pdf",
      UploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "PDF",
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      UploadedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
      fileType: "XLSX",
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      UploadedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "DOCX",
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      UploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "CSV",
    },
    {
      id: "05",
      fileName: "Payroll_Record_Feb_2025.csv",
      UploadedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      fileType: "PDF",
    },
  ];

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-2">Reconciliation</h1>
      <p className="text-black mb-8">Total Documents : 120</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-6 pr-4 py-2 border rounded-full"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-black" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-base font-medium text-black">
                  Sr No
                </th>
                <th className="px-4 py-3 text-left text-base font-medium text-black">
                  File Name
                </th>
                <th className="px-4 py-3 text-left text-base font-medium text-black">
                  Uploaded By
                </th>
                <th className="px-4 py-3 text-left text-base font-medium text-black">
                  Uploaded On
                </th>
                <th className="px-4 py-3 text-left text-base font-medium text-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {uploads.map((upload) => (
                <tr key={upload.id}>
                  <td className="px-4 py-4 text-sm">{upload.id}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"../File.png"}
                        alt={""}
                        width={15}
                        height={15}
                      />
                      {upload.fileName}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {upload.UploadedBy.avatar ? (
                        <img
                          src={upload.UploadedBy.avatar || "/placeholder.svg"}
                          alt={upload.UploadedBy.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">
                            {upload.UploadedBy.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {upload.UploadedBy.name}
                        </p>
                        <p className="text-xs text-black">
                          {upload.UploadedBy.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{upload.fileType}</td>
                  <td className="text-sm underline text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-red-500">
                        <Image
                          src="/Delete.png"
                          alt="Delete"
                          width={15}
                          height={15}
                        />
                      </button>
                      <Link href={`./reconciliation/${upload.id}`}>
                      <span>View User Details</span>
                      </Link>                       </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
          <div className="flex items-center">
            <button className="p-1 rounded-md hover:bg-gray-100">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
              1
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="text-sm text-black">Total : 01 Pages</div>
        </div>
      </div>
    </div>
  );
}
