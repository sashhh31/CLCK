import { ArrowUpRight } from 'lucide-react'
import { fetchServiceSectionData } from '@/lib/contentful'
import Link from 'next/link'

interface ServiceSection {
  title?: string;
  description?: string;
  icon?: {
    url?: string;
    title?: string;
  };
  cardTitle?: string[];
  cardDescription?: string[];
}

const TaxSection = async () => {
  const serviceSection: ServiceSection = await fetchServiceSectionData();

  return (
    <div className="w-full">
      <section className="w-full py-16 bg-white text-[#1C1C1C] h-fit">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {serviceSection.title || 'Our Services'}
            </h2>
            <p className="text-black max-w-3xl text-2xl mx-auto">
              {serviceSection.description || "We specialize in providing comprehensive financial services tailored to meet the unique needs of our clients."}
            </p>
          </div>
          {/* Button */}
          <div className="text-center mb-16">
            <Link href="/services">
              <button className="bg-primary text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-primary/70 transition duration-200">
                Explore All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {serviceSection.cardTitle?.map((title, index) => (
          <div 
            key={index}
            className="bg-primary scale-105 border-2 border-secondary rounded-2xl p-6 flex flex-col gap-4 text-white min-h-[300px]"
          >
            <div className="w-20 h-20 bg-[#f0d687] rounded-full flex items-center justify-center p-3">
              <img
                src={serviceSection.icon?.url || `../RTM_taxation copy.png`}
                alt={serviceSection.icon?.title || title}
                className="w-20 h-20 object-contain"
              />
            </div>
            <h3 className="text-3xl font-semibold mt-8 text-secondary">{title}</h3>
            <p className="text-white text-lg flex-grow">
              {serviceSection.cardDescription?.[index]}
            </p>
            <Link
              href="/services"
              className="text-sm font-medium text-secondary hover:text-white transition-colors duration-200 inline-flex items-center gap-1 mt-4"
            >
              View Detail <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaxSection
  