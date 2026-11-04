import React, { useState } from 'react';
import { CATEGORIES } from '../../data/defaultSeedData';
import { readFileAsBase64 } from '../../services/storageService';

const MENU_CATEGORIES = CATEGORIES.filter(c => c !== 'ALL');

export default function MenuManager({ 
  menuItems, 
  onAddMenu, 
  onUpdateMenu, 
  onDeleteMenu, 
  onToggleAvailable 
}) {
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'SIGNATURE',
    price: '',
    caption: '',
    image_url: '',
    is_available: true,
    is_featured: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      caption: item.caption,
      image_url: item.image_url,
      is_available: item.is_available,
      is_featured: item.is_featured
    });
    setErrorMsg('');
    setSuccessMsg('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'SIGNATURE',
      price: '',
      caption: '',
      image_url: '',
      is_available: true,
      is_featured: false
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMsg('');
      const base64 = await readFileAsBase64(file);
      setFormData(prev => ({ ...prev, image_url: base64 }));
    } catch (err) {
      setErrorMsg('GAGAL MEMPROSES FOTO LOKAL: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('NAMA MENU WAJIB DIISI');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setErrorMsg('HARGA HARUS LEBIH DARI 0');
      return;
    }
    if (!formData.image_url) {
      setErrorMsg('FOTO MENU WAJIB DIUNGGAH');
      return;
    }

    if (editingItem) {
      onUpdateMenu({
        ...editingItem,
        ...formData,
        price: Number(formData.price)
      });
      setSuccessMsg(`BERHASIL MEMPERBARUI MENU: ${formData.name}`);
      handleCancelEdit();
    } else {
      onAddMenu({
        ...formData,
        price: Number(formData.price)
      });
      setSuccessMsg(`BERHASIL MENAMBAHKAN MENU BARU: ${formData.name}`);
      setFormData({
        name: '',
        category: 'SIGNATURE',
        price: '',
        caption: '',
        image_url: '',
        is_available: true,
        is_featured: false
      });
    }

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ padding: 'var(--dp-spacing-gutter)' }}>
      {/* Title */}
      <div className="swiss-border-b" style={{ paddingBottom: '20px', marginBottom: '32px' }}>
        <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '8px' }}>
          01 // MANAJEMEN KATALOG MENU
        </div>
        <h2 className="text-section-heading">
          {editingItem ? `EDIT MENU: [ ${editingItem.name} ]` : 'TAMBAH MENU BARU'}
        </h2>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div 
          className="swiss-border-all text-metadata" 
          style={{ 
            padding: '12px 16px', 
            backgroundColor: 'var(--dp-color-accent-soft)', 
            borderColor: 'var(--dp-color-accent)',
            color: 'var(--dp-color-accent)', 
            marginBottom: '24px',
            fontWeight: 700 
          }}
        >
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div 
          className="swiss-border-all text-metadata" 
          style={{ 
            padding: '12px 16px', 
            backgroundColor: 'var(--dp-color-surface)', 
            color: 'var(--dp-color-ink)', 
            marginBottom: '24px',
            fontWeight: 700 
          }}
        >
          ✓ {successMsg}
        </div>
      )}

      {/* Form Tambah / Edit */}
      <form 
        onSubmit={handleSubmit} 
        className="swiss-border-all"
        style={{ padding: '24px', backgroundColor: 'var(--dp-color-ground)', marginBottom: '48px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {/* Nama Menu */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              NAMA PRODUK / MENU *
            </label>
            <input 
              type="text" 
              placeholder="Contoh: Temu Klasik Aren"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              KATEGORI *
            </label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {MENU_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Harga */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              HARGA (RUPIAH) *
            </label>
            <input 
              type="number" 
              placeholder="28000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Upload Foto Lokal (Base64) */}
        <div style={{ marginBottom: '20px' }}>
          <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
            UPLOAD FOTO LOKAL (BASE64 STORAGE) *
          </label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                style={{ 
                  border: 'var(--dp-border-rule) solid var(--dp-color-ink)', 
                  padding: '10px', 
                  width: '100%',
                  cursor: 'pointer' 
                }}
              />
              <div className="text-metadata" style={{ marginTop: '6px', color: '#666666' }}>
                {isUploading ? 'Sedang memproses gambar...' : 'Pilih file JPG/PNG dari komputer Anda. Foto otomatis dioptimalkan.'}
              </div>
            </div>

            {formData.image_url && (
              <div 
                className="swiss-border-all" 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  backgroundColor: '#111111', 
                  position: 'relative' 
                }}
              >
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="editorial-img"
                />
                <span 
                  className="text-label" 
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    backgroundColor: '#000000', 
                    color: '#ffffff', 
                    fontSize: '9px', 
                    textAlign: 'center', 
                    padding: '2px' 
                  }}
                >
                  PREVIEW
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Caption Profil Rasa */}
        <div style={{ marginBottom: '20px' }}>
          <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
            CAPTION / PROFIL RASA & DESKRIPSI (MAKS. 300 KARAKTER)
          </label>
          <textarea 
            rows={3}
            placeholder="Deskripsikan catatan rasa, komposisi bahan, atau keunikan proses seduh..."
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            maxLength={300}
          />
        </div>

        {/* Toggles */}
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={formData.is_available}
              onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span className="text-label">STATUS TERSEDIA (AVAILABLE)</span>
          </label>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span className="text-label" style={{ color: 'var(--dp-color-accent)' }}>
              REKOMENDASI KEDAI [ RECOMMENDED ]
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn-swiss btn-accent">
            {editingItem ? 'SIMPAN PERUBAHAN MENU' : '+ TAMBAHKAN KE KATALOG'}
          </button>
          {editingItem && (
            <button type="button" onClick={handleCancelEdit} className="btn-swiss">
              BATALKAN EDIT
            </button>
          )}
        </div>
      </form>

      {/* Tabel Data Menu */}
      <div className="swiss-border-all" style={{ backgroundColor: 'var(--dp-color-ground)' }}>
        <div 
          className="swiss-border-b" 
          style={{ 
            padding: '16px 20px', 
            backgroundColor: 'var(--dp-color-surface)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span className="text-label">TABEL DATA MENU ({menuItems.length} ITEM)</span>
          <span className="text-metadata" style={{ color: '#666666' }}>KLIK TOMBOL STATUS UNTUK QUICK TOGGLE</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: 'var(--dp-border-rule) solid var(--dp-color-ink)', backgroundColor: '#ffffff' }}>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '70px' }}>FOTO</th>
                <th style={{ padding: '12px 16px', fontSize: '12px' }}>NAMA MENU & KATEGORI</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '120px' }}>HARGA</th>
                <th style={{ padding: '12px 16px', fontSize: '12px' }}>CAPTION</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '150px' }}>STATUS STOK</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '140px', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr 
                  key={item.id} 
                  style={{ 
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: item.is_available ? 'transparent' : 'var(--dp-color-surface)' 
                  }}
                >
                  {/* Foto Thumbnail */}
                  <td style={{ padding: '12px 16px' }}>
                    <div 
                      className="swiss-border-all" 
                      style={{ width: '50px', height: '50px', backgroundColor: '#111111' }}
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="editorial-img"
                      />
                    </div>
                  </td>

                  {/* Nama & Kategori */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>
                      {item.name}
                    </div>
                    <div className="text-label" style={{ color: '#666666', marginTop: '4px' }}>
                      {item.category} {item.is_featured && <span style={{ color: 'var(--dp-color-accent)' }}>• [REC]</span>}
                    </div>
                  </td>

                  {/* Harga */}
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>
                    IDR {Number(item.price).toLocaleString('id-ID')}
                  </td>

                  {/* Caption */}
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#555555', maxWidth: '300px' }}>
                    {item.caption}
                  </td>

                  {/* Quick Toggle Status */}
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      type="button"
                      onClick={() => onToggleAvailable(item.id)}
                      className="btn-swiss"
                      style={{ 
                        padding: '6px 10px', 
                        fontSize: '10px',
                        backgroundColor: item.is_available ? 'var(--dp-color-ground)' : '#333333',
                        color: item.is_available ? 'var(--dp-color-ink)' : '#ffffff'
                      }}
                      title="Klik untuk ubah status instan"
                    >
                      {item.is_available ? '✓ AVAILABLE' : '✕ SOLD OUT'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => handleEditClick(item)}
                        className="btn-swiss"
                        style={{ padding: '6px 8px', fontSize: '10px' }}
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Hapus menu "${item.name}"?`)) {
                            onDeleteMenu(item.id);
                          }
                        }}
                        className="btn-swiss"
                        style={{ padding: '6px 8px', fontSize: '10px', color: 'var(--dp-color-accent)' }}
                      >
                        HAPUS
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

