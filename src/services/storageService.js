import { DEFAULT_MENU_ITEMS, DEFAULT_HISTORY_STORIES, DEFAULT_INFO, DEFAULT_BEAN_BATCHES, DEFAULT_RAW_CATEGORIES } from '../data/defaultSeedData';

const STORAGE_KEYS = {
  MENU: 'temu_coffee_menu_items_v4',
  CATEGORIES: 'temu_coffee_categories_v4',
  HISTORY: 'temu_coffee_history_stories_v4',
  INFO: 'temu_coffee_info_v4',
  BEANS: 'temu_coffee_bean_inventory_v4',
  ADMIN_PIN: 'temu_coffee_admin_pin',
  ADMIN_SESSION: 'temu_coffee_admin_auth'
};

const DEFAULT_PIN = '1984';

// Initialize defaults if not present
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_RAW_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY_STORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INFO)) {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(DEFAULT_INFO));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BEANS)) {
    localStorage.setItem(STORAGE_KEYS.BEANS, JSON.stringify(DEFAULT_BEAN_BATCHES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PIN)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, DEFAULT_PIN);
  }
}

// Reset data to defaults
export function resetToDefaultData() {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_RAW_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY_STORIES));
  localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(DEFAULT_INFO));
  localStorage.setItem(STORAGE_KEYS.BEANS, JSON.stringify(DEFAULT_BEAN_BATCHES));
  localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, DEFAULT_PIN);
}

// Helper to normalize images array from an item or story
export function getItemImages(item) {
  if (!item) return [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images.filter(Boolean);
  }
  if (item.image_url) {
    return [item.image_url];
  }
  return [];
}

// Menu Items CRUD
export function getMenuItems() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MENU);
    const items = raw ? JSON.parse(raw) : DEFAULT_MENU_ITEMS;
    return items.map(item => {
      const images = getItemImages(item);
      return {
        ...item,
        images,
        image_url: images[0] || item.image_url || ''
      };
    });
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
  const nextNum = items.length + 1;
  const code = newItem.code || `TM-${String(nextNum).padStart(2, '0')}`;
  const id = newItem.id || `menu-${Date.now()}`;
  const images = getItemImages(newItem);
  const item = {
    ...newItem,
    id,
    code,
    images,
    image_url: images[0] || newItem.image_url || ''
  };
  items.unshift(item);
  saveMenuItems(items);
  return items;
}

export function updateMenuItem(updatedItem) {
  const items = getMenuItems();
  const index = items.findIndex(i => i.id === updatedItem.id);
  if (index !== -1) {
    const images = getItemImages(updatedItem);
    items[index] = {
      ...items[index],
      ...updatedItem,
      images,
      image_url: images[0] || updatedItem.image_url || ''
    };
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

// Categories CRUD
export function getCategories() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    const cats = raw ? JSON.parse(raw) : DEFAULT_RAW_CATEGORIES;
    return Array.isArray(cats) && cats.length > 0 ? cats : DEFAULT_RAW_CATEGORIES;
  } catch (e) {
    console.error("Failed to parse categories:", e);
    return DEFAULT_RAW_CATEGORIES;
  }
}

export function saveCategories(categories) {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

export function addCategory(newCategoryName) {
  const trimmed = (newCategoryName || '').trim().toUpperCase();
  if (!trimmed) {
    throw new Error('Nama kategori tidak boleh kosong.');
  }
  if (trimmed === 'ALL' || trimmed === 'SEMUA') {
    throw new Error('Nama kategori tidak boleh "ALL" atau "SEMUA".');
  }
  const cats = getCategories();
  if (cats.some(c => c.toUpperCase() === trimmed)) {
    throw new Error(`Kategori "${trimmed}" sudah ada.`);
  }
  const updated = [...cats, trimmed];
  saveCategories(updated);
  return updated;
}

export function renameCategory(oldCategoryName, newCategoryName) {
  const oldTrimmed = (oldCategoryName || '').trim().toUpperCase();
  const newTrimmed = (newCategoryName || '').trim().toUpperCase();
  if (!newTrimmed) {
    throw new Error('Nama kategori baru tidak boleh kosong.');
  }
  if (newTrimmed === 'ALL' || newTrimmed === 'SEMUA') {
    throw new Error('Nama kategori tidak boleh "ALL" atau "SEMUA".');
  }
  if (oldTrimmed === newTrimmed) {
    return { categories: getCategories(), menuItems: getMenuItems() };
  }
  const cats = getCategories();
  if (cats.some(c => c.toUpperCase() === newTrimmed)) {
    throw new Error(`Kategori "${newTrimmed}" sudah ada.`);
  }

  const catIndex = cats.findIndex(c => c.toUpperCase() === oldTrimmed);
  if (catIndex === -1) {
    throw new Error(`Kategori "${oldCategoryName}" tidak ditemukan.`);
  }

  const updatedCats = [...cats];
  updatedCats[catIndex] = newTrimmed;
  saveCategories(updatedCats);

  // Otomatis update semua menu items yang memakai kategori lama
  const menuItems = getMenuItems();
  let updatedAny = false;
  const updatedMenuItems = menuItems.map(item => {
    if (item.category && item.category.trim().toUpperCase() === oldTrimmed) {
      updatedAny = true;
      return { ...item, category: newTrimmed };
    }
    return item;
  });

  if (updatedAny) {
    saveMenuItems(updatedMenuItems);
  }

  return { categories: updatedCats, menuItems: updatedMenuItems };
}

export function deleteCategory(categoryName) {
  const trimmed = (categoryName || '').trim().toUpperCase();
  const cats = getCategories();
  if (cats.length <= 1) {
    throw new Error('Minimal harus tersisa satu kategori katalog.');
  }
  const updatedCats = cats.filter(c => c.toUpperCase() !== trimmed);
  saveCategories(updatedCats);

  // Jika ada menu items yang memakai kategori ini, alihkan ke kategori pertama yang tersisa
  const fallbackCat = updatedCats[0];
  const menuItems = getMenuItems();
  let updatedAny = false;
  const updatedMenuItems = menuItems.map(item => {
    if (item.category && item.category.trim().toUpperCase() === trimmed) {
      updatedAny = true;
      return { ...item, category: fallbackCat };
    }
    return item;
  });

  if (updatedAny) {
    saveMenuItems(updatedMenuItems);
  }

  return { categories: updatedCats, menuItems: updatedMenuItems };
}

// History Stories CRUD
export function getHistoryStories() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const stories = raw ? JSON.parse(raw) : DEFAULT_HISTORY_STORIES;
    const normalized = stories.map(story => {
      const images = getItemImages(story);
      return {
        ...story,
        images,
        image_url: images[0] || story.image_url || ''
      };
    });
    return normalized.sort((a, b) => (Number(a.display_order) || 0) - (Number(b.display_order) || 0));
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
  const images = getItemImages(newStory);
  const story = {
    ...newStory,
    id,
    images,
    image_url: images[0] || newStory.image_url || '',
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
    const images = getItemImages(updatedStory);
    stories[index] = {
      ...stories[index],
      ...updatedStory,
      images,
      image_url: images[0] || updatedStory.image_url || '',
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

// Bean Inventory Batches CRUD
export function getBeanBatches() {
  initStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BEANS);
    return raw ? JSON.parse(raw) : DEFAULT_BEAN_BATCHES;
  } catch (e) {
    console.error("Failed to parse bean batches:", e);
    return DEFAULT_BEAN_BATCHES;
  }
}

export function saveBeanBatches(batches) {
  localStorage.setItem(STORAGE_KEYS.BEANS, JSON.stringify(batches));
}

export function updateBeanBatch(updatedBatch) {
  const batches = getBeanBatches();
  const index = batches.findIndex(b => b.id === updatedBatch.id);
  if (index !== -1) {
    batches[index] = { ...batches[index], ...updatedBatch };
    saveBeanBatches(batches);
  }
  return batches;
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

// Export Menu to CSV File
export function exportMenuToCsv(items) {
  const headers = ["KODE", "NAMA_SAJIAN", "KATEGORI", "HARGA_IDR", "STATUS_KETERSEDIAAN", "DESKRIPSI_TEKNIS"];
  const rows = items.map(item => [
    `"${item.code || item.id}"`,
    `"${(item.name || '').replace(/"/g, '""')}"`,
    `"${(item.category || '').replace(/"/g, '""')}"`,
    item.price,
    item.is_available ? "TERSEDIA" : "SOLD OUT",
    `"${(item.caption || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `TEMU_MENU_LEDGER_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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

// Convert uploaded file to Base64 with compression/resizing
export function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
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
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Convert multiple uploaded files to Base64 in parallel
export async function readFilesAsBase64(files) {
  if (!files || files.length === 0) return [];
  const list = Array.from(files);
  const results = [];
  for (const file of list) {
    try {
      const b64 = await readFileAsBase64(file);
      results.push(b64);
    } catch (err) {
      console.warn("Failed processing file:", file.name, err);
    }
  }
  return results;
}
