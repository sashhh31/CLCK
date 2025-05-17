"use client"
import React, { useState, useRef } from 'react';
import { Paperclip, X, Loader2 } from 'lucide-react';
import { emailService } from '@/app/services/api';

interface SendEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

interface EmailData {
  emailAddress: string;
  subject: string;
  message: string;
  attachments: File[];
}

export default function SendEmailDialog({ isOpen, onClose, userId }: SendEmailDialogProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    emailAddress: '',
    subject: '',
    message: '',
    attachments: []
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setEmailData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setEmailData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('to', emailData.emailAddress);
      formData.append('subject', emailData.subject);
      formData.append('message', emailData.message);
      
      emailData.attachments.forEach(file => {
        formData.append('attachments', file);
      });

      await emailService.sendEmail(formData, userId);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
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

          {/* Attachments List */}
          {emailData.attachments.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-2">
                Attachments
              </label>
              <div className="space-y-2">
                {emailData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
          />
          
          <button
            type="button"
            onClick={handleAttachment}
            className="w-full flex items-center justify-center px-4 py-3 mb-6 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Paperclip size={20} className="mr-2" />
            Attach document
          </button>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
              disabled={isSending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#2E3B5B] text-yellow-200 font-medium hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              {isSending ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}