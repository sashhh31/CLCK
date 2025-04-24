"use client"
import React, { useState } from 'react';
import { Search, Plus, File } from 'lucide-react';
import SendEmailDialog from '@/components/sendEmailDialog';

export default function EmailDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample email data
  const emails = [
    {
      id: 1,
      emailAddress: 'alexsaprun123@gmail.com',
      subject: 'Request To Upload Document',
      email: 'Hi, Tristrue nulla aliquet enim tortor at auctor urnanmassa enim nec dui nunc mattis enim ut tellusnaute irure repreaen. enim tortor at auctor urnanmassa. irure repreaen. enim tortor at auctor urnanmassa.',
      attachedDocuments: ['testing file.pdf', 'Mytesting file.Docx'],
      sentOn: 'Apr 10, 2024 09:20 AM'
    },
    {
      id: 2,
      emailAddress: 'alexsaprun123@gmail.com',
      subject: 'Request To Upload Document',
      email: 'Hi, enim tortor at auctor urnanmassa. irure repreaen. enim tortor at auctor urnanmassa.',
      attachedDocuments: ['Mytesting file.Docx'],
      sentOn: 'Apr 10, 2024 09:20 AM'
    },
    {
      id: 3,
      emailAddress: 'alexsaprun123@gmail.com',
      subject: 'Request To Upload Document',
      email: 'Hi, enim tortor at auctor urnanmassa. irure repreaen. enim tortor at auctor urnanmassa.',
      attachedDocuments: ['Mytesting file.Docx'],
      sentOn: 'Apr 10, 2024 09:20 AM'
    },
    {
      id: 4,
      emailAddress: 'alexsaprun123@gmail.com',
      subject: 'Request To Upload Document',
      email: 'Hi, Tristrue nulla aliquet enim tortor at auctor urnanmassa enim nec dui nunc mattis enim ut tellusnaute irure repreaen. enim tortor at auctor urnanmassa. irure repreaen. enim tortor at auctor urnanmassa.',
      attachedDocuments: ['testing file.pdf', 'Mytesting file.Docx'],
      sentOn: 'Apr 10, 2024 09:20 AM'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white p-8">
                           <div className="border-t-2 mt-6 mb-2"></div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Emails</h1>
          <p className="text-black">Total Emails sent : 120</p>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Search and actions */}
          <div className="p-4 flex justify-between items-center">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="grid grid-cols-5 bg-gray-100 text-sm font-medium text-black border-t border-b border-gray-200">
            <div className="px-6 py-3">Email Address</div>
            <div className="px-6 py-3">Subject</div>
            <div className="px-6 py-3">Email</div>
            <div className="px-6 py-3">Attached Document</div>
            <div className="px-6 py-3">Sent On</div>
          </div>

          {/* Table content */}
          {emails.map((email) => (
            <div key={email.id} className="grid grid-cols-5 border-b border-gray-200 hover:bg-gray-50">
              <div className="px-6 py-4 text-black text-sm">{email.emailAddress}</div>
              <div className="px-6 py-4 text-gray-900 font-medium">{email.subject}</div>
              <div className="px-6 py-4 text-black text-sm truncate">{email.email}</div>
              <div className="px-6 py-4">
                {email.attachedDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center text-black text-sm mb-1">
                    <File size={16} className="mr-2 text-black" />
                    {doc}
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 text-black text-sm">{email.sentOn}</div>
            </div>
          ))}

          {/* Pagination */}
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
      </div>

      {/* Send Email Dialog */}
      <SendEmailDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
}