import React, { useState } from 'react';
import { CATEGORIES } from '../../data/defaultSeedData';
import CardCarousel from '../common/CardCarousel';

function formatRupiah(amount) {
  return `IDR ${Number(amount).toLocaleString('id-ID')}`;
}

export default function MenuSection({ menuItems, categories = [] }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const displayCategories = categories && categories.length > 0
    ? ['ALL', ...categories.filter(c => c !== 'ALL')]
    : CATEGORIES;

  const filteredItems = activeCategory === 'ALL'
    ? (menuItems || [])
    : (menuItems || []).filter(item => {
      if (!item || !item.category) return false;
      return (item.category || '').trim().toUpperCase() === activeCategory.trim().toUpperCase();
    });

  return (
    <section id="menu" className="swiss-border-b" style={{ backgroundColor: 'var(--dp-color-ground)', width: '100%' }}>
      <div className="swiss-grid">
        {/* Kolom 1-3: Index Rail & Category Filter */}
        <div
          className="index-rail-col swiss-border-r"
          style={{
            gridColumn: 'span 3',
            padding: 'clamp(24px, 3vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '32px',
            backgroundColor: 'var(--dp-color-ground)'
          }}
        >
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="font-headline-lg text-headline-lg" style={{ lineHeight: 1 }}>
                  03 /
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
                KATALOG MENU & SAJIAN
              </h2>
            </div>
            <p className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.6 }}>
              Seluruh biji kopi disangrai mingguan secara mikro (light-to-medium profile). Tidak menyajikan sirup artifisial; pemanis bersumber dari reduksi nira aren organik dan susu segar pasteurisasi harian.
            </p>
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="font-index-label text-index-label" style={{ color: 'var(--dp-color-muted)', marginBottom: '4px' }}>
              FILTER BERKAS:
            </span>
            {displayCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'active' : ''}
                style={{
                  textAlign: 'left',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '12px 14px'
                }}
              >
                <span>{cat}</span>
                <span className="font-tag-mono text-tag-mono" style={{ opacity: 0.75 }}>
                  ({cat === 'ALL' ? (menuItems || []).length : (menuItems || []).filter(i => {
                    if (!i || !i.category) return false;
                    return (i.category || '').trim().toUpperCase() === cat.trim().toUpperCase();
                  }).length})
                </span>
              </button>
            ))}
          </div>

          {/* Legend / Info */}
          <div className="swiss-border-t" style={{ paddingTop: '20px' }}>
            <span className="font-index-label text-index-label" style={{ marginBottom: '8px', color: 'var(--dp-color-muted)', display: 'block' }}>
              CATATAN ARSIP
            </span>
            <div className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.6 }}>
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
              {/* Multi-Image Carousel Frame */}
              <CardCarousel
                images={item.images && item.images.length > 0 ? item.images : (item.image_url ? [item.image_url] : [])}
                alt={item.name}
                isAvailable={item.is_available}
                badges={
                  <>
                    {item.is_featured && item.is_available && (
                      <span
                        className="font-tag-mono text-tag-mono"
                        style={{
                          backgroundColor: 'var(--dp-color-accent)',
                          color: '#ffffff',
                          padding: '4px 8px'
                        }}
                      >
                        [ RECOMMENDED ]
                      </span>
                    )}
                    {!item.is_available && (
                      <span
                        className="font-tag-mono text-tag-mono"
                        style={{
                          backgroundColor: 'var(--dp-color-ink)',
                          color: '#ffffff',
                          padding: '4px 8px'
                        }}
                      >
                        [ SOLD OUT ]
                      </span>
                    )}
                  </>
                }
              />

              {/* Text Info */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="font-tag-mono text-tag-mono" style={{ color: 'var(--dp-color-muted)', marginBottom: '8px' }}>
                    {item.category}
                  </div>
                  <h3
                    className="font-headline-md text-headline-md"
                    style={{
                      fontSize: '20px',
                      lineHeight: '24px',
                      marginBottom: '10px',
                      textDecoration: item.is_available ? 'none' : 'line-through',
                      color: item.is_available ? 'var(--dp-color-ink)' : 'var(--dp-color-muted)'
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-body-sm text-body-sm"
                    style={{
                      color: item.is_available ? '#333333' : 'var(--dp-color-muted)',
                      marginBottom: '20px',
                      lineHeight: 1.5
                    }}
                  >
                    {item.caption}
                  </p>
                </div>

                {/* Price & State */}
                <div
                  className="swiss-border-t"
                  style={{
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span
                    className="font-metadata-bold text-metadata-bold"
                    style={{
                      fontSize: '16px',
                      color: item.is_available ? 'var(--dp-color-ink)' : 'var(--dp-color-muted)'
                    }}
                  >
                    {formatRupiah(item.price)}
                  </span>
                  <span
                    className="font-tag-mono text-tag-mono"
                    style={{
                      color: item.is_available ? 'var(--dp-color-ink)' : 'var(--dp-color-accent)',
                      fontWeight: 800
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
              <div className="font-headline-md text-headline-md" style={{ marginBottom: '8px' }}>
                TIDAK ADA MENU PADA KATEGORI INI
              </div>
              <div className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)' }}>
                Silakan pilih kategori lain atau periksa kembali nanti.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
