"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { CalendarService } from "@/app/services/calendar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Booking {
  _id: string;
  title: string;
  description: string;
  datetime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  participants: Array<{
    email: string;
    firstName?: string;
    lastName?: string;
  }>;
  createdBy: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  meetLink: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      console.log('Fetching bookings...')
      const response = await CalendarService.getAllBookings()
      console.log('API Response:', response)
      
      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setBookings(response.data)
      } else if (response.data && Array.isArray(response.data.bookings)) {
        setBookings(response.data.bookings)
      } else {
        console.error('Unexpected response format:', response)
        setBookings([])
      }
      
      console.log('Bookings set:', bookings)
    } catch (error: any) {
      console.error('Error fetching bookings:', error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch bookings",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add a useEffect to log when bookings change
  useEffect(() => {
    console.log('Bookings updated:', bookings)
  }, [bookings])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await CalendarService.cancelMeeting(bookingId)
      toast({
        title: "Success",
        description: "Booking cancelled successfully"
      })
      fetchBookings() // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to cancel booking",
        variant: "destructive"
      })
    }
  }

  const generateMeetLink = (booking: Booking) => {
    // If there's already a proper URL, use it
    if (booking.meetLink && booking.meetLink.startsWith('http')) {
      return booking.meetLink;
    }
    
    // Generate a Google Meet link based on the booking title and time
    const meetingId = booking._id.slice(-10); // Use last 10 chars of booking ID
    const formattedTitle = booking.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `https://meet.google.com/${formattedTitle}-${meetingId}`;
  }

  const handleJoinMeeting = (booking: Booking) => {
    const meetLink = generateMeetLink(booking);
    window.open(meetLink, '_blank');
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.createdBy.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <Button
          onClick={() => window.location.href = '/admin/calendly'}
          className="bg-[#2A3356] text-[#F0D687] hover:bg-[#2A3356]/90"
        >
          Create New Booking
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell className="font-medium">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="text-left hover:underline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        {booking.title}
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{booking.title}</DialogTitle>
                        <DialogDescription>
                          <div className="mt-4 space-y-4">
                            <div>
                              <h3 className="font-semibold">Description</h3>
                              <p>{booking.description}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Date & Time</h3>
                              <p>{format(new Date(booking.datetime), 'PPp')}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Created At</h3>
                              <p>{format(new Date(booking.createdAt), 'PPp')}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Organizer</h3>
                              <p>{booking.createdBy.email}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Participants</h3>
                              <ul className="list-disc list-inside">
                                {booking.participants.map((participant, index) => (
                                  <li key={index}>{participant.email}</li>
                                ))}
                              </ul>
                            </div>
                            {booking.meetLink && (
                              <div>
                                <h3 className="font-semibold">Meeting Link</h3>
                                <a
                                  href={generateMeetLink(booking)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            )}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {format(new Date(booking.datetime), 'PPp')}
                </TableCell>
                <TableCell>
                  {format(new Date(booking.createdAt), 'PPp')}
                </TableCell>
                <TableCell>{booking.createdBy.email}</TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate">
                    {booking.participants.map(p => p.email).join(", ")}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === 'scheduled'
                        ? 'default'
                        : booking.status === 'completed'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {booking.status === 'scheduled' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleJoinMeeting(booking)}
                        >
                          Join
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 