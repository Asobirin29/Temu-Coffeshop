import React, { useState } from 'react';
import { readFileAsBase64 } from '../../services/storageService';
import { DEFAULT_INFO } from '../../data/defaultSeedData';

export default function LandingInfoManager({ siteInfo, onUpdateInfo }) {
  const [formData, setFormData] = useState({ ...DEFAULT_INFO, ...siteInfo });
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrorMsg('');
      const base64 = await readFileAsBase64(file);
      handleChange('heroImageUrl', base64);
    } catch (err) {
      setErrorMsg('GAGAL MEMPROSES FOTO HERO: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onUpdateInfo(formData);
      setSuccessMsg('PENGATURAN LANDING PAGE BERHASIL DIPERBARUI SECARA REAL-TIME!');
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('GAGAL MENYIMPAN PENGATURAN: ' + err.message);
    }
  };

  const handleResetSection = () => {
    if (window.confirm('Reset seluruh teks dan informasi landing page ke konfigurasi awal?')) {
      setFormData({ ...DEFAULT_INFO });
      onUpdateInfo({ ...DEFAULT_INFO });
      setSuccessMsg('KONTEN LANDING PAGE DIRESET KE DEFAULT.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div style={{ padding: 'var(--dp-spacing-gutter)' }}>
      {/* Title Header */}
      <div className="swiss-border-b" style={{ paddingBottom: '20px', marginBottom: '32px' }}>
        <div className="text-label" style={{ color: 'var(--dp-color-accent)', marginBottom: '8px' }}>
          03 // MANAJEMEN KONTEN LANDING PAGE
        </div>
        <h2 className="text-section-heading">
          PENGATURAN INFORMASI & OPERASIONAL
        </h2>
        <p className="text-metadata" style={{ color: '#555555', marginTop: '8px' }}>
          Ubah jam buka, status kedai, alamat, foto editorial hero, dan filosofi secara instan tanpa menyentuh kode program.
        </p>
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

      <form onSubmit={handleSubmit}>
        {/* GROUP 1: STATUS KEDAI & JAM OPERASIONAL */}
        <fieldset 
          className="swiss-border-all" 
          style={{ padding: '24px', marginBottom: '36px', backgroundColor: 'var(--dp-color-ground)' }}
        >
          <legend className="text-label" style={{ padding: '0 8px', color: 'var(--dp-color-accent)' }}>
            [ 01 // STATUS KEDAI & JAM OPERASIONAL ]
          </legend>

          {/* Status Buka / Tutup Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '10px' }}>
              STATUS OPERASIONAL KEDAI SAAT INI *
            </label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleChange('isOpen', true)}
                className={`btn-swiss ${formData.isOpen ? 'btn-accent' : ''}`}
                style={{ flex: 1, minWidth: '180px', padding: '14px' }}
              >
                <span className="status-dot" style={{ backgroundColor: formData.isOpen ? '#ffffff' : 'var(--dp-color-accent)' }}></span>
                SEDANG BUKA (OPEN)
              </button>
              <button
                type="button"
                onClick={() => handleChange('isOpen', false)}
                className={`btn-swiss ${!formData.isOpen ? 'btn-accent' : ''}`}
                style={{ flex: 1, minWidth: '180px', padding: '14px' }}
              >
                <span className="status-dot closed"></span>
                TUTUP SEMENTARA (CLOSED)
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {/* Teks Status Saat Buka */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                TEKS SAAT STATUS BUKA *
              </label>
              <input 
                type="text"
                value={formData.statusText}
                onChange={(e) => handleChange('statusText', e.target.value)}
                placeholder="SEDANG BUKA"
                required
              />
            </div>

            {/* Teks Status Saat Tutup */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                TEKS SAAT STATUS TUTUP *
              </label>
              <input 
                type="text"
                value={formData.statusClosedText}
                onChange={(e) => handleChange('statusClosedText', e.target.value)}
                placeholder="TUTUP SEMENTARA"
                required
              />
            </div>

            {/* Jam Buka */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                JAM BUKA / WAKTU LAYANAN *
              </label>
              <input 
                type="text"
                value={formData.openingHours}
                onChange={(e) => handleChange('openingHours', e.target.value)}
                placeholder="07:00 — 22:00 WIB"
                required
              />
            </div>

            {/* Hari Layanan */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                KETERANGAN HARI OPERASIONAL *
              </label>
              <input 
                type="text"
                value={formData.openingDays}
                onChange={(e) => handleChange('openingDays', e.target.value)}
                placeholder="Senin sampai Minggu tanpa libur"
                required
              />
            </div>
          </div>

          {/* Catatan Sub-Status */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              CATATAN SUB-STATUS (HERO RIGHT BOX) *
            </label>
            <input 
              type="text"
              value={formData.statusNote}
              onChange={(e) => handleChange('statusNote', e.target.value)}
              placeholder="Disangrai segar tiap pagi. Melayani seduhan manual dan espresso bar."
              required
            />
          </div>
        </fieldset>

        {/* GROUP 2: ALAMAT, LOKASI & KONTAK */}
        <fieldset 
          className="swiss-border-all" 
          style={{ padding: '24px', marginBottom: '36px', backgroundColor: 'var(--dp-color-ground)' }}
        >
          <legend className="text-label" style={{ padding: '0 8px', color: 'var(--dp-color-accent)' }}>
            [ 02 // ALAMAT, LOKASI PRESISI & TAUTAN KONTAK ]
          </legend>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {/* Alamat Fisik Lengkap */}
            <div style={{ gridColumn: 'span 2' }}>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                ALAMAT FISIK LENGKAP KEDAI *
              </label>
              <input 
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190"
                required
              />
            </div>

            {/* Area Presisi */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                AREA PRESISI / WILAYAH *
              </label>
              <input 
                type="text"
                value={formData.locationArea}
                onChange={(e) => handleChange('locationArea', e.target.value)}
                placeholder="KEBAYORAN BARU, JAKARTA SELATAN"
                required
              />
            </div>

            {/* Alamat Singkat */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                ALAMAT SINGKAT (BARIS KEDUA HERO BOX) *
              </label>
              <input 
                type="text"
                value={formData.locationShort}
                onChange={(e) => handleChange('locationShort', e.target.value)}
                placeholder="Jl. Senopati No. 42"
                required
              />
            </div>
          </div>

          {/* Catatan Petunjuk Kedatangan */}
          <div style={{ marginBottom: '20px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              CATATAN PETUNJUK KEDATANGAN / FASILITAS *
            </label>
            <textarea 
              rows={2}
              value={formData.locationNote}
              onChange={(e) => handleChange('locationNote', e.target.value)}
              placeholder="Temu berlokasi strategis di area Senopati dengan fasilitas parkir kendaraan dan ramah pesepeda."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {/* Google Maps URL */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                TAUTAN GOOGLE MAPS (URL) *
              </label>
              <input 
                type="text"
                value={formData.googleMapsUrl}
                onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                required
              />
            </div>

            {/* WhatsApp URL */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                TAUTAN WHATSAPP RESMI (URL) *
              </label>
              <input 
                type="text"
                value={formData.whatsappUrl}
                onChange={(e) => handleChange('whatsappUrl', e.target.value)}
                placeholder="https://wa.me/628..."
                required
              />
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                HANDLE INSTAGRAM KEDAI
              </label>
              <input 
                type="text"
                value={formData.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                placeholder="@temu.coffeeshop"
              />
            </div>
          </div>
        </fieldset>

        {/* GROUP 3: HERO STATEMENT & FILOSOFI */}
        <fieldset 
          className="swiss-border-all" 
          style={{ padding: '24px', marginBottom: '36px', backgroundColor: 'var(--dp-color-ground)' }}
        >
          <legend className="text-label" style={{ padding: '0 8px', color: 'var(--dp-color-accent)' }}>
            [ 03 // HERO SECTION & FILOSOFI KEDAI ]
          </legend>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            {/* Tag Section Hero */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                LABEL PENANDA HERO
              </label>
              <input 
                type="text"
                value={formData.heroSectionTag}
                onChange={(e) => handleChange('heroSectionTag', e.target.value)}
                placeholder="00 // PENDAHULUAN & FILOSOFI"
              />
            </div>

            {/* Judul Hero Besar */}
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                JUDUL BESAR HERO (TYPOGRAPHIC DISPLAY) *
              </label>
              <input 
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="RUANG TEMU, ARSIP KOPI."
                required
              />
            </div>
          </div>

          {/* Teks Filosofi / Hero Lead */}
          <div style={{ marginBottom: '20px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              TEKS NARASI FILOSOFI KEDAI (HERO LEAD) *
            </label>
            <textarea 
              rows={3}
              value={formData.heroLead}
              onChange={(e) => handleChange('heroLead', e.target.value)}
              placeholder="Temu-Coffeeshop adalah laboratorium rasa dan ruang terbuka..."
              required
            />
          </div>

          {/* Foto Editorial Hero */}
          <div style={{ marginBottom: '20px' }}>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              FOTO EDITORIAL HERO (UPLOAD FILE ATAU URL) *
            </label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleHeroPhotoUpload}
                  style={{ 
                    border: 'var(--dp-border-rule) solid var(--dp-color-ink)', 
                    padding: '10px', 
                    width: '100%',
                    cursor: 'pointer',
                    marginBottom: '8px'
                  }}
                />
                <input 
                  type="text"
                  value={formData.heroImageUrl}
                  onChange={(e) => handleChange('heroImageUrl', e.target.value)}
                  placeholder="Atau tempel URL gambar eksternal (Unsplash, dsb)"
                />
                <div className="text-metadata" style={{ marginTop: '6px', color: '#666666' }}>
                  {isUploading ? 'Sedang memproses foto hero...' : 'Otomatis dioptimalkan dan ditampilkan dalam filter Grayscale Editorial.'}
                </div>
              </div>

              {formData.heroImageUrl && (
                <div 
                  className="swiss-border-all" 
                  style={{ 
                    width: '140px', 
                    height: '90px', 
                    backgroundColor: '#111111', 
                    position: 'relative' 
                  }}
                >
                  <img 
                    src={formData.heroImageUrl} 
                    alt="Preview Hero" 
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
                    PREVIEW HERO
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Caption Foto Hero */}
          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              KETERANGAN FOTO HERO (CAPTION DI DALAM FRAME)
            </label>
            <input 
              type="text"
              value={formData.heroImageCaption}
              onChange={(e) => handleChange('heroImageCaption', e.target.value)}
              placeholder="ARSIP VISUAL 01 // INTERIOR RUANG SEDUH UTAMA"
            />
          </div>
        </fieldset>

        {/* GROUP 4: SEKSI PERSINGGAHAN & LOKASI */}
        <fieldset 
          className="swiss-border-all" 
          style={{ padding: '24px', marginBottom: '36px', backgroundColor: 'var(--dp-color-ground)' }}
        >
          <legend className="text-label" style={{ padding: '0 8px', color: 'var(--dp-color-accent)' }}>
            [ 04 // SEKSI LOKASI & PENUTUP HALAMAN ]
          </legend>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                LABEL PENANDA SEKSI LOKASI
              </label>
              <input 
                type="text"
                value={formData.locationSectionTag}
                onChange={(e) => handleChange('locationSectionTag', e.target.value)}
                placeholder="03 / LOKASI & PERSINGGAHAN"
              />
            </div>

            <div>
              <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
                JUDUL BESAR SEKSI LOKASI *
              </label>
              <input 
                type="text"
                value={formData.locationTitle}
                onChange={(e) => handleChange('locationTitle', e.target.value)}
                placeholder="SINGGAH DAN MULAI PERCAKAPAN."
                required
              />
            </div>
          </div>

          <div>
            <label className="text-label" style={{ display: 'block', marginBottom: '8px' }}>
              TEKS PENGANTAR LOKASI (LEAD TEXT) *
            </label>
            <textarea 
              rows={3}
              value={formData.locationLead}
              onChange={(e) => handleChange('locationLead', e.target.value)}
              placeholder="Kami menyediakan bangku-bangku kayu panjang..."
              required
            />
          </div>
        </fieldset>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="submit" className="btn-swiss btn-accent" style={{ padding: '16px 28px' }}>
            SIMPAN PERUBAHAN LANDING PAGE
          </button>

          <button 
            type="button" 
            onClick={handleResetSection} 
            className="btn-swiss"
            style={{ color: 'var(--dp-color-accent)' }}
          >
            ↺ RESET TEKS KE DEFAULT
          </button>
        </div>
      </form>
    </div>
  );
}

