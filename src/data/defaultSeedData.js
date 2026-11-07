// Helper to create clean editorial Swiss grayscale placeholder SVGs
function createEditorialSvg(label, subtitle, ratio = "1/1") {
  const width = 600;
  const height = ratio === "3/4" ? 800 : 600;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <rect width="100%" height="100%" fill="#1a1a1a"/>
    <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="#333333" stroke-width="2"/>
    <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="#333333" stroke-width="2"/>
    <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#666666" stroke-width="2"/>
    <text x="50%" y="46%" font-family="'Hanken Grotesk', Arial, sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle" letter-spacing="2">${label.toUpperCase()}</text>
    <text x="50%" y="54%" font-family="'Hanken Grotesk', Arial, sans-serif" font-weight="400" font-size="14" fill="#aaaaaa" text-anchor="middle" letter-spacing="3">${subtitle.toUpperCase()}</text>
    <rect x="${width / 2 - 40}" y="${height - 60}" width="80" height="24" fill="#0047FF"/>
    <text x="50%" y="${height - 44}" font-family="'Hanken Grotesk', Arial, sans-serif" font-weight="700" font-size="11" fill="#ffffff" text-anchor="middle" letter-spacing="1">TEMU // ARCHIVE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_INFO = {
  name: "TEMU — COFFEESHOP",
  tagline: "RUANG TEMU, SECANGKIR ARSIP & PERCAKAPAN.",
  editionTag: "EDISI 2025",
  systemVersion: "SYS.VER 2.4",

  // Hero Editorial
  heroSectionTag: "ARSIP PROTOKOL KOPI // SENOPATI",
  catalogId: "CATALOG ID: #TM-2025",
  heroTitle: "RUANG TEMU, SECANGKIR ARSIP & PERCAKAPAN.",
  heroLead: "Temu-Coffeeshop adalah laboratorium rasa dan ruang terbuka yang memadukan presisi ekstraksi Swiss dengan kekayaan biji kopi nusantara.",
  heroImageUrl: "/images/hero-slide-01.jpg",
  heroImageCaption: "FIG. 01 // INTERIOR RUANG SEDUH UTAMA & MEJA KOMUNAL",

  // Status Kedai & Jam Operasional
  isOpen: true,
  statusText: "SEDANG BUKA (OPEN)",
  statusClosedText: "TUTUP SEMENTARA (CLOSED)",
  statusLiveText: "LIVE: OPEN UNTIL 22:00",
  statusNote: "Pengarsipan profil sangrai berkala untuk menjaga kurva degradasi termal dan puncak keasaman alami.",
  openingHours: "07:00 — 22:00 WIB",
  openingDays: "Senin sampai Minggu tanpa libur",
  openingHoursWeekday: "SENIN — JUMAT: 07:00 – 22:00",
  openingHoursWeekend: "SABTU — MINGGU: 08:00 – 23:00",
  lastOrderNote: "LAST ORDER: 30 MENIT SEBELUM TUTUP PROTOKOL",

  // Alamat & Koordinat
  address: "JL. SENOPATI NO. 42",
  addressDetail: "KEBAYORAN BARU, JAKARTA SELATAN 12190",
  locationArea: "KEBAYORAN BARU, JAKARTA SELATAN",
  locationShort: "Jl. Senopati No. 42",
  addressBenchmark: "PATOKAN: 200 meter dari bundaran Senopati, bangunan beton brutalist sudut timur",
  coordinates: `6°14'02.1"S 106°48'33.2"E`,
  elevation: "ELEVASI: 18M DPL / SUB-DISTRIK SENOPATI",
  locationNote: "Temu berlokasi strategis di area Senopati dengan fasilitas parkir kendaraan dan ramah pesepeda.",
  locationSectionTag: "03 / LOKASI & PERSINGGAHAN",
  locationTitle: "SINGGAH DAN MULAI PERCAKAPAN.",
  locationLead: "Kami menyediakan bangku-bangku kayu panjang dan meja beton monokrom untuk pertukaran ide yang cair tanpa distraksi.",
  capacityOccupied: 24,
  capacityTotal: 36,

  // Fasilitas
  bicycleParking: "PARKIR SEPEDA: TERSEDIA (4 RAK)",
  networkSpeed: "KONEKSI JARINGAN: 100 MBPS FIBER",

  // Kontak & Tautan
  googleMapsUrl: "https://maps.google.com/?q=Senopati+Jakarta",
  whatsappUrl: "https://wa.me/6281234567890?text=Halo%20Temu-Coffeeshop,%20saya%20ingin%20bertanya",
  instagram: "@temu.coffeeshop"
};

export const DEFAULT_HERO_SLIDES = [
  {
    id: "slide-01",
    indexLabel: "01",
    indicatorText: "01 / 03",
    caption: "FIG 0.1 // BAR UTAMA & MEJA KALIBRASI ESPRESSO",
    time: "[ 08:00 WIB ]",
    tag: "00 // MANIFESTO KEDAI",
    manifesto: "Kami mereduksi ritual minum kopi ke substansi paling murni: ketepatan ekstraksi, kurasi biji tunggal yang terverifikasi, dan ruangan terstruktur tanpa ornamen berlebih. Tempat di mana ide dan diskursus urban bertaut.",
    metrics: [
      "STATUS SUHU AIR: 93.4°C NOMINAL",
      "TEKANAN EKSTRAKSI: 9.0 BAR KONSTAN",
      "RASIO SEDUH HARIAN: 1:15.5 GEISHA ARCHIVE"
    ],
    imageUrl: "/images/hero-slide-01.jpg",
    alt: "Monochromatic high-contrast editorial photograph showing a minimalist concrete espresso bar with a sleek precision espresso machine and stainless steel brew tools."
  },
  {
    id: "slide-02",
    indexLabel: "02",
    indicatorText: "02 / 03",
    caption: "FIG 0.2 // PROTOKOL KALIBRASI SEDUH MANUAL & UJI TDS",
    time: "[ 09:30 WIB ]",
    tag: "02 // PROTOKOL SEDUH & EKSTRAKSI",
    manifesto: "Eksplorasi variabel seduh mikro: kontrol suhu bertahap, rasio kelarutan terukur (TDS 1.35%), dan kalibrasi gilingan harian untuk mengekstraksi spektrum rasa origin secara utuh tanpa kompromi.",
    metrics: [
      "STATUS SUHU AIR: 92.5°C ADAPTIF",
      "TEKANAN / ALIRAN: 4.8 ML/DETIK (POUR-OVER RATE)",
      "RASIO SEDUH HARIAN: 1:16.0 ETHIOPIA YIRGACHEFFE"
    ],
    imageUrl: "/images/hero-slide-02.jpg",
    alt: "Specialty coffee barista pour-over brewing station with glass drippers, precision scales, kettle, minimalist clean architectural concrete counter."
  },
  {
    id: "slide-03",
    indexLabel: "03",
    indicatorText: "03 / 03",
    caption: "FIG 0.3 // LABORATORIUM SANGRAI & UJI SENSORIK CUPPING",
    time: "[ 14:00 WIB ]",
    tag: "03 // RISET SANGRAI & ARSIP SENSORIK",
    manifesto: "Pengarsipan profil sangrai berkala untuk menjaga kurva degradasi termal dan puncak keasaman alami. Setiap lot biji tunggal menjalani uji cupping standar SCA minimal 3 kali sebelum dirilis ke bar seduh.",
    metrics: [
      "STATUS SUHU DRUM: 204.0°C FIRST CRACK PEAK",
      "WAKTU DEVELOPMENT (DTR): 14.2% ROAST RATIO",
      "SKOR SENSORIK RATA-RATA: 88.75 PTS (SPECIALTY GRADE)"
    ],
    imageUrl: "/images/hero-slide-03.jpg",
    alt: "Monochrome grayscale editorial photography of a modern minimalist coffee roasting laboratory and archive, specialty coffee cupping table."
  }
];

export const DEFAULT_MENU_ITEMS = [
  {
    id: "menu-01",
    code: "TM-01",
    name: "KOPI SUSU TEMU",
    category: "SIGNATURE",
    price: 28000,
    caption: "Espresso Blend 70/30, gula aren organik cair, susu dingin pasteurisasi",
    images: ["/images/admin-tm01.jpg", "/images/admin-form-upload.jpg"],
    image_url: "/images/admin-tm01.jpg",
    is_available: true,
    is_featured: true
  },
  {
    id: "menu-02",
    code: "TM-02",
    name: "FILTER GEISHA",
    category: "MANUAL",
    price: 45000,
    caption: "Panama Boquete Natural, notes: Jasmine, Bergamot, White Peach",
    images: ["/images/admin-tm02.jpg", "/images/hero-slide-03.jpg"],
    image_url: "/images/admin-tm02.jpg",
    is_available: true,
    is_featured: true
  },
  {
    id: "menu-03",
    code: "TM-03",
    name: "SPLIT SHOT ESPRESSO",
    category: "ESPRESSO",
    price: 32000,
    caption: "1x Single Origin Espresso Shot + 1x Piccolo Latte 90ml",
    images: ["/images/admin-tm03.jpg", "/images/hero-slide-01.jpg"],
    image_url: "/images/admin-tm03.jpg",
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-04",
    code: "TM-04",
    name: "COLD DRIP 16H",
    category: "COLD EXTRACTION",
    price: 35000,
    caption: "Ekstraksi dingin tetes perlahan 16 jam, fermentasi botol tertutup",
    images: ["/images/admin-tm04.jpg", "/images/admin-tm06.jpg"],
    image_url: "/images/admin-tm04.jpg",
    is_available: true,
    is_featured: true,
    limited_note: "LIMITED: 12 BTL"
  },
  {
    id: "menu-05",
    code: "TM-05",
    name: "PAIN AU CHOCOLAT",
    category: "PASTRY",
    price: 26000,
    caption: "French butter lamination 48 jam, Valrhona dark chocolate batons 55%",
    images: ["/images/admin-tm05.jpg", "/images/hero-slide-02.jpg"],
    image_url: "/images/admin-tm05.jpg",
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-06",
    code: "TM-06",
    name: "MATCHA KYOTO",
    category: "NON-COFFEE",
    price: 30000,
    caption: "Uji Ceremonial Grade Matcha, steamed fresh milk, cane sugar",
    images: ["/images/admin-tm06.jpg", "/images/admin-tm01.jpg"],
    image_url: "/images/admin-tm06.jpg",
    is_available: false,
    is_featured: false
  },
  {
    id: "menu-07",
    code: "TM-07",
    name: "NITRO COLD BREW CITRUS",
    category: "SIGNATURE",
    price: 32000,
    caption: "Ekstraksi dingin 18 jam dengan infusi nitrogen mikro. Profil sitrus jernih dengan buih krem tebal.",
    images: [createEditorialSvg("Nitro Cold Brew", "18-Hour Brew", "1/1")],
    image_url: createEditorialSvg("Nitro Cold Brew", "18-Hour Brew", "1/1"),
    is_available: true,
    is_featured: true
  },
  {
    id: "menu-08",
    code: "TM-08",
    name: "DOUBLE ESPRESSO GAYO",
    category: "ESPRESSO",
    price: 22000,
    caption: "Ekstraksi rasio 1:2 dari biji kopi arabika Gayo anaerobik. Catatan rasa kakao pekat dan kismis.",
    images: [createEditorialSvg("Double Espresso", "Gayo Anaerobic", "1/1")],
    image_url: createEditorialSvg("Double Espresso", "Gayo Anaerobic", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-09",
    code: "TM-09",
    name: "FLAT WHITE 6OZ",
    category: "ESPRESSO",
    price: 28000,
    caption: "Ristretto ganda dilapisi microfoam susu kukus halus tanpa buih tebal. Rasa kopi intens berkarakter manis.",
    images: [createEditorialSvg("Flat White", "Microfoam 6oz", "1/1")],
    image_url: createEditorialSvg("Flat White", "Microfoam 6oz", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-10",
    code: "TM-10",
    name: "V60 ETHIOPIA YIRGACHEFFE",
    category: "MANUAL",
    price: 38000,
    caption: "Washed process Yirgacheffe G1, rasa teh earl grey, floral melati, dan aprikot segar.",
    images: [createEditorialSvg("Pour Over V60", "Ethiopia Yirgacheffe", "1/1")],
    image_url: createEditorialSvg("Pour Over V60", "Ethiopia Yirgacheffe", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-11",
    code: "TM-11",
    name: "BUTTER CROISSANT KLASIK",
    category: "PASTRY",
    price: 24000,
    caption: "Adonan beragi berlapis mentega Prancis murni. Renyah di luar dan berongga honeycomb sempurna di dalam.",
    images: [createEditorialSvg("Butter Croissant", "French Butter", "1/1")],
    image_url: createEditorialSvg("Butter Croissant", "French Butter", "1/1"),
    is_available: true,
    is_featured: false
  },
  {
    id: "menu-12",
    code: "TM-12",
    name: "CASCARA LEMONADE",
    category: "NON-COFFEE",
    price: 26000,
    caption: "Seduhan kulit ceri kopi kering pilihan berpadu dengan perasan lemon segar dan soda berkarbonasi ringan.",
    images: [createEditorialSvg("Cascara Lemonade", "Coffee Cherry Fizz", "1/1")],
    image_url: createEditorialSvg("Cascara Lemonade", "Coffee Cherry Fizz", "1/1"),
    is_available: true,
    is_featured: false
  }
];

export const DEFAULT_HISTORY_STORIES = [
  {
    id: "hist-01",
    story_date: "2021 // EKSPEDISI PERTAMA",
    figure_label: "FIG. 01 / GAYO",
    title: "PENELUSURAN BIJI TUNGGAL & STANDARISASI SANGRAI",
    caption: "Membangun relasi langsung dengan petani mandiri di dataran tinggi Gayo dan Temanggung tanpa perantara komersial. Kami mencatat lebih dari 400 profil sangrai untuk menemukan titik manis ekstraksi.",
    protocolNote: "CATATAN PROTOKOL: #001-CUPPING",
    sampleNote: "SAMPLE TESTED: 62 PROVINSI",
    images: ["/images/admin-hist01.jpg", "/images/history-01.jpg"],
    image_url: "/images/admin-hist01.jpg",
    display_order: 1,
    is_published: true
  },
  {
    id: "hist-02",
    story_date: "2023 // MERACIK RUANG BERSAMA",
    figure_label: "FIG. 02 / RUANG",
    title: "ARSITEKTUR BRUTALIS SEBAGAI TEMPAT DISKUSI TERBUKA",
    caption: "Membuka gerai pertama dengan konsep ruang komunal monokromatik tanpa dekorasi berlebih untuk fokus pada dialog rasa. Dinding beton ekspos dan bangku baja berpadu mendukung percakapan urban.",
    protocolNote: "ARSITEK: STUDIO FORM-FUNCTION",
    sampleNote: "MATERIAL: BETON 300MPA & BAJA SUS 304",
    images: ["/images/admin-hist02.jpg", "/images/history-02.jpg"],
    image_url: "/images/admin-hist02.jpg",
    display_order: 2,
    is_published: true
  },
  {
    id: "hist-03",
    story_date: "2025 // STATUS SEKARANG",
    figure_label: "FIG. 03 / DIGITAL",
    title: "TRANSPARANSI PROVENANSI 100% TERBUKA",
    caption: "Penerapan kode batch digital pada setiap cangkir untuk melihat nama roaster, tanggal roast, dan data refractometer TDS. Setiap lot biji dapat dilacak sampai ke ketinggian kebun tanam.",
    protocolNote: "KODE VERIFIKASI: #TM-2025-PROV",
    sampleNote: "DOKUMEN BIJI: TERBUKA",
    images: ["/images/hero-slide-02.jpg", "/images/admin-hist01.jpg"],
    image_url: "/images/hero-slide-02.jpg",
    display_order: 3,
    is_published: false
  }
];

export const DEFAULT_BEAN_BATCHES = [
  {
    id: "batch-01",
    lotCode: "LOT-GAYO-2025A",
    origin: "Aceh Gayo, Takengon (1.600m DPL)",
    variety: "Ateng Super, TimTim",
    process: "Full Washed Double Soaking",
    roastDate: "2025-10-24",
    roastProfile: "Medium Light (DTR 14.2%)",
    tdsTarget: "1.38% TDS @ 93.4°C",
    stockKg: 18.5,
    status: "READY TO BREW",
    cuppingScore: 88.5
  },
  {
    id: "batch-02",
    lotCode: "LOT-PANAMA-GEISHA",
    origin: "Boquete, Chiriqui (1.850m DPL)",
    variety: "Green Tip Geisha",
    process: "Anaerobic Slow Natural 72H",
    roastDate: "2025-10-22",
    roastProfile: "Light Cinnamon (DTR 12.8%)",
    tdsTarget: "1.32% TDS @ 92.0°C",
    stockKg: 6.2,
    status: "OPTIMAL RESTING",
    cuppingScore: 92.0
  },
  {
    id: "batch-03",
    lotCode: "LOT-KERINCI-NAT",
    origin: "Kayu Aro, Jambi (1.500m DPL)",
    variety: "Andung Sari, Sigararutang",
    process: "Lactic Natural Fermentation",
    roastDate: "2025-10-25",
    roastProfile: "Medium Filter (DTR 14.8%)",
    tdsTarget: "1.40% TDS @ 93.0°C",
    stockKg: 24.0,
    status: "READY TO BREW",
    cuppingScore: 87.75
  },
  {
    id: "batch-04",
    lotCode: "LOT-FLORES-BAJAWA",
    origin: "Bajawa, Ngada NTT (1.400m DPL)",
    variety: "Kartika, S-795",
    process: "Wet Hulled Traditional Giling Basah",
    roastDate: "2025-10-20",
    roastProfile: "Medium Dark Espresso (DTR 16.5%)",
    tdsTarget: "9.5% TDS Espresso 1:2",
    stockKg: 32.0,
    status: "READY TO BREW",
    cuppingScore: 86.5
  },
  {
    id: "batch-05",
    lotCode: "LOT-TEMANGGUNG-ROB",
    origin: "Candiroto, Temanggung (850m DPL)",
    variety: "Robusta Clone BP 42",
    process: "Honey Carbonic Maceration",
    roastDate: "2025-10-18",
    roastProfile: "Omni Roast House Blend",
    tdsTarget: "Crema Booster Component",
    stockKg: 12.0,
    status: "LOW STOCK",
    cuppingScore: 84.0
  }
];

export const DEFAULT_RAW_CATEGORIES = [
  "SIGNATURE",
  "ESPRESSO",
  "MANUAL",
  "COLD EXTRACTION",
  "NON-COFFEE",
  "PASTRY"
];

export const CATEGORIES = [
  "ALL",
  ...DEFAULT_RAW_CATEGORIES
];
