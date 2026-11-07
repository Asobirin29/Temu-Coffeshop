import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginModal from './components/common/LoginModal';
import HeroSection from './components/public/HeroSection';
import HistorySection from './components/public/HistorySection';
import LocationSection from './components/public/LocationSection';
import MenuCatalogPage from './components/public/MenuCatalogPage';
import AdminLayout from './components/admin/AdminLayout';

import {
  initStorage,
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuAvailable,
  getCategories,
  addCategory,
  renameCategory,
  deleteCategory,
  getHistoryStories,
  addHistoryStory,
  updateHistoryStory,
  deleteHistoryStory,
  toggleStoryPublished,
  getSiteInfo,
  updateSiteInfo,
  resetToDefaultData,
  isUserAdmin,
  setAdminSession
} from './services/storageService';

function AdminPill({ onWorkspace, secondaryLabel, onSecondary, onLogout }) {
  return (
    <aside className="admin-floating-pill swiss-border-all" aria-label="Panel pintas admin">
      <span className="pill-label" style={{ display: "inline-flex", alignItems: "center", fontWeight: 700 }}>
        <span className="status-dot"></span>CMS AKTIF
      </span>
      <button type="button" onClick={onWorkspace} className="btn-swiss btn-accent" style={{ padding: "8px 12px", fontSize: "11px" }}>
        Workspace ↗
      </button>
      <button type="button" onClick={onSecondary} className="btn-swiss" style={{ padding: "8px 12px", fontSize: "11px" }}>
        {secondaryLabel}
      </button>
      <button type="button" onClick={onLogout} className="btn-swiss" style={{ padding: "8px 12px", fontSize: "11px", color: "var(--dp-color-signal-red)", borderColor: "var(--dp-color-signal-red)" }}>
        Logout
      </button>
    </aside>
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [historyStories, setHistoryStories] = useState([]);
  const [siteInfo, setSiteInfo] = useState(getSiteInfo());

  const isMenuPage = currentHash.startsWith('#/menu') || 
                     currentHash.startsWith('#menu') || 
                     currentHash.startsWith('#/katalog') || 
                     currentHash.startsWith('#katalog');

  const isAdminRoute = currentHash.startsWith('#/admin') || 
                       currentHash.startsWith('#admin') || 
                       currentHash.startsWith('#/login') || 
                       currentHash.startsWith('#login');

  // Initialize storage & read initial state
  useEffect(() => {
    initStorage();
    setMenuItems(getMenuItems());
    setCategories(getCategories());
    setHistoryStories(getHistoryStories());
    setSiteInfo(getSiteInfo());
    setIsAdmin(isUserAdmin());

    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentHash(hash);

      if (
        hash.startsWith('#/admin') || 
        hash.startsWith('#admin') || 
        hash.startsWith('#/login') || 
        hash.startsWith('#login')
      ) {
        if (!isUserAdmin()) {
          setIsLoginModalOpen(true);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Global keyboard shortcut to open Admin Gate: Ctrl+Shift+A or Alt+A
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))
      ) {
        e.preventDefault();
        if (isUserAdmin()) {
          window.location.hash = '#/admin';
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Direct visit to #/admin or #admin
    const initHash = window.location.hash || '#/';
    if (
      (initHash.startsWith('#/admin') || initHash.startsWith('#admin')) && 
      !isUserAdmin()
    ) {
      setIsLoginModalOpen(true);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle smooth scroll when navigating to sections
  useEffect(() => {
    if (!isMenuPage && !isAdminRoute) {
      if (currentHash === '#historis' || currentHash === '#/historis') {
        const el = document.getElementById('historis');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (currentHash === '#lokasi' || currentHash === '#/lokasi') {
        const el = document.getElementById('lokasi');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentHash, isMenuPage, isAdminRoute]);

  // CRUD Handlers - Menu
  const handleAddMenu = (item) => {
    const updated = addMenuItem(item);
    setMenuItems([...updated]);
  };

  const handleUpdateMenu = (item) => {
    const updated = updateMenuItem(item);
    setMenuItems([...updated]);
  };

  const handleDeleteMenu = (id) => {
    const updated = deleteMenuItem(id);
    setMenuItems([...updated]);
  };

  const handleToggleAvailable = (id) => {
    const updated = toggleMenuAvailable(id);
    setMenuItems([...updated]);
  };

  // CRUD Handlers - History
  const handleAddStory = (story) => {
    const updated = addHistoryStory(story);
    setHistoryStories([...updated]);
  };

  const handleUpdateStory = (story) => {
    const updated = updateHistoryStory(story);
    setHistoryStories([...updated]);
  };

  const handleDeleteStory = (id) => {
    const updated = deleteHistoryStory(id);
    setHistoryStories([...updated]);
  };

  const handleTogglePublished = (id) => {
    const updated = toggleStoryPublished(id);
    setHistoryStories([...updated]);
  };

  // Site Info Handler (Landing Page Settings)
  const handleUpdateInfo = (newInfo) => {
    const updated = updateSiteInfo(newInfo);
    setSiteInfo({ ...updated });
  };

  // Category Handlers (Tambah, Rename, Hapus)
  const handleAddCategory = (name) => {
    const updated = addCategory(name);
    setCategories([...updated]);
    return updated;
  };

  const handleRenameCategory = (oldName, newName) => {
    const result = renameCategory(oldName, newName);
    setCategories([...result.categories]);
    setMenuItems([...result.menuItems]);
    return result;
  };

  const handleDeleteCategory = (name) => {
    const result = deleteCategory(name);
    setCategories([...result.categories]);
    setMenuItems([...result.menuItems]);
    return result;
  };

  // Reset Data Handler
  const handleResetData = () => {
    resetToDefaultData();
    setMenuItems(getMenuItems());
    setCategories(getCategories());
    setHistoryStories(getHistoryStories());
    setSiteInfo(getSiteInfo());
  };

  // Auth Handlers
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    window.location.hash = '#/admin';
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAdmin(false);
    window.location.hash = '#/';
  };

  // Navigation Handlers
  const handleNavigateAdmin = () => {
    if (isAdmin) {
      window.location.hash = '#/admin';
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleNavigatePublic = () => {
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMenu = () => {
    window.location.hash = '#/menu';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId) => {
    if (isMenuPage) {
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.location.hash = `#${sectionId}`;
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Render Admin Workspace if hash is #/admin and user is authenticated
  if (isAdminRoute && isAdmin) {
    return (
      <AdminLayout
        siteInfo={siteInfo}
        onUpdateInfo={handleUpdateInfo}
        menuItems={menuItems}
        categories={categories}
        onAddCategory={handleAddCategory}
        onRenameCategory={handleRenameCategory}
        onDeleteCategory={handleDeleteCategory}
        historyStories={historyStories}
        onAddMenu={handleAddMenu}
        onUpdateMenu={handleUpdateMenu}
        onDeleteMenu={handleDeleteMenu}
        onToggleAvailable={handleToggleAvailable}
        onAddStory={handleAddStory}
        onUpdateStory={handleUpdateStory}
        onDeleteStory={handleDeleteStory}
        onTogglePublished={handleTogglePublished}
        onResetData={handleResetData}
        onNavigatePublic={handleNavigatePublic}
        onNavigateMenu={handleNavigateMenu}
        onLogout={handleLogout}
      />
    );
  }

  // 2. Render Dedicated Menu Catalog Page (Separate View)
  if (isMenuPage) {
    return (
      <div id="top" className={isAdmin ? "has-admin-pill" : undefined}>
        <Header
          siteInfo={siteInfo}
          isAdmin={isAdmin}
          onNavigateAdmin={handleNavigateAdmin}
          onNavigatePublic={handleNavigatePublic}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          isMenuPage={true}
          onNavigateMenu={handleNavigateMenu}
          onNavigateSection={handleNavigateSection}
        />

        <main>
          <MenuCatalogPage
            menuItems={menuItems}
            categories={categories}
            siteInfo={siteInfo}
            onNavigateHome={handleNavigatePublic}
          />
        </main>

        <Footer
          siteInfo={siteInfo}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          isAdmin={isAdmin}
          onNavigateAdmin={handleNavigateAdmin}
          onNavigateMenu={handleNavigateMenu}
        />

        {isAdmin && <AdminPill onWorkspace={handleNavigateAdmin} secondaryLabel="Beranda" onSecondary={handleNavigatePublic} onLogout={handleLogout} />}

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => {
            setIsLoginModalOpen(false);
          }}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // 3. Render Public Main Landing Page (No Menu Catalog embedded here!)
  return (
    <div id="top" className={isAdmin ? "has-admin-pill" : undefined}>
      <Header
        siteInfo={siteInfo}
        isAdmin={isAdmin}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigatePublic={handleNavigatePublic}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isMenuPage={false}
        onNavigateMenu={handleNavigateMenu}
        onNavigateSection={handleNavigateSection}
      />

      <main>
        <HeroSection 
          siteInfo={siteInfo} 
          onNavigateMenu={handleNavigateMenu} 
        />
        <HistorySection 
          historyStories={historyStories} 
          onNavigateMenu={handleNavigateMenu} 
        />
        <LocationSection 
          siteInfo={siteInfo} 
        />

        <section className="menu-band section-pad" aria-label="Katalog menu">
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span className="eyebrow"><span className="sq" />03 — Menu</span>
            <h2 className="section-title">{menuItems.length} sajian, siap diseduh.</h2>
          </div>
          <button type="button" onClick={handleNavigateMenu} className="btn-swiss btn-accent btn-lg">
            Buka Katalog Menu ↗
          </button>
        </section>
      </main>

      <Footer
        siteInfo={siteInfo}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigateMenu={handleNavigateMenu}
      />

      {isAdmin && <AdminPill onWorkspace={handleNavigateAdmin} secondaryLabel="Menu" onSecondary={handleNavigateMenu} onLogout={handleLogout} />}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          if (
            (currentHash.startsWith('#/admin') || currentHash.startsWith('#admin')) && 
            !isAdmin
          ) {
            window.location.hash = '#/';
          }
        }}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
