// components/VideoPlayer.tsx
import { useEffect, useRef, useState } from 'react';
import { AdvancedVideo, lazyload } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { quality, format } from '@cloudinary/url-gen/actions/delivery';

interface VideoPlayerProps {
  videoUrl: string;
  onError?: (error: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onError }) => {
  const cld = useRef(new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    },
  }));
  
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    if (!videoUrl) {
      onError?.(new Error('No video URL provided'));
      return;
    }

    try {
      // Extract public ID from Cloudinary URL
      const urlAfterUpload = videoUrl.split('/upload/')[1];
      if (!urlAfterUpload) throw new Error('Invalid Cloudinary URL format');

      const publicId = urlAfterUpload.split('.')[0]; // remove file extension
      const vid = cld.current.video(publicId)
        .delivery(quality('auto'))
        .delivery(format('auto'));
      
      setVideo(vid);
    } catch (error) {
      console.error('Error initializing Cloudinary video:', error);
      onError?.(error);
    }
  }, [videoUrl, onError]);

  if (!video) {
    return (
      <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full">
      <AdvancedVideo
        cldVid={video}
        plugins={[lazyload()]}
        controls
        className="w-full h-full object-contain"
        onError={(error) => {
          console.error('Video player error:', error);
          onError?.(error);
        }}
      />
    </div>
  );
};

export default VideoPlayer;
