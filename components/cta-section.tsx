import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (<>
    <section
  className="w-full py-12 md:py-24 bg-right bg-no-repeat bg-cover relative text-white"
  style={{
    backgroundImage: `linear-gradient(to right, rgba(9, 20, 45, 0.9) 20%, rgba(9, 20, 45, 0.4) 50%, rgba(9, 20, 45, 0) 100%), url('../aboutUs.png')`,
  }}
>
  <div className="container px-4 md:px-6">
        <div className="max-w-[780px]">
          <h2 className="text-4xl font-medium sm:text-6xl text-white">
            Achieve Financial Freedom & <span className="text-[#F8D77E]">Keep Record</span> of Your Finance Now!
          </h2>
          <p className="mt-4 text-2xl text-gray-300">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our
            clients.
          </p>
          <div className="mt-16 ">
            <Button className="bg-[#F8D77E] text-3xl p-8 rounded-full text-medium text-[#2A3356] hover:bg-[#F8D77E]/90">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
    </>

  )
}
