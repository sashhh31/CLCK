import { Play } from "lucide-react"

export default function EducationPage() {
  const educationalContent = [
    {
      id: 1,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "../image (3).png",
    },
    {
      id: 2,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "../image (4).png",
    },
    {
      id: 3,
      title: "9 Tax Planning Strategies for Individuals",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "../image (5).png",
    },
    {
      id: 4,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "../image (6).png",
    },
    {
      id: 5,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "../image (7).png",
    },
    {
      id: 6,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "../image (3).png",
    },
  ]

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <div className="border-t-2 mt-16"></div>
      <div className="p-8">

      <h1 className="text-3xl font-inter font-bold mb-8">Educational Content</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalContent.map((content) => (
          <div key={content.id} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="relative p-5 ">
              <img
                src={content.thumbnail || "/placeholder.svg"}
                alt={content.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="h-12 w-12 bg-white bg-opacity-75 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                  <Play className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-inter font-semibold text-xl mb-2">{content.title}</h3>
              <p className="text-sm text-black">{content.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <nav className="flex items-center space-x-2">
          <button className="h-8 w-12  text-black font-inter font-medium border-2 border-black rounded-2xl flex items-center justify-center">1</button>
          <button className="h-8 w-12 bg-transparent font-inter font-medium text-black hover:bg-gray-100 rounded-2xl flex items-center justify-center">
            2
          </button>
          <button className="h-8 w-12 bg-transparent font-inter font-medium text-black hover:bg-gray-100 rounded-2xl flex items-center justify-center">
            3
          </button>
          <span className="px-2">...</span>
          <button className="h-8 w-12 bg-transparent font-inter font-medium text-black hover:bg-gray-100 rounded-2xl flex items-center justify-center">
            7
          </button>
          <button className="px-3 py-1 bg-black text-white border-2 font-inter font-medium border-black rounded-full">Next</button>
        </nav>
      </div>
      </div>

    </div>
  )
}
