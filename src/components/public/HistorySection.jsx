import React from 'react';

export default function HistorySection({ historyStories }) {
  // Only display stories that are published, sorted by display_order
  const publishedStories = historyStories
    .filter(story => story.is_published)
    .sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));

  return (
    <section 
      id="historis" 
      className="swiss-border-b" 
      style={{ 
        backgroundColor: '#000000', 
        color: '#ffffff' 
      }}
    >
      <div className="swiss-grid">
        {/* Kolom 1-3: Index Rail (White Border on Black Ground) */}
        <div 
          className="index-rail-col" 
          style={{ 
            gridColumn: 'span 3', 
            padding: 'var(--dp-spacing-gutter)',
            borderRight: '2px solid #ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '8px' }}>
              02 / HISTORIS
            </div>
            <h2 className="text-section-heading" style={{ color: '#ffffff', marginBottom: '16px' }}>
              ARSIP & PERJALANAN
            </h2>
            <p className="text-lead" style={{ color: '#cccccc', marginBottom: '24px' }}>
              Kumpulan catatan, momen penting, dan dokumentasi visual yang melandasi setiap cangkir kopi yang kami sajikan di Temu.
            </p>
          </div>

          <div style={{ borderTop: '2px solid #333333', paddingTop: '20px' }}>
            <div className="text-label" style={{ color: '#888888', marginBottom: '8px' }}>
              TOTAL DOKUMENTASI
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff' }}>
              {String(publishedStories.length).padStart(2, '0')} // BAB TERCATAT
            </div>
          </div>
        </div>

        {/* Kolom 4-12: Editorial Stories Series */}
        <div 
          className="content-matrix-col" 
          style={{ 
            gridColumn: 'span 9',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {publishedStories.map((story, index) => (
            <article 
              key={story.id}
              className="history-row-item"
              style={{ 
                display: 'grid',
                gridTemplateColumns: '320px 1fr',
                borderBottom: index !== publishedStories.length - 1 ? '2px solid #333333' : 'none'
              }}
            >
              {/* Left Column: Vertical Tall Image */}
              <div 
                className="history-img-box"
                style={{ 
                  aspectRatio: '3 / 4', 
                  position: 'relative', 
                  overflow: 'hidden',
                  backgroundColor: '#111111',
                  borderRight: '2px solid #333333'
                }}
              >
                <img 
                  src={story.image_url} 
                  alt={story.title}
                  className="editorial-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 12, 
                    left: 12, 
                    backgroundColor: '#000000', 
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em'
                  }}
                >
                  INDEX // {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Right Column: Narrative Content */}
              <div 
                style={{ 
                  padding: 'var(--dp-spacing-gutter)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}
              >
                <div>
                  <div 
                    className="text-label" 
                    style={{ 
                      color: 'var(--dp-color-accent)', 
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>[ MOMEN HISTORIS ]</span>
                    <span style={{ color: '#888888' }}>—</span>
                    <span style={{ color: '#ffffff' }}>{story.story_date}</span>
                  </div>

                  <h3 
                    className="text-item-title" 
                    style={{ 
                      fontSize: 'clamp(22px, 2.5vw, 32px)', 
                      color: '#ffffff', 
                      marginBottom: '20px',
                      lineHeight: 1.15
                    }}
                  >
                    {story.title}
                  </h3>

                  <div 
                    className="text-body" 
                    style={{ 
                      color: '#cccccc', 
                      lineHeight: 1.7, 
                      fontSize: '16px',
                      whiteSpace: 'pre-line' 
                    }}
                  >
                    {story.caption}
                  </div>
                </div>

                <div 
                  style={{ 
                    marginTop: '32px', 
                    paddingTop: '16px', 
                    borderTop: '1px solid #333333', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}
                >
                  <span className="text-metadata" style={{ color: '#666666' }}>
                    TEMU COFFEESHOP ARCHIVAL RECORD
                  </span>
                  <span className="text-label" style={{ color: '#ffffff' }}>
                    URUTAN: {story.display_order}
                  </span>
                </div>
              </div>
            </article>
          ))}

          {publishedStories.length === 0 && (
            <div style={{ padding: '64px', textAlign: 'center', color: '#888888' }}>
              <div className="text-lead" style={{ color: '#ffffff', marginBottom: '8px' }}>
                BELUM ADA CERITA HISTORIS YANG DITERBITKAN
              </div>
              <div className="text-metadata">
                Silakan masuk ke panel admin untuk menambahkan arsip cerita pertama.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

