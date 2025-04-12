import { Search, Trash2 } from "lucide-react"
import Image from "next/image";

export default function DownloadsPage() {
  const downloads = [
    {
      id: "01",
      fileName: "testing file.pdf",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "02",
      fileName: "Tax_Report_2024.pdf",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "03",
      fileName: "Invoice_March_2025.xlsx",
      fileType: "XLSX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "04",
      fileName: "Bookkeeping_Template.docx",
      fileType: "DOCX",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "05",
      fileName: "Financial_Summary_2024.pdf",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "06",
      fileName: "Payroll_Record_Feb_2025.csv",
      fileType: "CSV",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
    {
      id: "07",
      fileName: "Subscription_Invoice_#12345.pdf",
      fileType: "PDF",
      downloadedOn: "Apr 10, 2024 09:20 AM",
    },
  ]

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <div className="border-t-2 mt-16"></div>
      <div className="bg-white rounded-xl  p-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Downloaded Files</h1>
          <div className="flex gap-7">
          <div className="relative w-xs md:max-w-xs h-10 ">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
              />
          </div>
              </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border-2  pb-10 bg-gray-100">
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
      {downloads.map((document, index) => {
        const isEvenRow = index % 2 === 0;
        const rowBg = isEvenRow ? 'bg-white' : 'bg-gray-100';

        return (
          <tr key={document.id} className={`transition hover:bg-gray-200 ${rowBg}`}>
            <td className="px-4 py-4 text-sm text-gray-700">{document.id}</td>
            <td className="px-4 py-4 text-sm text-gray-700 flex items-center gap-2">
              <Image src={"../File.png"} alt={""} height={15} width={15}/>
              {document.fileName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-700">{document.fileType}</td>
            <td className="px-4 py-4 text-sm text-gray-700">{document.downloadedOn}</td>
            <td className="px-4 py-4 text-sm">
              <div className="flex space-x-2">
                <button className="text-red-500 hover:text-red-700 transition">
                <Image src={"../Delete.png" }alt={""} height={15} width={15}/>
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
    </div>
  )
}
