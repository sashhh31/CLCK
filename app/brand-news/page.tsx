import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function BrandNewsPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Bookkeeping 101: Why Keeping Track of Your Finances Matters",
      date: "Jul 02, 2024",
      image: "../image (3).png",
      link: "/brand-news/bookkeeping-101",
    },
    {
      id: 2,
      title: "Common Tax Mistakes and How to Avoid Them",
      date: "Jul 02, 2024",
      image: "../image (4).png",
      link: "/brand-news/tax-mistakes",
    },
    {
      id: 3,
      title: "How Digital Bookkeeping Makes Financial Management Easier",
      date: "Jul 02, 2024",
      image: "../image (5).png",
      link: "/brand-news/digital-bookkeeping",
    },
    {
      id: 4,
      title: "How AI is Revolutionizing Financial Reporting and Analysis",
      date: "Jul 02, 2024",
      image: "../image (6).png",
      link: "/brand-news/ai-financial-reporting",
    },
    {
      id: 5,
      title: "Financial Planning for People with Disabilities: Key Considerations",
      date: "Jul 02, 2024",
      image: "../image (7).png",
      link: "/brand-news/financial-planning-disabilities",
    },
    {
      id: 6,
      title: "Tax Planning Strategies for High-Net-Worth Individuals",
      date: "Jul 02, 2024",
      image: "../image (8).png",
      link: "/brand-news/tax-planning-high-net-worth",
    },
    {
      id: 7,
      title: "The Benefits of a Secure Online Document Management System",
      date: "Jul 02, 2024",
      image: "../aboutUs.png",
      link: "/brand-news/secure-document-management",
    },
    {
      id: 8,
      title: "How a One-on-One Power Hour Can Improve Your Finances",
      date: "Jul 02, 2024",
      image: "../image (4).png",
      link: "/brand-news/power-hour-finances",
    },
    {
      id: 9,
      title: "Tax Deductions You Might Be Missing Out On",
      date: "Jul 02, 2024",
      image: "../image (3).png",
      link: "/brand-news/tax-deductions",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-hero-bg bg-cover bg-center">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
              Brand <span className="text-[#F8D77E]">News</span> & Updates
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            {/* About Section */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">About Our News</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                We specialize in providing comprehensive financial services tailored to meet the unique needs of our
                clients.
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="group bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full">
                  <div className="overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{post.date}</p>
                    <h3 className="text-base sm:text-lg font-bold mb-2">{post.title}</h3>
                    <Link 
                      href={post.link} 
                      className="text-xs sm:text-sm font-medium text-[#2A3356] hover:underline mt-auto"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 h-8 w-8 sm:h-10 sm:w-10 p-0 text-xs sm:text-sm">1</Button>
                <Button className="bg-transparent text-[#2A3356] hover:bg-slate-100 h-8 w-8 sm:h-10 sm:w-10 p-0 text-xs sm:text-sm">2</Button>
                <Button className="bg-transparent text-[#2A3356] hover:bg-slate-100 h-8 w-8 sm:h-10 sm:w-10 p-0 text-xs sm:text-sm">3</Button>
                <span className="flex items-center px-1 sm:px-2 text-xs sm:text-sm">...</span>
                <Button className="bg-transparent text-[#2A3356] hover:bg-slate-100 h-8 w-8 sm:h-10 sm:w-10 p-0 text-xs sm:text-sm">7</Button>
                <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 text-xs sm:text-sm px-2 sm:px-4 h-8 sm:h-10">Next</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}