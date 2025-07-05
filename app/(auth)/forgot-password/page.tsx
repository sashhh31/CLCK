"use client"
import { useState } from 'react';
import { ArrowLeft, X, Mail } from 'lucide-react';
import Link from 'next/link';
import { authService } from '@/app/services/api';

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setStep('verify');
      setSuccess('OTP sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const code = otp.join('');
      await authService.resetPassword({ email, code, newPassword });
      setSuccess('Password reset successful! You can now log in.');
      setStep('email');
      setEmail('');
      setOtp(new Array(6).fill(''));
      setNewPassword('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2E3B5B] flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <ArrowLeft className="cursor-pointer w-5 h-5" />
          <h2 className="text-xl font-bold">Forgot Password</h2>
          <X className="cursor-pointer w-5 h-5" />
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">{success}</div>
        )}
        {step === 'email' && (
          <form onSubmit={handleSendOtp}>
            <p className="text-sm text-black mb-4">
              Please enter your email address so that you can change your password.
            </p>
            <label className="font-semibold block mb-1">Email Address</label>
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full p-3 pl-10 border rounded-full focus:outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <div className="absolute top-1/2 left-3 -translate-y-1/2 text-black w-4 h-4">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v.217l-8 4.8-8-4.8V4zm0 1.383l7.555 4.533a.5.5 0 00.445 0L16 5.383V12a2 2 0 01-2 2H2a2 2 0 01-2-2V5.383z"/>
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2E3B5B] text-white rounded-full py-3 text-lg font-medium"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}
        {step === 'verify' && (
          <form onSubmit={handleVerify}>
            <p className="text-sm text-black mb-4">Enter the 6-digit code sent to your email and set a new password.</p>
            <div className="flex gap-3 mb-4 justify-center">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  maxLength={1}
                  value={digit}
                  onChange={e => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    if (!val) return;
                    const newOtp = [...otp];
                    newOtp[idx] = val;
                    setOtp(newOtp);
                    // Move to next input
                    if (e.target.nextSibling && val) {
                      (e.target.nextSibling as HTMLInputElement).focus();
                    }
                  }}
                  className="w-12 h-12 text-center border rounded-full text-lg focus:outline-none focus:border-[#2E3B5B]"
                  required
                  disabled={loading}
                />
              ))}
            </div>
            <label className="font-semibold block mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border rounded-full focus:outline-none mb-4"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-[#2E3B5B] text-white rounded-full py-3 text-lg font-medium"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Verify & Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
