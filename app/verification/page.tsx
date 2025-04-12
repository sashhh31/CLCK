"use client"
import React, { useState } from 'react';
import {  ChevronLeft , X} from "lucide-react"
import Link from 'next/link';

const verification = () => {
  const [otp, setOtp] = useState<string[]>(Array(5).fill(''));

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = () => {
    alert('OTP Submitted: ' + otp.join(''));
  };

  return (
    <div className="min-h-screen bg-[#2E3B5B] grid place-items-center">
      <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-md text-center relative">
        <div className=' inline-block mb-5'>

        {/* Close & Back Icons */}
        <div className="absolute left-4 text-xl cursor-pointer"><ChevronLeft/></div>

        {/* Title */}
        <div className="absolute right-4 text-xl cursor-pointer"><X/></div>
        <h1 className="text-2xl font-semibold mb-2">Verification</h1>
        </div>
        <p className="text-gray-500 text-sm mb-1">We have sent you an OTP on your given email address</p>
        <p className="text-sm font-medium mb-4">ahmadraza123@gmail.com</p>

        {/* OTP Fields */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 rounded-full border border-gray-300 text-center text-lg outline-none focus:border-[#2E3B5B] transition"
            />
          ))}
        </div>

        {/* Resend Link */}
        <p className="text-sm text-[#2E3B5B] underline cursor-pointer mb-4 hover:opacity-80">
          Resend Code
        </p>

        {/* Verify Button */}
        <button
          className="w-full bg-[#2E3B5B] text-white py-3 rounded-full font-medium  transition"
        >
          <Link href="/user">
          Verify
          </Link>
        </button>
      </div>
    </div>
  );
};

export default verification;
