
import React, { useRef, useCallback } from 'react';
import { CardData } from '../types';

interface ImageUploadProps {
  label: string;
  name: keyof CardData;
  onUpload: (name: keyof CardData, dataUrl: string) => void;
  required?: boolean;
  optional?: boolean;
  previewUrl: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, onUpload, required, optional, previewUrl }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(name, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [name, onUpload]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {optional && <span className="text-gray-400 ml-1">(Optional)</span>}
      </label>
      <div
        className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={handleButtonClick}
      >
        {previewUrl ? (
          <img src={previewUrl} alt={`${label} preview`} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="text-center text-gray-400">
            <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
            <p className="text-xs mt-1">Click to upload</p>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
