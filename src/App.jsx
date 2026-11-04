import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginModal from './components/common/LoginModal';
import HeroSection from './components/public/HeroSection';
import MenuSection from './components/public/MenuSection';
import HistorySection from './components/public/HistorySection';
import LocationSection from './components/public/LocationSection';
import AdminLayout from './components/admin/AdminLayout';

import {
  initStorage,
  getMenuItems,
  saveMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuAvailable,
  getHistoryStories,
  saveHistoryStories,
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

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [historyStories, setHistoryStories] = useState([]);
  const [siteInfo, setSiteInfo] = useState(getSiteInfo());

  // Initialize storage & read initial state
  useEffect(() => {
    initStorage();
    setMenuItems(getMenuItems());
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

  // Reset Data Handler
  const handleResetData = () => {
    resetToDefaultData();
    setMenuItems(getMenuItems());
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

  const handleNavigateAdmin = () => {
    if (isAdmin) {
      window.location.hash = '#/admin';
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleNavigatePublic = () => {
    window.location.hash = '#/';
  };

  // Render Admin Workspace if hash is #/admin and user is authenticated
  if ((currentHash.startsWith('#/admin') || currentHash.startsWith('#admin')) && isAdmin) {
    return (
      <AdminLayout
        siteInfo={siteInfo}
        onUpdateInfo={handleUpdateInfo}
        menuItems={menuItems}
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
        onLogout={handleLogout}
      />
    );
  }

  // Render Public Landing Page
  return (
    <div>
      <Header
        siteInfo={siteInfo}
        isAdmin={isAdmin}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigatePublic={handleNavigatePublic}
      />

      <main>
        <HeroSection siteInfo={siteInfo} />
        <MenuSection menuItems={menuItems} />
        <HistorySection historyStories={historyStories} />
        <LocationSection siteInfo={siteInfo} />
      </main>

      <Footer
        siteInfo={siteInfo}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onNavigateAdmin={handleNavigateAdmin}
      />

      {/* Floating Control Bar for Authenticated Admin on Public Preview */}
      {isAdmin && (
        <aside 
          className="admin-floating-pill swiss-border-all" 
          aria-label="Panel Pintas Pengelola Kedai"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
            <span className="status-dot"></span>
            CMS AKTIF
          </span>
          <button
            type="button"
            onClick={handleNavigateAdmin}
            className="btn-swiss btn-accent"
            style={{ padding: '6px 12px', fontSize: '11px' }}
          >
            BUKA WORKSPACE ↗
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-swiss"
            style={{ padding: '6px 10px', fontSize: '11px', color: '#888888', borderColor: '#444444' }}
          >
            LOGOUT
          </button>
        </aside>
      )}

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
