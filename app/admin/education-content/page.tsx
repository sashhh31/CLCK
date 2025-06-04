"use client"
import { Search, ChevronLeft, ChevronRight, Plus, Trash2, Edit, Play } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, AlertTriangle } from "lucide-react"
import { videoService, VideoData } from "@/app/services/videoService"
import VideoPlayer from "@/app/components/VideoPlayer"
import { toast } from "react-hot-toast"

export default function EducationContentPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPlayDialogOpen, setIsPlayDialogOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<VideoData | null>(null)
  const [videos, setVideos] = useState<VideoData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedCaptionFile, setSelectedCaptionFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    
    fetchVideos()
  }, [currentPage])

  const fetchVideos = async () => {
    try {
      setIsLoading(true)
      const response = await videoService.listVideos(currentPage)
      console.log(response)
      setVideos(response.videos)
      setTotalPages(response.pagination.pages)
    } catch (error) {
      toast.error("Failed to fetch videos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleCaptionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'text/vtt' || file.name.endsWith('.vtt')) {
        setSelectedCaptionFile(file)
      } else {
        toast.error("Please select a valid VTT caption file")
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file")
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("video", selectedFile)
      formData.append("title", title)
      formData.append("description", description)
      
      if (selectedCaptionFile) {
        formData.append("caption", selectedCaptionFile)
      }

      const response = await videoService.uploadVideo(formData)
      console.log("Upload response:", response)
      
      // Start polling for video status
      const pollStatus = async () => {
        try {
          const statusResponse = await videoService.getVideoStatus(response.data.video.id)
          console.log("Video status response:", statusResponse)
          
          const videoStatus = statusResponse.data.video.status
          console.log("Current video status:", videoStatus)
          
          if (videoStatus === "ready") {
            toast.success("Video uploaded successfully")
            setIsAddDialogOpen(false)
            await fetchVideos() // Refresh the video list
            return
          } else if (videoStatus === "error") {
            toast.error("Video processing failed")
            return
          }
          
          // Continue polling if video is still processing
          console.log("Video still processing, polling again in 5 seconds...")
          setTimeout(pollStatus, 5000)
        } catch (error) {
          console.error("Error polling video status:", error)
          toast.error("Error checking video status")
        }
      }
      
      // Start polling immediately
      pollStatus()
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload video")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (video: VideoData) => {
    if (!selectedContent) return

    try {
      setIsLoading(true)
      await videoService.deleteVideo(selectedContent.id)
      toast.success("Video deleted successfully")
      setIsDeleteDialogOpen(false)
      fetchVideos()
    } catch (error) {
      toast.error("Failed to delete video")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (content: VideoData) => {
    setSelectedContent(content)
    setTitle(content.title)
    setDescription(content.description)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="border-t-2 mt-6 mb-2"></div>
      <h1 className="text-3xl font-bold mb-8">Educational Content</h1>

      <div className="bg-white rounded-3xl shadow-sm p-8 border">
        <div className="flex justify-between mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-2 border rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center bg-[#2A3356] text-yellow-200 px-4 py-2 rounded-3xl">
                <Plus className="h-5 w-5 mr-2" />
                Add New
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Educational Content</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {/* Video Upload Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-black mb-2" />
                    <p className="text-base font-medium text-black mb-1">Upload Video</p>
                    <p className="text-sm text-black mb-3">Click to upload or drag or drop here</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="video-upload" 
                      accept="video/*"
                      onChange={handleFileSelect}
                    />
                    <label
                      htmlFor="video-upload"
                      className="px-4 py-2 bg-[#2A3356] text-white rounded-md cursor-pointer hover:bg-[#2A3356]/90"
                    >
                      Browse Files
                    </label>
                    {selectedFile && (
                      <div className="mt-2 max-w-full">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="font-medium">Selected:</span>
                          <span className="truncate max-w-[300px]" title={selectedFile.name}>
                            {selectedFile.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {/* Title and Description Section */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input 
                      id="title" 
                      placeholder="Enter title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea 
                      id="description" 
                      placeholder="Add description" 
                      className="min-h-24"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button 
                    onClick={() => setIsAddDialogOpen(false)}
                    className="px-6 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button 
                    className="bg-[#2A3356] hover:bg-[#2A3356]/90"
                    onClick={handleUpload}
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Add Content"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group relative">
              <div className="relative aspect-video">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                  <button 
                    className="h-14 w-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-200"
                    onClick={() => {
                      setSelectedContent(video);
                      setIsPlayDialogOpen(true);
                    }}
                  >
                    <Play className="h-6 w-6 text-[#2A3356]" />
                  </button>
                </div>
                
                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button 
                    className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedContent(video);
                      setTitle(video.title);
                      setDescription(video.description);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 text-[#2A3356]" />
                  </button>
                  <button 
                    className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedContent(video);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{video.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                  {video.duration && (
                    <span>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200">
          <div className="flex items-center">
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="inline-flex items-center justify-center w-8 h-8 mx-1 text-sm font-medium text-white bg-blue-800 rounded-full">
              {currentPage}
            </div>
            <button 
              className="p-1 rounded-md hover:bg-gray-100"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div className="text-sm text-black ml-4">
            Total: {totalPages} Pages
          </div>
        </div>
      </div>

      {/* Play Dialog */}
      {selectedContent && (
        <Dialog open={isPlayDialogOpen} onOpenChange={setIsPlayDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <DialogHeader className="pb-4">
              <DialogTitle>{selectedContent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {selectedContent.videoUrl && selectedContent.status === "ready" ? (
                <div className="aspect-video w-full">
                  <VideoPlayer 
                    videoUrl={selectedContent.videoUrl}
                    onError={(error) => {
                      console.error("Video player error:", error)
                      toast.error("Error loading video")
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">
                      {selectedContent.status === "uploading" ? "Video is still uploading..." :
                       selectedContent.status === "processing" ? "Video is being processed..." :
                       `Video status: ${selectedContent.status || "unknown"}`}
                    </p>
                    {(selectedContent.status === "processing" || selectedContent.status === "uploading") && (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2A3356] mx-auto"></div>
                    )}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{selectedContent.title}</h3>
                <p className="text-gray-600">{selectedContent.description}</p>
                <p className="text-sm text-gray-500">Status: {selectedContent.status || "unknown"}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {selectedContent && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-xl max-h-[98vh] overflow-y-auto p-6">
            <DialogHeader className="pb-4">
              <DialogTitle>Edit Educational Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {selectedContent.videoUrl && selectedContent.status === "ready" && (
                <div className="aspect-video w-full">
                  <VideoPlayer 
                    videoUrl={selectedContent.videoUrl}
                    onError={(error) => {
                      console.error("Video player error:", error)
                      toast.error("Error loading video")
                    }}
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input 
                    id="edit-title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea 
                    id="edit-description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none h-16" 
                  />
                </div>
              </div>

              <div className="flex justify-start space-x-4">
                <button 
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setSelectedContent(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="px-6 py-2 bg-gray-200 text-black rounded-full font-medium"
                >
                  Cancel
                </button>
                <Button 
                  className="px-6 py-2 bg-[#2A3356] text-yellow-400 rounded-full font-medium"
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      await videoService.updateVideo(selectedContent.id, {
                        title,
                        description
                      });
                      toast.success("Video updated successfully");
                      setIsEditDialogOpen(false);
                      setSelectedContent(null);
                      setTitle("");
                      setDescription("");
                      fetchVideos();
                    } catch (error) {
                      toast.error("Failed to update video");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Delete Educational Content?</h3>
                <p className="text-black">
                  Are you sure you want to delete this content?
                </p>
              </div>
            </div>
            <DialogFooter className="sm:justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-7 py-3 border border-gray-900 text-black rounded-full font-medium w-40"
              >
                Cancel
              </Button>
              <Button 
                className="px-7 py-3 bg-[#2A3356] text-yellow-400 rounded-full font-medium w-40"
                onClick={(event) => handleDelete(selectedContent)}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Yes, I am Sure"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}