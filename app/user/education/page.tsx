"use client"
import { Play } from "lucide-react"
import { useEffect, useState } from "react"
import { videoService, VideoData } from "@/app/services/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal } from "@/components/ui/dialog"
import VideoPlayer from "@/app/components/VideoPlayer"
import { toast } from "react-hot-toast"

interface PaginationInfo {
  total: number
  pages: number
  current: number
}

export default function EducationPage() {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    pages: 0,
    current: 1
  })
  const [isPlayDialogOpen, setIsPlayDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        // For now, we'll use the provided data directly
        const mockResponse = {
          data: {
            videos: [{
              id: "68288a4f7811355826da96c4",
              title: "news paper",
              description: "news paper",
              videoUrl: "https://res.cloudinary.com/di6eocv6p/video/upload/v1747487305/videos/video_6a897bfe-bf3c-49a7-8134-f196f5d52bc4.mp4",
              thumbnailUrl: "https://res.cloudinary.com/di6eocv6p/video/upload/v1747487305/videos/video_6a897bfe-bf3c-49a7-8134-f196f5d52bc4.jpg",
              status: "ready" as const,
              duration: 1.666667,
              createdAt: "2025-05-17T13:08:31.583Z"
            }],
            pagination: {
              total: 1,
              pages: 1,
              current: 1
            }
          }
        }
        setVideos(mockResponse.data.videos)
        setPagination(mockResponse.data.pagination)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [currentPage])

  const handlePlayVideo = (video: VideoData) => {
    setSelectedVideo(video)
    setIsPlayDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <div className="border-t-2 mt-16"></div>
      <div className="p-8">
        <h1 className="text-3xl font-inter font-bold mb-8">Educational Content</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
              <div className="relative p-5">
                <img
                  src={video.thumbnailUrl || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => handlePlayVideo(video)}
                    className="h-12 w-12 bg-white bg-opacity-75 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-inter font-semibold text-xl mb-2">{video.title}</h3>
                <p className="text-sm text-black">{video.description}</p>
                <div className="mt-2 text-xs text-gray-500">
                  Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </div>
                {video.status !== 'ready' && (
                  <div className="mt-2 text-xs text-yellow-600">
                    Status: {video.status}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Dialog */}
        {selectedVideo && (
          <Dialog open={isPlayDialogOpen} onOpenChange={setIsPlayDialogOpen}>
            <DialogPortal>
              <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader className="pb-4">
                  <DialogTitle>{selectedVideo.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {selectedVideo.videoUrl && selectedVideo.status === "ready" ? (
                    <div className="aspect-video w-full">
                      <VideoPlayer 
                        videoUrl={selectedVideo.videoUrl}
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
                          {selectedVideo.status === "uploading" ? "Video is still uploading..." :
                           selectedVideo.status === "processing" ? "Video is being processed..." :
                           `Video status: ${selectedVideo.status || "unknown"}`}
                        </p>
                        {(selectedVideo.status === "processing" || selectedVideo.status === "uploading") && (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{selectedVideo.title}</h3>
                    <p className="text-gray-600">{selectedVideo.description}</p>
                    <p className="text-sm text-gray-500">Status: {selectedVideo.status || "unknown"}</p>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        )}

        {pagination.pages > 1 && (
          <div className="flex justify-end mt-8">
            <nav className="flex items-center space-x-2">
              {Array.from({ length: Math.min(3, pagination.pages) }, (_, i) => i + 1).map((pageNum) => (
                <button 
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-8 w-12 font-inter font-medium border-2 border-black rounded-2xl flex items-center justify-center ${
                    currentPage === pageNum ? 'bg-black text-white' : 'text-black'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              {pagination.pages > 3 && (
                <>
                  <span className="px-2">...</span>
                  <button 
                    onClick={() => setCurrentPage(pagination.pages)}
                    className={`h-8 w-12 font-inter font-medium border-2 border-black rounded-2xl flex items-center justify-center ${
                      currentPage === pagination.pages ? 'bg-black text-white' : 'text-black'
                    }`}
                  >
                    {pagination.pages}
                  </button>
                </>
              )}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages}
                className={`px-3 py-1 border-2 font-inter font-medium border-black rounded-full ${
                  currentPage === pagination.pages 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
