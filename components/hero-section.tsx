import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className=" w-full md:min-h-[700px] min-h-[500px] bg-[#2A3356] pt-12 md:pt-24 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-6 lg:gap-12">
          <div className="flex justify-center items-center">
            <div className="space-y-4 text-center items-center justify-center max-w-4xl">
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-6 md:mb-10">
                Simplify Your <span className="text-yellow-200">
                Finances
                  </span> with Secure Bookkeeping & Tax Services
              </h1>
              <p className="text-gray-300 text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Manage your bookkeeping and taxes effortlessly with our modern, secure, and user-friendly platform. Access financial tools, secure document storage, and exclusive resources designed for individuals and businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link href="/signup">
                <Button className="bg-[#F8D77E] text-[#2A3356] hover:bg-[#F8D77E]/90 rounded-full text-lg md:text-2xl py-6 px-6 md:p-8 font-medium">Get Started Now</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-end mt-8 md:mt-0">
            <div className="relative w-full max-w-full md:w-[90%] lg:w-[1200px] -mb-[200px] md:-mb-96 ">
              <img
                src="../c.png"
                alt="Dashboard screenshot"
                className="object-contain w-full"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}