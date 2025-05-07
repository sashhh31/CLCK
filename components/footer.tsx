import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import { fetchFooterData } from "@/lib/contentful"

export default async function Footer() {
  // Fetch footer data from Contentful
  const footerData = await fetchFooterData();

  return (
    <div className="w-full">
      <div className="w-full bg-[#2A3356] h-[80px] md:h-[100px] flex items-center justify-center">
        <img 
          src="../logo1.png" 
          alt="Logo" 
          className="h-[40px] md:h-[60px] w-auto"
        />
      </div>

      <footer className="bg-[#1C1C5A] text-white px-4 md:px-8 lg:px-20">
        <div className="container px-4 py-8 md:py-12 lg:py-16">
          <Link href="/" className="flex justify-left mr-10 mb-10">
            <div className="relative h-8 w-32 md:w-40 md:mr-10">
              <Image src={"/logo.png"} alt="Logo" fill className="object-contain" />
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="max-w-lg">
              <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6">
                {footerData.description || "At CLCK Bookkeeping-Taxation, we are more than just another accountancy firm—we are your trusted outsourced finance department with skilled communication approach for deafness and neurodiversity."}
              </p>
              <div className="flex space-x-4">
                <Link href={footerData.youtubeLink || "#"} className="bg-[#FFA500] p-2 rounded-full hover:bg-[#FFB730] transition">
                  <Youtube className="h-4 w-4 text-[#1C1C5A]" />
                </Link>
                <Link href={footerData.instagramLink || "#"} className="bg-[#FFA500] p-2 rounded-full hover:bg-[#FFB730] transition">
                  <Instagram className="h-4 w-4 text-[#1C1C5A]" />
                </Link>
                <Link href={footerData.facebookLink || "#"} className="bg-[#FFA500] p-2 rounded-full hover:bg-[#FFB730] transition">
                  <Facebook className="h-4 w-4 text-[#1C1C5A]" />
                </Link>
                <Link href={footerData.twitterLink || "#"} className="bg-[#FFA500] p-2 rounded-full hover:bg-[#FFB730] transition">
                  <Twitter className="h-4 w-4 text-[#1C1C5A]" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#FFA500]">About</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link href="/" className="text-base md:text-lg text-gray-200 hover:text-[#FFA500] transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="text-base md:text-lg text-gray-200 hover:text-[#FFA500] transition">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-base md:text-lg text-gray-200 hover:text-[#FFA500] transition">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-news" className="text-base md:text-lg text-gray-200 hover:text-[#FFA500] transition">
                      Blog / News
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="text-base md:text-lg text-gray-200 hover:text-[#FFA500] transition">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="text-base md:text-lg text-gray-200 hover:text-[#FFA500] transition">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4 text-[#FFA500]">Working Hours</h3>
                <ul className="space-y-4 md:space-y-6">
                  {footerData.workingDays && footerData.workingHours ? (
                    footerData.workingDays.map((day, index) => (
                      <li key={index} className="text-base md:text-lg text-gray-200">
                        {day}
                        <br />
                        {footerData.workingHours && index < footerData.workingHours.length 
                          ? footerData.workingHours[index] 
                          : ""}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="text-base md:text-lg text-gray-200">
                        Mon-Sat
                        <br />
                        12:00 PM - 14:45 PM
                      </li>
                      <li className="text-base md:text-lg text-gray-200">
                        Sat-Thu
                        <br />
                        17:30 PM - 00:00 AM
                      </li>
                      <li className="text-base md:text-lg text-gray-200">
                        Fri-Sat
                        <br />
                        17:30 PM - 00:00 AM
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-4 text-[#FFA500]">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-[#FFA500] p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#1C1C5A"
                      stroke="#1C1C5A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-medium text-[#FFA500]">Location</p>
                    <p className="text-base md:text-lg text-gray-200 whitespace-pre-line">
                      {footerData.location || "CLCK Bookkeeping-Taxation, 29 South view, Austerfield Doncaster\nSouth Yorkshire, DN106QR"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="bg-[#FFA500] p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#1C1C5A"
                      stroke="#1C1C5A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-medium text-[#FFA500]">Email Address</p>
                    <p className="text-base md:text-lg text-gray-200">{footerData.emailAddress || "hello@cooper-king.com"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6">
            <p className="text-base md:text-lg text-gray-400 text-center">
              Copyright © {new Date().getFullYear()} Clckbooking. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
