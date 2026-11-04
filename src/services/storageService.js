import { DEFAULT_MENU_ITEMS, DEFAULT_HISTORY_STORIES, DEFAULT_INFO } from '../data/defaultSeedData';

const STORAGE_KEYS = {
  MENU: 'temu_coffee_menu_items',
  HISTORY: 'temu_coffee_history_stories',
  INFO: 'temu_coffee_info',
  ADMIN_PIN: 'temu_coffee_admin_pin',
  ADMIN_SESSION: 'temu_coffee_admin_auth'
};

const DEFAULT_PIN = '1984';

// Initialize defaults if not present
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY_STORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INFO)) {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(DEFAULT_INFO));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PIN)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, DEFAULT_PIN);
  }
}

// Reset data to defaults
export function resetToDefaultData() {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY_STORIES));
  localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(DEFAULT_INFO));
  localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, DEFAULT_PIN);
}

// Menu Items CRUD
export function getMenuItems() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MENU);
    return raw ? JSON.parse(raw) : DEFAULT_MENU_ITEMS;
  } catch (e) {
    console.error("Failed to parse menu items:", e);
    return DEFAULT_MENU_ITEMS;
  }
}

export function saveMenuItems(items) {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
}

export function addMenuItem(newItem) {
  const items = getMenuItems();
  const id = newItem.id || `menu-${Date.now()}`;
  const item = { ...newItem, id };
  items.unshift(item);
  saveMenuItems(items);
  return items;
}

export function updateMenuItem(updatedItem) {
  const items = getMenuItems();
  const index = items.findIndex(i => i.id === updatedItem.id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    saveMenuItems(items);
  }
  return items;
}

export function deleteMenuItem(id) {
  const items = getMenuItems().filter(i => i.id !== id);
  saveMenuItems(items);
  return items;
}

export function toggleMenuAvailable(id) {
  const items = getMenuItems();
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index].is_available = !items[index].is_available;
    saveMenuItems(items);
  }
  return items;
}

// History Stories CRUD
export function getHistoryStories() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const stories = raw ? JSON.parse(raw) : DEFAULT_HISTORY_STORIES;
    return stories.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
  } catch (e) {
    console.error("Failed to parse history stories:", e);
    return DEFAULT_HISTORY_STORIES;
  }
}

export function saveHistoryStories(stories) {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(stories));
}

export function addHistoryStory(newStory) {
  const stories = getHistoryStories();
  const id = newStory.id || `hist-${Date.now()}`;
  const story = {
    ...newStory,
    id,
    display_order: Number(newStory.display_order) || (stories.length + 1)
  };
  stories.push(story);
  stories.sort((a, b) => a.display_order - b.display_order);
  saveHistoryStories(stories);
  return stories;
}

export function updateHistoryStory(updatedStory) {
  const stories = getHistoryStories();
  const index = stories.findIndex(s => s.id === updatedStory.id);
  if (index !== -1) {
    stories[index] = {
      ...stories[index],
      ...updatedStory,
      display_order: Number(updatedStory.display_order) || stories[index].display_order
    };
    stories.sort((a, b) => a.display_order - b.display_order);
    saveHistoryStories(stories);
  }
  return stories;
}

export function deleteHistoryStory(id) {
  const stories = getHistoryStories().filter(s => s.id !== id);
  saveHistoryStories(stories);
  return stories;
}

export function toggleStoryPublished(id) {
  const stories = getHistoryStories();
  const index = stories.findIndex(s => s.id === id);
  if (index !== -1) {
    stories[index].is_published = !stories[index].is_published;
    saveHistoryStories(stories);
  }
  return stories;
}

// Site Information CRUD (Landing Page Details)
export function getSiteInfo() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INFO);
    return raw ? { ...DEFAULT_INFO, ...JSON.parse(raw) } : DEFAULT_INFO;
  } catch (e) {
    console.error("Failed to parse site info:", e);
    return DEFAULT_INFO;
  }
}

export function updateSiteInfo(updatedInfo) {
  const current = getSiteInfo();
  const merged = { ...current, ...updatedInfo };
  localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(merged));
  return merged;
}

// Admin Authentication
export function verifyAdminPin(pin) {
  const currentPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_PIN;
  return pin === currentPin;
}

export function isUserAdmin() {
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
}

export function setAdminSession(status) {
  if (status) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }
}

// Convert uploaded file to Base64 with optional compression/resizing
export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Limit max dimension to 800px to keep localStorage usage small & fast
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(e.target.result); // Fallback to raw base64
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

