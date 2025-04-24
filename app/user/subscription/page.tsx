"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function SubscriptionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const subscriptionHistory = [
    {
      id: 1,
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      subscriber: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 2,
      plan: "Professional",
      duration: "Yearly",
      charges: "£ 100",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      subscriber: {
        name: "Sapstar",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
    },
    {
      id: 3,
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 199",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      subscriber: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 4,
      plan: "Basic",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      subscriber: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: 5,
      plan: "Enterprise",
      duration: "Monthly",
      charges: "£ 49",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      subscriber: {
        name: "Naina Nohn",
        email: "alexsaprun123@gmail.com",
        avatar: null,
      },
    },
    {
      id: 6,
      plan: "Professional",
      duration: "Yearly",
      charges: "£ 100",
      billingDate: "Apr 10, 2024 09:20 AM",
      expiryDate: "Apr 10, 2024 09:20 AM",
      subscriber: {
        name: "Alex Saprun",
        email: "alexsaprun123@gmail.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  ]

  const itemsPerPage = 5;
  const filteredSubscriptions = subscriptionHistory.filter(subscription => 
    subscription.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subscription.duration.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                     <div className="border-t-2 mt-6 mb-2"></div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Subscription Plan</h1>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">Basic Plan</h2>
                <span className="px-3 py-1 bg-gray-200 text-black rounded-full text-xs sm:text-sm">Monthly</span>
              </div>
              <p className="text-black text-sm sm:text-base">
                Nam ultrices lacus interdum neque sagittis met Integer porta sem eu.
              </p>
              <p className="text-black text-sm sm:text-base">
                Next renewal Date: <span className="font-medium">Apr 10, 2025</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-4xl font-bold">
                £49<span className="text-sm sm:text-lg font-normal text-black">/Month</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 gap-3">
            <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 text-white rounded-lg h-9 px-4 py-2 text-sm">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
            <Button variant="outline" className="text-black border-gray-300 hover:bg-gray-100 rounded-lg h-9 px-4 py-2 text-sm">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Subscription History</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-black" />
          <input
            type="text"
            placeholder="Search history..."
            className="w-full pl-9 pr-4 py-2 h-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A3356]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">Plan</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">Duration</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium">Charges</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Subscriber</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Billing Date</th>
                  <th className="px-4 py-3 text-xs sm:text-sm font-medium hidden md:table-cell">Expiry Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedSubscriptions.map((subscription, index) => {
                  const isEvenRow = index % 2 === 0;
                  const rowBg = isEvenRow ? 'bg-white' : 'bg-gray-50';

                  return (
                    <tr key={subscription.id} className={`transition hover:bg-gray-200 ${rowBg}`}>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black">{subscription.plan}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black">{subscription.duration}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black">{subscription.charges}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">
                        <div className="flex items-center">
                          {subscription.subscriber.avatar ? (
                            <img
                              src={subscription.subscriber.avatar}
                              alt={subscription.subscriber.name}
                              className="h-8 w-8 rounded-full mr-3"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-black">{subscription.subscriber.name.charAt(0)}</span>
                            </div>
                          )}
                          <div>
                            <p className="text-xs sm:text-sm font-medium">{subscription.subscriber.name}</p>
                            <p className="text-xs text-black">{subscription.subscriber.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">{subscription.billingDate}</td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-black hidden md:table-cell">{subscription.expiryDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
            <div className="text-sm text-black">
              Total : 01 Pages
            </div>
          </div>
          </div>
        </CardContent>
      </Card>

     
    </div>
  )
}
