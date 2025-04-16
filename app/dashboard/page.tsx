import { ArrowUp, Users, Download, FileText, Mail } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex">
                           <div className="border-t-2 mt-14"></div>
      {/* Main content */}
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-montserrat font-bold mb-8">Dashboard</h1>
        
        {/* First row - Statistics - Now single row */}
        <div className="flex gap-4 mb-8">

       <div className="grid-rows-1 md:grid-rows-2 lg:grid-rows-4">
        <div className="flex gap-3 mb-4 ">

          {/* Total Users Added */}
          <div className="bg-gray-100 w-60 h-52 rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-4 rounded-full bg-white">
                <Users className="h-6 w-6 text-black" />
              </div>
            </div>
            <h3 className="text-sm text-gray-500 mt-11">Total Users Added</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-montserrat font-semibold mt-4">1220</p>
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
              <p className="text-3xl font-montserrat font-semibold mt-4">190</p>
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
              <p className="text-3xl font-montserrat font-semibold mt-4">92</p>
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
              <p className="text-3xl font-montserrat font-semibold mt-4">320</p>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+7.2%</span>
              </div>
            </div>
          </div>
          </div>

        </div>
        <div className="bg-gray-100 h-[430px] w-[700px] rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-montserrat font-bold mb-4">Documents</h2>
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
              <div className="flex flex-col justify-between items-center gap-6 mb-4">
                <h2 className="text-xl font-montserrat font-bold">Total Subscription Added</h2>
                <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
  {/* Yellow Segment */}
  <circle
    cx="50"
    cy="50"
    r="40"
    fill="none"
    stroke="#F4C526"
    strokeWidth="15"
    strokeDasharray="80 170"
    transform="rotate(-90 50 50)"
    strokeLinecap="round"
  />
  {/* Blue Segment */}
  <circle
    cx="50"
    cy="50"
    r="40"
    fill="none"
    stroke="#4078A5"
    strokeWidth="15"
    strokeDasharray="80 170"
    transform="rotate(30 50 50)"
    strokeLinecap="round"
  />
  {/* Teal Segment */}
  <circle
    cx="50"
    cy="50"
    r="40"
    fill="none"
    stroke="#2FBDB2"
    strokeWidth="15"
    strokeDasharray="80 170"
    transform="rotate(150 50 50)"
    strokeLinecap="round"
  />
</svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-montserrat font-medium">150</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-600 mr-2"></div>
                  <span className="text-sm">Basic</span>
                  <span className="ml-auto font-montserrat font-medium">10</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Professional</span>
                  <span className="ml-auto font-montserrat font-medium">52</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">EnterPreneur</span>
                  <span className="ml-auto font-montserrat font-medium">89</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-montserrat font-medium text-gray-400">Subscription Earnings</h2>
    <select className="text-sm border rounded-md px-2 py-1">
      <option>Yearly</option>
      <option>Monthly</option>
    </select>
  </div>
  <p className="text-3xl font-montserrat font-bold mb-4">$120K</p>
  <div className="h-32 w-full">
    <div className="h-full w-full flex items-end justify-between">
      {/* Each bar has a white background with blue fill inside */}
      <div className="h-24 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-16"></div>
      </div>
      <div className="h-28 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-28"></div>
      </div>
      <div className="h-24 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-10"></div>
      </div>
      <div className="h-24 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-20"></div>
      </div>
      <div className="h-24 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-16"></div>
      </div>
      <div className="h-24 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-12"></div>
      </div>
      <div className="h-24 w-8 bg-white rounded relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-blue-600 rounded-b h-18"></div>
      </div>
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