import React, { useState } from 'react';

function HistoryPhotoCarousel({ story }) {
  const images = (story.images && story.images.length > 0)
    ? story.images.filter(Boolean)
    : (story.image_url ? [story.image_url] : []);
  
  const [activeIdx, setActiveIdx] = useState(0);
  const total = images.length;
  const currentImg = images[activeIdx] || images[0] || '';

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  if (total === 0) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '340px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'var(--dp-color-surface)',
          padding: '24px'
        }}
      >
        <span className="font-tag-mono text-tag-mono" style={{ color: 'var(--dp-color-muted)' }}>
          [ ARSIP VISUAL BELUM DILAMPIRKAN ]
        </span>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: 'var(--dp-color-surface)'
      }}
    >
      {/* Top Ledger: Figure label and Carousel Navigation */}
      <div 
        className="swiss-border-b font-tag-mono text-tag-mono"
        style={{ 
          display: 'flex', 
          alignItems: 'stretch', 
          justifyContent: 'space-between',
          backgroundColor: 'var(--dp-color-ground)',
          userSelect: 'none'
        }}
      >
        {/* Figure Label & Counter */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 14px'
          }}
        >
          <span 
            style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: 'var(--dp-color-accent)', 
              display: 'inline-block' 
            }}
          ></span>
          <span style={{ fontWeight: 800 }}>
            {story.figure_label || `FIG. 0${story.display_order || 1}`}
          </span>
          {total > 1 && (
            <span style={{ color: 'var(--dp-color-muted)' }}>
              [{String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}]
            </span>
          )}
        </div>

        {/* Carousel Next/Prev Controls */}
        {total > 1 && (
          <div style={{ display: 'flex', alignItems: 'stretch' }} className="swiss-border-l">
            <button
              type="button"
              onClick={handlePrev}
              className="swiss-border-r font-tag-mono text-tag-mono"
              style={{
                padding: '8px 12px',
                borderTop: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                backgroundColor: 'var(--dp-color-ground)',
                color: 'var(--dp-color-ink)',
                cursor: 'pointer',
                fontWeight: 800
              }}
              title="Foto Sebelumnya"
            >
              ← PREV
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="font-tag-mono text-tag-mono"
              style={{
                padding: '8px 12px',
                border: 'none',
                backgroundColor: 'var(--dp-color-ground)',
                color: 'var(--dp-color-ink)',
                cursor: 'pointer',
                fontWeight: 800
              }}
              title="Foto Selanjutnya"
            >
              NEXT →
            </button>
          </div>
        )}
      </div>

      {/* Main Photo Viewport (Full Natural Color) */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          flex: 1, 
          minHeight: '280px',
          overflow: 'hidden', 
          backgroundColor: '#181818' 
        }}
      >
        <img 
          src={currentImg} 
          alt={`${story.title} (Foto ${activeIdx + 1})`} 
          className="editorial-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Bottom Jump Tabs if multiple photos */}
      {total > 1 && (
        <div 
          className="swiss-border-t font-tag-mono text-tag-mono"
          style={{ 
            display: 'flex', 
            alignItems: 'stretch',
            backgroundColor: 'var(--dp-color-ground)',
            overflowX: 'auto'
          }}
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`font-tag-mono text-tag-mono ${idx !== total - 1 ? 'swiss-border-r' : ''}`}
              style={{
                padding: '6px 12px',
                borderTop: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                backgroundColor: activeIdx === idx ? 'var(--dp-color-ink)' : 'var(--dp-color-ground)',
                color: activeIdx === idx ? 'var(--dp-color-ground)' : 'var(--dp-color-ink)',
                cursor: 'pointer',
                fontWeight: activeIdx === idx ? 800 : 600,
                fontSize: '11px',
                whiteSpace: 'nowrap'
              }}
            >
              FOTO 0{idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HistorySection({ historyStories, onNavigateMenu }) {
  // Only display stories that are published, sorted by display_order
  const publishedStories = (historyStories || [])
    .filter(story => story.is_published)
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  return (
    <section 
      id="historis" 
      className="swiss-border-b" 
      style={{ 
        backgroundColor: 'var(--dp-color-ground)', 
        color: 'var(--dp-color-ink)',
        width: '100%' 
      }}
    >
      <div className="swiss-grid">
        {/* Columns 1–3: Persistent Index Rail */}
        <aside 
          className="index-rail-col swiss-border-r" 
          style={{ 
            gridColumn: 'span 3', 
            padding: 'clamp(24px, 3vw, 40px)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            backgroundColor: 'var(--dp-color-ground)'
          }}
        >
          <div>
            <div style={{ marginBottom: '28px' }}>
              <span className="font-headline-lg text-headline-lg" style={{ display: 'block', lineHeight: 1 }}>
                01 /
              </span>
              <h2 className="font-headline-md text-headline-md" style={{ marginTop: '8px' }}>
                HISTORIS & ARSIP KEDAI
              </h2>
            </div>

            <p className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
              Dokumentasi berkala perkembangan ruang, riset sangrai, dan dialog komunitas sejak awal berdirinya Temu-Coffeeshop pada tahun 2021 di jantung kawasan Senopati.
            </p>

            <div 
              className="swiss-border-all font-tag-mono text-tag-mono" 
              style={{ 
                padding: '16px', 
                backgroundColor: 'var(--dp-color-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ color: 'var(--dp-color-accent)', fontWeight: 800 }}>
                [ INDEKS DOKUMEN: TM-HIS-v2 ]
              </div>
              <div>STATUS ARSIP: LENGKAP & DIVERIFIKASI</div>
              <div>DIPERBARUI: JANUARI 2025</div>
            </div>
          </div>

          <div 
            className="swiss-border-t font-tag-mono text-tag-mono" 
            style={{ 
              marginTop: '40px', 
              paddingTop: '20px', 
              color: 'var(--dp-color-muted)' 
            }}
          >
            "ARSIP ADALAH PONDASI DARI KUALITAS YANG BISA DIULANG."
          </div>
        </aside>

        {/* Columns 4–12: Chronological Editorial Timeline */}
        <div 
          className="content-matrix-col" 
          style={{ 
            gridColumn: 'span 9', 
            backgroundColor: 'var(--dp-color-ground)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {publishedStories.map((story, index) => {
            const isEntry3 = index === 2 || story.id === 'hist-03';
            const isInverted = index % 2 === 1; // Invert layout for editorial rhythm (Entry 2)

            if (isEntry3) {
              // Milestone / Status Sekarang Banner
              return (
                <div 
                  key={story.id}
                  style={{ 
                    padding: 'clamp(24px, 3vw, 40px)', 
                    backgroundColor: 'var(--dp-color-surface)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ maxWidth: '640px' }}>
                    <div 
                      className="font-tag-mono text-tag-mono" 
                      style={{ color: 'var(--dp-color-accent)', fontWeight: 800, marginBottom: '6px' }}
                    >
                      {story.story_date || '2025 // STATUS SEKARANG'}
                    </div>
                    <h4 className="font-headline-md text-headline-md" style={{ margin: 0 }}>
                      {story.title}
                    </h4>
                    <p className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', marginTop: '8px', lineHeight: 1.5 }}>
                      {story.caption}
                    </p>
                  </div>
                  <a 
                    href="#/menu" 
                    onClick={(e) => {
                      if (onNavigateMenu) {
                        e.preventDefault();
                        onNavigateMenu();
                      }
                    }}
                    className="btn-swiss" 
                    style={{ 
                      padding: '14px 24px', 
                      backgroundColor: 'var(--dp-color-ground)',
                      flexShrink: 0 
                    }}
                  >
                    LIHAT KATALOG MENU ↗
                  </a>
                </div>
              );
            }

            return (
              <div 
                key={story.id} 
                className="swiss-border-b history-entry-grid"
              >
                {/* Multi-Photo Carousel Column */}
                <div 
                  className={`history-entry-photo ${isInverted ? 'order-2 md:order-2' : 'swiss-border-r'}`}
                  style={{ 
                    backgroundColor: 'var(--dp-color-surface)',
                    minHeight: '340px'
                  }}
                >
                  <HistoryPhotoCarousel story={story} />
                </div>

                {/* Prose & Protocol Column */}
                <div 
                  className={`history-entry-prose ${isInverted ? 'swiss-border-r' : ''}`}
                  style={{ 
                    padding: 'clamp(24px, 3vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <span 
                        className="font-tag-mono text-tag-mono" 
                        style={{ 
                          backgroundColor: 'var(--dp-color-ink)', 
                          color: 'var(--dp-color-ground)', 
                          padding: '3px 8px' 
                        }}
                      >
                        {story.story_date}
                      </span>
                      {story.subtag && (
                        <span 
                          className="font-tag-mono text-tag-mono" 
                          style={{ color: 'var(--dp-color-accent)', fontWeight: 800 }}
                        >
                          {story.subtag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline-md text-headline-md" style={{ marginBottom: '16px' }}>
                      {story.title}
                    </h3>

                    <p className="font-body-md text-body-md" style={{ lineHeight: 1.6, color: '#222222', marginBottom: '24px' }}>
                      {story.caption}
                    </p>
                  </div>

                  <div 
                    className="swiss-border-t font-tag-mono text-tag-mono" 
                    style={{ 
                      paddingTop: '16px', 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gap: '16px',
                      color: 'var(--dp-color-muted)'
                    }}
                  >
                    <div>{story.protocolNote || 'CATATAN PROTOKOL: #VERIFIED'}</div>
                    <div>{story.sampleNote || 'SAMPLE TESTED: STANDAR SCA'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
