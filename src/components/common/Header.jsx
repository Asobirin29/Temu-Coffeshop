import React from 'react';

export default function Header({ siteInfo, isAdmin, onNavigateAdmin, onNavigatePublic }) {
  return (
    <header className="swiss-grid swiss-border-b" style={{ minHeight: '64px', backgroundColor: 'var(--dp-color-ground)' }}>
      {/* Brand Column (Col 1-4) */}
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
          href="#/" 
          onClick={onNavigatePublic}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>
            [ {siteInfo?.name || 'TEMU — COFFEESHOP'} ]
          </div>
        </a>
        <span className="text-label" style={{ color: '#888888', display: 'none', mdDisplay: 'inline' }}>
          ARCHIVE // 01
        </span>
      </div>

      {/* Navigation (Col 5-12) — Admin section hidden for public visitors */}
      <nav 
        style={{ 
          gridColumn: 'span 8', 
          display: 'flex', 
          alignItems: 'stretch', 
          justifyContent: 'flex-end',
          flexWrap: 'wrap'
        }}
      >
        <a 
          href="#menu" 
          className="btn-swiss swiss-border-l" 
          style={{ borderTop: 'none', borderBottom: 'none', borderRight: 'none', height: '100%' }}
        >
          01 MENU
        </a>
        <a 
          href="#historis" 
          className="btn-swiss swiss-border-l" 
          style={{ borderTop: 'none', borderBottom: 'none', borderRight: 'none', height: '100%' }}
        >
          02 HISTORIS
        </a>
        <a 
          href="#lokasi" 
          className="btn-swiss swiss-border-l" 
          style={{ borderTop: 'none', borderBottom: 'none', borderRight: 'none', height: '100%' }}
        >
          03 LOKASI
        </a>

        {/* Shown ONLY if admin is already authenticated */}
        {isAdmin && (
          <button 
            type="button"
            onClick={onNavigateAdmin} 
            className="btn-swiss btn-accent swiss-border-l"
            style={{ borderTop: 'none', borderBottom: 'none', borderRight: 'none', height: '100%' }}
            title="Kembali ke Workspace Admin CMS"
          >
            [ WORKSPACE CMS ↗ ]
          </button>
        )}
      </nav>
    </header>
  );
}

