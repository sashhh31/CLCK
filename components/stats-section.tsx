import { fetchAboutUsSectionData } from "@/lib/contentful";
import { AboutUsSection } from "@/lib/contentful-types";

export default async function StatsSection() {
  // Fetch about us section data from Contentful
  const aboutUsSection: AboutUsSection = await fetchAboutUsSectionData();
  
  // Get the numerical data and descriptions from Contentful
  const numericalData = aboutUsSection.numericalData || ["15+", "90%", "85%", "100+"];
  const descriptions = aboutUsSection.numericalDataDescription || ["Years Of Experience", "Satisfied Clients", "Problem Solved", "Expert Accountants"];

  // Make sure we have at least 4 items for display (or as many as needed)
  const displayCount = Math.min(numericalData.length, descriptions.length);

  return (
    <section className="w-full py-12 bg-primary text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {Array.from({ length: displayCount }).map((_, index) => (
            <div key={index}>
              <div className="relative">
                {index < displayCount - 1 && (
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#FFA50000] via-secondary to-[#FFA50000]"></div>
                )}
                <div className="p-4">
                  <h3 className="text-2xl md:text-7xl font-semibold mb-5 text-secondary">
                    {numericalData[index]}
                  </h3>
                  <p className="text-lg text-gray-300">{descriptions[index]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
