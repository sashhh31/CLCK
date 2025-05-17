// components/VideoWrapper.tsx
import { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import { videoService } from '../services/api';

interface VideoWrapperProps {
  videoId: string;
  captionUrl?: string;
}

export default function VideoWrapper({ videoId, captionUrl }: VideoWrapperProps) {
  const [videoReady, setVideoReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkVideoStatus = async () => {
      try {
        console.log('Checking video status for ID:', videoId);
        const response = await videoService.getVideoStatus(videoId);
        const { video } = response.data;
        
        console.log('Video status response:', video);
        
        if (video.status === 'ready' && video.videoUrl) {
          console.log('Video is ready, URL:', video.videoUrl);
          setVideoUrl(video.videoUrl);
          setVideoReady(true);
        } else if (video.status === 'error') {
          console.error('Video processing failed');
          setError('Video processing failed. Please try uploading again.');
        } else {
          console.log('Video still processing, status:', video.status);
          // If video is still processing, check again after a delay
          setTimeout(checkVideoStatus, 5000);
        }
      } catch (err) {
        console.error('Error checking video status:', err);
        setError('Failed to load video. Please try again later.');
      }
    };

    checkVideoStatus();
  }, [videoId]);

  if (error) {
    return (
      <div className="w-full">
        <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!videoReady || !videoUrl) {
    return (
      <div className="w-full">
        <div className="relative w-full aspect-video bg-gray-100 flex items-center justify-center">
          <p className="text-sm text-gray-600">Processing video...</p>
        </div>
      </div>
    );
  }

  console.log('Rendering video player with URL:', videoUrl);

  return (
    <div className="w-full">
      <VideoPlayer
        videoUrl={videoUrl}
        onError={(err) => {
          console.error('Video player error:', err);
          setError('Video could not be played. Please try again later.');
        }}
      />
    </div>
  );
}
