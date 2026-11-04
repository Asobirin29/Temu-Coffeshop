// Helper to create clean editorial Swiss grayscale placeholder SVGs
function createEditorialSvg(label, subtitle, ratio = "1/1") {
  const width = 600;
  const height = ratio === "3/4" ? 800 : 600;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#1a1a1a"/>
    <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#333333" stroke-width="2"/>
    <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#333333" stroke-width="2"/>
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#666666" stroke-width="2"/>
    <text x="50%" y="46%" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">${label.toUpperCase()}</text>
    <text x="50%" y="54%" font-family="Arial, sans-serif" font-weight="400" font-size="14" fill="#aaaaaa" text-anchor="middle" letter-spacing="3">${subtitle.toUpperCase()}</text>
    <rect x="${width / 2 - 40}" y="${height - 60}" width="80" height="24" fill="#004de6"/>
    <text x="50%" y="${height - 44}" font-family="Arial, sans-serif" font-weight="700" font-size="11" fill="#ffffff" text-anchor="middle" letter-spacing="1">TEMU // ARCHIVE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_INFO = {
  name: "TEMU — COFFEESHOP",
  tagline: "RUANG TEMU, ARSIP KOPI, DAN CATATAN WAKTU.",
  heroSectionTag: "00 // PENDAHULUAN & FILOSOFI",
  heroTitle: "RUANG TEMU, ARSIP KOPI.",
  heroLead: "Temu-Coffeeshop adalah laboratorium rasa dan ruang terbuka yang dirancang dengan presisi editorial Swiss. Setiap cangkir diproses melalui disiplin sangrai ketat dan disajikan sebagai medium dialog tanpa distraksi visual berlebihan.",
  heroImageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80",
  heroImageCaption: "ARSIP VISUAL 01 // INTERIOR RUANG SEDUH UTAMA",
  
  // Status Kedai & Jam Operasional
  isOpen: true,
  statusText: "SEDANG BUKA",
  statusClosedText: "TUTUP SEMENTARA",
  statusNote: "Disangrai segar tiap pagi. Melayani seduhan manual dan espresso bar.",
  openingHours: "07:00 — 22:00 WIB",
  openingDays: "Senin sampai Minggu tanpa libur",
  
  // Alamat & Lokasi
  address: "Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190",
  locationArea: "KEBAYORAN BARU, JAKARTA SELATAN",
  locationShort: "Jl. Senopati No. 42",
  locationSectionTag: "03 / LOKASI & PERSINGGAHAN",
  locationTitle: "SINGGAH DAN MULAI PERCAKAPAN.",
  locationLead: "Kami menyediakan bangku-bangku kayu panjang, stopkontak terintegrasi, dan atmosfer yang hening untuk Anda yang ingin membaca, menulis, atau sekadar menikmati waktu senggang.",
  locationNote: "Temu berlokasi strategis di area Senopati dengan fasilitas parkir kendaraan dan ramah pesepeda.",
  
  // Kontak & Tautan
  googleMapsUrl: "https://maps.google.com/?q=Senopati+Jakarta",
  whatsappUrl: "https://wa.me/6281234567890?text=Halo%20Temu-Coffeeshop,%20saya%20ingin%20bertanya",
  instagram: "@temu.coffeeshop"
};

export const DEFAULT_MENU_ITEMS = [
  {
    id: "menu-01",
    name: "Temu Klasik Aren",
    category: "SIGNATURE",
    price: 28000,
    caption: "Racikan espresso ganda Flores Bajawa, gula aren murni organik, dan susu segar bertekstur kental manis lembut.",
    image_url: createEditorialSvg("Temu Klasik Aren", "Signature Cold", "1/1"),
    is_available: true,
    is_featured: true
  },
  {
    id: "menu-02",
    name: "Nitro Cold Brew Citrus",
    category: "SIGNATURE",
    price: 32000,
    caption: "Ekstraksi dingin 18 jam dengan infusi nitrogen mikro. Profil rasa sitrus jernih dengan buih krem tebal.",
    image_url: createEditorialSvg("Nitro Cold Brew", "18-Hour Brew", "1/1"),
    is_available: true,
    is_featured: true
  },
  {
    id: "menu-03",
    name: "Susu Gandum Kayu Manis",
    category: "SIGNATURE",
    price: 30000,
    caption: "Kombinasi oat milk panggang, rempah kayu manis Sumatera, dan satu seloki espresso pekat.",
    image_url: createEditorialSvg("Susu Gandum Kayu Manis", "Oat Cinnamon", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-04",
    name: "Double Espresso",
    category: "ESPRESSO BASED",
    price: 22000,
    caption: "Ekstraksi rasio 1:2 dari biji kopi arabika Gayo anaerobik. Catatan rasa kakao pekat dan sentuhan kismis.",
    image_url: createEditorialSvg("Double Espresso", "Gayo Anaerobic", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-05",
    name: "Americano Klasik",
    category: "ESPRESSO BASED",
    price: 25000,
    caption: "Tersedia panas atau dingin. Air mineral terkontrol berpadu dengan shot espresso untuk body yang jernih.",
    image_url: createEditorialSvg("Americano Klasik", "Hot / Iced", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-06",
    name: "Piccolo Latte",
    category: "ESPRESSO BASED",
    price: 26000,
    caption: "Konsentrasi rasa kopi intens dengan lapisan mikro-foam susu bersuhu 60°C dalam porsi 100ml.",
    image_url: createEditorialSvg("Piccolo Latte", "Dense Microfoam", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-07",
    name: "Uji Matcha Ceremonial",
    category: "NON-COFFEE",
    price: 32000,
    caption: "Teh hijau ceremonial grade asal Uji, Kyoto. Dikocok dengan chasen bambu dan dipadukan susu murni segar.",
    image_url: createEditorialSvg("Uji Matcha", "Kyoto Import", "1/1"),
    is_available: true,
    is_featured: true
  },
  {
    id: "menu-08",
    name: "Artisan Earl Grey",
    category: "NON-COFFEE",
    price: 24000,
    caption: "Seduhan daun teh hitam Ceylon berkualitas tinggi dengan minyak bergamot Italia dan kelopak bunga biru.",
    image_url: createEditorialSvg("Artisan Earl Grey", "Ceylon Bergamot", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-09",
    name: "Cokelat Hitam Tabanan",
    category: "NON-COFFEE",
    price: 28000,
    caption: "Kakao 70% asal perkebunan organik Tabanan, Bali. Rasa cokelat legit dengan keasaman buah alami.",
    image_url: createEditorialSvg("Cokelat Tabanan", "70% Dark Cocoa", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-10",
    name: "Butter Croissant Klasik",
    category: "PASTRY",
    price: 25000,
    caption: "Adonan beragi berlapis mentega Prancis murni. Renyah di luar dan berongga honeycomb sempurna di dalam.",
    image_url: createEditorialSvg("Butter Croissant", "French Butter", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-11",
    name: "Pain Au Chocolat",
    category: "PASTRY",
    price: 28000,
    caption: "Dua batang cokelat Belgia pekat terbalut pastry renyah gurih. Dipanggang segar setiap pagi pukul 06:30.",
    image_url: createEditorialSvg("Pain Au Chocolat", "Belgian Chocolate", "1/1"),
    is_available: false,
    is_featured: false
  },
  {
    id: "menu-12",
    name: "Almond Kouign-Amann",
    category: "PASTRY",
    price: 30000,
    caption: "Kue tradisional Breton dengan lapisan gula terkaramelisasi renyah dan taburan kacang almond sangrai gurih.",
    image_url: createEditorialSvg("Almond Kouign-Amann", "Caramelized Crisp", "1/1"),
    is_available: true,
    is_featured: false
  }
];

export const DEFAULT_HISTORY_STORIES = [
  {
    id: "hist-01",
    title: "Meja Kayu Pertama di Sudut Jalan",
    story_date: "2021 // AWAL MULA",
    caption: "Dimulai dari sebuah meja kayu tua berukuran 120x60 sentimeter dan satu mesin espresso manual. Kami percaya bahwa secangkir kopi bukan sekadar asupan kafein, melainkan sebuah jeda dan titik temu bagi ide-ide yang belum selesai diutarakan di tengah deru kota.",
    image_url: createEditorialSvg("Meja Kayu Pertama", "Dokumentasi 2021", "3/4"),
    display_order: 1,
    is_published: true
  },
  {
    id: "hist-02",
    title: "Eksperimen Sangrai Mandiri",
    story_date: "2022 // RITUAL PAGI",
    caption: "Menemukan profil sangrai yang tepat membutuhkan ratusan cangkir uji coba dan puluhan kurva temperatur. Kami memutuskan untuk bermitra langsung dengan petani di dataran tinggi Bajawa dan Gayo, memastikan setiap butir ceri merah dipetik pada puncak kematangannya.",
    image_url: createEditorialSvg("Sangrai Mandiri", "Uji Coba Profil Rasa", "3/4"),
    display_order: 2,
    is_published: true
  },
  {
    id: "hist-03",
    title: "Temu Tanpa Sekat",
    story_date: "2023 // RUANG KOMUNITAS",
    caption: "Meruntuhkan dinding pembatas fisik agar aroma seduhan kopi dan obrolan mengalir bebas. Di sini, pengunjung tidak hanya singgah untuk minum, melainkan menaruh cerita, bertukar buku, dan merajut kolaborasi lintas disiplin tanpa ada sekat formalitas.",
    image_url: createEditorialSvg("Temu Tanpa Sekat", "Arsip Komunitas", "3/4"),
    display_order: 3,
    is_published: true
  }
];

export const CATEGORIES = [
  "ALL",
  "SIGNATURE",
  "ESPRESSO BASED",
  "NON-COFFEE",
  "PASTRY"
];

