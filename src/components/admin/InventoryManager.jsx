import React, { useState } from 'react';
import { getBeanBatches, saveBeanBatches, updateBeanBatch } from '../../services/storageService';

export default function InventoryManager() {
  const [batches, setBatches] = useState(getBeanBatches());
  const [editingBatch, setEditingBatch] = useState(null);
  const [formData, setFormData] = useState({
    lotCode: '',
    origin: '',
    variety: '',
    process: 'Full Washed',
    roastDate: new Date().toISOString().slice(0, 10),
    roastProfile: 'Medium Light (DTR 14.0%)',
    tdsTarget: '1.38% TDS @ 93°C',
    stockKg: '',
    status: 'READY TO BREW',
    cuppingScore: '88.0'
  });
  const [successMsg, setSuccessMsg] = useState('');

  const totalRoastedStock = batches.reduce((acc, b) => acc + (Number(b.stockKg) || 0), 0);
  const activeSingleOrigins = batches.length;

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setFormData({
      lotCode: batch.lotCode,
      origin: batch.origin,
      variety: batch.variety,
      process: batch.process,
      roastDate: batch.roastDate,
      roastProfile: batch.roastProfile,
      tdsTarget: batch.tdsTarget,
      stockKg: batch.stockKg,
      status: batch.status,
      cuppingScore: batch.cuppingScore
    });
    window.scrollTo({ top: 200, behavior: 'instant' });
  };

  const handleCancel = () => {
    setEditingBatch(null);
    setFormData({
      lotCode: '',
      origin: '',
      variety: '',
      process: 'Full Washed',
      roastDate: new Date().toISOString().slice(0, 10),
      roastProfile: 'Medium Light (DTR 14.0%)',
      tdsTarget: '1.38% TDS @ 93°C',
      stockKg: '',
      status: 'READY TO BREW',
      cuppingScore: '88.0'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.lotCode.trim() || !formData.origin.trim()) return;

    if (editingBatch) {
      const updated = updateBeanBatch({
        ...editingBatch,
        ...formData,
        stockKg: Number(formData.stockKg) || 0,
        cuppingScore: Number(formData.cuppingScore) || 85.0
      });
      setBatches([...updated]);
      setSuccessMsg(`BERHASIL MEMPERBARUI BATCH: ${formData.lotCode}`);
      handleCancel();
    } else {
      const newBatch = {
        ...formData,
        id: `batch-${Date.now()}`,
        stockKg: Number(formData.stockKg) || 0,
        cuppingScore: Number(formData.cuppingScore) || 85.0
      };
      const updated = [newBatch, ...batches];
      saveBeanBatches(updated);
      setBatches(updated);
      setSuccessMsg(`BERHASIL MEREKAM BATCH BARU: ${formData.lotCode}`);
      handleCancel();
    }
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleQuickStockChange = (id, delta) => {
    const updated = batches.map(b => {
      if (b.id === id) {
        const newStock = Math.max(0, Math.round(((Number(b.stockKg) || 0) + delta) * 10) / 10);
        return { ...b, stockKg: newStock };
      }
      return b;
    });
    saveBeanBatches(updated);
    setBatches(updated);
  };

  return (
    <div className="p-space-md lg:p-space-lg">
      {/* Module 03 Header Banner */}
      <div 
        className="border-b-2 border-primary bg-surface p-space-md lg:p-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-md" 
        style={{ backgroundColor: 'rgb(236, 229, 216)' }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-[#0047FF] inline-block"></span>
            <span className="font-tag-mono text-tag-mono tracking-widest text-[#0047FF] uppercase">
              MODUL KONTROL BATCH // ARSIP ROASTER
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md tracking-tight uppercase">
            03 / INVENTARIS & STOK BIJI TUNGGAL
          </h1>
          <p className="font-tag-mono text-tag-mono text-on-surface-variant mt-1 tracking-wider">
            SISTEM PENGAWASAN KURVA SANRAI, TDS KALIBRASI & LOG PENELUSURAN ASAL USUL (PROVENANCE)
          </p>
        </div>
        <div className="flex items-center gap-2 font-tag-mono text-tag-mono">
          <span className="px-2 py-1 bg-ground border border-primary font-bold">
            STATUS ROASTER: 204.0°C NOMINAL
          </span>
        </div>
      </div>

      {/* Quick Metrics 4-Box Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-md">
        <div className="p-space-md border-2 border-primary bg-ground flex flex-col justify-between">
          <span className="font-tag-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            01 // TOTAL STOK ROASTED
          </span>
          <div className="font-headline-md text-2xl font-bold mt-2">
            {totalRoastedStock.toFixed(1)} <span className="text-sm font-normal text-on-surface-variant">KG</span>
          </div>
          <span className="font-tag-mono text-[9px] text-[#0047FF] mt-1">SIAP SEDUH & DISTRIBUSI</span>
        </div>

        <div className="p-space-md border-2 border-primary bg-ground flex flex-col justify-between">
          <span className="font-tag-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            02 // SINGLE ORIGIN AKTIF
          </span>
          <div className="font-headline-md text-2xl font-bold mt-2">
            0{activeSingleOrigins} <span className="text-sm font-normal text-on-surface-variant">LOT</span>
          </div>
          <span className="font-tag-mono text-[9px] text-primary mt-1">TERVERIFIKASI SCA {'>'} 84 PTS</span>
        </div>

        <div className="p-space-md border-2 border-primary bg-ground flex flex-col justify-between">
          <span className="font-tag-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            03 // TARGET TDS RATA-RATA
          </span>
          <div className="font-headline-md text-2xl font-bold mt-2">
            1.36% <span className="text-sm font-normal text-on-surface-variant">TDS</span>
          </div>
          <span className="font-tag-mono text-[9px] text-[#0047FF] mt-1">EKSTRAKSI OPTIMAL 19-21%</span>
        </div>

        <div className="p-space-md border-2 border-primary bg-ground flex flex-col justify-between">
          <span className="font-tag-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
            04 // STATUS PENYIMPANAN
          </span>
          <div className="font-headline-md text-2xl font-bold mt-2">
            VACUUM <span className="text-sm font-normal text-on-surface-variant">SEAL</span>
          </div>
          <span className="font-tag-mono text-[9px] text-[#0047FF] mt-1">SUHU RUANG 21°C • RH 55%</span>
        </div>
      </div>

      {/* Notification Toast */}
      {successMsg && (
        <div className="p-space-sm mb-space-md border-2 border-primary bg-surface font-tag-mono text-tag-mono flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#0047FF] inline-block"></span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Input / Edit Batch */}
      <div className="border-2 border-primary bg-surface mb-space-md" style={{ backgroundColor: 'rgb(236, 229, 216)' }}>
        <div className="px-space-md py-2.5 bg-ground border-b-2 border-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            <span className="font-tag-mono text-tag-mono tracking-widest uppercase font-bold">
              {editingBatch ? `EDIT KALIBRASI BATCH [ ${editingBatch.lotCode} ]` : 'FORMULIR CATATAN SANGRAI BARU (ROAST LOG)'}
            </span>
          </div>
          <span className="font-tag-mono text-[11px] text-on-surface-variant">
            FORMAT: SCA ROAST SHEET
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-space-md lg:p-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md">
            {/* Lot Code */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                01. KODE BATCH / LOT
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-metadata-bold"
                placeholder="LOT-GAYO-2025B"
                value={formData.lotCode}
                onChange={(e) => setFormData({ ...formData, lotCode: e.target.value })}
                required
              />
            </div>

            {/* Origin & Altitude */}
            <div className="lg:col-span-5 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                02. PROVENANSI & WILAYAH TANAM
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-body-sm"
                placeholder="Aceh Gayo, Takengon (1.600m DPL)"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                required
              />
            </div>

            {/* Varietas */}
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                03. VARIETAS BIJI
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-body-sm"
                placeholder="Ateng Super, TimTim, Bourbon"
                value={formData.variety}
                onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              />
            </div>

            {/* Proses Pengolahan */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                04. METODE PROSES
              </label>
              <select
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-body-sm"
                value={formData.process}
                onChange={(e) => setFormData({ ...formData, process: e.target.value })}
              >
                <option>Full Washed</option>
                <option>Anaerobic Slow Natural</option>
                <option>Lactic Fermentation</option>
                <option>Carbonic Maceration</option>
                <option>Wet Hulled (Giling Basah)</option>
                <option>Honey Process</option>
              </select>
            </div>

            {/* Tanggal Sangrai */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                05. TANGGAL SANGRAI
              </label>
              <input
                type="date"
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-tag-mono text-tag-mono"
                value={formData.roastDate}
                onChange={(e) => setFormData({ ...formData, roastDate: e.target.value })}
                required
              />
            </div>

            {/* Target TDS & Suhu */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                06. TARGET TDS & SUHU
              </label>
              <input
                type="text"
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-body-sm"
                placeholder="1.38% TDS @ 93.4°C"
                value={formData.tdsTarget}
                onChange={(e) => setFormData({ ...formData, tdsTarget: e.target.value })}
              />
            </div>

            {/* Stok Kg & Cupping Score */}
            <div className="lg:col-span-3 flex flex-col gap-1.5">
              <label className="font-index-label text-index-label uppercase">
                07. SISA STOK (KG)
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full px-space-md py-2.5 bg-ground border-2 border-primary font-metadata-bold text-right"
                placeholder="15.0"
                value={formData.stockKg}
                onChange={(e) => setFormData({ ...formData, stockKg: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mt-space-md pt-space-md border-t-2 border-primary flex items-center justify-between">
            <span className="font-tag-mono text-tag-mono text-on-surface-variant">
              STATUS SANGRAI DITERUSKAN KE SISTEM KALIBRASI BAR
            </span>
            <div className="flex items-center gap-space-md">
              {editingBatch && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-space-md py-2.5 border-2 border-primary bg-ground hover:bg-surface font-index-label"
                >
                  BATALKAN
                </button>
              )}
              <button
                type="submit"
                className="px-space-lg py-2.5 border-2 border-primary bg-primary text-ground hover:bg-ground hover:text-primary font-index-label flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-[#0047FF]"></span>
                <span>{editingBatch ? 'SIMPAN PERUBAHAN BATCH' : '+ CATAT BATCH BARU'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bean Batches Swiss Ledger Table */}
      <div className="border-2 border-primary bg-ground overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-primary bg-surface font-index-label text-index-label uppercase tracking-widest text-primary" style={{ backgroundColor: 'rgb(236, 229, 216)' }}>
              <th className="py-3 px-space-md border-r-2 border-primary w-28">KODE LOT</th>
              <th className="py-3 px-space-md border-r-2 border-primary">PROVENANSI & VARIETAS</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-40">METODE PROSES</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-36">TGL ROAST & PROFIL</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-36">TARGET TDS</th>
              <th className="py-3 px-space-md border-r-2 border-primary w-36">SISA STOK</th>
              <th className="py-3 px-space-md text-right w-44">AKSI CEPAT</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-primary font-body-sm text-body-sm">
            {batches.map((batch) => (
              <tr key={batch.id} className="hover:bg-surface-bright">
                {/* Kode Lot */}
                <td className="py-3 px-space-md border-r-2 border-primary font-tag-mono text-tag-mono font-bold">
                  {batch.lotCode}
                  <span className="block text-[9px] font-normal text-on-surface-variant mt-0.5">
                    SCA: {batch.cuppingScore} PTS
                  </span>
                </td>

                {/* Provenansi */}
                <td className="py-3 px-space-md border-r-2 border-primary">
                  <div className="font-metadata-bold text-metadata-bold">
                    {batch.origin}
                  </div>
                  <div className="text-xs text-on-surface-variant font-tag-mono mt-0.5">
                    VARIETAS: {batch.variety}
                  </div>
                </td>

                {/* Metode Proses */}
                <td className="py-3 px-space-md border-r-2 border-primary font-tag-mono text-xs">
                  {batch.process}
                </td>

                {/* Tgl Roast */}
                <td className="py-3 px-space-md border-r-2 border-primary font-tag-mono text-xs">
                  <div>{batch.roastDate}</div>
                  <div className="text-[10px] text-on-surface-variant">{batch.roastProfile}</div>
                </td>

                {/* Target TDS */}
                <td className="py-3 px-space-md border-r-2 border-primary font-tag-mono text-xs text-[#0047FF] font-bold">
                  {batch.tdsTarget}
                </td>

                {/* Sisa Stok */}
                <td className="py-3 px-space-md border-r-2 border-primary font-tag-mono text-sm font-bold">
                  <div className="flex items-center justify-between">
                    <span>{batch.stockKg} KG</span>
                    <div className="inline-flex divide-x border border-primary text-[10px]">
                      <button 
                        type="button" 
                        onClick={() => handleQuickStockChange(batch.id, -1)}
                        className="px-1.5 py-0.5 hover:bg-primary hover:text-ground"
                        title="Kurangi 1 Kg"
                      >
                        -1
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleQuickStockChange(batch.id, 1)}
                        className="px-1.5 py-0.5 hover:bg-primary hover:text-ground"
                        title="Tambah 1 Kg"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </td>

                {/* Aksi */}
                <td className="py-3 px-space-md text-right">
                  <div className="inline-flex divide-x-2 divide-primary border-2 border-primary font-tag-mono text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => handleEdit(batch)}
                      className="px-2 py-1 bg-ground hover:bg-primary hover:text-ground"
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = batches.filter(b => b.id !== batch.id);
                        saveBeanBatches(updated);
                        setBatches(updated);
                      }}
                      className="px-2 py-1 bg-ground hover:bg-signal-red hover:text-ground text-signal-red"
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
  );
}

