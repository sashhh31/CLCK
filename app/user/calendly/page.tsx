"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { CalendarService, MeetingData } from "@/app/services/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function UserCalendarPage() {
  const [meetings, setMeetings] = useState<MeetingData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMeetings()
  }, [])

  const fetchMeetings = async () => {
    try {
      setIsLoading(true)
      const response = await CalendarService.getUpcomingMeetings()
      setMeetings(response.data.meetings)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch meetings",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinMeeting = (meetLink: string) => {
    window.open(meetLink, '_blank')
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3356]"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>

      <h1 className="text-3xl font-bold mb-8">Upcoming Meetings</h1>

      {meetings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No upcoming meetings scheduled</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium">{meeting.title}</TableCell>
                  <TableCell>
                    {format(new Date(meeting.datetime), 'PPp')}
                  </TableCell>
                  <TableCell>{meeting.description}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      meeting.status === 'scheduled' 
                        ? 'bg-green-100 text-green-800'
                        : meeting.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {meeting.status === 'scheduled' && (
                      <Button
                        onClick={() => handleJoinMeeting(meeting.meetLink)}
                        className="bg-[#2A3356] text-[#F0D687] hover:bg-[#2A3356]/90"
                      >
                        Join Meeting
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
} 