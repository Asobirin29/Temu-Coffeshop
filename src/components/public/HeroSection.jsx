import React from 'react';
import { DEFAULT_INFO } from '../../data/defaultSeedData';

export default function HeroSection({ siteInfo }) {
  const info = siteInfo || DEFAULT_INFO;
  const isKedaiOpen = info.isOpen !== undefined ? info.isOpen : true;
  const heroImage = info.heroImageUrl || "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="swiss-border-b" style={{ backgroundColor: 'var(--dp-color-ground)' }}>
      <div className="swiss-grid hero-grid">
        {/* Kolom 1-9: Broad Opening Statement & Editorial Hero Photo */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 9', 
            padding: 'var(--dp-spacing-gutter)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '16px' }}>
              [ {info.heroSectionTag || '00 // PENDAHULUAN & FILOSOFI'} ]
            </div>
            <h1 className="text-display" style={{ marginBottom: '24px' }}>
              {info.heroTitle || 'RUANG TEMU, ARSIP KOPI.'}
            </h1>
            <p className="text-lead" style={{ maxWidth: '780px', marginBottom: '36px', color: '#222222' }}>
              {info.heroLead || DEFAULT_INFO.heroLead}
            </p>
          </div>

          {/* Grayscale Hero Photo Frame */}
          <div 
            className="swiss-border-all" 
            style={{ 
              width: '100%', 
              height: '380px', 
              position: 'relative', 
              overflow: 'hidden',
              backgroundColor: 'var(--dp-color-surface)'
            }}
          >
            <img 
              src={heroImage} 
              alt={info.heroTitle || "Temu-Coffeeshop Interior Editorial"}
              className="editorial-img"
              onError={(e) => {
                // If offline or network issue, fallback to high-contrast dark box
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.style.backgroundColor = '#111111';
              }}
            />
            <div 
              className="swiss-border-t swiss-border-r" 
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                backgroundColor: 'var(--dp-color-ground)', 
                padding: '8px 16px',
                zIndex: 2
              }}
            >
              <span className="text-label">
                {info.heroImageCaption || 'ARSIP VISUAL 01 // INTERIOR RUANG SEDUH UTAMA'}
              </span>
            </div>
          </div>
        </div>

        {/* Kolom 10-12: Operational & Direct CTA */}
        <div 
          className="hero-right-col"
          style={{ 
            gridColumn: 'span 3', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'var(--dp-color-surface)'
          }}
        >
          {/* Status Box */}
          <div className="swiss-border-b" style={{ padding: '32px 24px', backgroundColor: 'var(--dp-color-ground)' }}>
            <div className="text-label" style={{ marginBottom: '12px' }}>
              STATUS KEDAI SAAT INI
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span className={`status-dot ${isKedaiOpen ? '' : 'closed'}`}></span>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '0.05em' }}>
                {isKedaiOpen ? (info.statusText || 'SEDANG BUKA') : (info.statusClosedText || 'TUTUP SEMENTARA')}
              </span>
            </div>
            <div className="text-metadata" style={{ color: '#555555' }}>
              {info.statusNote || 'Disangrai segar tiap pagi. Melayani seduhan manual dan espresso bar.'}
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="swiss-border-b" style={{ padding: '32px 24px' }}>
            <div className="text-label" style={{ marginBottom: '8px', color: '#666666' }}>
              WAKTU LAYANAN
            </div>
            <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>
              {info.openingHours || '07:00 — 22:00 WIB'}
            </div>
            <div className="text-metadata" style={{ color: '#777777' }}>
              {info.openingDays || 'Senin sampai Minggu tanpa libur'}
            </div>
          </div>

          {/* Koordinat & Alamat */}
          <div className="swiss-border-b" style={{ padding: '32px 24px' }}>
            <div className="text-label" style={{ marginBottom: '8px', color: '#666666' }}>
              LOKASI PRESISI
            </div>
            <div className="text-metadata" style={{ fontWeight: 700, marginBottom: '6px' }}>
              {info.locationArea || 'KEBAYORAN BARU, JAKARTA SELATAN'}
            </div>
            <div className="text-metadata" style={{ color: '#666666' }}>
              {info.locationShort || 'Jl. Senopati No. 42'}
            </div>
          </div>

          {/* Direct CTA Button */}
          <div style={{ padding: '24px', backgroundColor: 'var(--dp-color-ground)' }}>
            <a 
              href="#menu" 
              className="btn-swiss btn-accent" 
              style={{ width: '100%', padding: '16px', textAlign: 'center' }}
            >
              JELAJAHI KATALOG MENU ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
