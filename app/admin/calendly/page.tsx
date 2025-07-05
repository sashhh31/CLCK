"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { CalendarService } from "@/app/services/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScheduleMeetingData {
  title: string;
  description: string;
  datetime: Date;
  duration: number;
  attendees: string[];
  platform?: 'calendly' | 'zoom';
}

export default function AdminCalendarPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(30)
  const [attendees, setAttendees] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [platform, setPlatform] = useState("calendly")
  const { toast } = useToast()

  // Static time slots (every half hour from 06:00 to 22:00)
  const staticTimeSlots = [
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ]

  // Static duration options
  const defaultDurations = [
    { id: '15', title: '15 minutes', duration: 15 },
    { id: '30', title: '30 minutes', duration: 30 },
    { id: '45', title: '45 minutes', duration: 45 },
    { id: '60', title: '1 hour', duration: 60 },
    { id: '90', title: '1.5 hours', duration: 90 },
    { id: '120', title: '2 hours', duration: 120 }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !time || !title || !description || !attendees) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      setIsLoading(true)
      
      // Combine date and time
      const datetime = new Date(date)
      const [hours, minutes] = time.split(":")
      datetime.setHours(parseInt(hours), parseInt(minutes))

      // Split attendees string into array and trim whitespace
      const attendeeEmails = attendees.split(',').map(email => email.trim())

      const response = await CalendarService.scheduleMeeting({
        title,
        description,
        datetime,
        duration,
        attendees: attendeeEmails,
        platform: platform as 'calendly' | 'zoom'
      })

      toast({
        title: "Success",
        description: "Meeting scheduled successfully"
      })

      // Reset form
      setDate(undefined)
      setTime("")
      setTitle("")
      setDescription("")
      setAttendees("")
      setDuration(30) // Reset to default duration
    } catch (error: any) {
      console.error('Error scheduling meeting:', error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to schedule meeting",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>

      <h1 className="text-3xl font-bold mb-8">Schedule Meeting</h1>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label htmlFor="platform" className="block text-sm font-medium mb-2">
              Platform
            </label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="calendly">Calendly</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-2">
              Time
            </label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {staticTimeSlots.map((slot) => (
                  <SelectItem 
                    key={slot} 
                    value={slot}
                  >
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-2">
              Duration
            </label>
            <Select 
              value={duration.toString()} 
              onValueChange={(value) => setDuration(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration">
                  {duration ? `${duration} minutes` : "Select duration"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {defaultDurations.map((type) => (
                  <SelectItem 
                    key={type.id} 
                    value={type.duration.toString()}
                  >
                    {type.title} ({type.duration} minutes)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Meeting Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter meeting title"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meeting description"
              className="w-full"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="attendees" className="block text-sm font-medium mb-2">
              Attendees (comma-separated emails)
            </label>
            <Input
              id="attendees"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
              placeholder="email1@example.com, email2@example.com"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2A3356] text-[#F0D687] hover:bg-[#2A3356]/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#F0D687] border-t-transparent"></div>
                <span>Scheduling...</span>
              </div>
            ) : (
              "Schedule Meeting"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
} 