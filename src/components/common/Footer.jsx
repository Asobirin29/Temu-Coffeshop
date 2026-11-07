import React from 'react';

export default function Footer({ siteInfo, onOpenLogin, isAdmin, onNavigateAdmin, onNavigateMenu }) {
  const currentInfo = siteInfo || {};
  const brandName = currentInfo.name || 'TEMU — COFFEESHOP';
  const edisiTag = currentInfo.editionTag || 'EDISI 2025';

  return (
    <footer 
      className="swiss-border-t" 
      style={{ 
        backgroundColor: 'var(--dp-color-ground)',
        color: 'var(--dp-color-ink)',
        width: '100%' 
      }}
    >
      {/* Row 1: Colophon & Links */}
      <div 
        className="swiss-border-b" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          width: '100%'
        }}
      >
        {/* Monogram & Identity (Col 1–4) */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 4', 
            padding: 'clamp(24px, 3vw, 40px)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div 
              className="font-headline-md text-headline-md" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '12px',
                fontWeight: 800
              }}
            >
              <span 
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: 'var(--dp-color-accent)', 
                  display: 'inline-block' 
                }}
              ></span>
              {brandName}
            </div>
            <p className="font-body-sm text-body-sm" style={{ color: 'var(--dp-color-muted)', lineHeight: 1.6 }}>
              Institusi seduh independen yang mengutamakan ketelitian riset, kesederhanaan bentuk, dan keteraturan spasial.
            </p>
          </div>
          <div className="font-tag-mono text-tag-mono" style={{ color: 'var(--dp-color-muted)', marginTop: '28px' }}>
            ARSIP FISIK & DIGITAL // {edisiTag}
          </div>
        </div>

        {/* Navigasi Indeks Internal (Col 5–8) */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 4', 
            padding: 'clamp(24px, 3vw, 40px)' 
          }}
        >
          <span 
            className="font-index-label text-index-label" 
            style={{ color: 'var(--dp-color-muted)', display: 'block', marginBottom: '20px' }}
          >
            TAUTAN ARSIP INTERNAL
          </span>
          <div 
            className="font-tag-mono text-tag-mono" 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
              gap: '12px' 
            }}
          >
            <a 
              href="#/menu" 
              onClick={(e) => {
                if (onNavigateMenu) {
                  e.preventDefault();
                  onNavigateMenu();
                }
              }}
              style={{ color: 'var(--dp-color-accent)', fontWeight: 800, textDecoration: 'underline' }}
            >
              KATALOG MENU ↗
            </a>
            <a 
              href="#/menu" 
              onClick={(e) => {
                if (onNavigateMenu) {
                  e.preventDefault();
                  onNavigateMenu();
                }
              }}
              style={{ color: 'var(--dp-color-ink)', textDecoration: 'underline' }}
            >
              INDEX ARSIP ↗
            </a>
            <a href="#historis" style={{ color: 'var(--dp-color-ink)', textDecoration: 'underline' }}>
              PROVENANCE
            </a>
            <a href="#lokasi" style={{ color: 'var(--dp-color-ink)', textDecoration: 'underline' }}>
              LEGAL LEDGER
            </a>
            <a href="#top" style={{ color: 'var(--dp-color-ink)', textDecoration: 'underline' }}>
              KEMBALI KE ATAS
            </a>
            {isAdmin && (
              <a 
                href="#admin" 
                onClick={(e) => { e.preventDefault(); onNavigateAdmin(); }} 
                style={{ color: 'var(--dp-color-accent)', fontWeight: 800, textDecoration: 'underline' }}
              >
                ADMIN WORKSPACE ↗
              </a>
            )}
          </div>
        </div>

        {/* Colophon & Spesifikasi Tipografi (Col 9–12) */}
        <div 
          style={{ 
            gridColumn: 'span 4', 
            padding: 'clamp(24px, 3vw, 40px)', 
            backgroundColor: 'var(--dp-color-surface)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span 
              className="font-index-label text-index-label" 
              style={{ display: 'block', marginBottom: '12px' }}
            >
              COLOPHON & ATRIBUT SISTEM
            </span>
            <div 
              className="font-tag-mono text-tag-mono" 
              style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--dp-color-muted)' }}
            >
              <div>TYPOGRAPHY: HANKEN GROTESK (SWISS MODEL)</div>
              <div>GRID SYSTEM: 12-COLUMN STRUCTURAL BORDER</div>
              <div>BORDER STROKE: 2PX SOLID MONOCHROME</div>
              <div style={{ color: 'var(--dp-color-accent)', fontWeight: 800 }}>
                SIGNAL ACCENT: COBALT BLUE #0047FF
              </div>
            </div>
          </div>
          <div 
            className="font-tag-mono text-tag-mono" 
            style={{ 
              textAlign: 'right', 
              fontWeight: 800, 
              color: 'var(--dp-color-ink)', 
              marginTop: '20px' 
            }}
          >
            [ STATUS SISTEM: NOMINAL ]
          </div>
        </div>
      </div>

      {/* Row 2: Hak Cipta Docked Full Width */}
      <div 
        className="font-tag-mono text-tag-mono" 
        style={{ 
          padding: '16px 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '8px',
          backgroundColor: 'var(--dp-color-ground)' 
        }}
      >
        <div>
          © 2025 TEMU COFFEESHOP PROTOCOL. REPRODUCTIONS PROHIBITED. ALL RIGHTS RESERVED.
        </div>
        <div style={{ color: 'var(--dp-color-muted)' }}>
          TERCATAT PADA LEDGER JAKARTA SELATAN // VER. 3.1
        </div>
      </div>
    </footer>
  );
}
