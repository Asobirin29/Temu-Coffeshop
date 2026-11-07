import React, { useState } from 'react';
import MenuManager from './MenuManager';
import HistoryManager from './HistoryManager';
import LandingInfoManager from './LandingInfoManager';

export default function AdminLayout({
  siteInfo,
  onUpdateInfo,
  menuItems,
  categories,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  historyStories,
  onAddMenu,
  onUpdateMenu,
  onDeleteMenu,
  onToggleAvailable,
  onAddStory,
  onUpdateStory,
  onDeleteStory,
  onTogglePublished,
  onResetData,
  onNavigatePublic,
  onNavigateMenu,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'history' | 'info'

  const totalActive = menuItems.filter((i) => i.is_available).length;
  const totalSoldOut = menuItems.length - totalActive;
  const totalPublished = historyStories.filter((s) => s.is_published).length;
  const isOpen = siteInfo?.isOpen !== false;

  const tabs = [
    { id: 'menu', icon: 'restaurant_menu', label: 'Menu', full: 'Katalog Menu', badge: menuItems.length },
    { id: 'history', icon: 'auto_stories', label: 'Cerita', full: 'Cerita / Historis', badge: historyStories.length },
    { id: 'info', icon: 'storefront', label: 'Kedai', full: 'Status & Info Kedai', badge: isOpen ? 'BUKA' : 'TUTUP', badgeTone: isOpen ? 'accent' : 'red' }
  ];

  const switchTab = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0 });
  };

  const handleResetClick = () => {
    if (window.confirm('Reset seluruh data menu, cerita & info kedai ke data awal? Perubahan kustom akan ditimpa.')) {
      onResetData();
      alert('Data berhasil direset ke kondisi awal.');
    }
  };

  return (
    <div className="admin-shell">
      {/* Top bar */}
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <span className="admin-topbar__logo"><span className="sq" />TEMU</span>
          <span className="admin-topbar__title">Admin CMS</span>
        </div>
        <div className="admin-topbar__actions">
          <button type="button" onClick={onNavigatePublic} className="admin-topbar__btn" title="Lihat situs publik">
            <span className="material-symbols-outlined">open_in_new</span>
            <span className="admin-topbar__btn-label">Lihat Situs</span>
          </button>
          <button
            type="button"
            onClick={() => (onNavigateMenu ? onNavigateMenu() : (window.location.hash = '#/menu'))}
            className="admin-topbar__btn"
            title="Lihat katalog menu publik"
          >
            <span className="material-symbols-outlined">menu_book</span>
            <span className="admin-topbar__btn-label">Katalog Publik</span>
          </button>
          <button type="button" onClick={onLogout} className="admin-topbar__btn is-danger" title="Logout">
            <span className="material-symbols-outlined">logout</span>
            <span className="admin-topbar__btn-label">Logout</span>
          </button>
        </div>
      </header>

      {/* Mobile tab bar (hidden on desktop) */}
      <nav className="admin-tabs" aria-label="Modul admin">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTab(t.id)}
            className={`admin-tabs__btn ${activeTab === t.id ? 'is-active' : ''}`}
            aria-current={activeTab === t.id ? 'page' : undefined}
          >
            <span className="material-symbols-outlined">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <div className="admin-body">
        {/* Desktop sidebar */}
        <aside className="admin-rail">
          <div className="admin-rail__group">
            <div className="admin-rail__label">Modul</div>
            <nav className="admin-rail__nav">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => switchTab(t.id)}
                  className={`admin-rail__item ${activeTab === t.id ? 'is-active' : ''}`}
                  aria-current={activeTab === t.id ? 'page' : undefined}
                >
                  <span className="material-symbols-outlined">{t.icon}</span>
                  <span className="admin-rail__item-label">{t.full}</span>
                  <span className={`admin-badge ${t.badgeTone ? `is-${t.badgeTone}` : ''}`}>{t.badge}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="admin-rail__group">
            <div className="admin-rail__label">Ringkasan</div>
            <div className="admin-stats">
              <div className="admin-stat">
                <span className="admin-stat__value">{totalActive}</span>
                <span className="admin-stat__label">Menu tersedia</span>
              </div>
              <div className="admin-stat">
                <span className="admin-stat__value" style={{ color: totalSoldOut ? 'var(--dp-color-signal-red)' : undefined }}>{totalSoldOut}</span>
                <span className="admin-stat__label">Sold out</span>
              </div>
              <div className="admin-stat">
                <span className="admin-stat__value">{totalPublished}</span>
                <span className="admin-stat__label">Cerita tayang</span>
              </div>
            </div>
          </div>

          <div className="admin-rail__group admin-rail__group--end">
            <button type="button" onClick={handleResetClick} className="btn-swiss btn-danger" style={{ width: '100%', padding: '12px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>restart_alt</span>
              Reset ke data awal
            </button>
          </div>
        </aside>

        <main className="admin-main">
          {activeTab === 'menu' && (
            <MenuManager
              menuItems={menuItems}
              categories={categories}
              onAddCategory={onAddCategory}
              onRenameCategory={onRenameCategory}
              onDeleteCategory={onDeleteCategory}
              onAddMenu={onAddMenu}
              onUpdateMenu={onUpdateMenu}
              onDeleteMenu={onDeleteMenu}
              onToggleAvailable={onToggleAvailable}
            />
          )}

          {activeTab === 'history' && (
            <HistoryManager
              historyStories={historyStories}
              onAddStory={onAddStory}
              onUpdateStory={onUpdateStory}
              onDeleteStory={onDeleteStory}
              onTogglePublished={onTogglePublished}
            />
          )}

          {activeTab === 'info' && (
            <LandingInfoManager siteInfo={siteInfo} onUpdateInfo={onUpdateInfo} />
          )}

          {/* Mobile-only: reset lives at the bottom of the content */}
          <div className="admin-mobile-reset">
            <button type="button" onClick={handleResetClick} className="btn-swiss btn-danger" style={{ width: '100%', padding: '14px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>restart_alt</span>
              Reset ke data awal
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
