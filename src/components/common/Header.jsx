import React from 'react';

export default function Header({ 
  siteInfo, 
  isAdmin, 
  onNavigateAdmin, 
  onNavigatePublic, 
  onOpenLogin,
  isMenuPage = false,
  onNavigateMenu,
  onNavigateSection
}) {
  const brandName = siteInfo?.name || 'TEMU — COFFEESHOP';
  const sysVer = siteInfo?.systemVersion || 'SYS.VER 3.1';
  const edisiTag = siteInfo?.editionTag || 'EDISI 2025';

  return (
    <header 
      className="swiss-border-b" 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: 'var(--dp-color-ground)',
        width: '100%'
      }}
    >
      <div className="swiss-grid" style={{ minHeight: '60px' }}>
        {/* Brand Anchor: Columns 1–4 (Desktop) */}
        <div 
          className="swiss-border-r" 
          style={{ 
            gridColumn: 'span 4', 
            padding: '16px 24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}
        >
          <a 
            href="#top" 
            onClick={(e) => {
              e.preventDefault();
              if (onNavigatePublic) onNavigatePublic();
            }}
            style={{ 
              textDecoration: 'none', 
              color: 'var(--dp-color-ink)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span 
              style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--dp-color-accent)', 
                display: 'inline-block',
                flexShrink: 0
              }}
            ></span>
            <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>
              [ {brandName} ]
            </span>
          </a>
          <span 
            className="font-tag-mono text-tag-mono" 
            style={{ color: 'var(--dp-color-muted)' }}
          >
            {edisiTag}
          </span>
        </div>

        {/* Navigation Ledger: Columns 5–9 */}
        <nav 
          className="swiss-border-r"
          style={{ 
            gridColumn: 'span 5', 
            display: 'flex', 
            alignItems: 'stretch',
            overflowX: 'auto'
          }}
        >
          <a 
            href="#historis" 
            onClick={(e) => {
              if (onNavigateSection) {
                e.preventDefault();
                onNavigateSection('historis');
              }
            }}
            className="font-index-label text-index-label swiss-border-r"
            style={{ 
              flex: 1, 
              padding: '16px 12px', 
              textDecoration: 'none', 
              color: 'var(--dp-color-ink)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: 'center'
            }}
          >
            01 HISTORIS
          </a>
          <a 
            href="#lokasi" 
            onClick={(e) => {
              if (onNavigateSection) {
                e.preventDefault();
                onNavigateSection('lokasi');
              }
            }}
            className="font-index-label text-index-label swiss-border-r"
            style={{ 
              flex: 1, 
              padding: '16px 12px', 
              textDecoration: 'none', 
              color: 'var(--dp-color-ink)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: 'center'
            }}
          >
            02 LOKASI
          </a>
          <a 
            href="#/menu" 
            onClick={(e) => {
              if (onNavigateMenu) {
                e.preventDefault();
                onNavigateMenu();
              }
            }}
            className="font-index-label text-index-label"
            style={{ 
              flex: 1.2, 
              padding: '16px 12px', 
              textDecoration: 'none', 
              backgroundColor: isMenuPage ? 'var(--dp-color-ink)' : 'transparent',
              color: isMenuPage ? 'var(--dp-color-ground)' : 'var(--dp-color-ink)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: 'center',
              fontWeight: 800,
              gap: '6px'
            }}
          >
            {isMenuPage && (
              <span 
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  backgroundColor: 'var(--dp-color-accent)', 
                  display: 'inline-block' 
                }}
              ></span>
            )}
            03 KATALOG MENU
          </a>
        </nav>

        {/* System Action & Admin Gate: Columns 10–12 */}
        <div 
          style={{ 
            gridColumn: 'span 3', 
            display: 'flex', 
            alignItems: 'stretch',
            justifyContent: isAdmin ? 'space-between' : 'flex-end'
          }}
        >
          <div 
            className={`font-tag-mono text-tag-mono ${isAdmin ? 'swiss-border-r' : ''}`}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: isAdmin ? '0 16px' : '0 24px',
              color: 'var(--dp-color-muted)'
            }}
          >
            {sysVer}
          </div>

          {isAdmin && (
            <button 
              type="button"
              onClick={onNavigateAdmin} 
              className="btn-swiss btn-accent"
              style={{ 
                flex: 1, 
                borderTop: 'none', 
                borderBottom: 'none', 
                borderRight: 'none', 
                height: '100%',
                padding: '12px 16px'
              }}
              title="Akses Workspace Admin CMS"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>terminal</span>
              WORKSPACE CMS ↗
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
