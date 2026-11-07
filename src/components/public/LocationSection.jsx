import React from 'react';
import { DEFAULT_INFO } from '../../data/defaultSeedData';

export default function LocationSection({ siteInfo }) {
  const info = siteInfo || DEFAULT_INFO;

  return (
    <section 
      id="lokasi" 
      className="swiss-border-b" 
      style={{ 
        backgroundColor: 'var(--dp-color-ground)', 
        color: 'var(--dp-color-ink)',
        width: '100%' 
      }}
    >
      <div className="swiss-grid hero-grid">
        {/* Columns 1–9: Informasi Fisik, Waktu Seduh & Denah Teks Arsip */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 9', 
            padding: 'clamp(24px, 3vw, 40px)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            backgroundColor: 'var(--dp-color-ground)'
          }}
        >
          <div>
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="font-headline-lg text-headline-lg" style={{ lineHeight: 1 }}>
                  02 /
                </span>
                <span 
                  style={{ 
                    width: '10px', 
                    height: '10px', 
                    backgroundColor: 'var(--dp-color-accent)', 
                    display: 'inline-block' 
                  }}
                ></span>
              </div>
              <h2 className="font-headline-md text-headline-md">
                LOKASI KEDAI & TITIK TEMU FISIK
              </h2>
            </div>

            {/* 2-Column Info Matrix */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px', 
                marginBottom: '36px' 
              }}
            >
              {/* Kolom Alamat Fisik */}
              <div 
                className="swiss-border-all" 
                style={{ 
                  padding: '20px', 
                  backgroundColor: 'var(--dp-color-ground)' 
                }}
              >
                <span 
                  className="font-index-label text-index-label" 
                  style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '8px' }}
                >
                  ALAMAT KEDAI FISIK
                </span>
                <div className="font-headline-md text-headline-md" style={{ marginBottom: '4px' }}>
                  {info.address || 'JL. PARAMON'}
                </div>
                <div className="font-body-md text-body-md" style={{ marginBottom: '16px', color: '#222222' }}>
                  {info.addressDetail || 'perum alam asri'}
                </div>
                <div 
                  className="swiss-border-t font-tag-mono text-tag-mono" 
                  style={{ paddingTop: '10px', color: 'var(--dp-color-muted)' }}
                >
                  {info.addressBenchmark || 'PATOKAN: Belokan pertama dari arahan perumahan dan mentok di ujung'}
                </div>
              </div>

              {/* Kolom Waktu Seduh Presisi */}
              <div 
                className="swiss-border-all" 
                style={{ 
                  padding: '20px', 
                  backgroundColor: 'var(--dp-color-ground)' 
                }}
              >
                <span 
                  className="font-index-label text-index-label" 
                  style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '8px' }}
                >
                  WAKTU LAYANAN SEDUH HARIAN
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--dp-color-surface)', paddingBottom: '4px' }}>
                    <span className="font-body-sm text-body-sm">SENIN — KAMIS</span>
                    <span className="font-metadata-bold text-metadata-bold">07:00 — 22:00 WIB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--dp-color-surface)', paddingBottom: '4px' }}>
                    <span className="font-body-sm text-body-sm">JUMAT</span>
                    <span className="font-metadata-bold text-metadata-bold">07:00 — 23:00 WIB</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="font-body-sm text-body-sm">SABTU — MINGGU</span>
                    <span className="font-metadata-bold text-metadata-bold">08:00 — 23:00 WIB</span>
                  </div>
                </div>
                <div 
                  className="swiss-border-t font-tag-mono text-tag-mono" 
                  style={{ 
                    paddingTop: '10px', 
                    color: 'var(--dp-color-accent)', 
                    fontWeight: 800 
                  }}
                >
                  {info.lastOrderNote || 'LAST ORDER: 30 MENIT SEBELUM TUTUP PROTOKOL'}
                </div>
              </div>
            </div>

            {/* Denah Teks Arsip (Archival Text Schematics) */}
            <div 
              className="swiss-border-all" 
              style={{ 
                padding: '20px', 
                backgroundColor: 'var(--dp-color-surface)' 
              }}
            >
              <div 
                className="swiss-border-b" 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  paddingBottom: '10px', 
                  marginBottom: '16px' 
                }}
              >
                <span className="font-index-label text-index-label">
                  SCHEMATIC 03-A // DENAH PEMBAGIAN ZONA RUANG TEMU
                </span>
                <span className="font-tag-mono text-tag-mono" style={{ color: 'var(--dp-color-muted)' }}>
                  SKALA 1:100
                </span>
              </div>

              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
                  gap: '12px',
                  textAlign: 'center' 
                }}
              >
                {/* Zona A */}
                <div 
                  className="swiss-border-all font-tag-mono text-tag-mono" 
                  style={{ 
                    padding: '16px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '120px'
                  }}
                >
                  <div>
                    <div style={{ color: 'var(--dp-color-accent)', fontWeight: 800, marginBottom: '4px' }}>
                      [ ZONA A ]
                    </div>
                    <div className="font-metadata-bold text-metadata-bold" style={{ marginBottom: '8px' }}>
                      BAR SEDUH & ESPRESSO
                    </div>
                  </div>
                  <div style={{ color: 'var(--dp-color-muted)', fontSize: '10px', borderTop: '1px solid var(--dp-color-surface)', paddingTop: '6px' }}>
                    STANDARISASI BARISTA
                  </div>
                </div>

                {/* Zona B */}
                <div 
                  className="swiss-border-all font-tag-mono text-tag-mono" 
                  style={{ 
                    padding: '16px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '120px'
                  }}
                >
                  <div>
                    <div style={{ color: 'var(--dp-color-accent)', fontWeight: 800, marginBottom: '4px' }}>
                      [ ZONA B ]
                    </div>
                    <div className="font-metadata-bold text-metadata-bold" style={{ marginBottom: '8px' }}>
                      KOMUNAL DISCUSSION
                    </div>
                  </div>
                  <div style={{ color: 'var(--dp-color-muted)', fontSize: '10px', borderTop: '1px solid var(--dp-color-surface)', paddingTop: '6px' }}>
                    MEJA STAINLESS SUS 304
                  </div>
                </div>

                {/* Zona C */}
                <div 
                  className="swiss-border-all font-tag-mono text-tag-mono" 
                  style={{ 
                    padding: '16px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '120px'
                  }}
                >
                  <div>
                    <div style={{ color: 'var(--dp-color-accent)', fontWeight: 800, marginBottom: '4px' }}>
                      [ ZONA C ]
                    </div>
                    <div className="font-metadata-bold text-metadata-bold" style={{ marginBottom: '8px' }}>
                      TERAS VENTILASI ALAMI
                    </div>
                  </div>
                  <div style={{ color: 'var(--dp-color-muted)', fontSize: '10px', borderTop: '1px solid var(--dp-color-surface)', paddingTop: '6px' }}>
                    AREA LUAR / MEROKOK
                  </div>
                </div>

                {/* Zona D */}
                <div 
                  className="swiss-border-all font-tag-mono text-tag-mono" 
                  style={{ 
                    padding: '16px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '120px'
                  }}
                >
                  <div>
                    <div style={{ color: 'var(--dp-color-accent)', fontWeight: 800, marginBottom: '4px' }}>
                      [ ZONA D ]
                    </div>
                    <div className="font-metadata-bold text-metadata-bold" style={{ marginBottom: '8px' }}>
                      ARCHIVE LIBRARY
                    </div>
                  </div>
                  <div style={{ color: 'var(--dp-color-muted)', fontSize: '10px', borderTop: '1px solid var(--dp-color-surface)', paddingTop: '6px' }}>
                    DOKUMEN BIJI & DESAIN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columns 10–12: Aksi Navigasi Maps & Reservasi */}
        <div 
          className="hero-right-col"
          style={{ 
            gridColumn: 'span 3', 
            backgroundColor: 'var(--dp-color-ground)', 
            padding: 'clamp(24px, 3vw, 40px)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}
        >
          <div>
            <span 
              className="font-index-label text-index-label" 
              style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '16px' }}
            >
              NAVIGASI & RESERVASI
            </span>

            <div 
              className="swiss-border-all" 
              style={{ 
                padding: '20px', 
                backgroundColor: 'var(--dp-color-surface)', 
                marginBottom: '24px' 
              }}
            >
              <div 
                className="font-tag-mono text-tag-mono" 
                style={{ color: 'var(--dp-color-muted)', marginBottom: '8px' }}
              >
                STATUS RESERVASI:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <div 
                  className="swiss-border-all" 
                  style={{ 
                    padding: '6px 10px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span className="font-metadata-bold text-metadata-bold" style={{ fontSize: '12px' }}>
                    BAR SEDUH & ESPRESSO
                  </span>
                  <span className="font-tag-mono text-tag-mono" style={{ fontSize: '10px', color: 'var(--dp-color-muted)' }}>
                    STANDARISASI BARISTA
                  </span>
                </div>

                <div 
                  className="swiss-border-all" 
                  style={{ 
                    padding: '6px 10px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--dp-color-accent)', fontWeight: 800, fontSize: '11px' }}>[ ZONA B ]</span>
                    <span className="font-metadata-bold text-metadata-bold" style={{ fontSize: '12px' }}>KOMUNAL</span>
                  </div>
                  <span className="font-tag-mono text-tag-mono" style={{ fontSize: '10px', color: 'var(--dp-color-muted)' }}>
                    MEJA SUS 304
                  </span>
                </div>

                <div 
                  className="swiss-border-all" 
                  style={{ 
                    padding: '6px 10px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--dp-color-accent)', fontWeight: 800, fontSize: '11px' }}>[ ZONA C ]</span>
                    <span className="font-metadata-bold text-metadata-bold" style={{ fontSize: '12px' }}>TERAS</span>
                  </div>
                  <span className="font-tag-mono text-tag-mono" style={{ fontSize: '10px', color: 'var(--dp-color-muted)' }}>
                    VENTILASI ALAMI
                  </span>
                </div>

                <div 
                  className="swiss-border-all" 
                  style={{ 
                    padding: '6px 10px', 
                    backgroundColor: 'var(--dp-color-ground)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--dp-color-accent)', fontWeight: 800, fontSize: '11px' }}>[ ZONA D ]</span>
                    <span className="font-metadata-bold text-metadata-bold" style={{ fontSize: '12px' }}>ARCHIVE</span>
                  </div>
                  <span className="font-tag-mono text-tag-mono" style={{ fontSize: '10px', color: 'var(--dp-color-muted)' }}>
                    DOKUMEN BIJI
                  </span>
                </div>
              </div>

              <p className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.5 }}>
                Kami memprioritaskan tamu langsung untuk menjaga ritme ruang yang mengalir. Reservasi meja komunal hanya dibuka untuk kelompok studi & diskusi minimum 8 orang.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href={info.googleMapsUrl || 'https://maps.google.com'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-swiss btn-accent"
                style={{ width: '100%', padding: '16px', textAlign: 'center' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>near_me</span>
                PETUNJUK ARAH (MAPS)
              </a>

              <a 
                href={info.whatsappUrl || 'https://wa.me/6281234567890'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-swiss"
                style={{ width: '100%', padding: '16px', textAlign: 'center' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
                HUBUNGI BARISTA PROTOKOL
              </a>
            </div>
          </div>

          <div 
            className="swiss-border-t font-tag-mono text-tag-mono" 
            style={{ 
              marginTop: '28px', 
              paddingTop: '16px', 
              color: 'var(--dp-color-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div>{info.bicycleParking || 'PARKIR SEPEDA: TERSEDIA (4 RAK)'}</div>
            <div>{info.networkSpeed || 'KONEKSI JARINGAN: 100 MBPS FIBER'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
