"use client"

import React, { useState, useEffect } from 'react'
import { fetchImagesSectionData } from '@/lib/contentful'
import Image from 'next/image'

type ImageType = {
  url: string;
  title: string;
  description?: string;
};


const ImagesSection = () => {
  const [imageSections, setImageSections] = useState<ImageType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadImages() {
      try {
        const data:any = await fetchImagesSectionData()
        setImageSections(data)
      } catch (error) {
        console.error('Error loading images:', error)
        setError('Failed to load images')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadImages()
  }, [])
  
  if (isLoading) {
    return (
      <div className='mt-20'>
        <div className="container flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='mt-20'>
        <div className="container flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
      <div className='mt-20'>
        <div className="container flex justify-between items-center">
          <div className="h-20 w-full scale-110 flex gap-40 mb-20 items-center justify-center">
            {imageSections.map((image, index) => (
              <div key={index} className="w-[150px] h-[150px] mt-12">
                <Image
                  src={image.url}
                  alt={image.title}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
    }

export default ImagesSection
