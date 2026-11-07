import React, { useState, useEffect } from 'react';
import MenuManager from './MenuManager';
import HistoryManager from './HistoryManager';
import InventoryManager from './InventoryManager';
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
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'history' | 'inventory' | 'info'
  const [syncTimestamp, setSyncTimestamp] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setSyncTimestamp(`HARI INI ${hours}:${minutes} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Quick stats calculation
  const totalActive = menuItems.filter(i => i.is_available).length;
  const totalSoldOut = menuItems.filter(i => !i.is_available).length;
  const totalPublishedStories = historyStories.filter(s => s.is_published).length;

  const handleResetClick = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data menu, cerita historis & konten kedai kembali ke data awal (Default Seed Data)? Perubahan kustom Anda akan ditimpa.')) {
      onResetData();
      alert('Basis data berhasil direset ke kondisi awal.');
    }
  };

  return (
    <div 
      className="bg-ground text-primary antialiased min-h-screen flex flex-col font-body-md text-body-md selection:bg-primary selection:text-ground" 
      style={{ backgroundColor: 'rgb(245, 242, 235)' }}
    >
      {/* 1. TOP HEADER / STATUS BAR */}
      <header 
        className="w-full border-b-2 border-primary bg-ground sticky top-0 z-50" 
        style={{ backgroundColor: 'rgb(245, 242, 235)' }}
      >
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between">
          {/* Brand & Badge Section */}
          <div className="flex items-stretch border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
            <div className="px-space-md py-space-sm flex items-center gap-space-sm border-r-2 border-primary bg-primary text-ground font-headline-md text-headline-md tracking-tight">
              <span className="w-2.5 h-2.5 bg-ground inline-block"></span>
              <span>TEMU</span>
            </div>
            <div className="px-space-md py-space-sm flex items-center gap-space-sm">
              <span className="font-metadata-bold text-metadata-bold tracking-tight">CMS LEDGER // ADMIN CONSOLE</span>
              <span className="px-1.5 py-0.5 border border-primary text-[10px] font-tag-mono font-bold bg-surface">
                SYS.VER 2.4
              </span>
            </div>
          </div>

          {/* Center Metadata & Session Status */}
          <div className="flex items-center flex-wrap divide-x-2 divide-primary text-body-sm font-metadata-bold border-b-2 lg:border-b-0">
            <div className="px-space-md py-space-sm flex items-center gap-2">
              <span className="text-on-surface-variant font-tag-mono text-tag-mono">OPERATOR:</span>
              <span className="bg-surface px-1.5 py-0.5 border border-primary text-primary font-tag-mono text-xs font-bold">
                BARISTA-ARCHIVIST #04
              </span>
            </div>
            <div className="px-space-md py-space-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0047FF] inline-block animate-pulse"></span>
              <span className="font-tag-mono text-tag-mono tracking-wider font-bold">DB SYNC: REALTIME NOMINAL</span>
            </div>
            <div className="px-space-md py-space-sm hidden sm:flex items-center gap-2 font-tag-mono text-tag-mono text-on-surface-variant font-bold">
              <span>LATENCY: 14MS</span>
            </div>
          </div>

          {/* Navigation Exit Points */}
          <div className="flex items-stretch divide-x-2 divide-primary">
            <button
              type="button"
              onClick={onNavigatePublic}
              className="px-space-md py-space-sm flex items-center gap-2 font-index-label text-index-label hover:bg-primary hover:text-ground border-0"
              title="Kembali ke beranda publik"
            >
              <span>BERANDA PUBLIK</span>
              <span className="material-symbols-outlined text-sm">north_east</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNavigateMenu) onNavigateMenu();
                else window.location.hash = '#/menu';
              }}
              className="px-space-md py-space-sm flex items-center gap-2 font-index-label text-index-label hover:bg-primary hover:text-ground border-0"
              style={{ backgroundColor: 'rgb(236, 229, 216)' }}
              title="Lihat halaman katalog menu terpisah"
            >
              <span>KATALOG MENU ↗</span>
              <span className="material-symbols-outlined text-sm">restaurant_menu</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="px-space-md py-space-sm flex items-center gap-1.5 font-index-label text-index-label text-signal-red hover:bg-signal-red hover:text-ground border-0"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. 12-COLUMN MAIN WORKSPACE */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 border-b-2 border-primary">
        {/* ========================================== */}
        {/* KOLOM 1-3: PERSISTENT LEFT INDEX RAIL      */}
        {/* ========================================== */}
        <aside 
          className="lg:col-span-3 border-b-2 lg:border-b-0 lg:border-r-2 border-primary bg-ground flex flex-col justify-between" 
          style={{ backgroundColor: 'rgb(245, 242, 235)' }}
        >
          <div>
            {/* Rail Header Tag */}
            <div 
              className="p-space-md border-b-2 border-primary bg-surface flex items-center justify-between" 
              style={{ backgroundColor: 'rgb(236, 229, 216)' }}
            >
              <span className="font-tag-mono text-tag-mono tracking-widest text-primary font-bold">
                00 // INDEKS KERJA ADMIN
              </span>
              <span className="inline-block w-2 h-2 bg-primary"></span>
            </div>

            {/* Navigation Stack */}
            <nav className="flex flex-col border-b-2 border-primary divide-y-2 divide-primary font-index-label text-index-label">
              {/* Tab 01: Katalog Menu */}
              <button
                type="button"
                onClick={() => setActiveTab('menu')}
                className={`p-space-md flex items-center justify-between group border-0 text-left ${
                  activeTab === 'menu' ? 'bg-primary text-ground' : 'bg-ground text-primary hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 inline-block ${activeTab === 'menu' ? 'bg-[#0047FF]' : 'border border-primary'}`}></span>
                  <span className="font-bold tracking-wider">01 // MANAJEMEN KATALOG MENU</span>
                </div>
                <span className={`px-1.5 py-0.5 text-tag-mono font-tag-mono font-bold ${
                  activeTab === 'menu' ? 'bg-ground text-primary' : 'bg-surface text-primary border border-primary'
                }`}>
                  {menuItems.length}
                </span>
              </button>

              {/* Tab 02: Dokumentasi Historis */}
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`p-space-md flex items-center justify-between group border-0 text-left ${
                  activeTab === 'history' ? 'bg-primary text-ground' : 'bg-ground text-primary hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 inline-block ${activeTab === 'history' ? 'bg-[#0047FF]' : 'border border-primary'}`}></span>
                  <span className="font-bold tracking-wider">02 // DOKUMENTASI HISTORIS</span>
                </div>
                <span className={`px-1.5 py-0.5 text-tag-mono font-tag-mono font-bold ${
                  activeTab === 'history' ? 'bg-ground text-primary' : 'bg-surface text-primary border border-primary'
                }`}>
                  {historyStories.length}
                </span>
              </button>

              {/* Tab 03: Inventaris & Stok Biji (Dihide sementara - belum dibutuhkan) */}
              {/* 
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className={`p-space-md flex items-center justify-between group border-0 text-left ${
                  activeTab === 'inventory' ? 'bg-primary text-ground' : 'bg-ground text-primary hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 inline-block ${activeTab === 'inventory' ? 'bg-[#0047FF]' : 'border border-primary'}`}></span>
                  <span className="font-bold tracking-wider">03 // INVENTARIS &amp; STOK BIJI</span>
                </div>
                <span className={`px-1.5 py-0.5 text-tag-mono font-tag-mono font-bold ${
                  activeTab === 'inventory' ? 'bg-ground text-primary' : 'bg-surface text-primary border border-primary'
                }`}>
                  METRIK
                </span>
              </button>
              */}

              {/* Tab 03: Pengaturan Status Kedai */}
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`p-space-md flex items-center justify-between group border-0 text-left ${
                  activeTab === 'info' ? 'bg-primary text-ground' : 'bg-ground text-primary hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 inline-block ${activeTab === 'info' ? 'bg-[#0047FF]' : 'border border-primary'}`}></span>
                  <span className="font-bold tracking-wider">03 // PENGATURAN STATUS KEDAI</span>
                </div>
                <span className={`px-1.5 py-0.5 font-tag-mono text-tag-mono font-bold text-ground ${
                  siteInfo.isOpen ? 'bg-[#0047FF]' : 'bg-signal-red'
                }`}>
                  {siteInfo.isOpen ? 'BUKA' : 'TUTUP'}
                </span>
              </button>
            </nav>

            {/* Quick Stats Ledger Box */}
            <div 
              className="p-space-md border-b-2 border-primary bg-ground space-y-space-md" 
              style={{ backgroundColor: 'rgb(245, 242, 235)' }}
            >
              <div className="flex items-center justify-between pb-1 border-b border-primary">
                <span className="font-tag-mono text-tag-mono tracking-widest text-on-surface-variant font-bold">
                  RINGKASAN BUKU BESAR
                </span>
                <span className="text-[10px] font-tag-mono font-bold">LOG.OCT.25</span>
              </div>
              <div className="space-y-2 font-tag-mono text-tag-mono">
                <div className="flex justify-between items-center py-1 border-b border-surface-dim">
                  <span className="text-on-surface-variant">TOTAL SAJIAN AKTIF:</span>
                  <span className="font-bold text-primary bg-surface px-1.5 py-0.5 border border-primary">
                    {String(totalActive).padStart(2, '0')} SAJIAN
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-dim">
                  <span className="text-on-surface-variant">SAJIAN SOLD OUT:</span>
                  <span className="font-bold text-signal-red bg-[#ffdad6] px-1.5 py-0.5 border border-primary">
                    {String(totalSoldOut).padStart(2, '0')} ITEM
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-surface-dim">
                  <span className="text-on-surface-variant">ARSIP PUBLIKASI:</span>
                  <span className="font-bold text-primary">
                    {String(totalPublishedStories).padStart(2, '0')} DOKUMEN
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant">UPDATE TERAKHIR:</span>
                  <span className="font-bold text-[#0047FF]">{syncTimestamp}</span>
                </div>
              </div>
            </div>

            {/* Protocol Configuration Box */}
            <div className="p-space-md font-body-sm text-body-sm space-y-2 border-b-2 border-primary">
              <div className="text-[11px] font-tag-mono text-on-surface-variant uppercase tracking-wider font-bold">
                KONFIGURASI PROTOKOL
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Perubahan basis data direkam secara permanen ke ledger historis kedai. Semua harga sudah termasuk PPN 11% &amp; service charge operasional barista.
              </p>
            </div>

            {/* Reset Persistence Action */}
            <div className="p-space-md border-b-2 border-primary bg-surface" style={{ backgroundColor: 'rgb(236, 229, 216)' }}>
              <button
                type="button"
                onClick={handleResetClick}
                className="w-full py-2.5 px-space-md bg-ground text-signal-red border-2 border-primary font-tag-mono text-tag-mono font-bold hover:bg-signal-red hover:text-ground flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>↺ RESET TO DEFAULT SEED</span>
              </button>
            </div>
          </div>

          {/* Rail Footer / Operator Lock */}
          <div 
            className="p-space-md border-t-2 border-primary bg-surface text-tag-mono font-tag-mono flex items-center justify-between" 
            style={{ backgroundColor: 'rgb(236, 229, 216)' }}
          >
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 bg-primary"></span>
              <span>LEDGER LOCKED: NO DRIFT</span>
            </span>
            <span className="font-bold">ID: #9901-ID</span>
          </div>
        </aside>

        {/* ========================================== */}
        {/* KOLOM 4-12: MAIN WORKSPACE MATRIX          */}
        {/* ========================================== */}
        <main className="lg:col-span-9 bg-ground flex flex-col" style={{ backgroundColor: 'rgb(245, 242, 235)' }}>
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

          {/* activeTab === 'inventory' && (
            <InventoryManager />
          ) */}

          {activeTab === 'info' && (
            <LandingInfoManager
              siteInfo={siteInfo}
              onUpdateInfo={onUpdateInfo}
            />
          )}
        </main>
      </div>

      {/* 4. FOOTER LEDGER */}
      <footer 
        className="w-full border-t-2 border-primary bg-ground text-primary" 
        style={{ backgroundColor: 'rgb(245, 242, 235)' }}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-12 divide-y-2 md:divide-y-0 md:divide-x-2 divide-primary">
          {/* Brand & Version */}
          <div className="md:col-span-4 p-space-md flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-headline-md tracking-tight font-bold">
                TEMU // CMS LEDGER
              </span>
              <span className="px-1.5 py-0.5 border border-primary text-[10px] font-tag-mono font-bold">
                V2.4
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-body-sm mt-2">
              Sistem manajemen inventarisasi presisi terpusat mengikuti kaidah Swiss International Typographic Style. Bebas ornamen.
            </p>
          </div>

          {/* Live Ledger Metrics */}
          <div className="md:col-span-4 p-space-md font-tag-mono text-tag-mono space-y-1">
            <div className="text-on-surface-variant uppercase tracking-wider text-[10px] font-bold">
              STATUS SERVER &amp; METRIK BASIS DATA:
            </div>
            <div className="flex justify-between">
              <span>STATUS PROTOKOL:</span>
              <span className="font-bold text-[#0047FF]">ONLINE (NOMINAL)</span>
            </div>
            <div className="flex justify-between">
              <span>TERAKHIR SYNC:</span>
              <span className="font-bold">{syncTimestamp}</span>
            </div>
            <div className="flex justify-between">
              <span>RESPONS SERVER:</span>
              <span className="font-bold">14 MS [OK]</span>
            </div>
          </div>

          {/* Legal & Copyright Ledger */}
          <div className="md:col-span-4 p-space-md flex flex-col justify-between font-tag-mono text-tag-mono">
            <div className="flex flex-wrap gap-x-space-md gap-y-1 text-[11px] text-on-surface-variant font-bold">
              <a className="hover:text-primary underline cursor-pointer" href="#menu-module">
                TERMS / METRICS
              </a>
              <a className="hover:text-primary underline cursor-pointer" href="#menu-module">
                DOKUMENTASI API
              </a>
              <a className="hover:text-primary underline cursor-pointer" href="#menu-module">
                AUDIT LOG
              </a>
              <a className="hover:text-primary underline cursor-pointer" href="#menu-module">
                KOLOFON
              </a>
            </div>
            <div className="mt-4 text-[10px] text-on-surface-variant">
              © 2025 TEMU COFFEE PROTOCOL. REPRODUKSI TANPA IZIN DILARANG. HAK CIPTA DILINDUNGI SISTEM LEDGER.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
