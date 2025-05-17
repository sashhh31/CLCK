"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });
      if (response.status !== "success") {
        throw new Error( 'Login failed');
      }

      if (response.requiresVerification) {
        // Store email in localStorage for verification page
        localStorage.setItem('verificationEmail', response.email);
        localStorage.setItem('phoneNumber', response.phoneNumber)
        // Redirect to verification page
        router.push('/verification');
      } else {
        // Handle successful login without 2FA (shouldn't happen in our case)
        router.push('/user');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A3356] px-4">
      <div className="bg-white shadow-md w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
         </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-center text-black mb-1">Welcome Back!!</h2>
        <p className="text-center text-black text-sm mb-6">
          Please Enter your account credentials to access <br /> account on CLCK bookkeeping
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-black mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-black">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v.217l-8 4.8-8-4.8V4zm0 1.383l7.555 4.533a.5.5 0 00.445 0L16 5.383V12a2 2 0 01-2 2H2a2 2 0 01-2-2V5.383z"/>
                </svg>
              </span>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter Email Address" 
                className="pl-10 rounded-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-black mb-1 block">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-black">
              <Lock height={15} width={15}/>
              </span>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="pl-10 pr-10 rounded-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="absolute right-3 top-2.5 text-black cursor-pointer">
                <Eye size={16} />
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-left text-sm font-medium underline">
            <Link href="/forgot-password" className="text-[#2A3356] hover:underline">
              Forget Password
            </Link>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full mt-8"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-black mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#2A3356] hover:underline font-semibold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
