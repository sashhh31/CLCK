
import { fetchFeaturesSectionData } from "@/lib/contentful"
const FeaturesSection = async() => {



  // Destructure the data for easier use
  const { title, cardTitle, cardDescription, cardIcon } = await fetchFeaturesSectionData()
  return (
    <div>
      <section className="py-4 px-4 md:px-4 lg:px-4 bg-white">
        <div className="flex justify-center my-10">
          <h2 className="text-3xl md:text-5xl font-bold max-w-4xl text-center mb-12">
            {title || "Our Customer Platform Everyone's Business"}
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-14 w-[1200px] justify-center">
            {/* Render each feature card dynamically */}
            {(cardTitle || []).map((title, index) => {
              const description = cardDescription?.[index] || ''
              const icon = cardIcon?.[index] || { url: '', title: '' }
              
              // Determine which icon to use
              let iconUrl = icon.url
              if (!iconUrl) {
                if (index === 0) iconUrl = "../Banknote copy.png"
                else if (index === 1) iconUrl = "../Shield copy.png"
                else iconUrl = "../Pie Chart copy.png"
              }
              
              return (
                <div 
                  key={index} 
                  className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-primary text-white hover:border-secondary"
                >
                  <div className="w-14 h-14 mb-10 bg-[#f0d687] rounded-full flex items-center justify-center p-2">
                    <img
                      src={iconUrl}
                      alt={`Icon for ${title}`}
                      className="w-20 h-20 object-contain"  
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-secondary">
                    {title}
                  </h3>
                  <p className="text-gray-300">
                    {description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesSection
