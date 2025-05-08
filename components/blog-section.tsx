import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { fetchBlogNewsItems } from "@/lib/contentful"
import { formatDate } from "@/lib/utils"

export default async function BlogSection() {
  // Fetch blog posts from Contentful
  const allPosts = await fetchBlogNewsItems();
  
  // Get only the first 3 posts
  const blogPosts = allPosts.slice(0, 3);

  return (
    <section className="w-full py-12 md:py-16 bg-white text-primary">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Our Latest Articles & Blogs</h2>
          <p className="max-w-[700px] text-gray-600 text-lg">
            We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1120px]">
            {blogPosts.map((post) => (
              <div key={post.sys.id} className="group bg-gray-100 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-[#1C1C5A33] hover:translate-y-[-5px]">
                <div className="overflow-hidden">
                  {post.blogImage ? (
                    <Image
                      src={post.blogImage.url}
                      alt={post.blogImage.title || post.blogHeader}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      width={500}
                      height={300}
                    />
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2">
                    {post.blogDate ? formatDate(post.blogDate) : "No date"}
                  </p>
                  <h3 className="text-md font-bold mb-3 text-primary">{post.blogHeader}</h3>
                  <Link 
                    href={`/blog-news/${post.slug}`} 
                    className="inline-flex items-center text-primary hover:text-[#2A2A6A] transition-colors duration-200 text-sm font-medium"
                  >
                    Read More 
                    <span className="ml-2 bg-primary rounded-full p-1 group-hover:bg-[#2A2A6A] transition-colors duration-200">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
