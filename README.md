# Temu-Coffeshop Web Platform

Platform web terpadu untuk **Temu-Coffeshop** yang mengombinasikan **Public Landing Page** bergaya arsitektur editorial **Swiss Minimalist** dan **Admin CMS Dashboard** untuk pengelolaan katalog menu, narasi historis, serta pengaturan informasi kedai secara real-time.

Dibuat berdasarkan spesifikasi formal pada [PRD.md](file:///c:/laragon/www/Temu_Coffe/PRD.md) dan [Design.md](file:///c:/laragon/www/Temu_Coffe/Design.md).

---

## ☕ Fitur Utama

### 1. Public Landing Page (Swiss Minimalist)
- **Continuous 12-Column Grid:** Garis pembatas terbuka (`2px solid #000000`), sudut `0px` (*square corners*), dan tanpa efek bayangan (*no box-shadow*).
- **Hero Section (9 + 3 Split):** Tipografi display besar (*Host Grotesk*), narasi filosofi kedai, foto editorial *grayscale*, dan indikator sinyal kedai sedang buka dengan aksen biru Swiss (`#004de6`).
- **Section 01 — Katalog Menu (3 + 9 Index Rail):** Filter instan (`0s` motion) per kategori (*ALL, SIGNATURE, ESPRESSO BASED, NON-COFFEE, PASTRY*), badge `[ RECOMMENDED ]`, penanda `[ SOLD OUT ]`, harga Rupiah, dan caption profil rasa.
- **Section 02 — Historis & Cerita Temu (3 + 9 Inverted High-Contrast):** Latar belakang hitam `#000000` dengan tipografi putih `#ffffff`, menampilkan dokumentasi kronologis, foto vertikal *tall*, dan caption cerita naratif lengkap.
- **Section 03 — Lokasi & Operasional (9 + 3 Grid):** Pernyataan penutup, detail jam operasional, tautan langsung ke Google Maps dan WhatsApp kedai.

### 2. Admin CMS Workspace Matrix
- **Akses Admin Tersembunyi (Discreet & Secure Gate):**
  - Tombol login admin disembunyikan dari navbar publik utama agar pengalaman visual pelanggan tetap murni.
  - Akses melalui trigger discreet `[ STAFF // CMS ACCESS ]` pada footer.
  - Pintasan keyboard: **`Ctrl + Shift + A`** (atau `Alt + A`).
  - Direct URL: `#/admin` atau `#/login`.
  - Floating CMS bar pada halaman publik saat sesi admin sedang aktif.
  - Default PIN: `1984`.
- **Manajemen Informasi Landing Page (CRUD):** Ubah status buka/tutup, jam buka, hari layanan, alamat lengkap, area, catatan petunjuk lokasi, judul hero, narasi filosofi, serta upload foto editorial hero baru.
- **Manajemen Katalog Menu (CRUD):** Tambah/edit menu baru, upload foto lokal langsung dari komputer (otomatis dikonversi ke Base64 Data URL & disimpan di `localStorage`), quick toggle `[ AVAILABLE ]` $\leftrightarrow$ `[ SOLD OUT ]` satu klik, dan hapus menu.
- **Manajemen Cerita Historis (CRUD):** Tambah/edit bab perjalanan kedai, upload foto arsip lokal vertikal, tulis caption cerita lengkap, atur nomor urutan tampil (*display order*), dan tombol toggle *Published/Draft*.
- **Persistensi & Reset Data:** Semua perubahan tersimpan otomatis di browser (`localStorage`), dilengkapi tombol `[ RESET TO DEFAULT SEED ]` untuk mengembalikan data awal kapan saja.

---

## 🛠️ Menjalankan di Lokal

### Prasyarat
- Node.js (v18+) & npm

### Langkah Menjalankan
```bash
# 1. Masuk ke direktori
cd c:\laragon\www\Temu_Coffe

# 2. Jalankan development server
npm run dev
```
Buka browser di: `http://localhost:5173`

---

## 🚀 Panduan Deployment ke Vercel

Project ini sudah dikonfigurasi dengan `vercel.json` dan SPA hash routing (`#/` dan `#/admin`), sehingga siap di-deploy secara instan:

### Opsi A: Menggunakan Vercel CLI
```bash
npx vercel
```

### Opsi B: Menggunakan Vercel Git Integration
1. Push repository ini ke GitHub.
2. Buka [vercel.com](https://vercel.com) dan impor repository `Temu-Coffeshop`.
3. Vercel akan otomatis mendeteksi framework **Vite** dan folder output `dist`.
4. Klik **Deploy**.

---

## 🔑 Kredensial Akses Admin
- **Cara Masuk:** Tekan `Ctrl + Shift + A` di mana saja, atau klik `[ STAFF // CMS ACCESS ]` di baris bawah footer.
- **Default PIN:** `1984`
