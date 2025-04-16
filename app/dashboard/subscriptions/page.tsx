import { Search, ChevronLeft, ChevronRight } from "lucide-react"

export default function SubscriptionsPage() {
  const subscriptions = [
    {
      id: 1,
      addedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Current",
    },
    {
      id: 2,
      addedBy: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
      plan: "Professional",
      duration: "Yearly",
      charges: "£ 100",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Current",
    },
    {
      id: 3,
      addedBy: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Past",
    },
    {
      id: 4,
      addedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Current",
    },
    {
      id: 5,
      addedBy: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Enterpreneur",
      duration: "Monthly",
      charges: "£ 90",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      status: "Past",
    },
  ]

  return (
    <div className="p-8">
                           <div className="border-t-2 mt-14"></div>
      <h1 className="text-3xl font-bold mb-2">Subscriptions</h1>
      <p className="text-gray-500 mb-8">Total Subscription added : 120</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input type="text" placeholder="Search" className="w-full pl-6 pr-4 py-2 border rounded-full" />
          <Search className="absolute right-5 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Added By</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Charges</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Billing Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Expiry Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {subscription.addedBy.avatar ? (
                        <img
                          src={subscription.addedBy.avatar || "/placeholder.svg"}
                          alt={subscription.addedBy.name}
                          className="h-8 w-8 rounded-full mr-3"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-500">{subscription.addedBy.name.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{subscription.addedBy.name}</p>
                        <p className="text-xs text-gray-500">{subscription.addedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{subscription.plan}</td>
                  <td className="px-4 py-4 text-sm">{subscription.duration}</td>
                  <td className="px-4 py-4 text-sm">{subscription.charges}</td>
                  <td className="px-4 py-4 text-sm">{subscription.billingDate}</td>
                  <td className="px-4 py-4 text-sm">{subscription.expiryDate}</td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        subscription.status === "Current" ? "bg-blue-50 text-blue-600" : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                1
              </div>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Total : 01 Pages
            </div>
          </div>
      </div>
    </div>
  )
}
