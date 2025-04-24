"use client"
import { useState } from 'react';
import { ArrowLeft, X, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (e: any, index :number) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(-1);
    setOtp(newOtp);
    if (e.target.nextSibling && e.target.value) e.target.nextSibling.focus();
  };

  return (
    <div className="min-h-screen bg-[#2E3B5B] flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <ArrowLeft className="cursor-pointer w-5 h-5" />
          <h2 className="text-xl font-bold">Forget Password</h2>
          <X className="cursor-pointer w-5 h-5" />
        </div>
        <p className="text-sm text-black mb-4">
          Please enter your email address so that you can change your password.
        </p>
        <label className="font-semibold block mb-1">Email Address</label>
        <div className="relative mb-2">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full p-3 pl-10 border rounded-full  focus:outline-none"
          />
          <div className="absolute top-1/2 left-3 -translate-y-1/2 bg-gr text-black w-4 h-4" >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v.217l-8 4.8-8-4.8V4zm0 1.383l7.555 4.533a.5.5 0 00.445 0L16 5.383V12a2 2 0 01-2 2H2a2 2 0 01-2-2V5.383z"/>
                </svg>
          </div>
        </div>
        <a href="#" className="text-sm font-semibold text-blue-900 underline mb-4 inline-block">
          Send OTP
        </a>
        <div className="flex gap-3 mb-6 justify-center">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              className="w-12 h-12 text-center border rounded-full text-lg focus:outline-none focus:border-[#2E3B5B]"
            />
          ))}
        </div>
        <Link href={"./reset-password"}>
        <button className="w-full bg-[#2E3B5B] text-white rounded-full py-3 text-lg font-medium">
          Verify
        </button>
        </Link>
      </div>
    </div>
  );
}
