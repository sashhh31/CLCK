import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"

export default function SubscriptionPage() {
  const subscriptionHistory = [
    {
      id: 1,
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
    },
    {
      id: 2,
      plan: "Professional",
      duration: "Yearly",
      charges: "£ 100",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
    },
    {
      id: 3,
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 199",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
    },
    {
      id: 4,
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
    },
    {
      id: 5,
      plan: "Enterprise",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
    },
  ]

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <div className="border-t-2 mt-16"></div>
      <div className="p-8">

      <h1 className="text-3xl font-inter font-bold mb-8">Subscription Plan</h1>

      <div className="bg-gray-100 border-2  rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-inter font-bold">Basic Plan</h2>
              <span className="ml-3 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Monthly</span>
            </div>
            <p className="text-gray-500 mt-2 mb-4">
              Nam ultrices lacus interdum neque sagittis met Integer porta sem eu.
            </p>
            <p className="text-gray-600">
              Next renewal Date: <span className="font-inter font-medium">Apr 10, 2025</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-inter font-bold">
              £49<span className="text-lg font-inter font-normal text-gray-500">/Month</span>
            </div>
          </div>
        </div>
        <div className="flex mt-6 space-x-4 ">
          <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 text-[#F0D687] rounded-full">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
          <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full">
            Cancel Subscription
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-inter font-bold mb-6">Subscription History</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
  <div className="overflow-x-auto rounded-2xl border-2  pb-10 bg-gray-100">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-inter font-medium text-gray-500">
          <th className="px-4 py-3">Plan</th>
          <th className="px-4 py-3">Duration</th>
          <th className="px-4 py-3">Charges</th>
          <th className="px-4 py-3">Billing Date</th>
          <th className="px-4 py-3">Expiry Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {subscriptionHistory.map((subscription, index) => {
          const isEven = index % 2 === 0;
          const rowBg = isEven ? 'bg-white' : 'bg-gray-100';

          return (
            <tr key={subscription.id} className={`transition hover:bg-gray-200 ${rowBg}`}>
              <td className="px-4 py-4 text-sm text-gray-700">{subscription.plan}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{subscription.duration}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{subscription.charges}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{subscription.billingDate}</td>
              <td className="px-4 py-4 text-sm text-gray-700">{subscription.expiryDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

      </div>

    </div>
  )
}
