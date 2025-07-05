"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Bell } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Notification {
  id: string;
  message: string;
  read: boolean;
  type: 'meeting' | 'system' | 'other';
  createdAt: string;
  relatedMeeting?: {
    id: string;
    title: string;
    meetLink: string;
    platform?: string;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/notifications')
      const data = await response.json()
      setNotifications(data.notifications)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinMeeting = (meetLink: string) => {
    window.open(meetLink, '_blank')
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      })
      
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      )
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive"
      })
    }
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

      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-500">No notifications</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Message</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow 
                  key={notification.id}
                  className={notification.read ? 'bg-gray-50' : ''}
                >
                  <TableCell className="font-medium">
                    {notification.message}
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{notification.type}</span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(notification.createdAt), 'PPp')}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      notification.read
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {notification.read ? 'Read' : 'Unread'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {notification.type === 'meeting' && notification.relatedMeeting ? (
                      <span className="capitalize">{notification.relatedMeeting.platform || 'calendly'}</span>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Mark as read
                      </button>
                    )}
                    {notification.type === 'meeting' && notification.relatedMeeting && (
                      <button
                        onClick={() => handleJoinMeeting(notification.relatedMeeting!.meetLink)}
                        className="ml-4 text-sm text-[#2A3356] hover:text-[#2A3356]/80"
                      >
                        {notification.relatedMeeting.platform === 'zoom' ? 'Join Zoom' : 'Join Calendly'}
                      </button>
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