# Product Requirements Document (PRD) — Temu-Coffeeshop

| Informasi Dokumen | Detail |
| :--- | :--- |
| **Nama Produk** | Temu-Coffeeshop Web Platform (Landing Page & Admin CMS) |
| **Versi Dokumen** | 1.0 |
| **Status** | Ready for Development |
| **Referensi Desain** | `design.md` (Swiss Minimalist Architecture) |

---

## 1. Ringkasan Eksekutif & Tujuan Produk (Product Overview)

**Temu-Coffeeshop** membutuhkan platform web terpadu yang berfungsi ganda:
1. **Public Landing Page:** Menampilkan identitas visual kedai dengan pendekatan *Swiss Minimalist* (seperti dokumen arsip/editorial cetak), menyajikan katalog menu secara terstruktur, serta menceritakan perjalanan/momen kedai melalui bagian **Historis & Caption**.
2. **Admin CMS (Content Management System):** Panel kontrol khusus *Owner*/Admin untuk mengelola daftar menu (tambah, ubah, hapus, status ketersediaan) serta mendokumentasikan cerita historis kedai lengkap dengan foto dan *caption* naratif secara *real-time* tanpa perlu mengubah kode sumber.

---

## 2. Target Pengguna (User Personas)

| Persona | Deskripsi | Kebutuhan Utama |
| :--- | :--- | :--- |
| **Pengunjung / Pelanggan (Public User)** | Penikmat kopi, pekerja lepas, atau komunitas yang ingin melihat menu, harga, jam operasional, dan cerita di balik Temu-Coffeeshop sebelum atau saat berkunjung. | - Melihat menu beserta harga, deskripsi (*caption*), dan status ketersediaan (*Available/Sold Out*) dengan cepat.<br>- Membaca dokumentasi historis dan filosofi kedai.<br>- Mengetahui jam buka dan lokasi kedai. |
| **Owner / Admin Kedai (Admin User)** | Pemilik atau pengelola harian Temu-Coffeeshop. | - Mengubah status menu yang habis (*Sold Out*) dalam satu klik.<br>- Menambahkan menu baru atau memperbarui harga & *caption* rasa.<br>- Mengunggah foto dokumentasi historis beserta tanggal dan *caption* ceritanya serta mengatur urutan tampilnya. |

---

## 3. User Stories & Acceptance Criteria

### A. Modul Public (Landing Page)

* **US-01 (Eksplorasi Katalog Menu):** Sebagai pengunjung, saya ingin melihat daftar menu yang dikelompokkan berdasarkan kategori sehingga saya tahu minuman/makanan apa saja yang tersedia beserta harganya.
  * *Acceptance Criteria:*
    * Pengunjung dapat memfilter menu berdasarkan kategori (`ALL`, `SIGNATURE`, `ESPRESSO BASED`, `NON-COFFEE`, `PASTRY`).
    * Setiap item menu menampilkan: Foto *grayscale*, Nama Menu, Kategori, Harga (format Rupiah), *Caption*/deskripsi rasa, penanda `[ RECOMMENDED ]` (jika *featured*), atau `[ SOLD OUT ]` jika sedang habis.
    * Perubahan filter kategori berjalan instan (`0s` motion) sesuai aturan *Swiss Minimalist*.

* **US-02 (Membaca Historis & Caption):** Sebagai pengunjung, saya ingin membaca perjalanan dan cerita historis Temu-Coffeeshop beserta foto dokumentasinya agar merasakan kedekatan dengan cerita kedai.
  * *Acceptance Criteria:*
    * Menampilkan daftar entri historis yang berstatus *Published* berdasarkan urutan tampil (*display order*) atau kronologis tanggal.
    * Setiap entri menampilkan: Nomor Indeks (`01`, `02`, dst.), Tanggal/Tahun Momen, Judul Momen, Foto dokumentasi (*grayscale* rasio vertikal di desktop), dan **Caption Cerita** lengkap.

* **US-03 (Informasi Operasional & Lokasi):** Sebagai pengunjung, saya ingin melihat apakah kedai sedang buka dan di mana lokasinya.
  * *Acceptance Criteria:*
    * Bagian Hero dan Footer menampilkan jam operasional, status operasional, alamat lengkap, serta tautan ke Google Maps / WhatsApp.

---

### B. Modul Admin (CMS Dashboard)

* **US-04 (Autentikasi & Gerbang Admin Tersembunyi):** Sebagai *Owner*, saya ingin akses Admin tersembunyi dari pengunjung umum dan selaras dengan estetika editorial kedai agar tampilan utama fokus pada pengalaman pelanggan.
  * *Acceptance Criteria:*
    * Tombol login admin disembunyikan dari navbar publik utama.
    * Tersedia akses melalui tombol discreet `[ STAFF // CMS ACCESS ]` pada footer, pintasan keyboard `Ctrl+Shift+A` (atau `Alt+A`), serta direct URL hash `#/admin` atau `#/login`.
    * Admin wajib memasukkan PIN otorisasi valid (default: `1984`) untuk membuka *Workspace Matrix*.
    * Saat sesi admin aktif pada halaman publik, sistem menampilkan floating control badge untuk navigasi instan kembali ke CMS atau logout.

* **US-05 (CRUD Katalog Menu):** Sebagai *Owner*, saya ingin menambah, mengedit, menghapus, dan mengubah status ketersediaan menu beserta *caption*-nya.
  * *Acceptance Criteria:*
    * Admin dapat mengisi form tambah/edit menu: Nama Menu, Kategori, Harga, URL/Upload Foto, *Caption* Deskripsi Menu, *Toggle Available/Sold Out*, dan *Toggle Recommended/Featured*.
    * Admin dapat melakukan *quick toggle* (`AVAILABLE` $\leftrightarrow$ `SOLD OUT`) langsung dari tabel daftar menu.
    * Setiap perubahan langsung tercermin pada *Public Landing Page*.

* **US-06 (CRUD Historis & Caption):** Sebagai *Owner*, saya ingin menambahkan dokumentasi sejarah/momen kedai beserta foto dan *caption* ceritanya ke halaman utama.
  * *Acceptance Criteria:*
    * Admin dapat mengisi form tambah/edit historis: Judul Momen, Tanggal/Periode (contoh: `OKTOBER 2023` atau `2023-10-14`), URL/Upload Foto, **Caption Cerita**, Urutan Tampil (*Order*), dan status *Published/Draft*.
    * Admin dapat mengedit *caption* atau menghapus momen historis yang sudah ada.
    * Entri yang berstatus *Published* langsung tampil di seksi `02 / HISTORIS` pada *Landing Page*.

* **US-07 (Manajemen Informasi Landing Page):** Sebagai *Owner*, saya ingin mengedit informasi operasional kedai seperti jam buka, status kedai (buka/tutup), alamat lengkap, foto hero, filosofi, serta link Google Maps dan WhatsApp langsung dari panel admin.
  * *Acceptance Criteria:*
    * Admin dapat mengubah status kedai (`SEDANG BUKA` vs `TUTUP SEMENTARA`), jam buka, hari layanan, serta catatan sub-status operasional.
    * Admin dapat mengubah alamat lengkap, area presisi, catatan petunjuk kedatangan, serta tautan Google Maps & WhatsApp.
    * Admin dapat mengubah judul hero, narasi filosofi, serta mengganti foto editorial hero (upload Base64 / URL) beserta keterangannya.
    * Seluruh pembaruan langsung tersimpan persisten di LocalStorage dan diterapkan seketika pada Public Landing Page secara *real-time*.

---

## 4. Spesifikasi Fungsional & Struktur Data (Data Dictionary)

### 4.1 Entitas: `MenuItem` (Katalog Menu)
| Atribut | Tipe Data | Wajib? | Deskripsi / Aturan Validasi |
| :--- | :--- | :--- | :--- |
| `id` | `String / UUID / Int` | Ya | Primary key unik untuk setiap item menu. |
| `name` | `String (Max 100)` | Ya | Nama produk kopi/makanan (contoh: *Temu Klasik Aren*). |
| `category` | `Enum / String` | Ya | Pilihan: `SIGNATURE`, `ESPRESSO BASED`, `NON-COFFEE`, `PASTRY`. |
| `price` | `Integer` | Ya | Harga dalam Rupiah (contoh: `28000` ditampilkan sebagai `IDR 28.000`). |
| `caption` | `Text (Max 300)` | Ya | Deskripsi profil rasa, komposisi, atau catatan singkat menu. |
| `image_url` | `String (URL)` | Ya | URL foto produk (ditampilkan *grayscale* sesuai `design.md`). |
| `is_available` | `Boolean` | Ya | `true` = Tersedia, `false` = `[ SOLD OUT ]`. |
| `is_featured` | `Boolean` | Ya | `true` = Menampilkan *badge* biru `#004de6` `[ RECOMMENDED ]`. |

### 4.2 Entitas: `HistoryStory` (Historis & Caption)
| Atribut | Tipe Data | Wajib? | Deskripsi / Aturan Validasi |
| :--- | :--- | :--- | :--- |
| `id` | `String / UUID / Int` | Ya | Primary key unik untuk setiap cerita historis. |
| `title` | `String (Max 150)` | Ya | Judul bab/momen historis (contoh: *Meja Kayu Pertama di Sudut Jalan*). |
| `story_date` | `String / Date` | Ya | Penanda waktu/periode momen (contoh: `2021 // AWAL MULA` atau `12.08.2022`). |
| `caption` | `Text` | Ya | Narasi atau cerita lengkap di balik foto historis tersebut. |
| `image_url` | `String (URL)` | Ya | URL foto dokumentasi (rasio vertikal di desktop, *grayscale*). |
| `display_order` | `Integer` | Ya | Angka urutan tampil di *Landing Page* (`1`, `2`, `3`, dst.). |
| `is_published` | `Boolean` | Ya | `true` = Tampil di publik, `false` = Disembunyikan (*Draft*). |

---

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)

1. **Kepatuhan Desain (`design.md` Compliance):**
   * Wajib menerapkan **12-Column Swiss Grid** dengan *persistent 3-column index rail* di sebelah kiri dan *9-column content matrix* di sebelah kanan pada layar desktop.
   * Hanya menggunakan warna `--dp-color-ground` (`#ffffff`), `--dp-color-ink` (`#000000`), `--dp-color-surface` (`#f0f0f0`), dan `--dp-color-accent` (`#004de6`).
   * Seluruh sudut komponen wajib `0px` (*square corners*), garis pembatas eksplisit `2px solid #000000`, tanpa bayangan (*no box-shadow*), dan transisi instan (`0s`).
2. **Responsivitas:**
   * Mendukung penuh *breakpoint* `<= 1050px` (susunan baris editorial & matriks 2 kolom) dan `<= 700px` (*index rail* di atas konten, susunan 1 kolom penuh).
3. **Aksesibilitas:**
   * Seluruh tombol dan *input* dapat diakses dengan *keyboard* (`Tab` / `Enter`) dengan *focus outline* yang tegas dan kontras tinggi.
   * Seluruh gambar menu dan historis memiliki atribut `alt` otomatis dari judul/nama item.
4. **Persistensi Data:**
   * Untuk tahap *prototype/front-end deployment*, perubahan yang dilakukan Admin disimpan secara persisten di *Local Storage* / *State Management* (dengan fitur *Reset to Default Seed Data*), dan siap diintegrasikan langsung ke REST API / Database SQL sesuai skema.

---

## 6. Alur Penggunaan Admin (Admin User Flow)

1. **Masuk ke Mode Admin:**
   * *Owner* mengklik tombol `[ ADMIN PANEL ]` di pojok kanan atas *header*.
   * Sistem menampilkan gerbang autentikasi (*Login Modal/View*). Setelah terverifikasi, antarmuka beralih ke **Admin Workspace Matrix**.
2. **Mengelola Menu (`01 / MANAJEMEN MENU`):**
   * *Owner* melihat tabel daftar menu beserta tombol `+ TAMBAH MENU BARU`.
   * Saat menambah/mengedit, *Owner* mengisi Nama, Kategori, Harga, Foto, dan *Caption*, lalu menekan `SIMPAN MENU`.
   * Jika ada bahan baku yang habis di kedai, *Owner* cukup menekan tombol status `[ AVAILABLE ]` pada baris menu hingga berubah menjadi `[ SOLD OUT ]`.
3. **Mengelola Historis (`02 / MANAJEMEN HISTORIS`):**
   * *Owner* berpindah ke tab `02 / MANAJEMEN HISTORIS`.
   * *Owner* menambahkan dokumentasi baru dengan memasukkan Judul Momen, Tanggal/Periode, URL Foto, dan menulis **Caption Cerita** di kotak teks.
   * *Owner* menekan `SIMPAN HISTORIS`, lalu kembali ke tampilan publik (`[ LIHAT LANDING PAGE ]`) untuk memverifikasi hasilnya di seksi `02 / HISTORIS`.