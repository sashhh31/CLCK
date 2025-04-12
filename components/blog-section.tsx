import Link from "next/link"

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Bookkeeping 101: Why Keeping Track of Your Finances Matters",
      date: "Jul 02, 2024",
      image: "/placeholder.svg?height=200&width=300",
      link: "/blog/bookkeeping-101",
    },
    {
      id: 2,
      title: "Common Tax Mistakes and How to Avoid Them",
      date: "Jul 02, 2024",
      image: "/placeholder.svg?height=200&width=300",
      link: "/blog/tax-mistakes",
    },
    {
      id: 3,
      title: "How Digital Bookkeeping Makes Financial Management Easier",
      date: "Jul 02, 2024",
      image: "/placeholder.svg?height=200&width=300",
      link: "/blog/digital-bookkeeping",
    },
  ]

  return (
    <section className="w-full py-12 md:py-5 px-12 md:px-24">
         <div className="mt-12 mb-12">
         <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-7xl font-bold tracking-tighter sm:text-4xl">Our Latest Articles & Blogs</h2>
          <p className="max-w-[700px] text-muted-foreground text-xl text-medium">
          We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
          </p>
          {/* <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billingCycle === "monthly" ? "bg-[#2A3356] text-white" : "bg-transparent"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billingCycle === "yearly" ? "bg-[#2A3356] text-white" : "bg-transparent"
              }`}
            >
              Yearly
            </button>
          </div> */}
        </div>             
        
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[1120px] ml-32">
                {[
                  {
                    title: "The Future of Blockchain in Accounting: Opportunities and Challenges",
                    image: "../image (3).png",
                    link: "/brand-news/blockchain-accounting",
                  },
                  {
                    title: "Navigating Tax Season: Essential Tips for Small Business Owners",
                    image: "../image (4).png",
                    link: "/brand-news/tax-season-tips",
                  },
                  {
                    title: "How AI is Revolutionizing Financial Reporting and Analysis",
                    image: "../image (5).png",
                    link: "/brand-news/ai-financial-reporting",
                  },
                ].map((post, index) => (
                  <div key={index} className="group bg-gray-100 rounded-2xl">
                    <div className="overflow-hidden rounded-lg mb-4">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-[500px] h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        width={250}
                        height={450}
                        />
                    </div>
                    <div className="p-4">

                    <h3 className="text-sm font-bold mb-3">{post.title}</h3>
                    <Link href={post.link} className="text-xs font-medium text-[#2A3356] hover:underline">
                      Read More
                    </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    </section>
  )
}
