"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, ChevronLeft, X , Lock} from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/app/services/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Country codes data
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
  // Add more country codes as needed
];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    countryCode: "+1", // Default country code
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
      });
      if (response.requiresVerification) {
        localStorage.setItem('phoneNumber', `${formData.countryCode}${formData.phoneNumber}`);
        localStorage.setItem('verificationEmail', formData.email);
        router.push('/verification');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A3356] px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-xl p-8 relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-2xl text-[#2A3356] font-light"><ChevronLeft/></button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Register</h1>
          <button className="text-2xl text-[#2A3356] font-light"><X/></button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                className="rounded-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter Last Name"
                className="rounded-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                className="pl-10 rounded-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="absolute left-3 top-3 text-black">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v.217l-8 4.8-8-4.8V4zm0 1.383l7.555 4.533a.5.5 0 00.445 0L16 5.383V12a2 2 0 01-2 2H2a2 2 0 01-2-2V5.383z"/>
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <Select
                value={formData.countryCode}
                onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
              >
                <SelectTrigger className="w-[100px] rounded-full">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.code} ({country.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter Phone Number"
                  className="pl-10 rounded-full"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <span className="absolute left-3 top-3 text-black">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.482 8.062a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 012.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="pl-10 pr-10 rounded-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="absolute left-3 top-3 text-black">
                <Lock height={15} width={15}/>
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
              >
                <EyeIcon className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="pl-10 pr-10 rounded-full"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="absolute left-3 top-3 text-black">
                <Lock height={15} width={15}/>
              </span>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5"
              >
                <EyeIcon className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full bg-[#2A3356] hover:bg-[#2A3356]/90 rounded-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2A3356] font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
