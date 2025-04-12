import { ArrowUp, Users, Download, FileText, Mail } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        {/* First row - Statistics - Now single row */}
        <div className="flex gap-4 mb-8">

       <div className="grid-rows-1 md:grid-rows-2 lg:grid-rows-4">
        <div className="flex gap-3 mb-4">

          {/* Total Users Added */}
          <div className="bg-gray-100 w-60 h-52 rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-white">
                <Users className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-gray-500 mt-11">Total Users Added</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-5xl font-semibold">1220</p>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+9.1%</span>
              </div>
            </div>
          </div>

          {/* Total Downloads */}
          <div className="bg-gray-100 w-60 h-52 rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-white">
                <Download className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-gray-500 mt-11">Total Downloads</h3>
            <div className="flex items-baseline justify-between ">
              <p className="text-5xl font-semibold">190</p>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+7.2%</span>
              </div>
            </div>
          </div>
          </div>
        <div className="flex gap-3">

          {/* Total Documents Added */}
          <div className="bg-gray-100 w-60 h-52  rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-white">
                <FileText className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-gray-500 mt-11">Total Documents Added</h3>
            <div className="flex items-baseline justify-between ">
              <p className="text-5xl font-semibold">92</p>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1 rotate-180" />
                <span>-2.1%</span>
              </div>
            </div>
          </div>

          {/* Total Emails sent */}
          <div className="bg-gray-100 w-60 h-52  rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-white">
                <Mail className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-gray-500 mt-11">Total Emails sent</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-5xl font-semibold">320</p>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+7.2%</span>
              </div>
            </div>
          </div>
          </div>

        </div>
        <div className="bg-gray-100 h-[430px] w-[700px] rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Documents</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-500">Uploaded</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-500">Downloaded</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <svg viewBox="0 0 400 200" className="w-full h-full text-white">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="400" y2="0" stroke="#999999" strokeWidth="1" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#999999" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#999999" strokeWidth="1" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#999999" strokeWidth="1" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="#999999" strokeWidth="1" />
                
                {/* Blue line (uploaded) */}
                <path 
                  d="M0,120 C25,80 50,60 75,70 C100,80 125,110 150,130 C175,150 200,120 225,80 C250,40 275,60 300,100 C325,140 350,150 400,180" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Yellow line (downloaded) */}
                <path 
                  d="M0,150 C25,140 50,130 75,120 C100,110 125,100 150,100 C175,100 200,110 225,90 C250,70 275,50 300,40 C325,30 350,40 400,30" 
                  fill="none" 
                  stroke="#eab308" 
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Second row - Charts */}
        <div className="grid-rows-4 lg:grid-rows-3 gap-8 ">
          {/* Documents Chart - Now full width in first position */}

          {/* Subscription Stats */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Total Subscription Added</h2>
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="15"
                    />
                    {/* Yellow segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="15"
                      strokeDasharray="251.2"
                      strokeDashoffset="183"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Blue segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="15"
                      strokeDasharray="251.2"
                      strokeDashoffset="125.6"
                      transform="rotate(-90 50 50)"
                      strokeLinecap="round"
                    />
                    {/* Green segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="15"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      transform="rotate(-90 50 50)"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">150</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                  <span className="text-sm">Basic</span>
                  <span className="ml-auto font-medium">10</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Professional</span>
                  <span className="ml-auto font-medium">52</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">EnterPreneur</span>
                  <span className="ml-auto font-medium">89</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Subscription Earnings</h2>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option>Yearly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <p className="text-3xl font-bold mb-4">$120K</p>
              <div className="h-32 w-full">
                <div className="h-full w-full flex items-end justify-between">
                  <div className="h-20 w-8 top-0 bg-white rounded">
                    <div className="h-16 w-8 mt-4 bg-blue-600 rounded"></div>
                  </div>
                  <div className="h-28 w-8 bg-blue-600 rounded"></div>
                  <div className="h-10 w-8 bg-blue-600 rounded"></div>
                  <div className="h-24 w-8 bg-blue-600 rounded"></div>
                  <div className="h-16 w-8 bg-blue-600 rounded"></div>
                  <div className="h-12 w-8 bg-blue-600 rounded"></div>
                  <div className="h-24 w-8 bg-blue-600 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}