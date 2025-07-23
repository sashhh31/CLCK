'use client'
import { useEffect, useState } from 'react';
import { notificationsService } from '@/app/services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notificationsService.getNotifications();
      // Support both { data: { notifications } } and { notifications }
      const notifs = response?.data?.notifications || response?.notifications || [];
      setNotifications(notifs);
    } catch (err: any) {
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A3356]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">{error}</div>
    );
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {notifications.length === 0 ? (
            <div className="text-gray-500">No notifications found.</div>
          ) : (
            notifications.map((notification) => (
              <div key={notification._id} className="flex items-start">
                <img
                  src={notification.userId?.profilePicture || "/placeholder.svg"}
                  alt={notification.userId?.firstName || 'User'}
                  className="h-10 w-10 rounded-full mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm mt-3">
                      {notification.type && <span className="text-black font-semibold mr-1">[{notification.type}]</span>}
                      <span className="font-medium">{notification.userId?.firstName || 'User'} {notification.userId?.lastName || ''}</span>{' '}
                      <span className="text-black">{notification.message}</span>
                    </p>
                    <span className="text-sm text-black">{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
