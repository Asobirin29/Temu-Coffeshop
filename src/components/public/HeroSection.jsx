import React, { useState, useRef } from 'react';
import { DEFAULT_INFO, DEFAULT_HERO_SLIDES } from '../../data/defaultSeedData';

export default function HeroSection({ siteInfo, onNavigateMenu }) {
  const info = { ...DEFAULT_INFO, ...(siteInfo || {}) };

  // Hero photo set: the admin-editable hero photo first, then the archive slides
  const slides = [
    { imageUrl: info.heroImageUrl, caption: info.heroImageCaption || DEFAULT_HERO_SLIDES[0].caption },
    ...DEFAULT_HERO_SLIDES.map((s) => ({ imageUrl: s.imageUrl, caption: s.caption }))
  ].filter((s, i, arr) => s.imageUrl && arr.findIndex((x) => x.imageUrl === s.imageUrl) === i);

  const [active, setActive] = useState(0);
  const touchX = useRef(null);
  const current = slides[active] || slides[0];
  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  const isOpen = info.isOpen !== false;
  const statusLabel = isOpen
    ? `Buka hari ini · ${info.openingHours || '07:00 — 22:00 WIB'}`
    : (info.statusClosedText || 'Tutup sementara');

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy section-pad">
          <span className={`eyebrow ${isOpen ? '' : 'is-closed'}`}>
            <span className={`sq ${isOpen ? 'animate-pulse' : ''}`} />
            {statusLabel}
          </span>

          <h1 id="hero-title" className="hero__title">
            {info.heroTitle || 'RUANG TEMU, SECANGKIR ARSIP & PERCAKAPAN.'}
          </h1>

          {info.heroLead && <p className="hero__lead">{info.heroLead}</p>}

          <div className="hero__actions">
            <a
              href="#/menu"
              onClick={(e) => { e.preventDefault(); onNavigateMenu?.(); }}
              className="btn-swiss btn-accent btn-lg"
            >
              Lihat Menu ↗
            </a>
            <a
              href={info.googleMapsUrl || 'https://maps.google.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-swiss btn-lg"
            >
              Petunjuk Arah
            </a>
          </div>
        </div>

        <div
          className="hero__media"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null || slides.length < 2) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
            touchX.current = null;
          }}
        >
          <img
            key={current.imageUrl}
            src={current.imageUrl}
            alt={current.caption}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="hero__media-bar">
            <span className="hero__caption">{current.caption}</span>
            {slides.length > 1 && (
              <div className="hero__nav">
                <button type="button" onClick={prev} aria-label="Foto sebelumnya">←</button>
                <button type="button" onClick={next} aria-label="Foto selanjutnya">→</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="facts" aria-label="Info singkat kedai">
        <div className="facts__item">
          <span className="facts__label">Jam buka</span>
          <span className="facts__value">{info.openingHours || '07:00 — 22:00 WIB'}</span>
        </div>
        <div className="facts__item">
          <span className="facts__label">Lokasi</span>
          <span className="facts__value">{info.locationShort || info.address}</span>
        </div>
        <div className="facts__item">
          <span className="facts__label">Instagram</span>
          <span className="facts__value">{info.instagram || '@temu.coffeeshop'}</span>
        </div>
      </section>
    </>
  );
}
