# Temu-Coffeeshop — Design System & UI Specification (`design.md`)

Dokumen ini menerjemahkan filosofi visual **Swiss Minimalist** ke dalam arsitektur antarmuka **Temu-Coffeeshop**. Seluruh elemen pada *Public Landing Page* maupun *Admin CMS Dashboard* wajib mematuhi aturan grid, tipografi, dan *token* di bawah ini.

---

## 1. Identitas Visual (Swiss Minimalist untuk Kedai Kopi)

* **Konsep Utama:** Mengubah tampilan *coffee shop* menjadi seperti dokumen editorial/arsip cetak yang terorganisir rapi.
* **Karakteristik:** Menggunakan *continuous typographic grid* berwarna putih (`#ffffff`), hitam pekat (`#000000`), dan abu-abu pucat (`#f0f0f0`), dengan penanda aksen biru Klein / cobalt editorial (`#004de6`).
* **Elemen Kunci:** *Heading* berukuran besar dan tebal, garis pembatas eksplisit (*exposed 2px rules*), serta kolom indeks kiri (*persistent index rail*) yang konsisten dari atas hingga bawah halaman.
* **Pantangan (Strict Limits):** Dilarang menggunakan *floating cards*, *drop shadows*, sudut membulat (`border-radius: 0`), gradasi, efek kaca (*glassmorphism*), atau animasi transisi yang lambat.

---

## 2. Sistem Grid & Layout (12-Column Architecture)

Seluruh halaman (publik dan admin) dibangun di atas **12-Column Desktop Grid** dengan *exposed border rules* (`2px solid #000000`) yang menyatukan setiap bagian.

### A. Public Landing Page Structure

1. **Header & Navigation Bar:**
   * Terbagi sesuai garis kolom grid. Kiri: Identitas `[ TEMU — COFFEESHOP ]`. Kanan: Navigasi publik langsung (`01 MENU`, `02 HISTORIS`, `03 LOKASI`). Bagian admin login disembunyikan (*hidden*) dari header publik agar visual terfokus pada pengunjung, dan dapat diakses melalui footer *Staff Access*, pintasan keyboard `Ctrl+Shift+A`, atau route `#/admin`.
2. **Hero Section (9 + 3 Split):**
   * **Kolom 1–9:** *Broad opening statement* (64px–148px) tentang filosofi ruang temu dan kopi, disertai foto editorial utama *grayscale*.
   * **Kolom 10–12:** Area informasi pendukung & *Call-to-Action* (Jam buka hari ini, status kedai *OPEN/CLOSED* dengan sinyal titik aksen biru `#004de6`, dan tombol persegi langsung menuju Katalog Menu).
3. **Section 01 — Katalog Menu (3 + 9 Index Rail):**
   * **Kolom 1–3 (Index Rail):** Nomor indeks `01 / MENU`, judul seksi, dan filter kategori berbentuk tombol persegi (*All, Signature, Espresso Based, Non-Coffee, Pastry*). Filter yang aktif ditandai blok hitam atau indikator aksen biru `#004de6`.
   * **Kolom 4–12 (Content Matrix):** Matriks menu yang dibatasi garis horizontal dan vertikal (`2px solid #000000`), tanpa jarak kartu mengambang.
     * Setiap sel menu memuat: Foto *grayscale* (opsional/proporsional), Nama Menu (`24px`, *bold*), Harga, *Caption* rasa (`16px`), serta *badge* biru `#004de6` untuk `[ RECOMMENDED ]` atau teks coret/abu-abu untuk `[ SOLD OUT ]`.
4. **Section 02 — Historis & Cerita Temu (3 + 9 Editorial Grid):**
   * *Catatan: Bagian ini dapat menggunakan blok latar belakang hitam penuh (`#000000`) dengan teks putih (`#ffffff`) untuk menciptakan kontras dramatis, atau tetap di atas latar putih dengan garis tegas.*
   * **Kolom 1–3 (Index Rail):** Nomor indeks `02 / HISTORIS` beserta pengantar singkat mengenai dokumentasi perjalanan Temu-Coffeeshop.
   * **Kolom 4–12 (Editorial Series):** Daftar kronologis/grid cerita historis yang diinput oleh Admin.
     * Setiap entri menampilkan: Nomor urut & Tanggal/Tahun (`14px`, *metadata*), Foto dokumentasi *grayscale* dengan *crop* persegi panjang vertikal (*tall proportion*), Judul Momen (`24px`), dan **Caption Cerita** yang sejajar lurus dengan garis grid.
5. **Section 03 — Lokasi & Footer (9 + 3 Closing & Divided Grid):**
   * Pernyataan penutup berukuran besar di kolom 1–9 dan tombol petunjuk arah di kolom 10–12, diikuti *footer* yang terbagi rata dengan garis grid penuh.

---

### B. Admin Panel / CMS Structure (Menu & Historis Manager)

Admin Panel menggunakan bahasa desain yang sama persis seperti * spreadsheet* atau buku besar bergaya Swiss:

1. **Kolom 1–3 (Admin Index Rail):**
   * Navigasi modul: `01 / MANAJEMEN MENU`, `02 / MANAJEMEN HISTORIS`, `03 / LANDING PAGE`, dan tombol `LOGOUT / LIHAT WEB`.
2. **Kolom 4–12 (Workspace Matrix):**
   * **Form Input (Tambah/Edit Menu, Historis & Informasi Landing Page):** Input *field* berbentuk kotak persegi (`border: 2px solid #000000`, `border-radius: 0`), latar putih atau `#f0f0f0`, dan *outline* fokus yang jelas.
   * **Tabel Data Menu & Historis:** Baris tabel berbatas garis `2px`, menampilkan pratinjau foto *grayscale*, judul/nama, *caption*, status aktif, serta tombol aksi cepat (`[ EDIT ]`, `[ TOGGLE STATUS ]`, `[ DELETE ]` dengan aksen biru `#004de6`).

---

## 3. Tipografi

Menggunakan satu jenis huruf tanpa dekorasi tambahan: **Host Grotesk** (diikat ke `"SwissMinimalistHost"`, *fallback* `Arial, sans-serif`).

* **Display / Hero Heading:** `clamp(64px, 8cqw, 148px)` | Weight: `750` | Line-height: `< 1.0` (`0.92`) | Tracking: `-0.03em`.
* **Section Heading:** `clamp(32px, 4cqw, 56px)` | Weight: `700` | Line-height: `1.05`.
* **Item Title (Nama Menu / Judul Historis):** `24px` | Weight: `700` | Line-height: `1.2`.
* **Lead Text (Pengantar Seksi):** `17px` | Weight: `400` | Line-height: `1.5`.
* **Body Copy (Caption Historis & Deskripsi Menu):** `16px` | Weight: `400` | Line-height: `1.5`.
* **Metadata (Tanggal Historis, Harga, Stok):** `14px` | Weight: `400` / `700`.
* **Index Label & Kategori:** `12px` | Weight: `700` | Uppercase | Tracking: `0.12em`.

---

## 4. Warna & Permukaan (Color & Surfaces)

* **Main Ground (`#ffffff`):** Latar utama halaman dan sel konten.
* **Ink & Rules (`#000000`):** Warna teks utama, seluruh garis pembatas (`2px`), serta blok latar bagian *feature*/*historis* tertentu.
* **Supporting Surface (`#f0f0f0`):** Latar pembeda untuk area metadata, status *sold out*, atau *input field* di halaman Admin.
* **Signal Accent (`#004de6`):** Digunakan secara tegas untuk penanda penting: label *Signature/Featured Menu*, indikator *Active Tab*, titik status *Open Now*, aksen tombol utama, dan aksi di Admin.

---

## 5. Aturan Gambar & Media (Historis & Menu)

* **Perlakuan Visual:** Seluruh foto menu dan foto dokumentasi historis ditampilkan dalam mode **Grayscale Editorial** (`filter: grayscale(100%) contrast(1.05)`), dengan potongan persegi panjang bersudut tajam (`0px`).
* **Proporsi:**
  * Foto Historis (Desktop): Rasio *tall rectangular* (misal `3:4` atau `4:5`) dengan *caption* terikat langsung di bawah atau di samping sesuai garis grid.
  * Foto Menu: Rasio `4:3` atau `1:1` yang memenuhi lebar sel matriks tanpa *padding* mengambang, atau dibingkai garis `2px`.
* **Aksesibilitas:** Wajib menyertakan `alt` teks deskriptif yang diambil dari nama menu atau judul momen historis.

---

## 6. Komponen Interaktif & Motion

* **Tombol & Kontrol:** Persegi panjang tajam (`border-radius: 0`), `border: 2px solid #000000`.
  * *Default:* Latar `#ffffff`, teks `#000000`.
  * *Hover / Active / Selected:* Latar `#000000`, teks `#ffffff` (dengan tanda kotak/titik biru `#004de6` untuk item yang sedang dipilih).
  * *Focus:* *Outline* tegas yang mudah terlihat untuk navigasi *keyboard*.
* **Motion (`0s`):** Tidak menggunakan efek *fade-in*, *parallax*, atau transisi lambat. Seluruh perubahan *state* (filter menu, buka/tutup detail, perubahan tab Admin) bersifat instan (`--dp-motion-feedback: 0s`).

---

## 7. Perilaku Responsif (Responsive Breakpoints)

* **Breakpoint `<= 1050px` (Tablet Landscape):**
  * Item *editorial Historis* berubah menjadi susunan baris gambar-dan-teks berdampingan.
  * Urutan langkah atau matriks menu menyesuaikan menjadi 2 kolom sejajar.
* **Breakpoint `<= 700px` (Mobile):**
  * **Index Rail** (Kolom 1–3) berpindah ke bagian atas masing-masing seksi menjadi *header bar* berbatas garis penuh.
  * Matriks menu dan *grid* historis ditumpuk vertikal (1 kolom penuh).
  * Proporsi gambar *tall* pada bagian Historis diubah menjadi lebih lebar (`16:10` atau `4:3`) agar mudah dibaca di layar ponsel.
  * Garis pembatas `2px` dan blok latar hitam tetap menyambung utuh dengan *gutter* lebih rapat; *footer* dibagi menjadi grup 2 kolom.

---

## 8. Authoritative CSS Tokens

Gunakan variabel CSS berikut sebagai sumber kebenaran tunggal pada kode *stylesheet*:

```css
:root {
  --dp-color-ground: #ffffff;
  --dp-color-ink: #000000;
  --dp-color-surface: #f0f0f0;
  --dp-color-accent: #004de6;
  --dp-color-accent-hover: #0038b8;
  --dp-color-accent-soft: #edf3ff;
  --dp-typography-face: "SwissMinimalistHost", "Host Grotesk", Arial, sans-serif;
  --dp-typography-body: 16px;
  --dp-typography-label: 12px;
  --dp-typography-metadata: 14px;
  --dp-typography-lead: 17px;
  --dp-typography-item-title: 24px;
  --dp-typography-regular: 400;
  --dp-typography-strong: 700;
  --dp-typography-display: 750;
  --dp-typography-label-tracking: 0.12em;
  --dp-typography-body-leading: 1.5;
  --dp-spacing-gutter: clamp(20px, 3.3333cqw, 64px);
  --dp-radius-control: 0;
  --dp-border-rule: 2px;
  --dp-motion-feedback: 0s;
}
```