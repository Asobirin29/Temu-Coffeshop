import React, { useState } from 'react';
import MenuManager from './MenuManager';
import HistoryManager from './HistoryManager';
import LandingInfoManager from './LandingInfoManager';

export default function AdminLayout({
  siteInfo,
  onUpdateInfo,
  menuItems,
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
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'history' | 'info'

  const handleResetClick = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data menu, cerita historis & konten landing page kembali ke data awal (Default Seed Data)? Perubahan kustom Anda akan ditimpa.')) {
      onResetData();
      alert('Data berhasil direset ke kondisi awal.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--dp-color-ground)' }}>
      {/* Admin Top Bar */}
      <header className="swiss-border-b" style={{ backgroundColor: 'var(--dp-color-ink)', color: '#ffffff' }}>
        <div className="swiss-grid" style={{ alignItems: 'center', minHeight: '60px' }}>
          <div 
            className="swiss-border-r" 
            style={{ 
              gridColumn: 'span 4', 
              padding: '16px 24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              borderColor: '#333333'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.05em' }}>
              [ TEMU // ADMIN CMS ]
            </div>
            <span className="badge-recommended" style={{ fontSize: '10px' }}>
              AKTIF
            </span>
          </div>

          <div 
            style={{ 
              gridColumn: 'span 8', 
              padding: '12px 24px', 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              gap: '12px' 
            }}
          >
            <button 
              type="button" 
              onClick={onNavigatePublic}
              className="btn-swiss"
              style={{ backgroundColor: '#111111', color: '#ffffff', borderColor: '#444444' }}
            >
              LIHAT LANDING PAGE ↗
            </button>
            <button 
              type="button" 
              onClick={onLogout}
              className="btn-swiss"
              style={{ backgroundColor: 'var(--dp-color-accent)', color: '#ffffff', borderColor: 'transparent' }}
            >
              LOGOUT [X]
            </button>
          </div>
        </div>
      </header>

      {/* Main 12-Column Grid */}
      <div className="swiss-grid">
        {/* Kolom 1-3: Admin Index Rail */}
        <aside 
          className="index-rail-col swiss-border-r" 
          style={{ 
            gridColumn: 'span 3', 
            padding: 'var(--dp-spacing-gutter)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'var(--dp-color-surface)'
          }}
        >
          <div>
            <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '12px' }}>
              NAVIGASI MODUL CMS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('menu')}
                className={activeTab === 'menu' ? 'active' : ''}
                style={{ textAlign: 'left', width: '100%', justifyContent: 'space-between' }}
              >
                <span>01 / KATALOG MENU</span>
                <span className="text-metadata">({menuItems.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={activeTab === 'history' ? 'active' : ''}
                style={{ textAlign: 'left', width: '100%', justifyContent: 'space-between' }}
              >
                <span>02 / CERITA HISTORIS</span>
                <span className="text-metadata">({historyStories.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={activeTab === 'info' ? 'active' : ''}
                style={{ textAlign: 'left', width: '100%', justifyContent: 'space-between' }}
              >
                <span>03 / LANDING PAGE</span>
                <span className="text-metadata" style={{ color: 'var(--dp-color-accent)', fontWeight: 700 }}>● EDIT</span>
              </button>
            </div>

            <div className="swiss-border-t" style={{ paddingTop: '24px' }}>
              <div className="text-label" style={{ color: '#777777', marginBottom: '12px' }}>
                KONTROL PERSISTENSI
              </div>
              <button
                type="button"
                onClick={handleResetClick}
                className="btn-swiss"
                style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  backgroundColor: 'var(--dp-color-ground)',
                  color: 'var(--dp-color-accent)'
                }}
              >
                ↺ RESET TO DEFAULT SEED
              </button>
              <div className="text-metadata" style={{ marginTop: '8px', color: '#777777', lineHeight: 1.5 }}>
                Gunakan jika ingin mengembalikan seluruh data menu dan arsip cerita ke format awal.
              </div>
            </div>
          </div>

          <div className="swiss-border-t" style={{ paddingTop: '20px', marginTop: '32px' }}>
            <div className="text-label" style={{ color: '#666666', marginBottom: '6px' }}>
              STATUS SISTEM
            </div>
            <div className="text-metadata" style={{ color: '#333333' }}>
              ● LocalStorage Engine Online<br />
              ● Grayscale Auto-Filter Active<br />
              ● Vercel Production Build Ready
            </div>
          </div>
        </aside>

        {/* Kolom 4-12: Workspace Matrix */}
        <main 
          className="content-matrix-col" 
          style={{ 
            gridColumn: 'span 9', 
            backgroundColor: 'var(--dp-color-ground)',
            minHeight: '80vh' 
          }}
        >
          {activeTab === 'menu' && (
            <MenuManager
              menuItems={menuItems}
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
            <LandingInfoManager
              siteInfo={siteInfo}
              onUpdateInfo={onUpdateInfo}
            />
          )}
        </main>
      </div>
    </div>
  );
}

