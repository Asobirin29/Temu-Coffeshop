import React from 'react';
import { DEFAULT_INFO } from '../../data/defaultSeedData';

export default function LocationSection({ siteInfo }) {
  const info = siteInfo || DEFAULT_INFO;

  return (
    <section id="lokasi" style={{ backgroundColor: 'var(--dp-color-ground)' }}>
      <div className="swiss-grid hero-grid">
        {/* Kolom 1-9: Closing Statement & Architectural Grid Details */}
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
              {info.locationSectionTag || '03 / LOKASI & PERSINGGAHAN'}
            </div>
            <h2 className="text-display" style={{ fontSize: 'clamp(36px, 6vw, 92px)', marginBottom: '24px' }}>
              {info.locationTitle || 'SINGGAH DAN MULAI PERCAKAPAN.'}
            </h2>
            <p className="text-lead" style={{ maxWidth: '720px', color: '#333333' }}>
              {info.locationLead || DEFAULT_INFO.locationLead}
            </p>
          </div>

          <div 
            className="swiss-border-t" 
            style={{ 
              marginTop: '48px', 
              paddingTop: '24px', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px' 
            }}
          >
            <div>
              <div className="text-label" style={{ color: '#777777', marginBottom: '6px' }}>
                ALAMAT FISIK KEDAI
              </div>
              <div className="text-body" style={{ fontWeight: 700 }}>
                {info.address || DEFAULT_INFO.address}
              </div>
            </div>

            <div>
              <div className="text-label" style={{ color: '#777777', marginBottom: '6px' }}>
                WAKTU BUKA
              </div>
              <div className="text-body" style={{ fontWeight: 700 }}>
                {info.openingHours || DEFAULT_INFO.openingHours}
              </div>
              <div className="text-metadata" style={{ color: '#777777', marginTop: '2px' }}>
                {info.openingDays || 'Senin sampai Minggu tanpa libur'}
              </div>
            </div>

            <div>
              <div className="text-label" style={{ color: '#777777', marginBottom: '6px' }}>
                RESERVASI & PERTANYAAN
              </div>
              <div className="text-body" style={{ fontWeight: 700 }}>
                Via WhatsApp Resmi
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 10-12: Action Box */}
        <div 
          className="hero-right-col"
          style={{ 
            gridColumn: 'span 3', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'var(--dp-color-surface)',
            padding: 'var(--dp-spacing-gutter)'
          }}
        >
          <div>
            <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '12px' }}>
              [ PETUNJUK KEDATANGAN ]
            </div>
            <div className="text-item-title" style={{ marginBottom: '16px' }}>
              KUNJUNGI KAMI HARI INI
            </div>
            <p className="text-metadata" style={{ color: '#555555', marginBottom: '24px', lineHeight: 1.6 }}>
              {info.locationNote || 'Temu berlokasi strategis di area Senopati dengan fasilitas parkir kendaraan dan ramah pesepeda.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a 
              href={info.googleMapsUrl || DEFAULT_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn-swiss btn-accent" 
              style={{ width: '100%', textAlign: 'center' }}
            >
              BUKA GOOGLE MAPS ↗
            </a>
            <a 
              href={info.whatsappUrl || DEFAULT_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn-swiss" 
              style={{ width: '100%', textAlign: 'center' }}
            >
              CHAT VIA WHATSAPP ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
