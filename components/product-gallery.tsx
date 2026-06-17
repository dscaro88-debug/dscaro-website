"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const normalizedImages = images.length > 0 ? images : ["/placeholder.svg"]
  const firstImage = normalizedImages[0]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = normalizedImages[selectedIndex] || firstImage

  useEffect(() => {
    setSelectedIndex(0)
  }, [firstImage])

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {normalizedImages.length > 1 && (
        <div className="mt-5">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {normalizedImages.map((img, i) => {
              const isSelected = i === selectedIndex

              return (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  aria-label={`View ${productName} image ${i + 1}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedIndex(i)}
                  onFocus={() => setSelectedIndex(i)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-primary shadow-sm"
                      : "border-border hover:border-primary/70"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${productName} - Image ${i + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 640px) 30vw, 96px"
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
