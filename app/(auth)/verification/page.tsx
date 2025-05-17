"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, X } from "lucide-react"
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/app/services/api';
import { toast } from 'react-hot-toast';

interface Verify2FAParams {
  email: string;
  code: string;
  phoneNumber: string;
}

const Verification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const phoneNumber = searchParams.get('phoneNumber') || '';

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');



  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=code-${index + 1}]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
    
    // Submit when pressing Enter if code is complete
    if (e.key === 'Enter' && code.every(digit => digit)) {
      handleVerify();
    }
  };

  const isCodeComplete = () => {
    return code.every(digit => digit !== '');
  };

  const handleVerify = async () => {
    // Reset error state
    setError('');
    
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const email = localStorage.getItem('verificationEmail');
      const phoneNumber = localStorage.getItem('phoneNumber');
      console.log('Submitting verification with:', { email, code: verificationCode, phoneNumber });
      const response = await authService.verify2FA({
        email,
        code: verificationCode,
        phoneNumber,
      } as Verify2FAParams);

      console.log('Verification response:', response);

      // Store token temporarily in localStorage instead of setting cookie
      toast.success('Verification successful!');
      
      // Redirect to plans page
      router.push("/plans");
    } catch (err: any) {
      console.error('Verification error:', err);
      const errorMessage = err.response?.data?.message || "Invalid verification code";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await authService.login({ email, password: "" }); // This will trigger a new 2FA code
      toast.success("New verification code sent!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending new code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2E3B5B] grid place-items-center">
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md text-center relative">
        <div className='inline-block mb-5'>
          {/* Close & Back Icons */}
          <div className="absolute left-4 text-xl cursor-pointer" onClick={() => router.back()}><ChevronLeft/></div>
          <div className="absolute right-4 text-xl cursor-pointer" onClick={() => router.push("/login")}><X/></div>
          <h1 className="text-2xl font-semibold mb-2">Verification</h1>
        </div>
        <p className="text-black text-sm mb-1">We have sent you an OTP on your given email address</p>
        <p className="text-sm font-medium mb-4">{email}</p>

        {/* OTP Fields */}
        <div className="flex justify-center gap-3 mb-4">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              name={`code-${i}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-12 rounded-full border border-gray-300 text-center text-lg outline-none focus:border-[#2E3B5B] transition"
              pattern="[0-9]"
              inputMode="numeric"
              required
            />
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Resend Link */}
        <p 
          className="text-sm text-[#2E3B5B] underline cursor-pointer mb-4 hover:opacity-80"
          onClick={handleResendCode}
        >
          Resend Code
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading || !isCodeComplete()}
          className="w-full bg-[#2E3B5B] text-white py-3 rounded-full font-medium transition hover:bg-[#24304d] active:bg-[#1a2438] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default Verification;