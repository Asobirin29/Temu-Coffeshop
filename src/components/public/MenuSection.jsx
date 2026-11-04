import React, { useState } from 'react';
import { CATEGORIES } from '../../data/defaultSeedData';

function formatRupiah(amount) {
  return `IDR ${Number(amount).toLocaleString('id-ID')}`;
}

export default function MenuSection({ menuItems }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems = activeCategory === 'ALL' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="swiss-border-b" style={{ backgroundColor: 'var(--dp-color-ground)' }}>
      <div className="swiss-grid">
        {/* Kolom 1-3: Index Rail & Category Filter */}
        <div 
          className="index-rail-col swiss-border-r" 
          style={{ 
            gridColumn: 'span 3', 
            padding: 'var(--dp-spacing-gutter)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '32px'
          }}
        >
          <div>
            <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '8px' }}>
              01 / MENU
            </div>
            <h2 className="text-section-heading" style={{ marginBottom: '16px' }}>
              KATALOG SEDUHAN
            </h2>
            <p className="text-metadata" style={{ color: '#555555' }}>
              Pilihan minuman dan kudapan yang diformulasikan untuk pengalaman rasa optimal. Silakan pilih kategori di bawah.
            </p>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="text-label" style={{ color: '#888888', marginBottom: '4px' }}>
              KLASIFIKASI KATEGORI:
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'active' : ''}
                style={{ textAlign: 'left', width: '100%', justifyContent: 'space-between' }}
              >
                <span>{cat}</span>
                <span className="text-metadata" style={{ opacity: 0.7 }}>
                  ({cat === 'ALL' ? menuItems.length : menuItems.filter(i => i.category === cat).length})
                </span>
              </button>
            ))}
          </div>

          {/* Legend / Info */}
          <div className="swiss-border-t" style={{ paddingTop: '20px' }}>
            <div className="text-label" style={{ marginBottom: '8px', color: '#666666' }}>
              CATATAN ARSIP
            </div>
            <div className="text-metadata" style={{ color: '#777777', lineHeight: 1.6 }}>
              Biji kopi sangrai tersedia dalam kemasan 200g. Tanyakan pada barista kami untuk rekomendasi asal biji harian.
            </div>
          </div>
        </div>

        {/* Kolom 4-12: Content Matrix */}
        <div 
          className="content-matrix-col" 
          style={{ 
            gridColumn: 'span 9', 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            backgroundColor: 'var(--dp-color-ink)',
            gap: 'var(--dp-border-rule)'
          }}
        >
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              style={{ 
                backgroundColor: item.is_available ? 'var(--dp-color-ground)' : 'var(--dp-color-surface)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Image Frame */}
              <div 
                className="swiss-border-b" 
                style={{ 
                  aspectRatio: '4 / 3', 
                  width: '100%', 
                  position: 'relative', 
                  overflow: 'hidden',
                  backgroundColor: '#222222' 
                }}
              >
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="editorial-img"
                  style={{ opacity: item.is_available ? 1 : 0.4 }}
                />
                
                {/* Badges on Top */}
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {item.is_featured && item.is_available && (
                    <span className="badge-recommended">
                      [ RECOMMENDED ]
                    </span>
                  )}
                  {!item.is_available && (
                    <span className="badge-soldout">
                      [ SOLD OUT ]
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="text-label" style={{ color: '#777777', marginBottom: '6px' }}>
                    {item.category}
                  </div>
                  <h3 
                    className="text-item-title" 
                    style={{ 
                      marginBottom: '10px',
                      textDecoration: item.is_available ? 'none' : 'line-through',
                      color: item.is_available ? 'var(--dp-color-ink)' : '#777777'
                    }}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="text-body" 
                    style={{ 
                      color: item.is_available ? '#444444' : '#888888',
                      marginBottom: '18px',
                      fontSize: '15px' 
                    }}
                  >
                    {item.caption}
                  </p>
                </div>

                {/* Price & State */}
                <div 
                  className="swiss-border-t" 
                  style={{ 
                    paddingTop: '14px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}
                >
                  <span 
                    className="text-metadata" 
                    style={{ 
                      fontWeight: 800, 
                      fontSize: '16px',
                      color: item.is_available ? 'var(--dp-color-ink)' : '#888888'
                    }}
                  >
                    {formatRupiah(item.price)}
                  </span>
                  <span 
                    className="text-label" 
                    style={{ 
                      color: item.is_available ? 'var(--dp-color-ink)' : 'var(--dp-color-accent)' 
                    }}
                  >
                    {item.is_available ? '[ TERSEDIA ]' : '[ HABIS ]'}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div 
              style={{ 
                gridColumn: '1 / -1', 
                backgroundColor: 'var(--dp-color-ground)', 
                padding: '48px', 
                textAlign: 'center' 
              }}
            >
              <div className="text-lead" style={{ fontWeight: 700, marginBottom: '8px' }}>
                TIDAK ADA MENU PADA KATEGORI INI
              </div>
              <div className="text-metadata" style={{ color: '#777777' }}>
                Silakan pilih kategori lain atau periksa kembali nanti.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

