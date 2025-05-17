"use client"

import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { authService } from "@/app/services/api"
import { toast } from "react-hot-toast"

interface Subscription {
  id: string;
  plan: string;
  duration: string;
  charges: string;
  billingDate: string;
  expiryDate: string;
  subscriber: {
    name: string;
    email: string;
    avatar: string | null;
  };
}

interface SubscriptionResponse {
  status: string;
  data: {
    history: Subscription[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  }
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  useEffect(() => {
    fetchSubscriptions();
  }, [currentPage, searchQuery]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await authService.getSubscriptionHistory(currentPage, searchQuery);
      setSubscriptions(response.data.history);
      setTotalPages(response.data.totalPages);
      setTotalSubscriptions(response.data.totalItems);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-2">Subscriptions</h1>
      <p className="text-black mb-8">Total Subscription added : {totalSubscriptions}</p>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="relative w-full max-w-md mb-6">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-6 pr-4 py-2 border rounded-full"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute right-5 top-2.5 h-5 w-5 text-black" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Added By</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Charges</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Billing Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Expiry Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center">
                    No subscriptions found
                  </td>
                </tr>
              ) : (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-black">{subscription.subscriber.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{subscription.subscriber.name}</p>
                          <p className="text-xs text-black">{subscription.subscriber.email}</p>
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
                          new Date(subscription.expiryDate) > new Date() 
                            ? "bg-blue-50 text-blue-600" 
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {new Date(subscription.expiryDate) > new Date() ? "Current" : "Past"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center">
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
              {currentPage}
            </div>
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-sm text-black">
            Total : {totalPages} Pages
          </div>
        </div>
      </div>
    </div>
  )
}
