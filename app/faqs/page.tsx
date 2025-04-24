import FaqSection from "@/components/faq-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
export default function FaqsPage() {
  return (
    <div>
      <Header/>
    <div className="min-h-screen justify-between">
      <section className="w-full py-12 md:py-24 bg-hero-bg bg-cover bg-center">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            <span className="text-[#F8D77E]">Frequently</span> Asked Questions
          </h1>
          <p className="mt-4 text-gray-300 max-w-[700px] mx-auto">
            Stuck on something? We are here to help with all your questions and answers.
          </p>
        </div>
      </section>
      <div className="flex justify-center items-center ml-20">
  <FaqSection />
</div>
    </div>
    <Footer/>

    </div>

  )
}
