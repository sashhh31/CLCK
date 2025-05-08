"use client"
import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';

interface SendEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmailData {
  emailAddress: string;
  subject: string;
  message: string;
  attachments: File[];
}

export default function SendEmailDialog({ isOpen, onClose }: SendEmailDialogProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    emailAddress: '',
    subject: '',
    message: '',
    attachments: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAttachment = () => {
    // In a real application, this would trigger a file picker
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email data to your backend
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Email</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="emailAddress" className="block text-gray-900 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="Enter email address"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailData.emailAddress}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-900 font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter Subject"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-900 font-medium mb-2">
              Email
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter message"
              rows={6}
              className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          <button
            type="button"
            onClick={handleAttachment}
            className="w-full flex items-center justify-center px-4 py-3 mb-6 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Paperclip size={20} className="mr-2" />
            Attach document
          </button>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}