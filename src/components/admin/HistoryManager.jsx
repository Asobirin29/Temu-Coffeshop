import React, { useState } from 'react';
import { readFileAsBase64 } from '../../services/storageService';

export default function HistoryManager({
  historyStories,
  onAddStory,
  onUpdateStory,
  onDeleteStory,
  onTogglePublished
}) {
  const [editingStory, setEditingStory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    story_date: '',
    caption: '',
    image_url: '',
    display_order: 1,
    is_published: true
  });
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleEditClick = (story) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      story_date: story.story_date,
      caption: story.caption,
      image_url: story.image_url,
      display_order: story.display_order,
      is_published: story.is_published
    });
    setErrorMsg('');
    setSuccessMsg('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setFormData({
      title: '',
      story_date: '',
      caption: '',
      image_url: '',
      display_order: historyStories.length + 1,
      is_published: true
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
    if (!formData.title.trim()) {
      setErrorMsg('JUDUL MOMEN WAJIB DIISI');
      return;
    }
    if (!formData.story_date.trim()) {
      setErrorMsg('TANGGAL / PERIODE WAJIB DIISI (CONTOH: 2023 // AWAL MULA)');
      return;
    }
    if (!formData.caption.trim()) {
      setErrorMsg('CAPTION CERITA LENGKAP WAJIB DIISI');
      return;
    }
    if (!formData.image_url) {
      setErrorMsg('FOTO DOKUMENTASI HISTORIS WAJIB DIUNGGAH');
      return;
    }

    if (editingStory) {
      onUpdateStory({
        ...editingStory,
        ...formData,
        display_order: Number(formData.display_order) || 1
      });
      setSuccessMsg(`BERHASIL MEMPERBARUI ARSIP: ${formData.title}`);
      handleCancelEdit();
    } else {
      onAddStory({
        ...formData,
        display_order: Number(formData.display_order) || (historyStories.length + 1)
      });
      setSuccessMsg(`BERHASIL MENAMBAHKAN ARSIP BARU: ${formData.title}`);
      setFormData({
        title: '',
        story_date: '',
        caption: '',
        image_url: '',
        display_order: historyStories.length + 2,
        is_published: true
      });
    }

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ padding: 'var(--dp-spacing-gutter)' }}>
      {/* Title */}
      <div className="swiss-border-b" style={{ paddingBottom: '20px', marginBottom: '32px' }}>
        <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '8px' }}>
          02 // MANAJEMEN HISTORIS & CAPTION CERITA
        </div>
        <h2 className="text-section-heading">
          {editingStory ? `EDIT ARSIP: [ ${editingStory.title} ]` : 'TAMBAH ARSIP DOKUMENTASI BARU'}
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
          {/* Judul Momen */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              JUDUL MOMEN HISTORIS *
            </label>
            <input 
              type="text" 
              placeholder="Contoh: Meja Kayu Pertama di Sudut Jalan"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Tanggal / Periode */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              PENANDA WAKTU / PERIODE *
            </label>
            <input 
              type="text" 
              placeholder="Contoh: 2021 // AWAL MULA atau 14.10.2023"
              value={formData.story_date}
              onChange={(e) => setFormData({ ...formData, story_date: e.target.value })}
              required
            />
          </div>

          {/* Urutan Tampil */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              URUTAN TAMPIL (DISPLAY ORDER) *
            </label>
            <input 
              type="number" 
              min={1}
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Upload Foto Dokumentasi (Base64) */}
        <div style={{ marginBottom: '20px' }}>
          <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
            UPLOAD FOTO DOKUMENTASI (RASIO VERTIKAL DIREKOMENDASIKAN) *
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
                {isUploading ? 'Sedang memproses gambar...' : 'Pilih file arsip JPG/PNG. Otomatis dikonversi ke Grayscale editorial.'}
              </div>
            </div>

            {formData.image_url && (
              <div 
                className="swiss-border-all" 
                style={{ 
                  width: '90px', 
                  height: '120px', 
                  backgroundColor: '#111111', 
                  position: 'relative' 
                }}
              >
                <img 
                  src={formData.image_url} 
                  alt="Preview Historis" 
                  className="editorial-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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

        {/* Caption Cerita Naratif Lengkap */}
        <div style={{ marginBottom: '20px' }}>
          <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
            CAPTION CERITA NARATIF LENGKAP *
          </label>
          <textarea 
            rows={5}
            placeholder="Tuliskan narasi lengkap cerita di balik momen ini. Ceritakan filosofi, tantangan, atau memori penting kedai..."
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            required
          />
        </div>

        {/* Toggle Published */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span className="text-label">PUBLIKASIKAN KE HALAMAN UTAMA (PUBLISHED)</span>
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn-swiss btn-accent">
            {editingStory ? 'SIMPAN PERUBAHAN ARSIP' : '+ SIMPAN DOKUMENTASI HISTORIS'}
          </button>
          {editingStory && (
            <button type="button" onClick={handleCancelEdit} className="btn-swiss">
              BATALKAN EDIT
            </button>
          )}
        </div>
      </form>

      {/* Tabel Data Historis */}
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
          <span className="text-label">TABEL ARSIP HISTORIS ({historyStories.length} ENTRI)</span>
          <span className="text-metadata" style={{ color: '#666666' }}>DISORTIR BERDASARKAN URUTAN TAMPIL</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: 'var(--dp-border-rule) solid var(--dp-color-ink)', backgroundColor: '#ffffff' }}>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '60px' }}>URUTAN</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '70px' }}>FOTO</th>
                <th style={{ padding: '12px 16px', fontSize: '12px' }}>JUDUL & PERIODE</th>
                <th style={{ padding: '12px 16px', fontSize: '12px' }}>CAPTION NARATIF</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '130px' }}>STATUS TAMPIL</th>
                <th style={{ padding: '12px 16px', fontSize: '12px', width: '140px', textAlign: 'right' }}>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {historyStories.map((story) => (
                <tr 
                  key={story.id} 
                  style={{ 
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: story.is_published ? 'transparent' : 'var(--dp-color-surface)' 
                  }}
                >
                  {/* Order */}
                  <td style={{ padding: '12px 16px', fontWeight: 800, fontSize: '16px' }}>
                    #{story.display_order}
                  </td>

                  {/* Thumbnail */}
                  <td style={{ padding: '12px 16px' }}>
                    <div 
                      className="swiss-border-all" 
                      style={{ width: '45px', height: '60px', backgroundColor: '#111111' }}
                    >
                      <img 
                        src={story.image_url} 
                        alt={story.title} 
                        className="editorial-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </td>

                  {/* Title & Date */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>
                      {story.title}
                    </div>
                    <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginTop: '4px' }}>
                      {story.story_date}
                    </div>
                  </td>

                  {/* Caption */}
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#555555', maxWidth: '340px' }}>
                    <div style={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 3, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden' 
                    }}>
                      {story.caption}
                    </div>
                  </td>

                  {/* Toggle Published */}
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      type="button"
                      onClick={() => onTogglePublished(story.id)}
                      className="btn-swiss"
                      style={{ 
                        padding: '6px 10px', 
                        fontSize: '10px',
                        backgroundColor: story.is_published ? 'var(--dp-color-ground)' : '#444444',
                        color: story.is_published ? 'var(--dp-color-ink)' : '#ffffff'
                      }}
                      title="Klik untuk ubah status tayang"
                    >
                      {story.is_published ? '● PUBLISHED' : '○ DRAFT'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => handleEditClick(story)}
                        className="btn-swiss"
                        style={{ padding: '6px 8px', fontSize: '10px' }}
                      >
                        EDIT
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Hapus cerita historis "${story.title}"?`)) {
                            onDeleteStory(story.id);
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

