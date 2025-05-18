"use client"
import React, { useState, useRef } from 'react';
import { Paperclip, X, Loader2, Plus } from 'lucide-react';
import { emailService } from '@/app/services/api';

interface SendEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

interface EmailData {
  to: string[];
  cc: string[];
  subject: string;
  message: string;
  attachments: File[];
}

export default function SendEmailDialog({ isOpen, onClose, userId }: SendEmailDialogProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    to: [''],
    cc: [''],
    subject: '',
    message: '',
    attachments: []
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'to' | 'cc', index: number) => {
    const { value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [type]: prev[type].map((email, i) => i === index ? value : email)
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData(prev => ({
      ...prev,
      subject: e.target.value
    }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailData(prev => ({
      ...prev,
      message: e.target.value
    }));
  };

  const addEmailField = (type: 'to' | 'cc') => {
    setEmailData(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  const removeEmailField = (type: 'to' | 'cc', index: number) => {
    if (emailData[type].length > 1) {
      setEmailData(prev => ({
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index)
      }));
    }
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

  const validateEmails = (emails: string[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every(email => email === '' || emailRegex.test(email));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError('');

    try {
      // Validate emails
      if (!validateEmails(emailData.to) || !validateEmails(emailData.cc)) {
        throw new Error('Please enter valid email addresses');
      }

      // Filter out empty email addresses
      const validToEmails = emailData.to.filter(email => email.trim() !== '');
      const validCcEmails = emailData.cc.filter(email => email.trim() !== '');

      if (validToEmails.length === 0) {
        throw new Error('At least one recipient is required');
      }

      const formData = new FormData();
      
      validToEmails.forEach(email => {
        formData.append('to', email);
      });
      
      validCcEmails.forEach(email => {
        formData.append('cc', email);
      });
      
      formData.append('subject', emailData.subject);
      formData.append('message', emailData.message);
      
      emailData.attachments.forEach(file => {
        formData.append('attachments', file);
      });

      await emailService.sendEmail(formData, userId);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Fixed Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Send Email</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="email-form" onSubmit={handleSubmit} className="space-y-4">
            {/* To Recipients */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                To <span className="text-red-500">*</span>
              </label>
              {emailData.to.map((email, index) => (
                <div key={`to-${index}`} className="flex items-center mb-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => handleChange(e, 'to', index)}
                    required={index === 0}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEmailField('to', index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addEmailField('to')}
                className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add recipient
              </button>
            </div>

            {/* CC Recipients */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                CC
              </label>
              {emailData.cc.map((email, index) => (
                <div key={`cc-${index}`} className="flex items-center mb-2">
                  <input
                    type="email"
                    placeholder="Enter CC email address"
                    className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => handleChange(e, 'cc', index)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEmailField('cc', index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addEmailField('cc')}
                className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add CC
              </button>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-900 font-medium mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter Subject"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailData.subject}
                onChange={handleSubjectChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-900 font-medium mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                placeholder="Enter message"
                rows={6}
                className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailData.message}
                onChange={handleMessageChange}
                required
              />
            </div>

            {/* Attachments List */}
            {emailData.attachments.length > 0 && (
              <div>
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
              className="w-full flex items-center justify-center px-4 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Paperclip size={20} className="mr-2" />
              Attach document
            </button>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
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
              form="email-form"
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
        </div>
      </div>
    </div>
  );
}