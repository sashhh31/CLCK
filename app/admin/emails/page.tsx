"use client"
import React, { useState, useEffect } from 'react';
import { Search, Plus, File, Loader2 } from 'lucide-react';
import SendEmailDialog from '@/components/sendEmailDialog';
import { emailService } from '@/app/services/api';

interface Email {
  _id: string;
  to: string[];
  cc: string[];
  subject: string;
  message: string;
  attachments: Array<{
    filename: string;
    path: string;
  }>;
  sentBy: {
    name: string;
    email: string;
  };
  status: 'sent' | 'failed';
  sentAt: string;
}

export default function EmailDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Get user ID from localStorage or your auth context
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const response = await emailService.getEmailHistory(currentPage, searchQuery);
      setEmails(response.data.emails);
      setTotalPages(response.data.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching emails');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [currentPage, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="w-full min-h-screen bg-white p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Emails</h1>
          <p className="text-black">Total Emails sent : {emails.length}</p>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Search and actions */}
          <div className="p-4 flex justify-between items-center">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search emails, recipients, or subjects"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
              <div className="absolute right-3 top-2.5 text-black">
                <Search size={20} />
              </div>
            </div>
            <button 
              className="bg-[#2E3B5B] hover:bg-blue-900 text-yellow-200 px-4 py-2 rounded-full flex items-center"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus size={20} className="mr-2" />
              Send Email
            </button>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-6 bg-gray-100 text-sm font-medium text-black border-t border-b border-gray-200">
            <div className="px-6 py-3">To</div>
            <div className="px-6 py-3">CC</div>
            <div className="px-6 py-3">Subject</div>
            <div className="px-6 py-3">Message</div>
            <div className="px-6 py-3">Attachments</div>
            <div className="px-6 py-3">Sent On</div>
          </div>

          {/* Table content */}
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            emails.map((email) => (
              <div key={email._id} className="grid grid-cols-6 border-b border-gray-200 hover:bg-gray-50">
                <div className="px-6 py-4 text-black text-sm">
                  {email.to.map((recipient, index) => (
                    <div key={index} className="mb-1">
                      {recipient}
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 text-black text-sm">
                  {email.cc && email.cc.length > 0 ? (
                    email.cc.map((recipient, index) => (
                      <div key={index} className="mb-1">
                        {recipient}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
                <div className="px-6 py-4 text-gray-900 font-medium">{email.subject}</div>
                <div className="px-6 py-4 text-black text-sm truncate">{email.message}</div>
                <div className="px-6 py-4">
                  {email.attachments && email.attachments.length > 0 ? (
                    email.attachments.map((doc, index) => (
                      <div key={index} className="flex items-center text-black text-sm mb-1">
                        <File size={16} className="mr-2 text-black" />
                        {doc.filename}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </div>
                <div className="px-6 py-4 text-black text-sm">
                  {new Date(email.sentAt).toLocaleString()}
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-black">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center">
              <button 
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                {currentPage}
              </div>
              <button 
                className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Send Email Dialog */}
      <SendEmailDialog 
        isOpen={isDialogOpen} 
        onClose={() => {
          setIsDialogOpen(false);
          fetchEmails(); // Refresh the email list after sending
        }}
        userId={userId}
      />
    </div>
  );
}