"use client"
import { Search, ChevronLeft, ChevronRight, Plus, Trash2, Edit, Play } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, AlertTriangle } from "lucide-react"

export default function EducationContentPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<any>(null)
  
  const educationalContent = [
    {
      id: 1,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "/image (3).png",
    },
    {
      id: 2,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "/image (4).png",
    },
    {
      id: 3,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "/image (5).png",
    },
    {
      id: 4,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "/image (6).png",
    },
    {
      id: 5,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "/image (7).png",
    },
    {
      id: 6,
      title: "Navigating Tax Season",
      description: "No flashing or moving content to prevent sensory sensitivities.",
      thumbnail: "/image (3).png",
    },
  ]

  const handleEdit = (content: any) => {
    setSelectedContent(content)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (content : any) => {
    setSelectedContent(content)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Educational Content</h1>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="flex justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border rounded-full" />
          </div>
          
          {/* Add New Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center bg-[#2A3356] text-yellow-200 px-4 py-2 rounded-3xl">
                <Plus className="h-5 w-5 mr-2" />
                Add New
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Educational Content</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-lg font-medium text-gray-600 mb-1">Upload Video</p>
                    <p className="text-sm text-gray-500 mb-4">Click to upload or drag or drop here</p>
                    <input type="file" className="hidden" id="video-upload" />
                    <label
                      htmlFor="video-upload"
                      className="px-4 py-2 bg-[#2A3356] text-white rounded-md cursor-pointer hover:bg-[#2A3356]/90"
                    >
                      Browse Files
                    </label>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input id="title" placeholder="Enter title" />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea id="description" placeholder="Add short description" className="min-h-32" />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button 
                    onClick={() => setIsAddDialogOpen(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button className="bg-[#2A3356] hover:bg-[#2A3356]/90">Add Content</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalContent.map((content) => (
            <div key={content.id} className="bg-gray-50 rounded-lg overflow-hidden group relative">
              <div className="relative">
                <img
                  src={content.thumbnail || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 bg-white bg-opacity-75 rounded-full flex items-center mb-28 justify-center">
                    <Play className="h-6 w-6 text-[#2A3356]" />
                  </div>
                </div>
                
                {/* Control buttons that appear on hover */}
                <div className="absolute justify-center top-0 w-full h-full items-center bg-[#192b5ec7]  right-0 hidden group-hover:flex space-x-2">
                  <button 
                    className="h-8 w-8 bg-black rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                    onClick={() => handleDelete(content)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                  <button 
                    className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                    onClick={() => handleEdit(content)}
                  >
                    <Edit className="h-4 w-4 text-[#2A3356]" />
                  </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{content.title}</h3>
                <p className="text-sm text-gray-500">{content.description}</p>
              </div>
            </div>
                </div>
          ))}
        </div>

        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
            <div className="flex items-center">
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
                1
              </div>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Total : 01 Pages
            </div>
          </div>
      </div>

      {/* Edit Dialog */}
      
      {selectedContent && (
        <div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-xl max-h-[98vh] overflow-y-auto p-6">
            <DialogHeader className="pb-4">
              <DialogTitle>Edit Educational Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 h-[190px] rounded-lg p-6">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-base font-medium text-gray-600 mb-1">Upload Video</p>
                  <p className="text-sm text-gray-500 mb-4">Click to upload or drag or drop here</p>
                  <input type="file" className="hidden" id="edit-video-upload" />
                  <label
                    htmlFor="edit-video-upload"
                    className="px-4 py-2 bg-[#2A3356] text-white rounded-md cursor-pointer hover:bg-[#2A3356]/90"
                  >
                    Browse Files
                  </label>
                </div>
              </div>
      
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#2A3356] rounded-full flex items-center justify-center mr-3">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Medone frozen.mp4</span>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#2A3356] h-full w-4/5 rounded-full"></div>
                </div>
              </div>
      
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input id="edit-title" defaultValue={selectedContent?.title} />
                </div>
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea 
                    id="edit-description" 
                    defaultValue={selectedContent?.description} 
                    className="resize-none h-16" 
                  />
                </div>
              </div>
      
              <div className="flex justify-start space-x-4 ">
                <button 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium"
                >
                  Cancel
                </button>
                <Button className="px-6 py-2 bg-[#2A3356] text-yellow-400 rounded-full font-medium">
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      )}
    

      {/* Delete Dialog */}
      {selectedContent && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
            </DialogHeader>
            <div className="py-4">
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <img src="../i.png" className=" text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2"> Delete Educational Content?</h3>
          
                <p className="text-gray-500">
                Are you sure you want to Delete This content?                </p>
              </div>
            </div>
            <DialogFooter className="sm:justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-7 py-3 border border-gray-900 text-gray-700 rounded-full font-medium w-40"
              >
                Cancel
              </Button>
              <Button 
                className="px-7 py-3 bg-[#2A3356] text-yellow-400 rounded-full font-medium w-40"
                >
Yes I am Sure              </Button>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}