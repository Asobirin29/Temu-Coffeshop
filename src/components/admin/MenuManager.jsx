import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../../data/defaultSeedData';
import { readFileAsBase64, readFilesAsBase64, exportMenuToCsv } from '../../services/storageService';
import CardCarousel from '../common/CardCarousel';

export default function MenuManager({
  menuItems,
  categories = [],
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  onAddMenu,
  onUpdateMenu,
  onDeleteMenu,
  onToggleAvailable
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Categories Calculation
  const activeCategories = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.filter(c => c !== 'ALL');
    }
    return ['SIGNATURE', 'ESPRESSO', 'MANUAL', 'COLD EXTRACTION', 'NON-COFFEE', 'PASTRY'];
  }, [categories]);

  const filterCategories = useMemo(() => {
    return ['ALL', ...activeCategories];
  }, [activeCategories]);

  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');
  const [editingCat, setEditingCat] = useState({ oldName: '', newName: '' });
  const [catFeedback, setCatFeedback] = useState({ error: '', success: '' });

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: 'KOPI SUSU TEMU',
    category: activeCategories[0] || 'SIGNATURE',
    price: '28000',
    caption: 'Signature espresso house-blend (Arbica Gayo 70% / Robusta Temanggung 30%), reduksi gula aren organik cair, susu murni pasteurisasi dingin.',
    images: ['/images/admin-tm01.jpg', '/images/admin-form-upload.jpg'],
    image_url: '/images/admin-tm01.jpg',
    is_available: true,
    is_featured: false
  });
  const [imageFileName, setImageFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Category Handlers inside Modal
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    setCatFeedback({ error: '', success: '' });
    const trimmed = (newCatInput || '').trim();
    if (!trimmed) {
      setCatFeedback({ error: 'Nama kategori tidak boleh kosong', success: '' });
      return;
    }
    try {
      if (onAddCategory) {
        onAddCategory(trimmed);
        setNewCatInput('');
        setCatFeedback({ error: '', success: `KATEGORI BARU [ ${trimmed.toUpperCase()} ] BERHASIL DITAMBAHKAN` });
      }
    } catch (err) {
      setCatFeedback({ error: err.message || 'Gagal menambahkan kategori', success: '' });
    }
  };

  const handleStartRename = (cat) => {
    setEditingCat({ oldName: cat, newName: cat });
    setCatFeedback({ error: '', success: '' });
  };

  const handleSaveRename = (e) => {
    if (e) e.preventDefault();
    setCatFeedback({ error: '', success: '' });
    const oldName = editingCat.oldName;
    const newName = (editingCat.newName || '').trim();
    if (!newName) {
      setCatFeedback({ error: 'Nama kategori baru tidak boleh kosong', success: '' });
      return;
    }
    try {
      if (onRenameCategory) {
        onRenameCategory(oldName, newName);
        if (selectedCategory === oldName) {
          setSelectedCategory(newName.toUpperCase());
        }
        if (formData.category === oldName) {
          setFormData(prev => ({ ...prev, category: newName.toUpperCase() }));
        }
        setCatFeedback({
          error: '',
          success: `KATEGORI [ ${oldName} ] BERHASIL DI-RENAME MENJADI [ ${newName.toUpperCase()} ]`
        });
        setEditingCat({ oldName: '', newName: '' });
      }
    } catch (err) {
      setCatFeedback({ error: err.message || 'Gagal me-rename kategori', success: '' });
    }
  };

  const handleDeleteCategoryClick = (cat) => {
    setCatFeedback({ error: '', success: '' });
    const itemsInCat = menuItems.filter(i => (i.category || '').trim().toUpperCase() === cat.trim().toUpperCase());
    const count = itemsInCat.length;

    let confirmMsg = `Hapus kategori "${cat}"?`;
    if (count > 0) {
      confirmMsg = `PERINGATAN: Terdapat ${count} sajian yang menggunakan kategori "${cat}".\nJika dihapus, ${count} sajian tersebut akan dialihkan ke kategori lain yang masih ada.\n\nApakah Anda yakin ingin menghapus kategori "${cat}"?`;
    }

    if (!window.confirm(confirmMsg)) return;

    try {
      if (onDeleteCategory) {
        onDeleteCategory(cat);
        if (selectedCategory === cat) {
          setSelectedCategory('ALL');
        }
        if (formData.category === cat) {
          const remaining = activeCategories.filter(c => c !== cat);
          setFormData(prev => ({ ...prev, category: remaining[0] || 'SIGNATURE' }));
        }
        setCatFeedback({
          error: '',
          success: `KATEGORI [ ${cat} ] BERHASIL DIHAPUS`
        });
      }
    } catch (err) {
      setCatFeedback({ error: err.message || 'Gagal menghapus kategori', success: '' });
    }
  };

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.caption && item.caption.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategory === 'ALL' ||
        (item.category && item.category.trim().toUpperCase() === selectedCategory.trim().toUpperCase());

      return matchSearch && matchCategory;
    });
  }, [menuItems, searchTerm, selectedCategory]);

  // Pagination calculation
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handleEditClick = (item) => {
    setEditingItem(item);
    const images = (item.images && item.images.length > 0)
      ? item.images
      : (item.image_url ? [item.image_url] : []);
    setFormData({
      name: item.name,
      category: item.category,
      price: String(item.price),
      caption: item.caption || '',
      images: images,
      image_url: images[0] || '',
      is_available: item.is_available,
      is_featured: item.is_featured || false
    });
    setImageFileName(`${images.length} FOTO TERLAMPIR`);
    setErrorMsg('');
    setSuccessMsg('');
    window.scrollTo({ top: 180, behavior: 'instant' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: activeCategories[0] || 'SIGNATURE',
      price: '',
      caption: '',
      images: [],
      image_url: '',
      is_available: true,
      is_featured: false
    });
    setImageFileName('');
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setErrorMsg('');
      const base64List = await readFilesAsBase64(files);
      setFormData(prev => {
        const newImages = [...(prev.images || []), ...base64List];
        return {
          ...prev,
          images: newImages,
          image_url: newImages[0] || ''
        };
      });
      setImageFileName(`${files.length} FOTO BARU DITAMBAHKAN`);
    } catch (err) {
      setErrorMsg('GAGAL MEMPROSES FOTO LOKAL: ' + err.message);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (idx) => {
    setFormData(prev => {
      const updated = [...(prev.images || [])];
      updated.splice(idx, 1);
      return {
        ...prev,
        images: updated,
        image_url: updated[0] || ''
      };
    });
  };

  const handleMovePhoto = (idx, direction) => {
    setFormData(prev => {
      const updated = [...(prev.images || [])];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= updated.length) return prev;
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;
      return {
        ...prev,
        images: updated,
        image_url: updated[0] || ''
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('NAMA SAJIAN WAJIB DIISI');
      return;
    }
    const numPrice = Number(String(formData.price).replace(/\D/g, ''));
    if (!numPrice || numPrice <= 0) {
      setErrorMsg('HARGA HARUS LEBIH BESAR DARI RP 0');
      return;
    }

    const finalImages = formData.images || [];
    const finalImageUrl = finalImages[0] || formData.image_url || '';

    if (editingItem) {
      onUpdateMenu({
        ...editingItem,
        ...formData,
        images: finalImages,
        image_url: finalImageUrl,
        price: numPrice
      });
      setSuccessMsg(`BERHASIL DIPERBARUI: [ ${formData.name.toUpperCase()} ]`);
      handleCancelEdit();
    } else {
      const nextIndex = menuItems.length + 1;
      const code = `TM-${String(nextIndex).padStart(2, '0')}`;
      onAddMenu({
        ...formData,
        images: finalImages,
        image_url: finalImageUrl,
        code,
        price: numPrice
      });
      setSuccessMsg(`SAJIAN BARU BERHASIL DIREKAM: [ ${formData.name.toUpperCase()} ]`);
      handleCancelEdit();
    }

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div id="menu-module" className="bg-ground flex flex-col" style={{ backgroundColor: 'rgb(245, 242, 235)' }}>
      {/* Module 01 Header Banner */}
      <div
        className="border-b-2 border-primary bg-ground p-space-md lg:p-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md"
        style={{ backgroundColor: 'rgb(245, 242, 235)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-[#0047FF] inline-block"></span>
            <span className="font-tag-mono text-tag-mono tracking-widest text-[#0047FF] uppercase font-bold">
              MODUL UTAMA AKTIF // ARSIP INVENTARIS
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md tracking-tight uppercase font-bold">
            01 / MODUL MANAJEMEN MENU & SAJIAN
          </h1>
          <p className="font-tag-mono text-tag-mono text-on-surface-variant mt-1 tracking-wider">
            LEDGER ID: #TM-CMS-MENU-2025 // SISTEM INVENTARISASI PRESISE SWISS INTERNATIONAL
          </p>
        </div>

        <div className="flex items-center gap-2 font-tag-mono text-tag-mono">
          <span className="px-2 py-1 bg-surface border border-primary font-bold">
            FORMAT DATA: JSON-LEDGER
          </span>
          <button
            type="button"
            onClick={() => exportMenuToCsv(menuItems)}
            className="px-3 py-1 bg-ground hover:bg-primary hover:text-ground border border-primary flex items-center gap-1 font-bold"
            title="Unduh seluruh data sajian dalam format CSV"
          >
            <span className="material-symbols-outlined text-xs">download</span>
            <span>EKSPOR CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Strip */}
      <div
        className="border-b-2 border-primary bg-surface flex flex-col md:flex-row items-stretch"
        style={{ backgroundColor: 'rgb(236, 229, 216)' }}
      >
        {/* Search Input with Monospace Bracket Indicator */}
        <div className="flex-1 flex items-stretch border-b-2 md:border-b-0 md:border-r-2 border-primary bg-ground">
          <div className="px-3.5 py-3 border-r-2 border-primary flex items-center justify-center bg-surface">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            className="w-full px-space-md py-2.5 bg-ground text-primary placeholder-outline font-body-sm text-body-sm border-0 focus:ring-0 focus:bg-surface-bright"
            placeholder="[ CARI NAMA SAJIAN ATAU KODE BATCH... ]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Filter Badges / Chips */}
        <div className="flex items-stretch overflow-x-auto divide-x-2 divide-primary font-index-label text-index-label">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'ALL'
              ? menuItems.length
              : menuItems.filter(i => (i.category || '').trim().toUpperCase() === cat.trim().toUpperCase()).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-space-md py-3 whitespace-nowrap flex items-center gap-2 border-0 ${isActive ? 'bg-primary text-ground font-bold' : 'bg-ground text-primary hover:bg-surface'
                  }`}
              >
                {isActive && <span className="w-2 h-2 bg-[#0047FF] inline-block"></span>}
                <span>{cat === 'ALL' ? 'SEMUA' : cat} ({count})</span>
              </button>
            );
          })}

          {/* Tombol Kelola Kategori Katalog */}
          <button
            type="button"
            onClick={() => {
              setIsCatModalOpen(true);
              setCatFeedback({ error: '', success: '' });
            }}
            className="px-space-md py-3 whitespace-nowrap flex items-center gap-2 border-0 bg-surface hover:bg-primary hover:text-ground text-primary font-bold transition-colors cursor-pointer"
            title="Kelola Kategori: Tambah Kategori Baru atau Ganti Nama (Rename)"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>+ / RENAME KATEGORI</span>
          </button>
        </div>
      </div>

      {/* Feedback Messages */}
      {errorMsg && (
        <div className="p-space-sm border-b-2 border-primary bg-[#ffdad6] text-[#93000a] font-tag-mono text-tag-mono font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">warning</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-space-sm border-b-2 border-primary bg-surface font-tag-mono text-tag-mono font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#0047FF] inline-block"></span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Interactive Input & Edit Panel (Modular Form Matrix) */}
      <div className="border-b-2 border-primary bg-surface" style={{ backgroundColor: 'rgb(236, 229, 216)' }}>
        {/* Panel Accordion Bar */}
        <div className="px-space-md py-2.5 bg-surface border-b-2 border-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span className="font-tag-mono text-tag-mono tracking-widest uppercase font-bold">
              FORMULIR INPUT / EDIT SAJIAN [ {editingItem ? `EDIT: ${editingItem.code || editingItem.name}` : 'DOKUMEN BATCH BARU'} ]
            </span>
          </div>
          <div className="flex items-center gap-2 font-tag-mono text-tag-mono text-on-surface-variant">
            <span>MODE: {editingItem ? 'EDIT AKTIF' : 'INPUT CEPAT'}</span>
            <span className="w-1.5 h-1.5 bg-primary"></span>
          </div>
        </div>

        {/* 6-Field Matrix Form */}
        <form onSubmit={handleSubmit} className="p-space-md lg:p-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md">
            {/* Field 1: Nama Sajian (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                <span>01. NAMA SAJIAN</span>
                <span className="text-tag-mono text-on-surface-variant font-normal">[WAJIB]</span>
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-metadata-bold text-metadata-bold focus:bg-ground"
                placeholder="Contoh: KOPI SUSU TEMU"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Field 2: Kategori (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-index-label text-index-label uppercase">
                  02. KATEGORI SAJIAN
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsCatModalOpen(true);
                    setCatFeedback({ error: '', success: '' });
                  }}
                  className="font-tag-mono text-tag-mono font-bold text-[#0047FF] hover:underline uppercase flex items-center gap-1 cursor-pointer"
                  title="Kelola / Rename Kategori Katalog"
                >
                  <span className="material-symbols-outlined text-[13px]">tune</span>
                  <span>[KELOLA]</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <select
                  className="flex-1 px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm text-body-sm focus:bg-ground uppercase font-bold"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {activeCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setIsCatModalOpen(true);
                    setCatFeedback({ error: '', success: '' });
                  }}
                  className="px-2.5 py-2.5 bg-surface hover:bg-primary hover:text-ground border-2 border-primary flex items-center justify-center font-bold cursor-pointer"
                  title="Tambah atau Rename Kategori Sajian"
                >
                  <span className="material-symbols-outlined text-base">edit_note</span>
                </button>
              </div>
            </div>

            {/* Field 3: Harga IDR (col-span-2) */}
            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                <span>03. HARGA (NET)</span>
                <span className="text-tag-mono text-on-surface-variant font-normal">[IDR]</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-tag-mono text-xs font-bold text-on-surface-variant">RP</span>
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2.5 bg-surface border-2 border-primary font-metadata-bold text-metadata-bold focus:bg-ground text-right"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="28000"
                  required
                />
              </div>
            </div>

            {/* Field 4: Status Ketersediaan Segmented (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                04. STATUS KETERSEDIAAN
              </label>
              <div className="grid grid-cols-2 gap-2 h-[46px]">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_available: true })}
                  className={`flex items-center justify-center gap-2 border-2 border-primary px-2 font-index-label text-xs ${formData.is_available ? 'bg-primary text-ground font-bold' : 'bg-surface hover:bg-ground text-primary'
                    }`}
                >
                  <span className={`w-2.5 h-2.5 inline-block ${formData.is_available ? 'bg-[#0047FF]' : 'border border-primary'}`}></span>
                  <span>TERSEDIA</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_available: false })}
                  className={`flex items-center justify-center gap-2 border-2 border-primary px-2 font-index-label text-xs ${!formData.is_available ? 'bg-primary text-ground font-bold' : 'bg-surface hover:bg-ground text-primary'
                    }`}
                >
                  <span className={`w-2.5 h-2.5 inline-block ${!formData.is_available ? 'bg-[#0047FF]' : 'border border-primary'}`}></span>
                  <span>SOLD OUT</span>
                </button>
              </div>
            </div>

            {/* Field 5: Deskripsi Profil Rasa (col-span-12) */}
            <div className="lg:col-span-12 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                <span>05. DESKRIPSI TEKNIS &amp; PROFIL RASA</span>
                <span className="font-tag-mono text-tag-mono text-on-surface-variant">MAKS 160 KARAKTER</span>
              </label>
              <textarea
                className="w-full px-space-md py-2 bg-surface border-2 border-primary font-body-sm text-body-sm focus:bg-ground resize-none"
                rows={2}
                maxLength={160}
                placeholder="Rincian komposisi rasio, origin biji, dan sensasi catatan rasa..."
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              />
            </div>

            {/* Field 6: Foto Referensi Dropzone (col-span-12 Multi-Foto Carousel) */}
            <div className="lg:col-span-12 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                <span>06. FOTO SAJIAN KATALOG (MULTI-FOTO / CAROUSEL)</span>
                <span className="font-tag-mono text-tag-mono text-on-surface-variant font-bold">
                  {formData.images?.length || 0} FOTO TERLAMPIR • BERWARNA
                </span>
              </label>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-primary bg-surface p-3 flex items-center justify-between gap-space-md relative hover:bg-surface-bright cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  style={{ display: 'none' }}
                />
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 border-2 border-primary bg-ground flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">add_photo_alternate</span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-tag-mono text-[11px] font-bold block text-primary truncate">
                      {isUploading ? 'MEMPROSES FOTO...' : (imageFileName || 'PILIH FOTO SAJIAN (BISA BEBERAPA FOTO / CAROUSEL)')}
                    </span>
                    <span className="text-xs text-on-surface-variant font-body-sm block">
                      Format JPG / PNG • Warna asli natural (tanpa filter hitam putih)
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-primary text-ground font-tag-mono text-[11px] font-bold whitespace-nowrap">
                  + UNGGAH FOTO
                </span>
              </label>

              {/* Thumbnails list with delete & reorder */}
              {formData.images && formData.images.length > 0 && (
                <div className="mt-2 border-2 border-primary bg-surface p-2.5 space-y-2">
                  <div className="flex items-center justify-between font-tag-mono text-[11px]">
                    <span className="font-bold text-primary">
                      URUTAN CAROUSEL SLIDE ({formData.images.length} FOTO):
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, images: [], image_url: '' }))}
                      className="text-signal-red hover:underline uppercase font-bold"
                    >
                      [ HAPUS SEMUA ]
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {formData.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="border border-primary bg-ground p-1 flex flex-col gap-1 relative group"
                      >
                        <div className="aspect-[4/3] w-full bg-surface overflow-hidden relative">
                          <img
                            src={imgSrc}
                            alt={`Foto ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-0 left-0 bg-primary text-ground text-[9px] px-1 font-tag-mono font-bold">
                            {idx === 0 ? 'COVER' : `#${idx + 1}`}
                          </span>
                        </div>

                        {/* Control strip */}
                        <div className="flex items-center justify-between text-[10px] font-tag-mono pt-0.5">
                          <div className="flex gap-1">
                            {idx > 0 && (
                              <button
                                type="button"
                                onClick={() => handleMovePhoto(idx, -1)}
                                className="px-1 border border-primary hover:bg-primary hover:text-ground"
                                title="Geser ke Kiri"
                              >
                                ←
                              </button>
                            )}
                            {idx < formData.images.length - 1 && (
                              <button
                                type="button"
                                onClick={() => handleMovePhoto(idx, 1)}
                                className="px-1 border border-primary hover:bg-primary hover:text-ground"
                                title="Geser ke Kanan"
                              >
                                →
                              </button>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="px-1 text-signal-red hover:bg-signal-red hover:text-ground border border-signal-red font-bold"
                            title="Hapus Foto Ini"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Action Strip */}
          <div className="mt-space-md pt-space-md border-t-2 border-primary flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-2 font-tag-mono text-tag-mono text-on-surface-variant">
              <span className="w-2 h-2 bg-[#0047FF]"></span>
              <span>VALIDASI BATCH: TERVERIFIKASI TIDAK ADA KONFLIK KODE</span>
            </div>
            <div className="flex items-center gap-space-md">
              {editingItem && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-space-lg py-2.5 border-2 border-primary bg-ground hover:bg-surface font-index-label text-index-label uppercase tracking-wider"
                >
                  BATALKAN
                </button>
              )}
              <button
                type="submit"
                className="px-space-xl py-2.5 border-2 border-primary bg-primary text-ground hover:bg-ground hover:text-primary font-index-label text-index-label uppercase tracking-wider flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-[#0047FF]"></span>
                <span>{editingItem ? 'SIMPAN PERUBAHAN [CMD+S]' : '+ REKAM KE BUKU BESAR'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Swiss Ledger Archive Grid / Table */}
      <div className="border-b-2 border-primary bg-ground overflow-x-auto" style={{ backgroundColor: 'rgb(245, 242, 235)' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="border-b-2 border-primary bg-surface font-index-label text-index-label uppercase tracking-widest text-primary"
              style={{ backgroundColor: 'rgb(236, 229, 216)' }}
            >
              <th className="py-3 px-space-md border-r-2 border-primary w-24">KODE / ID</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-20">PRATINJAU</th>
              <th className="py-3 px-space-md border-r-2 border-primary">NAMA SAJIAN &amp; KLASIFIKASI</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-32">HARGA NETT</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-40">STATUS STOK</th>
              <th className="py-3 px-space-md text-right w-52">AKSI CEPAT</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-primary font-body-sm text-body-sm">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center font-tag-mono text-on-surface-variant">
                  [ TIDAK ADA ENTRI SAJIAN SESUAI FILTER PENCARIAN ]
                </td>
              </tr>
            ) : (
              currentItems.map((item, idx) => {
                const code = item.code || `TM-${String((currentPage - 1) * itemsPerPage + idx + 1).padStart(2, '0')}`;
                const isSoldOut = !item.is_available;

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-surface-bright group ${isSoldOut ? 'bg-surface/50 opacity-80' : ''}`}
                  >
                    {/* Kode / ID */}
                    <td className={`py-3 px-space-md border-r-2 border-primary font-tag-mono text-tag-mono font-bold ${isSoldOut ? 'text-on-surface-variant' : ''}`}>
                      {code}
                    </td>

                    {/* Pratinjau Foto Asli & Multi-Foto Indicator */}
                    <td className="py-2 px-space-md border-r-2 border-primary">
                      <div className="w-12 h-12 border-2 border-primary bg-surface overflow-hidden relative">
                        <img
                          src={(item.images && item.images.length > 0) ? item.images[0] : item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.images && item.images.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-primary text-ground text-[8px] font-tag-mono px-1 font-bold">
                            {item.images.length}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Nama & Klasifikasi */}
                    <td className="py-3 px-space-md border-r-2 border-primary">
                      <div className="font-metadata-bold text-metadata-bold text-primary flex items-center gap-2">
                        <span className={isSoldOut ? 'line-through text-on-surface-variant' : ''}>
                          {item.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 border border-primary bg-surface font-tag-mono uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant font-body-sm mt-0.5 line-clamp-1">
                        {item.caption}
                      </div>
                    </td>

                    {/* Harga Nett */}
                    <td className={`py-3 px-space-md border-r-2 border-primary font-metadata-bold text-metadata-bold ${isSoldOut ? 'line-through text-on-surface-variant' : ''}`}>
                      RP {Number(item.price).toLocaleString('id-ID')}
                    </td>

                    {/* Status Stok */}
                    <td className="py-3 px-space-md border-r-2 border-primary">
                      {isSoldOut ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary bg-surface-dim text-on-surface-variant font-tag-mono text-[11px] font-bold">
                          <span className="w-2 h-2 bg-on-surface-variant"></span>
                          <span>SOLD OUT</span>
                        </span>
                      ) : item.limited_note ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary bg-surface text-[#0047FF] font-tag-mono text-[11px] font-bold">
                          <span className="w-2 h-2 bg-[#0047FF]"></span>
                          <span>{item.limited_note}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-primary bg-ground text-primary font-tag-mono text-[11px] font-bold">
                          <span className="w-2 h-2 bg-[#0047FF]"></span>
                          <span>TERSEDIA</span>
                        </span>
                      )}
                    </td>

                    {/* Aksi Cepat */}
                    <td className="py-3 px-space-md text-right">
                      <div className="inline-flex divide-x-2 divide-primary border-2 border-primary font-tag-mono text-[11px] font-bold">
                        <button
                          type="button"
                          onClick={() => onToggleAvailable(item.id)}
                          className={`px-2 py-1 ${isSoldOut ? 'bg-primary text-ground hover:bg-ground hover:text-primary' : 'bg-ground hover:bg-primary hover:text-ground'}`}
                        >
                          {isSoldOut ? 'RESTOCK' : 'TOGGLE'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="px-2 py-1 bg-ground hover:bg-primary hover:text-ground"
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus sajian "${item.name}" dari katalog?`)) {
                              onDeleteMenu(item.id);
                            }
                          }}
                          className="px-2 py-1 bg-ground hover:bg-signal-red hover:text-ground text-signal-red"
                        >
                          HAPUS
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination / Ledger Row Counts */}
      <div
        className="p-space-md bg-surface border-b-2 border-primary flex flex-col sm:flex-row items-center justify-between gap-space-sm font-tag-mono text-tag-mono"
        style={{ backgroundColor: '#ECE5D8' }}
      >
        <div>
          MENAMPILKAN{' '}
          <span className="font-bold text-primary">
            {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          DARI TOTAL <span className="font-bold text-primary">{totalItems} SAJIAN</span>
        </div>

        <div className="flex items-center gap-1 border-2 border-primary bg-ground">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="px-2.5 py-1 border-r border-primary bg-surface font-bold disabled:opacity-40"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 font-bold ${isCurrent ? 'bg-primary text-ground' : 'hover:bg-surface border-r border-primary'}`}
              >
                {String(pageNum).padStart(2, '0')}
              </button>
            );
          })}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className="px-2.5 py-1 hover:bg-surface font-bold disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* MODAL KELOLA KATEGORI KATALOG (TAMBAH & RENAME) */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="w-full max-w-2xl bg-ground border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] overflow-hidden"
            style={{ backgroundColor: 'rgb(245, 242, 235)' }}
          >
            {/* Modal Header */}
            <div
              className="p-space-md border-b-2 border-primary flex items-center justify-between bg-surface"
              style={{ backgroundColor: 'rgb(236, 229, 216)' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#0047FF] inline-block"></span>
                <div>
                  <h2 className="font-metadata-bold text-metadata-bold uppercase tracking-tight text-primary">
                    MANAJEMEN KATEGORI KATALOG SAJIAN
                  </h2>
                  <p className="font-tag-mono text-[11px] text-on-surface-variant">
                    TAMBAH KATEGORI BARU ATAU GANTI NAMA (RENAME) KATEGORI YANG SUDAH ADA
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCatModalOpen(false);
                  setEditingCat({ oldName: '', newName: '' });
                  setCatFeedback({ error: '', success: '' });
                }}
                className="px-2.5 py-1 border-2 border-primary bg-ground hover:bg-primary hover:text-ground font-tag-mono text-xs font-bold"
              >
                ✕ TUTUP
              </button>
            </div>

            {/* Modal Notification */}
            {catFeedback.error && (
              <div className="p-2.5 bg-[#ffdad6] border-b-2 border-primary text-[#93000a] font-tag-mono text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">warning</span>
                <span>{catFeedback.error}</span>
              </div>
            )}
            {catFeedback.success && (
              <div className="p-2.5 bg-surface border-b-2 border-primary text-primary font-tag-mono text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0047FF] inline-block"></span>
                <span>{catFeedback.success}</span>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-space-md overflow-y-auto space-y-space-md flex-1">
              {/* Form Tambah Kategori Baru */}
              <form onSubmit={handleAddCategorySubmit} className="p-space-md border-2 border-primary bg-surface space-y-2">
                <label className="font-index-label text-index-label uppercase flex items-center justify-between text-primary font-bold">
                  <span>+ TAMBAH KATEGORI KATALOG BARU</span>
                  <span className="font-tag-mono text-tag-mono text-on-surface-variant font-normal">[HURUF KAPITAL OTOMATIS]</span>
                </label>
                <div className="flex items-stretch gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: TEA & INFUSION, DESSERT, FOOD..."
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-ground border-2 border-primary font-metadata-bold text-sm focus:bg-surface-bright uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-ground hover:bg-ground hover:text-primary border-2 border-primary font-index-label text-xs uppercase font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-[#0047FF]"></span>
                    <span>+ TAMBAH</span>
                  </button>
                </div>
              </form>

              {/* Tabel / Daftar Kategori yang Tersedia */}
              <div className="border-2 border-primary bg-ground">
                <div
                  className="px-space-md py-2 border-b-2 border-primary bg-surface flex items-center justify-between font-index-label text-index-label uppercase font-bold"
                  style={{ backgroundColor: 'rgb(236, 229, 216)' }}
                >
                  <span>DAFTAR KATEGORI SAAT INI ({activeCategories.length})</span>
                  <span className="text-tag-mono text-on-surface-variant font-normal">KLIK RENAME UNTUK GANTI NAMA</span>
                </div>

                <div className="divide-y-2 divide-primary">
                  {activeCategories.map((cat, idx) => {
                    const isEditing = editingCat.oldName === cat;
                    const itemCount = menuItems.filter(i => (i.category || '').trim().toUpperCase() === cat.trim().toUpperCase()).length;

                    return (
                      <div key={cat} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-ground hover:bg-surface/50">
                        {isEditing ? (
                          <form onSubmit={handleSaveRename} className="flex-1 flex items-center gap-2">
                            <span className="font-tag-mono text-xs font-bold text-on-surface-variant w-8">
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <input
                              type="text"
                              value={editingCat.newName}
                              onChange={(e) => setEditingCat({ ...editingCat, newName: e.target.value })}
                              className="flex-1 px-2.5 py-1.5 bg-ground border-2 border-primary font-metadata-bold text-sm uppercase"
                              autoFocus
                            />
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-primary text-ground hover:bg-ground hover:text-primary border-2 border-primary font-index-label text-xs uppercase font-bold cursor-pointer"
                            >
                              SIMPAN
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingCat({ oldName: '', newName: '' })}
                              className="px-2.5 py-1.5 bg-surface hover:bg-ground border-2 border-primary font-index-label text-xs uppercase cursor-pointer"
                            >
                              BATAL
                            </button>
                          </form>
                        ) : (
                          <>
                            <div className="flex items-center gap-2.5">
                              <span className="font-tag-mono text-xs font-bold text-on-surface-variant w-8">
                                {String(idx + 1).padStart(2, '0')}.
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-metadata-bold text-sm uppercase tracking-wide text-primary">
                                    {cat}
                                  </span>
                                  <span className="px-1.5 py-0.5 border border-primary bg-surface font-tag-mono text-[10px] font-bold">
                                    {itemCount} SAJIAN
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-end sm:self-center font-tag-mono text-xs">
                              <button
                                type="button"
                                onClick={() => handleStartRename(cat)}
                                className="px-2.5 py-1 bg-surface hover:bg-primary hover:text-ground border border-primary font-bold flex items-center gap-1 cursor-pointer"
                                title={`Rename nama kategori ${cat}`}
                              >
                                <span className="material-symbols-outlined text-xs">edit</span>
                                <span>RENAME</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategoryClick(cat)}
                                disabled={activeCategories.length <= 1}
                                className="px-2.5 py-1 text-signal-red hover:bg-signal-red hover:text-ground border border-signal-red font-bold flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                title={`Hapus kategori ${cat}`}
                              >
                                <span className="material-symbols-outlined text-xs">delete</span>
                                <span>HAPUS</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 border border-primary bg-surface font-tag-mono text-[11px] text-on-surface-variant space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-primary">
                  <span className="material-symbols-outlined text-xs">info</span>
                  <span>CATATAN PROTOKOL BUKU BESAR:</span>
                </div>
                <p>
                  • Me-rename nama kategori akan secara otomatis memperbarui klasifikasi kategori seluruh sajian menu yang terhubung.
                </p>
                <p>
                  • Kategori baru akan langsung muncul di baris tab filter admin, dropdown formulir sajian, serta di halaman katalog menu publik.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="p-space-md border-t-2 border-primary flex items-center justify-end bg-surface"
              style={{ backgroundColor: 'rgb(236, 229, 216)' }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsCatModalOpen(false);
                  setEditingCat({ oldName: '', newName: '' });
                  setCatFeedback({ error: '', success: '' });
                }}
                className="px-6 py-2 bg-primary text-ground hover:bg-ground hover:text-primary border-2 border-primary font-index-label text-xs uppercase font-bold tracking-wider cursor-pointer"
              >
                SELESAI &amp; TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
