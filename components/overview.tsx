import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Overview() {
  return (
    <div className="h-[350px]">
      <svg viewBox="0 0 400 200" className="w-full h-full">
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
  )
} 