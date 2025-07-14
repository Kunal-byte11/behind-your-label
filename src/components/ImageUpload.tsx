import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading?: boolean;
  selectedImage?: File | null;
  onClearImage?: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  isLoading = false,
  selectedImage,
  onClearImage
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    disabled: isLoading
  });

  if (selectedImage) {
    return (
      <div className="relative bg-white rounded-lg border-2 border-dashed border-gray-300 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{selectedImage.name}</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          {onClearImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearImage}
              className="text-gray-500 hover:text-red-500 p-1 sm:p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
        </div>
        <div>
          <p className="text-base sm:text-lg font-medium text-gray-900 mb-1">
            Upload Product Label
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Drag & drop an image or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-1 sm:mt-2">
            Supports JPG, PNG, WebP (Max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};