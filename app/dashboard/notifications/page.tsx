export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "registered on the platform.",
      type: "new_user",
      time: "1h Ago",
    },
    {
      id: 2,
      user: {
        name: "Alice Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: "updated their profile information.",
      type: "profile_update",
      time: "1h Ago",
    },
    {
      id: 3,
      user: {
        name: "Ana sultana",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: 'Added new document named "mydoc.docx"',
      type: "document_add",
      time: "1d Ago",
    },
    {
      id: 4,
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: 'Deleted a document named "mydoc.pdf"',
      type: "document_delete",
      time: "1d Ago",
    },
    {
      id: 5,
      user: {
        name: "Alice Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      action: 'Downloaded a document named ""testingdoc.pdf""',
      type: "document_download",
      time: "1h Ago",
    },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start">
              <img
                src={notification.user.avatar || "/placeholder.svg"}
                alt={notification.user.name}
                className="h-10 w-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm mt-3">
                    {notification.type === "new_user" && <span className="text-gray-500">New user </span>}
                    <span className="font-medium">{notification.user.name}</span>{" "}
                    <span className="text-gray-500">{notification.action}</span>
                  </p>
                  <span className="text-sm text-gray-500">{notification.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
