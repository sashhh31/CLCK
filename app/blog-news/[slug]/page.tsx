import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div>
<Header/>
    <div className="min-h-screen">
      <section className="w-full text-black">
        <div className="container px-4 mt-14 md:px-6">
          <Link href="/brand-news" className="inline-flex items-center text-black text-bold text-4xl">
            <ArrowLeft className="mr-2 h-8 w-8" />
            Brand News Detail
          </Link>
        </div>
      </section>

      <section className="w-full py-12 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-full mx-auto">
            <img
              src="../aboutUs.png"
              alt="Blog post"
              className="w-full h-auto rounded-3xl mb-6"
              width={800}
              height={400}
              />

            <h1 className="text-3xl font-bold mb-2">Bookkeeping 101: Why Keeping Track of Your Finances Matters</h1>
            <p className="text-muted-foreground mb-6">Apr 10, 2024</p>

            <div className="prose max-w-none">
              <p className="mb-4">
                The Key Laboratory of Oolong Tea Processing Technology of the Ministry of Agriculture and Rural Affairs
                is an important carrier for the innovative development of Bama Tea Industry.
              </p>

              <p className="mb-4">
                With the goal of enhancing independent innovation capabilities, focusing on tea industry technology
                research and integration transformation, strengthening the construction of innovative talent teams,
                improving infrastructure and equipment levels, consolidating the foundation of enterprise application
                research, and further consolidating and enhancing the core competitiveness of Bama Tea Industry in the
                field of oolong tea, Bama Tea Industry continues to deeply implement the innovation driven development
                strategy, driving the high-quality development of China's tea industry.
              </p>

              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  The Key Laboratory of Oolong Tea Processing Technology of the Ministry of Agriculture and Rural
                  Affairs is an important carrier for the innovative development of Bama Tea Industry.
                </li>
                <li>
                  With the goal of enhancing independent innovation capabilities, focusing on tea industry technology
                  research and integration transformation, strengthening the construction of innovative talent teams,
                  improving infrastructure and equipment levels.
                </li>
                <li>
                  consolidating the foundation of enterprise application research, and further consolidating and
                  enhancing the core competitiveness of Bama Tea Industry in the field of oolong tea.
                </li>
                <li>
                  Bama Tea Industry continues to deeply implement the innovation driven development strategy, driving
                  the high-quality development of China's tea industry.
                </li>
              </ul>

              <p>
                Improving infrastructure and equipment levels, consolidating the foundation of enterprise application
                research, and further consolidating and enhancing the core competitiveness of Bama Tea Industry in the
                field of oolong tea. Bama Tea Industry continues to deeply implement the innovation driven development
                strategy, driving the high-quality development of China's tea industry.
              </p>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recent Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>
    </div>
    <Footer/>
                </div>
  )
}
