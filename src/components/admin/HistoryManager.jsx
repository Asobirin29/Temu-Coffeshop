import React, { useState } from 'react';
import { readFileAsBase64, readFilesAsBase64 } from '../../services/storageService';
import CardCarousel from '../common/CardCarousel';

export default function HistoryManager({
  historyStories,
  onAddStory,
  onUpdateStory,
  onDeleteStory,
  onTogglePublished
}) {
  const [editingStory, setEditingStory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    story_date: '',
    figure_label: 'FIG. 01 / GAYO',
    caption: '',
    images: [],
    image_url: '',
    display_order: 1,
    is_published: true
  });
  const [imageFileName, setImageFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const activeStoriesCount = historyStories.filter(s => s.is_published).length;

  const handleEditClick = (story) => {
    setEditingStory(story);
    setIsFormOpen(true);
    const images = (story.images && story.images.length > 0)
      ? story.images
      : (story.image_url ? [story.image_url] : []);
    setFormData({
      title: story.title,
      story_date: story.story_date,
      figure_label: story.figure_label || `FIG. 0${story.display_order}`,
      caption: story.caption,
      images: images,
      image_url: images[0] || '',
      display_order: story.display_order,
      is_published: story.is_published
    });
    setImageFileName(`${images.length} FOTO TERLAMPIR`);
    setErrorMsg('');
    setSuccessMsg('');
    window.scrollTo({ top: 220, behavior: 'instant' });
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
    setIsFormOpen(false);
    setFormData({
      title: '',
      story_date: '',
      figure_label: 'FIG. 01 / GAYO',
      caption: '',
      images: [],
      image_url: '',
      display_order: historyStories.length + 1,
      is_published: true
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
    if (!formData.title.trim()) {
      setErrorMsg('JUDUL MOMEN HISTORIS WAJIB DIISI');
      return;
    }
    if (!formData.story_date.trim()) {
      setErrorMsg('PENANDA WAKTU / PERIODE WAJIB DIISI');
      return;
    }
    if (!formData.caption.trim()) {
      setErrorMsg('NARASI CERITA LENGKAP WAJIB DIISI');
      return;
    }

    const finalImages = formData.images || [];
    const finalImageUrl = finalImages[0] || formData.image_url || '';

    if (editingStory) {
      onUpdateStory({
        ...editingStory,
        ...formData,
        images: finalImages,
        image_url: finalImageUrl,
        display_order: Number(formData.display_order) || 1
      });
      setSuccessMsg(`BERHASIL MEMPERBARUI DOKUMENTASI: [ ${formData.title.toUpperCase()} ]`);
      handleCancelEdit();
    } else {
      onAddStory({
        ...formData,
        images: finalImages,
        image_url: finalImageUrl,
        display_order: Number(formData.display_order) || (historyStories.length + 1)
      });
      setSuccessMsg(`BERHASIL MENAMBAHKAN DOKUMENTASI BARU: [ ${formData.title.toUpperCase()} ]`);
      handleCancelEdit();
    }

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div id="historis-module" className="bg-ground flex flex-col" style={{ backgroundColor: 'rgb(245, 242, 235)' }}>
      {/* Module 02 Header Banner */}
      <div 
        className="border-b-2 border-primary bg-surface p-space-md lg:p-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md" 
        style={{ backgroundColor: 'rgb(236, 229, 216)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-primary inline-block"></span>
            <span className="font-tag-mono text-tag-mono tracking-widest text-primary uppercase font-bold">
              DOKUMENTASI PUBLIK &amp; PROVENANSI
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md tracking-tight uppercase font-bold">
            02 / MODUL MANAJEMEN ARSIP HISTORIS &amp; CERITA TEMU
          </h2>
          <p className="font-tag-mono text-tag-mono text-on-surface-variant mt-1 tracking-wider">
            MANAJEMEN KONTEN HISTORIS DOKUMENTER ({activeStoriesCount} ENTRI AKTIF DITAMPILKAN DI LANDING PAGE)
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isFormOpen && !editingStory) {
              setIsFormOpen(false);
            } else {
              setEditingStory(null);
              setFormData({
                title: '',
                story_date: '2025 // STATUS SEKARANG',
                figure_label: `FIG. 0${historyStories.length + 1} / DOKUMEN`,
                caption: '',
                image_url: '',
                display_order: historyStories.length + 1,
                is_published: true
              });
              setIsFormOpen(true);
            }
          }}
          className="px-space-md py-2.5 bg-primary text-ground font-index-label text-index-label hover:bg-ground hover:text-primary border-2 border-primary flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>+ TAMBAH DOKUMENTASI HISTORIS BARU</span>
        </button>
      </div>

      {/* Notifications */}
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

      {/* Interactive Form Panel (When Open) */}
      {isFormOpen && (
        <div className="border-b-2 border-primary bg-surface" style={{ backgroundColor: 'rgb(236, 229, 216)' }}>
          <div className="px-space-md py-2.5 bg-ground border-b-2 border-primary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              <span className="font-tag-mono text-tag-mono tracking-widest uppercase font-bold">
                {editingStory ? `EDIT ARSIP: [ ${editingStory.title} ]` : 'FORMULIR DOKUMENTASI HISTORIS BARU'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-tag-mono font-tag-mono text-on-surface-variant hover:text-primary"
            >
              [ TUTUP FORM ]
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-space-md lg:p-space-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md">
              {/* Judul Momen */}
              <div className="lg:col-span-5 flex flex-col gap-1.5">
                <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                  <span>01. JUDUL MOMEN HISTORIS</span>
                  <span className="text-tag-mono text-on-surface-variant font-normal">[WAJIB]</span>
                </label>
                <input
                  type="text"
                  className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-metadata-bold"
                  placeholder="Contoh: PENELUSURAN BIJI TUNGGAL & STANDARISASI SANGRAI"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              {/* Tanggal / Periode */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                  <span>02. PENANDA WAKTU / PERIODE</span>
                  <span className="text-tag-mono text-on-surface-variant font-normal">[HEADER]</span>
                </label>
                <input
                  type="text"
                  className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-tag-mono text-tag-mono font-bold"
                  placeholder="Contoh: 2021 // EKSPEDISI PERTAMA"
                  value={formData.story_date}
                  onChange={(e) => setFormData({ ...formData, story_date: e.target.value })}
                  required
                />
              </div>

              {/* Sub-label Figure */}
              <div className="lg:col-span-3 flex flex-col gap-1.5">
                <label className="font-index-label text-index-label uppercase">
                  03. LABEL GAMBAR (BADGE)
                </label>
                <input
                  type="text"
                  className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-tag-mono text-tag-mono"
                  placeholder="FIG. 01 / GAYO"
                  value={formData.figure_label}
                  onChange={(e) => setFormData({ ...formData, figure_label: e.target.value })}
                />
              </div>

              {/* Urutan Tampil & Status */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <label className="font-index-label text-index-label uppercase">
                  04. URUTAN TAMPIL &amp; PUBLIKASI
                </label>
                <div className="grid grid-cols-2 gap-2 h-[46px]">
                  <input
                    type="number"
                    min={1}
                    className="w-full px-space-md py-2 bg-ground border-2 border-primary font-metadata-bold text-center"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_published: !formData.is_published })}
                    className={`border-2 border-primary px-2 font-index-label text-xs ${
                      formData.is_published ? 'bg-primary text-ground font-bold' : 'bg-ground text-primary'
                    }`}
                  >
                    {formData.is_published ? '● TAMPIL' : '○ DRAF BARU'}
                  </button>
                </div>
              </div>

              {/* Upload Foto Dokumentasi (Multi-Foto Carousel) */}
              <div className="lg:col-span-8 flex flex-col gap-1.5">
                <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                  <span>05. FOTO ARSIP HISTORIS (MULTI-FOTO / CAROUSEL)</span>
                  <span className="font-tag-mono text-tag-mono text-on-surface-variant font-bold">
                    {formData.images?.length || 0} FOTO TERLAMPIR • BERWARNA
                  </span>
                </label>

                {/* Dropzone & Upload Button */}
                <label className="border-2 border-dashed border-primary bg-ground p-3 flex items-center justify-between gap-space-md hover:bg-surface-bright cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 border-2 border-primary bg-surface flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">add_photo_alternate</span>
                    </div>
                    <div>
                      <span className="font-tag-mono text-[11px] font-bold block text-primary truncate">
                        {isUploading ? 'MEMPROSES FOTO...' : (imageFileName || 'PILIH FOTO (BISA LEBIH DARI 1 / CAROUSEL)')}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-body-sm block">
                        Format JPG/PNG • Warna asli natural (tanpa filter hitam putih)
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

              {/* Caption Cerita Naratif */}
              <div className="lg:col-span-12 flex flex-col gap-1.5">
                <label className="font-index-label text-index-label uppercase flex items-center justify-between">
                  <span>06. DESKRIPSI TEKNIS &amp; NARASI CERITA</span>
                  <span className="font-tag-mono text-tag-mono text-on-surface-variant">PROVENANSI HISTORIS</span>
                </label>
                <textarea
                  className="w-full px-space-md py-2 bg-ground border-2 border-primary font-body-sm text-body-sm focus:bg-surface-bright resize-none"
                  rows={4}
                  placeholder="Ceritakan latar belakang momen historis ini, relasi petani, arsitektur gerai, atau kurasi rasa..."
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mt-space-md pt-space-md border-t-2 border-primary flex items-center justify-between">
              <span className="font-tag-mono text-tag-mono text-on-surface-variant">
                DOKUMENTASI YANG DIPUBLIKASIKAN AKAN MUNCUL SECARA REAL-TIME PADA HALAMAN PUBLIK
              </span>
              <div className="flex items-center gap-space-md">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-space-md py-2.5 border-2 border-primary bg-ground hover:bg-surface font-index-label text-index-label"
                >
                  BATALKAN
                </button>
                <button
                  type="submit"
                  className="px-space-xl py-2.5 border-2 border-primary bg-primary text-ground hover:bg-ground hover:text-primary font-index-label text-index-label uppercase tracking-wider flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-[#0047FF]"></span>
                  <span>{editingStory ? 'SIMPAN PERUBAHAN ARSIP' : '+ SIMPAN DOKUMENTASI HISTORIS'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3-Column Historical Editorial Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-primary border-b-2 border-primary">
        {historyStories.map((story, index) => {
          const isDraft = !story.is_published;
          const figLabel = story.figure_label || `FIG. 0${index + 1} / ARSIP`;

          return (
            <div 
              key={story.id} 
              className={`flex flex-col justify-between p-space-md ${
                isDraft ? 'bg-surface' : 'bg-ground'
              }`}
              style={{ backgroundColor: isDraft ? 'rgb(236, 229, 216)' : 'rgb(245, 242, 235)' }}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-2 border-b-2 border-primary font-tag-mono text-tag-mono mb-space-md">
                  <span className="font-bold text-primary">{story.story_date}</span>
                  {story.is_published ? (
                    <span className="px-1.5 py-0.5 bg-[#0047FF] text-ground text-[10px]">TAMPIL</span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-surface-dim border border-primary text-primary text-[10px]">DRAF BARU</span>
                  )}
                </div>

                {/* Multi-Photo Carousel Frame (Full Color) */}
                {((story.images && story.images.length > 0) || story.image_url) ? (
                  <div className="w-full mb-space-md border-2 border-primary overflow-hidden">
                    <CardCarousel
                      images={(story.images && story.images.length > 0) ? story.images : [story.image_url]}
                      alt={story.title}
                      badges={
                        <span className="bg-ground text-primary px-1.5 py-0.5 font-tag-mono text-[9px] border border-primary font-bold">
                          {figLabel}
                        </span>
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] border-2 border-dashed border-primary bg-surface flex flex-col items-center justify-center relative mb-space-md text-center p-space-md">
                    <span className="material-symbols-outlined text-2xl text-on-surface-variant mb-1">add_photo_alternate</span>
                    <span className="font-tag-mono text-tag-mono uppercase text-on-surface-variant">
                      [ DOKUMEN BELUM DIUNGGAH ]
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-body-sm mt-1">
                      Mendukung multi-foto &amp; carousel berwarna
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-metadata-bold text-metadata-bold uppercase tracking-tight mb-2">
                  {story.title}
                </h3>

                {/* Prose Caption */}
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {story.caption}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-space-lg pt-space-md border-t-2 border-primary flex items-center justify-between">
                <span className={`font-tag-mono text-[10px] uppercase font-bold ${isDraft ? 'text-signal-red' : 'text-on-surface-variant'}`}>
                  STATUS: {isDraft ? 'DRAFT' : 'PUBLISHED'}
                </span>
                <div className="inline-flex divide-x-2 divide-primary border-2 border-primary font-tag-mono text-xs font-bold">
                  {isDraft && (
                    <button
                      type="button"
                      onClick={() => onTogglePublished(story.id)}
                      className="px-2 py-1 bg-primary text-ground hover:bg-ground hover:text-primary"
                    >
                      PUBLIKASIKAN
                    </button>
                  )}
                  {!isDraft && (
                    <button
                      type="button"
                      onClick={() => onTogglePublished(story.id)}
                      className="px-2 py-1 bg-ground hover:bg-primary hover:text-ground"
                    >
                      ARSIPKAN
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleEditClick(story)}
                    className="px-2 py-1 hover:bg-primary hover:text-ground"
                  >
                    EDIT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Hapus dokumen historis "${story.title}"?`)) {
                        onDeleteStory(story.id);
                      }
                    }}
                    className="px-2 py-1 hover:bg-signal-red hover:text-ground text-signal-red"
                  >
                    HAPUS
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
