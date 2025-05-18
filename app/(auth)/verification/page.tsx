"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "@/app/services/api"
import { ChevronLeft, X } from "lucide-react"

export default function VerificationPage() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get email and isLogin from localStorage
    const storedEmail = localStorage.getItem('verificationEmail');
    const storedIsLogin = localStorage.getItem('isLogin') === 'true';
    
    if (!storedEmail) {
      router.push('/login');
      return;
    }
    
    setEmail(storedEmail);
    setIsLogin(storedIsLogin);

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.verify2FA({
        email,
        code: verificationCode,
        isLogin
      });

      if (response.status === 'success') {
        // Clear verification data
        localStorage.removeItem('verificationEmail');
        localStorage.removeItem('isLogin');
        // Redirect based on the response
        router.push(response.redirectTo || (isLogin ? '/user' : '/plans'));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setLoading(true);
    try {
      if (isLogin) {
        await authService.login({ email, password: "" }); // This will trigger a new verification code
      } else {
        // For registration, you might want to implement a resend registration code endpoint
        setError("Please try registering again");
        router.push('/signup');
        return;
      }
      setCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend code");
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
          <h1 className="text-xl font-bold text-[#1A1A1A]">Verify Email</h1>
          <button 
            onClick={() => router.push('/login')}
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

        <div className="text-center mb-6">
          <p className="text-gray-600">
            We've sent a verification code to your email address. Please enter it below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium mb-1">
              Verification Code
            </label>
            <Input
              id="verificationCode"
              type="text"
              placeholder="Enter verification code"
              className="rounded-full"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="text-[#2A3356] font-medium hover:underline"
                disabled={loading}
              >
                Resend Code
              </button>
            ) : (
              <span className="text-gray-400">
                Resend code in {countdown}s
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}