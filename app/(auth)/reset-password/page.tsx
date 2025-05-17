import { ChevronLeft, X, Lock, Eye } from 'lucide-react';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-[#2E3B5B] flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <ChevronLeft className="cursor-pointer w-5 h-5" />
          <h2 className="text-xl font-bold">Reset Password</h2>
          <X className="cursor-pointer w-5 h-5" />
        </div>
        <label className="font-semibold block mb-1">New Password</label>
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full p-3 pl-10 pr-10 border rounded-full  focus:outline-none"
          />
          <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-black w-4 h-4" />
          <Eye className="absolute top-1/2 right-3 -translate-y-1/2 text-black w-4 h-4 cursor-pointer" />
        </div>
        <label className="font-semibold block mb-1">Confirm New Password</label>
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full p-3 pl-10 pr-10 border rounded-full  focus:outline-none"
          />
          <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-black w-4 h-4" />
          <Eye className="absolute top-1/2 right-3 -translate-y-1/2 text-black w-4 h-4 cursor-pointer" />
        </div>
        <div className='mt-28'>

        <button className="w-full bg-[#2E3B5B]  text-white rounded-full py-3 text-lg font-medium">
          Continue
        </button>
        </div>
      </div>
    </div>
  );
}
