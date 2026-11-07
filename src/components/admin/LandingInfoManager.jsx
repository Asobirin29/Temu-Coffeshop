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
      setSuccessMsg('PENGATURAN STATUS KEDAI BERHASIL DISINKRONISASI SECARA REAL-TIME!');
      window.scrollTo({ top: 180, behavior: 'instant' });
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('GAGAL MENYIMPAN PENGATURAN: ' + err.message);
    }
  };

  const handleResetSection = () => {
    if (window.confirm('Reset seluruh informasi dan pengaturan operasional ke konfigurasi awal?')) {
      setFormData({ ...DEFAULT_INFO });
      onUpdateInfo({ ...DEFAULT_INFO });
      setSuccessMsg('KONTEN OPERASIONAL DIRESET KE DEFAULT.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="p-space-md lg:p-space-lg" style={{ backgroundColor: 'rgb(245, 242, 235)' }}>
      {/* Module 04 Header Banner */}
      <div 
        className="border-b-2 border-primary bg-surface p-space-md lg:p-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-md" 
        style={{ backgroundColor: 'rgb(236, 229, 216)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-[#0047FF] inline-block"></span>
            <span className="font-tag-mono text-tag-mono tracking-widest text-[#0047FF] uppercase font-bold">
              KONTROL OPERASIONAL // LANDING PAGE METADATA
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md tracking-tight uppercase font-bold">
            04 / PENGATURAN STATUS KEDAI &amp; LANDING PAGE
          </h2>
          <p className="font-tag-mono text-tag-mono text-on-surface-variant mt-1 tracking-wider">
            UBAH STATUS BUKA/TUTUP, JAM LAYANAN, ALAMAT, KONTAK RESMI &amp; TEKS MANIFESTO KEDAI
          </p>
        </div>

        <div className="flex items-center gap-2 font-tag-mono text-tag-mono">
          <span className={`px-2.5 py-1 text-ground font-bold ${formData.isOpen ? 'bg-[#0047FF]' : 'bg-signal-red'}`}>
            STATUS KEDAI: {formData.isOpen ? 'BUKA' : 'TUTUP'}
          </span>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-space-sm mb-space-md border-2 border-primary bg-[#ffdad6] text-[#93000a] font-tag-mono text-tag-mono font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">warning</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-space-sm mb-space-md border-2 border-primary bg-surface font-tag-mono text-tag-mono font-bold flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#0047FF] inline-block"></span>
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* GROUP 1: STATUS KEDAI & OPERASIONAL */}
        <fieldset 
          className="border-2 border-primary bg-ground p-space-md lg:p-space-lg mb-space-md" 
          style={{ backgroundColor: 'rgb(245, 242, 235)' }}
        >
          <legend className="font-tag-mono text-tag-mono font-bold px-2 py-0.5 bg-primary text-ground uppercase">
            [ 01 // STATUS KEDAI &amp; JAM OPERASIONAL ]
          </legend>

          {/* Status Buka / Tutup Selector */}
          <div className="mb-space-md mt-2">
            <label className="font-index-label text-index-label uppercase block mb-2">
              STATUS OPERASIONAL KEDAI SAAT INI (REAL-TIME STATUS) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <button
                type="button"
                onClick={() => handleChange('isOpen', true)}
                className={`py-3.5 px-space-md border-2 border-primary font-index-label text-sm flex items-center justify-center gap-2 ${
                  formData.isOpen ? 'bg-primary text-ground font-bold' : 'bg-surface hover:bg-ground text-primary'
                }`}
              >
                <span className="w-2.5 h-2.5 bg-[#0047FF] inline-block"></span>
                <span>SEDANG BUKA (OPEN)</span>
              </button>

              <button
                type="button"
                onClick={() => handleChange('isOpen', false)}
                className={`py-3.5 px-space-md border-2 border-primary font-index-label text-sm flex items-center justify-center gap-2 ${
                  !formData.isOpen ? 'bg-primary text-ground font-bold' : 'bg-surface hover:bg-ground text-primary'
                }`}
              >
                <span className="w-2.5 h-2.5 bg-signal-red inline-block"></span>
                <span>TUTUP SEMENTARA (CLOSED)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-md">
            {/* Teks Status Saat Buka */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                TEKS STATUS SAAT BUKA *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-metadata-bold"
                value={formData.statusText || ''}
                onChange={(e) => handleChange('statusText', e.target.value)}
                placeholder="SEDANG BUKA (OPEN)"
                required
              />
            </div>

            {/* Teks Status Saat Tutup */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                TEKS STATUS SAAT TUTUP *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-metadata-bold"
                value={formData.statusClosedText || ''}
                onChange={(e) => handleChange('statusClosedText', e.target.value)}
                placeholder="TUTUP SEMENTARA (CLOSED)"
                required
              />
            </div>

            {/* Jam Buka */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                JAM BUKA / WAKTU LAYANAN *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm"
                value={formData.openingHours || ''}
                onChange={(e) => handleChange('openingHours', e.target.value)}
                placeholder="07:00 — 22:00 WIB"
                required
              />
            </div>

            {/* Hari Layanan */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                KETERANGAN HARI OPERASIONAL *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm"
                value={formData.openingDays || ''}
                onChange={(e) => handleChange('openingDays', e.target.value)}
                placeholder="Senin sampai Minggu tanpa libur"
                required
              />
            </div>
          </div>

          {/* Catatan Sub-Status */}
          <div className="flex flex-col gap-1.5">
            <label className="font-index-label text-index-label uppercase">
              CATATAN SUB-STATUS OPERASIONAL *
            </label>
            <input
              type="text"
              className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm"
              value={formData.statusNote || ''}
              onChange={(e) => handleChange('statusNote', e.target.value)}
              placeholder="Pengarsipan profil sangrai berkala untuk menjaga kurva degradasi termal."
              required
            />
          </div>
        </fieldset>

        {/* GROUP 2: ALAMAT, LOKASI & KONTAK */}
        <fieldset 
          className="border-2 border-primary bg-ground p-space-md lg:p-space-lg mb-space-md" 
          style={{ backgroundColor: 'rgb(245, 242, 235)' }}
        >
          <legend className="font-tag-mono text-tag-mono font-bold px-2 py-0.5 bg-primary text-ground uppercase">
            [ 02 // ALAMAT, LOKASI PRESISI &amp; TAUTAN KONTAK ]
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-md mt-2">
            {/* Alamat Fisik Lengkap */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                ALAMAT FISIK LENGKAP KEDAI *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-metadata-bold"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="JL. SENOPATI NO. 42"
                required
              />
            </div>

            {/* Area Presisi */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                AREA PRESISI / WILAYAH *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm"
                value={formData.locationArea || ''}
                onChange={(e) => handleChange('locationArea', e.target.value)}
                placeholder="KEBAYORAN BARU, JAKARTA SELATAN"
                required
              />
            </div>

            {/* Alamat Singkat */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                ALAMAT SINGKAT (HERO PILL) *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm"
                value={formData.locationShort || ''}
                onChange={(e) => handleChange('locationShort', e.target.value)}
                placeholder="Jl. Senopati No. 42"
                required
              />
            </div>

            {/* Google Maps URL */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                TAUTAN GOOGLE MAPS (URL) *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm font-tag-mono"
                value={formData.googleMapsUrl || ''}
                onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/?q=..."
                required
              />
            </div>

            {/* WhatsApp URL */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                TAUTAN WHATSAPP RESMI (URL) *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm font-tag-mono"
                value={formData.whatsappUrl || ''}
                onChange={(e) => handleChange('whatsappUrl', e.target.value)}
                placeholder="https://wa.me/628..."
                required
              />
            </div>

            {/* Instagram Handle */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                HANDLE INSTAGRAM KEDAI
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm font-tag-mono"
                value={formData.instagram || ''}
                onChange={(e) => handleChange('instagram', e.target.value)}
                placeholder="@temu.coffeeshop"
              />
            </div>

            {/* Koordinat GPS */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                KOORDINAT GPS PRESISI
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm font-tag-mono"
                value={formData.coordinates || ''}
                onChange={(e) => handleChange('coordinates', e.target.value)}
                placeholder={`6°14'02.1"S 106°48'33.2"E`}
              />
            </div>
          </div>
        </fieldset>

        {/* GROUP 3: HERO STATEMENT & FILOSOFI */}
        <fieldset 
          className="border-2 border-primary bg-ground p-space-md lg:p-space-lg mb-space-md" 
          style={{ backgroundColor: 'rgb(245, 242, 235)' }}
        >
          <legend className="font-tag-mono text-tag-mono font-bold px-2 py-0.5 bg-primary text-ground uppercase">
            [ 03 // HERO SECTION &amp; FILOSOFI KEDAI ]
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-md mt-2">
            {/* Tag Section Hero */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                LABEL PENANDA HERO (SECTION TAG)
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-tag-mono text-tag-mono"
                value={formData.heroSectionTag || ''}
                onChange={(e) => handleChange('heroSectionTag', e.target.value)}
                placeholder="ARSIP PROTOKOL KOPI // SENOPATI"
              />
            </div>

            {/* Judul Hero Besar */}
            <div className="flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                JUDUL BESAR HERO (TYPOGRAPHIC DISPLAY) *
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-headline-md font-bold"
                value={formData.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="RUANG TEMU, SECANGKIR ARSIP & PERCAKAPAN."
                required
              />
            </div>
          </div>

          {/* Teks Filosofi Lead */}
          <div className="flex flex-col gap-1.5 mb-space-md">
            <label className="font-index-label text-index-label uppercase">
              TEKS NARASI FILOSOFI KEDAI (HERO LEAD) *
            </label>
            <textarea
              className="w-full px-space-md py-2.5 bg-surface border-2 border-primary font-body-sm resize-none"
              rows={3}
              value={formData.heroLead || ''}
              onChange={(e) => handleChange('heroLead', e.target.value)}
              placeholder="Temu-Coffeeshop adalah laboratorium rasa dan ruang terbuka yang memadukan presisi ekstraksi Swiss dengan kekayaan biji kopi nusantara."
              required
            />
          </div>

          {/* Foto Editorial Hero */}
          <div className="flex flex-col gap-1.5">
            <label className="font-index-label text-index-label uppercase">
              FOTO EDITORIAL HERO (UPLOAD FOTO ATAU URL) *
            </label>
            <div className="flex gap-space-md items-start flex-wrap">
              <div className="flex-1 min-w-[240px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroPhotoUpload}
                  className="mb-2 w-full p-2 bg-surface border-2 border-primary font-tag-mono text-xs cursor-pointer"
                />
                <input
                  type="text"
                  className="w-full px-space-md py-2 bg-surface border-2 border-primary font-body-sm"
                  value={formData.heroImageUrl || ''}
                  onChange={(e) => handleChange('heroImageUrl', e.target.value)}
                  placeholder="Atau masukkan path / URL gambar (/images/hero-slide-01.jpg)"
                />
              </div>

              {formData.heroImageUrl && (
                <div className="w-36 h-24 border-2 border-primary bg-surface overflow-hidden relative flex-shrink-0">
                  <img
                    src={formData.heroImageUrl}
                    alt="Preview Hero"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 right-0 bg-primary text-ground text-[9px] text-center font-tag-mono py-0.5">
                    HERO PREVIEW
                  </span>
                </div>
              )}
            </div>
          </div>
        </fieldset>

        {/* Action Buttons */}
        <div className="flex items-center gap-space-md flex-wrap pt-space-sm">
          <button
            type="submit"
            className="px-space-xl py-3 border-2 border-primary bg-primary text-ground hover:bg-ground hover:text-primary font-index-label text-index-label uppercase tracking-wider flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-[#0047FF]"></span>
            <span>SIMPAN PERUBAHAN LANDING PAGE [CMD+S]</span>
          </button>

          <button
            type="button"
            onClick={handleResetSection}
            className="px-space-lg py-3 border-2 border-primary bg-ground hover:bg-surface font-index-label text-index-label uppercase tracking-wider text-signal-red"
          >
            ↺ RESET TEKS KE DEFAULT
          </button>
        </div>
      </form>
    </div>
  );
}
