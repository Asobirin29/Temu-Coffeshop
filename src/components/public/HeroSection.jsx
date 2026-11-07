import React, { useState } from 'react';
import { DEFAULT_INFO, DEFAULT_HERO_SLIDES } from '../../data/defaultSeedData';

export default function HeroSection({ siteInfo, onNavigateMenu }) {
  const info = siteInfo || DEFAULT_INFO;
  const slides = DEFAULT_HERO_SLIDES;

  // Default to index 2 (Slide 03) to strictly match the requested Stitch screen:
  // "Temu-Coffeeshop — Public Landing Page (Hero Carousel Slide 03)"
  const [activeSlide, setActiveSlide] = useState(2);

  const currentSlide = slides[activeSlide] || slides[0];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="swiss-border-b" style={{ backgroundColor: 'var(--dp-color-ground)', width: '100%' }}>
      <div className="swiss-grid hero-grid">
        {/* Columns 1–9: Hero Content & Grayscale Photography */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 9', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}
        >
          {/* Upper Editorial Title */}
          <div 
            className="swiss-border-b" 
            style={{ 
              padding: 'clamp(24px, 3vw, 40px)', 
              backgroundColor: 'var(--dp-color-ground)' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span 
                className="font-tag-mono text-tag-mono swiss-border-all" 
                style={{ 
                  backgroundColor: 'var(--dp-color-surface)', 
                  padding: '3px 8px' 
                }}
              >
                {info.heroSectionTag || 'ARSIP PROTOKOL KOPI // SENOPATI'}
              </span>
              <span className="font-tag-mono text-tag-mono" style={{ color: 'var(--dp-color-muted)' }}>
                {info.catalogId || 'CATALOG ID: #TM-2025'}
              </span>
            </div>
            <h1 className="font-display-hero text-display-hero" style={{ margin: 0 }}>
              {info.heroTitle || 'RUANG TEMU, SECANGKIR ARSIP & PERCAKAPAN.'}
            </h1>
          </div>

          {/* Integrated Split Media / Manifesto (7 Cols + 5 Cols Split) */}
          <div className="hero-split-grid">
            {/* Grayscale Photography Area with Interactive Swiss Editorial Carousel (7 Cols) */}
            <div 
              className="hero-carousel-col swiss-border-r" 
              style={{ 
                backgroundColor: 'var(--dp-color-surface)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
              }}
            >
              {/* Top Controls Bar: Swiss Minimalist Navigation Ledger */}
              <div 
                className="swiss-border-b font-tag-mono text-tag-mono" 
                style={{ 
                  backgroundColor: 'var(--dp-color-ground)', 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  alignItems: 'stretch', 
                  justifyContent: 'space-between',
                  userSelect: 'none'
                }}
              >
                {/* Active Slide Counter with Signal Blue Accent Box */}
                <div 
                  className="swiss-border-r" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 16px', 
                    backgroundColor: 'var(--dp-color-surface)' 
                  }}
                >
                  <span 
                    style={{ 
                      width: '10px', 
                      height: '10px', 
                      backgroundColor: 'var(--dp-color-accent)', 
                      display: 'inline-block' 
                    }}
                  ></span>
                  <span style={{ fontWeight: 800, letterSpacing: '0.12em' }}>
                    0{activeSlide + 1} / 0{slides.length}
                  </span>
                  <span style={{ color: 'var(--dp-color-muted)', fontSize: '10px' }}>
                    [ARSIP VISUAL]
                  </span>
                </div>

                {/* Direct Index Jump Buttons */}
                <div style={{ display: 'flex', alignItems: 'stretch' }} className="swiss-border-r">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`font-tag-mono text-tag-mono ${idx !== slides.length - 1 ? 'swiss-border-r' : ''}`}
                      style={{ 
                        padding: '8px 14px',
                        borderTop: 'none',
                        borderBottom: 'none',
                        borderLeft: 'none',
                        backgroundColor: activeSlide === idx ? 'var(--dp-color-ink)' : 'var(--dp-color-ground)',
                        color: activeSlide === idx ? 'var(--dp-color-ground)' : 'var(--dp-color-ink)',
                        cursor: 'pointer',
                        fontWeight: 800
                      }}
                    >
                      {s.indexLabel}
                    </button>
                  ))}
                </div>

                {/* Prev / Next Navigation Controls */}
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="swiss-border-r font-tag-mono text-tag-mono"
                    style={{ 
                      padding: '8px 16px', 
                      borderTop: 'none', 
                      borderBottom: 'none', 
                      borderLeft: 'none', 
                      backgroundColor: 'var(--dp-color-ground)', 
                      color: 'var(--dp-color-ink)',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    title="Foto Sebelumnya"
                  >
                    [ ← PREV ]
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="font-tag-mono text-tag-mono"
                    style={{ 
                      padding: '8px 16px', 
                      border: 'none', 
                      backgroundColor: 'var(--dp-color-ground)', 
                      color: 'var(--dp-color-ink)',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                    title="Foto Selanjutnya"
                  >
                    [ NEXT → ]
                  </button>
                </div>
              </div>

              {/* Carousel Slides Viewport */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '380px', 
                  overflow: 'hidden', 
                  backgroundColor: 'var(--dp-color-surface)' 
                }}
              >
                <img 
                  src={currentSlide.imageUrl} 
                  alt={currentSlide.caption}
                  className="editorial-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.backgroundColor = '#181818';
                  }}
                />
              </div>

              {/* Bottom Status & Caption Ledger (Instant Swiss swap) */}
              <div 
                className="swiss-border-t font-tag-mono text-tag-mono" 
                style={{ 
                  backgroundColor: 'var(--dp-color-ground)', 
                  padding: '10px 16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}
              >
                <span style={{ fontWeight: 800 }}>
                  {currentSlide.caption}
                </span>
                <span style={{ color: 'var(--dp-color-accent)', fontWeight: 800, flexShrink: 0 }}>
                  {currentSlide.time}
                </span>
              </div>
            </div>

            {/* Editorial Manifesto (5 Cols) */}
            <div 
              className="hero-manifesto-col"
              style={{ 
                padding: 'clamp(20px, 2.5vw, 32px)', 
                backgroundColor: 'var(--dp-color-ground)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
              }}
            >
              <div>
                <span 
                  className="font-index-label text-index-label" 
                  style={{ color: 'var(--dp-color-accent)', display: 'block', marginBottom: '12px' }}
                >
                  {currentSlide.tag}
                </span>
                <p 
                  className="font-body-md text-body-md" 
                  style={{ lineHeight: 1.6, color: '#222222', marginBottom: '24px' }}
                >
                  {currentSlide.manifesto}
                </p>
              </div>

              <div 
                className="swiss-border-t font-tag-mono text-tag-mono" 
                style={{ 
                  paddingTop: '20px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '8px', 
                  color: 'var(--dp-color-muted)' 
                }}
              >
                {currentSlide.metrics.map((metric, idx) => (
                  <div key={idx}>{metric}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Columns 10–12: Status Operasional, Metrik & CTA */}
        <div 
          className="hero-right-col"
          style={{ 
            gridColumn: 'span 3', 
            backgroundColor: 'var(--dp-color-ground)', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}
        >
          <div className="swiss-border-b" style={{ padding: 'clamp(20px, 2.5vw, 32px)' }}>
            {/* Active Operational Signal in Signal Blue */}
            <div 
              className="swiss-border-all" 
              style={{ 
                padding: '10px 14px', 
                backgroundColor: 'var(--dp-color-surface)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '28px' 
              }}
            >
              <span 
                className="animate-pulse" 
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: 'var(--dp-color-accent)', 
                  display: 'inline-block' 
                }}
              ></span>
              <span className="font-metadata-bold text-metadata-bold" style={{ fontWeight: 800 }}>
                {info.statusLiveText || 'LIVE: OPEN UNTIL 22:00'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span 
                  className="font-index-label text-index-label" 
                  style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '6px' }}
                >
                  JADWAL LAYANAN OPERASIONAL
                </span>
                <div className="font-metadata-bold text-metadata-bold">
                  {info.openingHoursWeekday || 'SENIN — JUMAT: 07:00 – 22:00'}
                </div>
                <div className="font-metadata-bold text-metadata-bold" style={{ marginTop: '2px' }}>
                  {info.openingHoursWeekend || 'SABTU — MINGGU: 08:00 – 23:00'}
                </div>
              </div>

              <div className="swiss-border-t" style={{ paddingTop: '16px' }}>
                <span 
                  className="font-index-label text-index-label" 
                  style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '6px' }}
                >
                  KOORDINAT KEDAI JAKARTA
                </span>
                <div className="font-tag-mono text-tag-mono" style={{ fontWeight: 700 }}>
                  {info.coordinates || `6°14'02.1"S 106°48'33.2"E`}
                </div>
                <div className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', marginTop: '4px' }}>
                  {info.elevation || 'ELEVASI: 18M DPL / SUB-DISTRIK SENOPATI'}
                </div>
              </div>

              <div className="swiss-border-t" style={{ paddingTop: '16px' }}>
                <span 
                  className="font-index-label text-index-label" 
                  style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '6px' }}
                >
                  KAPASITAS KURSI TERSEDIA
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span className="font-headline-md text-headline-md" style={{ fontWeight: 800 }}>
                    {info.capacityOccupied !== undefined ? info.capacityOccupied : 24}
                  </span>
                  <span className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)' }}>
                    / {info.capacityTotal !== undefined ? info.capacityTotal : 36} MEJA TEROKUPASI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct CTA Action Button */}
          <div style={{ padding: 'clamp(20px, 2.5vw, 32px)', backgroundColor: 'var(--dp-color-surface)' }}>
            <a 
              href="#/menu" 
              onClick={(e) => {
                if (onNavigateMenu) {
                  e.preventDefault();
                  onNavigateMenu();
                }
              }}
              className="btn-swiss btn-accent" 
              style={{ width: '100%', padding: '16px', textAlign: 'center' }}
            >
              TELUSURI KATALOG MENU ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
