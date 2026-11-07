import React from 'react';

export default function Footer({ siteInfo, isAdmin, onNavigateAdmin, onNavigateMenu }) {
  const info = siteInfo || {};
  const brandName = info.name || 'TEMU — COFFEESHOP';
  const ig = info.instagram || '@temu.coffeeshop';

  const scrollTo = (id) => (e) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__brand section-pad">
        <div className="font-headline-md text-headline-md" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: 'var(--dp-color-accent)', display: 'inline-block' }} />
          {brandName}
        </div>
        <p className="visit__muted" style={{ maxWidth: '40ch' }}>
          Kedai kopi independen di {info.locationArea ? info.locationArea.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : 'Jakarta Selatan'}.
          Kopi yang jujur, ruang yang tenang.
        </p>
      </div>

      <nav className="site-footer__links section-pad" aria-label="Tautan footer">
        <a href="#/menu" onClick={(e) => { e.preventDefault(); onNavigateMenu?.(); }} style={{ color: 'var(--dp-color-accent)' }}>
          Katalog Menu ↗
        </a>
        <a href="#historis" onClick={scrollTo('historis')}>Cerita</a>
        <a href="#lokasi" onClick={scrollTo('lokasi')}>Lokasi</a>
        <a href={`https://instagram.com/${ig.replace('@', '')}`} target="_blank" rel="noopener noreferrer">Instagram</a>
        {info.whatsappUrl && (
          <a href={info.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        )}
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          Kembali ke atas ↑
        </a>
        {isAdmin && (
          <a href="#/admin" onClick={(e) => { e.preventDefault(); onNavigateAdmin?.(); }} style={{ color: 'var(--dp-color-accent)' }}>
            Admin Workspace ↗
          </a>
        )}
      </nav>

      <div className="site-footer__legal">
        <span>© {new Date().getFullYear()} {brandName}</span>
        <span>{ig}</span>
      </div>
    </footer>
  );
}
