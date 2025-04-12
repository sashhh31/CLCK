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
    <div>
<Header/>

    <div className="min-h-screen">
      <section className="w-full py-12 md:py-24 bg-[#2A3356]">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Brand <span className="text-[#F8D77E]">News</span> & Updates
          </h1>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About Our News</h2>
            <p className="text-muted-foreground">
              We specialize in providing comprehensive financial services tailored to meet the unique needs of our
              clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="group bg-gray-100 rounded-2xl">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-62 object-cover transition-transform duration-300 group-hover:scale-105"
                    width={300}
                    height={200}
                    />
                </div>
                <div className="p-5">

                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <h3 className="text-lg font-bold ">{post.title}</h3>
                <Link href={post.link} className="text-sm mb-3 font-medium text-[#2A3356] hover:underline">
                  Read More
                </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90 h-10 w-10 p-0">1</Button>
              <Button className="bg-transparent text-[#2A3356] hover:bg-slate-100 h-10 w-10 p-0">2</Button>
              <Button className="bg-transparent text-[#2A3356] hover:bg-slate-100 h-10 w-10 p-0">3</Button>
              <span className="flex items-center px-2">...</span>
              <Button className="bg-transparent text-[#2A3356] hover:bg-slate-100 h-10 w-10 p-0">7</Button>
              <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90">Next</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
            </div>
  )
}
