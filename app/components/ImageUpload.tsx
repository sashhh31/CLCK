import React, { useState, useRef } from 'react';
import { cloudinaryService } from '@/app/services/cloudinary';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (url: string, publicId: string) => void;
  onImageDelete?: (publicId: string) => void;
  initialImage?: string;
  initialPublicId?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageDelete,
  initialImage,
  initialPublicId,
  className = '',
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [publicId, setPublicId] = useState<string | null>(initialPublicId || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await cloudinaryService.uploadImage(file);
      setImage(result.url);
      setPublicId(result.public_id);
      onImageUpload(result.url, result.public_id);
    } catch (err) {
      setError('Error uploading image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!publicId) return;

    setLoading(true);
    try {
      await cloudinaryService.deleteImage(publicId);
      setImage(null);
      setPublicId(null);
      onImageDelete?.(publicId);
    } catch (err) {
      setError('Error deleting image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      {image ? (
        <div className="relative group">
          <Image
            src={image}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={handleDelete}
            disabled={loading}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Click to upload an image
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </div>
  );
}; 