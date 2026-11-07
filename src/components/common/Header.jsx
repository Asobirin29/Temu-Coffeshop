import React, { useState, useEffect } from 'react';

export default function Header({
  siteInfo,
  isAdmin,
  onNavigateAdmin,
  onNavigatePublic,
  isMenuPage = false,
  onNavigateMenu,
  onNavigateSection
}) {
  const [isOpen, setIsOpen] = useState(false);
  const brandName = siteInfo?.name || 'TEMU — COFFEESHOP';

  // Close the mobile drawer on resize to desktop / on hash change
  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener('hashchange', close);
    const mq = window.matchMedia('(min-width: 861px)');
    const onMq = (e) => e.matches && close();
    mq.addEventListener?.('change', onMq);
    return () => {
      window.removeEventListener('hashchange', close);
      mq.removeEventListener?.('change', onMq);
    };
  }, []);

  const go = (fn) => (e) => {
    e.preventDefault();
    setIsOpen(false);
    fn();
  };

  const links = [
    { id: 'historis', label: 'Cerita', href: '#historis', onClick: () => onNavigateSection?.('historis') },
    { id: 'lokasi', label: 'Lokasi', href: '#lokasi', onClick: () => onNavigateSection?.('lokasi') }
  ];

  const menuCta = (
    <a href="#/menu" onClick={go(() => onNavigateMenu?.())} className={`site-header__cta ${isMenuPage ? 'is-active' : ''}`}>
      {isMenuPage ? 'Katalog Menu' : 'Lihat Menu'} <span aria-hidden="true">↗</span>
    </a>
  );

  const adminLink = isAdmin && (
    <button type="button" onClick={go(() => onNavigateAdmin?.())} className="site-header__link" title="Workspace Admin CMS">
      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>terminal</span>
      CMS
    </button>
  );

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a href="#top" onClick={go(() => onNavigatePublic?.())} className="site-header__brand" aria-label="Beranda">
          <span className="sq" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{brandName}</span>
        </a>

        <nav className="site-header__nav" aria-label="Navigasi utama">
          {links.map((l) => (
            <a key={l.id} href={l.href} onClick={go(l.onClick)} className="site-header__link">
              {l.label}
            </a>
          ))}
          {adminLink}
        </nav>
        {menuCta}

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      <nav id="mobile-nav" className={`site-header__mobile ${isOpen ? 'is-open' : ''}`} aria-label="Navigasi seluler">
        {links.map((l) => (
          <a key={l.id} href={l.href} onClick={go(l.onClick)} className="site-header__link">
            {l.label} <span aria-hidden="true">→</span>
          </a>
        ))}
        {adminLink}
        {menuCta}
      </nav>
    </header>
  );
}
