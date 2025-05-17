import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchBlogNewsItemBySlug, fetchBlogNewsItems } from "@/lib/contentful"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const blogPosts = await fetchBlogNewsItems();
  
  return blogPosts.map((post) => ({
    slug: post.slug
  }));
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  // Fetch the specific blog post by slug
  const post = await fetchBlogNewsItemBySlug(params.slug);
  
  // If no post found, show 404
  if (!post) {
    notFound();
  }

  // Fetch recent blog posts (excluding current)
  const allPosts = await fetchBlogNewsItems();
  const recentPosts = allPosts
    .filter(item => item.slug !== params.slug)
    .slice(0, 3);

  return (
    <div>
      <Header/>
      <div className="min-h-screen">
        <section className="w-full text-black">
          <div className="container px-4 mt-14 md:px-6">
            <Link href="/blog-news" className="inline-flex items-center text-black text-bold text-4xl">
              <ArrowLeft className="mr-2 h-8 w-8" />
              Blog / News
            </Link>
          </div>
        </section>

        <section className="w-full py-12 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-full mx-auto">
              {post.blogImage ? (
                <Image
                  src={post.blogImage.url}
                  alt={post.blogImage.title || post.blogHeader}
                  className="w-full h-auto rounded-3xl mb-6"
                  width={800}
                  height={400}
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 rounded-3xl mb-6 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}

              <h1 className="text-3xl font-bold mb-2">{post.blogHeader}</h1>
              <p className="text-muted-foreground mb-6">
                {post.blogDate ? formatDate(post.blogDate) : "No date"}
              </p>

              <div className="prose max-w-none">
                {post.blogContent && (
                  <div dangerouslySetInnerHTML={{ __html: post.blogContent.replace(/\n/g, '<br />') }} />
                )}
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Recent Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentPosts.map((post) => (
                    <div key={post.sys.id} className="group bg-gray-100 rounded-2xl">
                      <div className="overflow-hidden rounded-lg mb-4">
                        {post.blogImage ? (
                          <Image
                            src={post.blogImage.url}
                            alt={post.blogImage.title || post.blogHeader}
                            className="w-[500px] h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                            width={250}
                            height={450}
                          />
                        ) : (
                          <div className="w-[500px] h-56 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold mb-3">{post.blogHeader}</h3>
                        <Link href={`/blog-news/${post.slug}`} className="text-xs font-medium text-[#2A3356] hover:underline">
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
