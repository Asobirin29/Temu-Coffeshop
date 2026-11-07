import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../../data/defaultSeedData';
import CardCarousel from '../common/CardCarousel';

function formatRupiah(amount) {
  return `IDR ${Number(amount).toLocaleString('id-ID')}`;
}

export default function MenuCatalogPage({ menuItems, categories = [], siteInfo, onNavigateHome }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL'); // 'ALL' | 'AVAILABLE' | 'SOLDOUT'

  const items = menuItems || [];

  const catalogCategories = useMemo(() => {
    if (categories && categories.length > 0) {
      const list = categories.filter(c => c !== 'ALL');
      return ['ALL', ...list];
    }
    return CATEGORIES;
  }, [categories]);

  // Filter items based on Category, Availability, and Search Query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!item) return false;

      // 1. Category Filter
      if (activeCategory !== 'ALL') {
        const itemCat = (item.category || '').trim().toUpperCase();
        const activeCat = activeCategory.trim().toUpperCase();
        if (itemCat !== activeCat) return false;
      }

      // 2. Availability Filter
      if (availabilityFilter === 'AVAILABLE' && !item.is_available) return false;
      if (availabilityFilter === 'SOLDOUT' && item.is_available) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (item.name || '').toLowerCase().includes(query);
        const captionMatch = (item.caption || '').toLowerCase().includes(query);
        const codeMatch = (item.code || '').toLowerCase().includes(query);
        const catMatch = (item.category || '').toLowerCase().includes(query);
        if (!nameMatch && !captionMatch && !codeMatch && !catMatch) return false;
      }

      return true;
    });
  }, [items, activeCategory, availabilityFilter, searchQuery]);

  // Statistics
  const totalCount = items.length;
  const availableCount = items.filter((i) => i.is_available).length;
  const soldOutCount = totalCount - availableCount;

  return (
    <div className="menu-catalog-page" style={{ width: '100%', backgroundColor: 'var(--dp-color-ground)' }}>
      {/* Top bar: back + count */}
      <div className="swiss-border-b catalog-topbar">
        <button type="button" onClick={onNavigateHome} className="btn-swiss" style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 800 }}>
          ← Beranda
        </button>
        <span className="font-tag-mono text-tag-mono">
          {totalCount} sajian · <span style={{ color: 'var(--dp-color-accent)' }}>{availableCount} tersedia</span>
        </span>
      </div>

      {/* Main 12-Column Swiss Grid */}
      <div className="swiss-grid">
        {/* Kolom 1-3: Index Rail, Filter & Informasi Kedai */}
        <aside
          className="index-rail-col swiss-border-r"
          style={{
            gridColumn: 'span 3',
            padding: 'clamp(24px, 3vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '28px',
            backgroundColor: 'var(--dp-color-ground)'
          }}
        >
          {/* Header Section */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="font-headline-lg text-headline-lg" style={{ lineHeight: 1 }}>
                  03 /
                </span>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'var(--dp-color-accent)',
                    display: 'inline-block'
                  }}
                ></span>
              </div>
              <h1 className="font-headline-md text-headline-md" style={{ margin: 0 }}>
                KATALOG MENU &amp; SAJIAN
              </h1>
            </div>
            <p className="font-body-sm text-body-sm catalog-desktop-only" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.6 }}>
              Seluruh biji kopi disangrai mingguan secara mikro (light-to-medium profile). Tidak menyajikan sirup artifisial; pemanis bersumber dari reduksi nira aren organik dan susu segar pasteurisasi harian.
            </p>
          </div>

          {/* Search Box */}
          <div className="swiss-border-all" style={{ padding: '16px', backgroundColor: 'var(--dp-color-surface)' }}>
            <label
              htmlFor="menu-search-input"
              className="font-index-label text-index-label"
              style={{ display: 'block', marginBottom: '8px', color: 'var(--dp-color-ink)' }}
            >
              CARI SAJIAN
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input
                id="menu-search-input"
                type="text"
                placeholder="Cari nama, kopi, rasa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-body-sm text-body-sm"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: '2px solid var(--dp-color-ink)',
                  backgroundColor: 'var(--dp-color-ground)',
                  color: 'var(--dp-color-ink)',
                  outline: 'none',
                  fontSize: '13px'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="btn-swiss"
                  style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 800 }}
                  title="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Status Ketersediaan */}
          <div>
            <span className="font-index-label text-index-label" style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '8px' }}>
              STATUS KETERSEDIAAN:
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                type="button"
                onClick={() => setAvailabilityFilter('ALL')}
                className={availabilityFilter === 'ALL' ? 'active' : ''}
                style={{ flex: 1, padding: '8px 6px', fontSize: '11px' }}
              >
                SEMUA ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => setAvailabilityFilter('AVAILABLE')}
                className={availabilityFilter === 'AVAILABLE' ? 'active' : ''}
                style={{ flex: 1, padding: '8px 6px', fontSize: '11px' }}
              >
                TERSEDIA ({availableCount})
              </button>
              <button
                type="button"
                onClick={() => setAvailabilityFilter('SOLDOUT')}
                className={availabilityFilter === 'SOLDOUT' ? 'active' : ''}
                style={{ flex: 1, padding: '8px 6px', fontSize: '11px' }}
              >
                HABIS ({soldOutCount})
              </button>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="catalog-cats" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span className="font-index-label text-index-label" style={{ color: 'var(--dp-color-muted)', marginBottom: '4px' }}>
              KATEGORI:
            </span>
            {catalogCategories.map((cat) => {
              const countInCat = cat === 'ALL'
                ? items.length
                : items.filter((i) => {
                  if (!i || !i.category) return false;
                  return (i.category || '').trim().toUpperCase() === cat.trim().toUpperCase();
                }).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={activeCategory === cat ? 'active' : ''}
                  style={{
                    textAlign: 'left',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px'
                  }}
                >
                  <span style={{ fontWeight: activeCategory === cat ? 800 : 600 }}>{cat}</span>
                  <span className="font-tag-mono text-tag-mono" style={{ opacity: 0.8 }}>
                    ({countInCat})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Protokol Pemesanan Box */}
          <div className="swiss-border-t catalog-desktop-only" style={{ paddingTop: '20px' }}>
            <span className="font-index-label text-index-label" style={{ marginBottom: '10px', color: 'var(--dp-color-muted)', display: 'block' }}>
              PROTOKOL PEMESANAN KEDAI
            </span>
            <div className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              Pemesanan dapat langsung ditransaksikan di kasir bar utama. Untuk pemesanan beans (kemasan 200g) atau konsultasi rasa, silakan hubungi barista kami.
            </div>

            {siteInfo?.whatsappUrl && (
              <a
                href={siteInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-swiss btn-accent"
                style={{ width: '100%', padding: '12px', textAlign: 'center', display: 'block', textDecoration: 'none' }}
              >
                HUBUNGI BARISTA VIA WA ↗
              </a>
            )}
          </div>

          {/* Navigation Action Back to Home */}
          <div className="swiss-border-t catalog-desktop-only" style={{ paddingTop: '16px' }}>
            <button
              type="button"
              onClick={onNavigateHome}
              className="btn-swiss"
              style={{ width: '100%', padding: '12px', textAlign: 'center' }}
            >
              ← KEMBALI KE BERANDA
            </button>
          </div>
        </aside>

        {/* Kolom 4-12: Content Matrix Menu Cards */}
        <div
          className="content-matrix-col"
          style={{
            gridColumn: 'span 9',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--dp-color-ground)'
          }}
        >
          {/* Active Filter Ledger Bar */}
          <div
            className="swiss-border-b font-tag-mono text-tag-mono"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--dp-color-surface)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span>FILTER AKTIF:</span>
              <span
                style={{
                  backgroundColor: 'var(--dp-color-ink)',
                  color: 'var(--dp-color-ground)',
                  padding: '2px 8px',
                  fontWeight: 800
                }}
              >
                KATEGORI: {activeCategory}
              </span>
              {availabilityFilter !== 'ALL' && (
                <span
                  style={{
                    backgroundColor: availabilityFilter === 'AVAILABLE' ? 'var(--dp-color-accent)' : 'var(--dp-color-ink)',
                    color: '#ffffff',
                    padding: '2px 8px',
                    fontWeight: 800
                  }}
                >
                  STATUS: {availabilityFilter === 'AVAILABLE' ? 'TERSEDIA' : 'HABIS'}
                </span>
              )}
              {searchQuery && (
                <span
                  style={{
                    border: '1px solid var(--dp-color-ink)',
                    padding: '2px 8px'
                  }}
                >
                  KATA KUNCI: "{searchQuery}"
                </span>
              )}
            </div>

            <div>
              MENAMPILKAN <strong>{filteredItems.length}</strong> DARI {totalCount} SAJIAN
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              backgroundColor: 'var(--dp-color-ink)',
              gap: 'var(--dp-border-rule)',
              flex: 1
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
                      {item.code && (
                        <span
                          className="font-tag-mono text-tag-mono"
                          style={{
                            backgroundColor: 'var(--dp-color-ink)',
                            color: '#ffffff',
                            padding: '4px 8px',
                            border: '1px solid #ffffff'
                          }}
                        >
                          {item.code}
                        </span>
                      )}
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
                    <h2
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
                    </h2>
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
                  padding: '60px 24px',
                  textAlign: 'center'
                }}
              >
                <div className="font-headline-md text-headline-md" style={{ marginBottom: '8px' }}>
                  TIDAK ADA MENU YANG SESUAI FILTER
                </div>
                <div className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', marginBottom: '20px' }}>
                  Tidak ada sajian yang cocok dengan kategori "{activeCategory}"{searchQuery ? ` dan pencarian "${searchQuery}"` : ''}.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('ALL');
                    setSearchQuery('');
                    setAvailabilityFilter('ALL');
                  }}
                  className="btn-swiss btn-accent"
                  style={{ padding: '12px 24px' }}
                >
                  RESET SELURUH FILTER &amp; PENCARIAN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

