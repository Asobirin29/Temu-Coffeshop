import React, { useState } from 'react';

export default function CardCarousel({
  images = [],
  alt = '',
  aspectRatio = '4 / 3',
  isAvailable = true,
  badges = null,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize image list
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const currentImage = validImages[currentIndex] || validImages[0] || '';
  const total = validImages.length;

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (idx, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(idx);
  };

  return (
    <div
      className={`card-carousel-container swiss-border-b ${className}`}
      style={{
        aspectRatio,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#181818'
      }}
    >
      {/* Current Image (Authentic Full Color - No Grayscale) */}
      {currentImage ? (
        <img
          src={currentImage}
          alt={`${alt} (Foto ${currentIndex + 1})`}
          className="editorial-img"
          style={{
            opacity: isAvailable ? 1 : 0.45,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666666',
            fontFamily: 'var(--dp-font-mono)',
            fontSize: '11px'
          }}
        >
          [ DOKUMENTASI TIDAK TERSEDIA ]
        </div>
      )}

      {/* Badges on Top */}
      {badges && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            zIndex: 10
          }}
        >
          {badges}
        </div>
      )}

      {/* Carousel Controls (Active when > 1 image) */}
      {total > 1 && (
        <>
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="card-carousel-nav prev"
            aria-label="Foto Sebelumnya"
            title="Foto Sebelumnya"
          >
            ‹
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="card-carousel-nav next"
            aria-label="Foto Selanjutnya"
            title="Foto Selanjutnya"
          >
            ›
          </button>

          {/* Slide Indicator Badge */}
          <div
            className="font-tag-mono text-tag-mono"
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              color: '#ffffff',
              padding: '2px 8px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              fontSize: '10px',
              letterSpacing: '0.08em',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--dp-color-accent)',
                display: 'inline-block'
              }}
            ></span>
            <span>{currentIndex + 1}/{total}</span>
          </div>

          {/* Indicator Dots at Bottom Center */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px',
              zIndex: 10,
              padding: '3px 6px',
              backgroundColor: 'rgba(0,0,0,0.65)',
              borderRadius: '2px'
            }}
          >
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleDotClick(idx, e)}
                style={{
                  width: idx === currentIndex ? '16px' : '6px',
                  height: '6px',
                  backgroundColor: idx === currentIndex ? 'var(--dp-color-accent)' : '#ffffff',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: idx === currentIndex ? 1 : 0.6
                }}
                aria-label={`Lihat foto ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

