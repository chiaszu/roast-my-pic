import React, { useState, useCallback } from 'react';

interface ImageUploadProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: { text: string; model: string; timestamp: number }) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onAnalysisStart,
  onAnalysisComplete,
  isLoading,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    onAnalysisStart();
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('http://localhost:3000/api/v1/analyze', {
        method: 'POST',
        body: selectedImage,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (response.ok) {
        const result = await response.json();
        onAnalysisComplete({
          text: result.text,
          model: 'Gemini Vision',
          timestamp: Date.now(),
        });
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      onAnalysisComplete({
        text: 'Error analyzing image. Please try again.',
        model: 'Error',
        timestamp: Date.now(),
      });
    }
  };

  return (
    <div className="glass p-8">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${dragActive 
            ? 'border-orange-300 bg-orange-50' 
            : 'border-gray-300 hover:border-orange-400'
          }
          ${isLoading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!selectedImage && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
        )}
        
        {imagePreview ? (
          <div className="space-y-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
            />
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">{selectedImage?.name}</p>
              <div
                onClick={isLoading ? undefined : analyzeImage}
                className={`
                  bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 text-center select-none
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-orange-500 hover:to-orange-600 cursor-pointer'}
                `}
                style={{ boxShadow: 'none' }}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="text-gray-600">
              <p className="text-lg font-light mb-2">Drop an image here</p>
              <p className="text-gray-500 text-sm">or click to browse</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;