"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "@/app/services/api"
import { ChevronLeft, X } from "lucide-react"
import Cookies from 'js-cookie'

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Regular login for both admin and users
      const response = await authService.login({ email, password });
      if (response.requiresVerification) {
        // Store email for verification page
        localStorage.setItem('verificationEmail', email);
        localStorage.setItem('isLogin', 'true');
        router.push('/verification');
      } else if (response.data?.token) {
        // Store token in cookies
        
        // Redirect based on role
        if (response.data.user.role === 'admin') {
          Cookies.set('token', response.data.token, { expires: 7, path: '/' });
          router.push('/admin');
        } else {
          router.push('/login');
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err: any) {
      console.error('Login error:', err); // Debug log
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A3356] px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-xl p-8 relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="text-2xl text-[#2A3356] font-light"
          >
            <ChevronLeft/>
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Login</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-2xl text-[#2A3356] font-light"
          >
            <X/>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => router.push('/signup')}
              className="text-[#2A3356] font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
