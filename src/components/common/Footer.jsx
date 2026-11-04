import React from 'react';

export default function Footer({ siteInfo, onOpenLogin, isAdmin, onNavigateAdmin }) {
  const currentInfo = siteInfo || {};

  return (
    <footer className="swiss-border-t" style={{ backgroundColor: 'var(--dp-color-ground)' }}>
      <div className="swiss-grid">
        {/* Col 1-4: Brand & Identity */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 4', 
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>
              {currentInfo.name || 'TEMU — COFFEESHOP'}
            </div>
            <div className="text-label" style={{ color: '#666666' }}>
              SWISS MINIMALIST ARCHIVE // EDITION 2024
            </div>
          </div>
          <div className="text-metadata" style={{ color: '#888888', lineHeight: 1.6 }}>
            Laboratorium seduh kopi dan ruang temu berdisiplin tinggi tanpa distraksi visual.
          </div>
        </div>

        {/* Col 5-8: Jam & Alamat */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 4', 
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div className="text-label" style={{ color: 'var(--dp-color-accent)' }}>
            [ INFORMASI OPERASIONAL ]
          </div>
          <div>
            <div className="text-metadata" style={{ fontWeight: 700 }}>JAM OPERASIONAL:</div>
            <div className="text-body">{currentInfo.openingHours}</div>
            <div className="text-metadata" style={{ color: '#666666', marginTop: '2px' }}>
              {currentInfo.openingDays}
            </div>
          </div>
          <div>
            <div className="text-metadata" style={{ fontWeight: 700 }}>LOKASI KEDAI:</div>
            <div className="text-body">{currentInfo.address}</div>
          </div>
        </div>

        {/* Col 9-12: Links & Social */}
        <div 
          style={{ 
            gridColumn: 'span 4', 
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          <div>
            <div className="text-label" style={{ marginBottom: '16px' }}>
              [ TAUTAN LANGSUNG ]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a 
                href={currentInfo.googleMapsUrl || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="text-body"
                style={{ color: 'var(--dp-color-ink)', textDecoration: 'underline' }}
              >
                PETUNJUK ARAH (GOOGLE MAPS) ↗
              </a>
              <a 
                href={currentInfo.whatsappUrl || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="text-body"
                style={{ color: 'var(--dp-color-ink)', textDecoration: 'underline' }}
              >
                HUBUNGI KAMI (WHATSAPP) ↗
              </a>
              {currentInfo.instagram && (
                <span className="text-metadata" style={{ color: '#666666', marginTop: '4px' }}>
                  INSTAGRAM: {currentInfo.instagram}
                </span>
              )}
            </div>
          </div>

          <div className="text-metadata" style={{ color: '#888888' }}>
            STATUS: <strong style={{ color: currentInfo.isOpen ? 'var(--dp-color-accent)' : '#888888' }}>
              {currentInfo.isOpen ? 'MELAYANI TAMU' : 'SEDANG TUTUP'}
            </strong>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar: Discreet Staff Access (Replaces prominent login button) */}
      <div 
        className="swiss-border-t" 
        style={{ 
          padding: '14px 32px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: 'var(--dp-color-surface)'
        }}
      >
        <div className="text-metadata" style={{ color: '#888888', fontSize: '12px' }}>
          © {new Date().getFullYear()} {currentInfo.name || 'TEMU COFFEESHOP'}. SELURUH HAK DILINDUNGI UNDANG-UNDANG.
        </div>

        {/* Discreet Staff Access Trigger */}
        <div>
          {isAdmin ? (
            <button 
              type="button" 
              onClick={onNavigateAdmin} 
              className="btn-discreet-access"
              style={{ color: 'var(--dp-color-accent)', borderColor: 'var(--dp-color-accent)', fontWeight: 700 }}
              title="Kembali ke Workspace Admin"
            >
              [ ⚡ CMS WORKSPACE AKTIF ]
            </button>
          ) : (
            <button 
              type="button" 
              onClick={onOpenLogin} 
              className="btn-discreet-access"
              title="Akses Pengelola Kedai (Pintasan: Tekan Ctrl+Shift+A)"
            >
              [ STAFF // CMS ACCESS ]
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

