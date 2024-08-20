"use client"
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

export default function ImagenUpload({image}: {image: string | undefined}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      // No need to call uploadImage here, as the form submission will handle it
    }
  };


  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
      >
        <TbPhotoPlus className="text-4xl text-gray-400" />
        <span className="ml-2">Cargar Imagen</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {selectedImage ? (
        <>
            <div className="mt-4">
            <p>Selected image: {selectedImage.name}</p>
            <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="mt-2 max-w-xs"
            />
            </div>

            <input
            type="hidden"
            name="image"
            value={selectedImage.name.split('.').slice(0, -1).join('.')}
            />
        </>
        )
      : 
      <div className="mt-4 flex flex-col items-center">
            <p>Imagen actual: {image}</p>
            <Image
            src={`/products/${image}.jpg`}
            alt="Actual"
            className="mt-2 max-w-xs"
            width={100}
            height={100}
            />
        </div>
      }

    </div>
  );
}
