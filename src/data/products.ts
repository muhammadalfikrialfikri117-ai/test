export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewsCount: number;
  category: string;
  image: string;
  gallery: string[];
  location: string;
  storeName: string;
  stock: number;
  sold: number;
  isFlashSale?: boolean;
  flashSaleStock?: { total: number; remaining: number };
  description: string;
  specs: { [key: string]: string };
  variants?: {
    name: string;
    options: string[];
  }[];
  badge?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Semua Kategori', iconName: 'LayoutGrid', count: 24, color: 'bg-emerald-500' },
  { id: 'elektronik', name: 'Elektronik & Gadget', iconName: 'Smartphone', count: 8, color: 'bg-blue-500' },
  { id: 'fashion', name: 'Fashion & Pakaian', iconName: 'Shirt', count: 6, color: 'bg-indigo-500' },
  { id: 'sepatu', name: 'Sepatu & Tas', iconName: 'ShoppingBag', count: 5, color: 'bg-purple-500' },
  { id: 'kecantikan', name: 'Kecantikan & Sehat', iconName: 'Sparkles', count: 4, color: 'bg-rose-500' },
  { id: 'rumah', name: 'Rumah & Dapur', iconName: 'Home', count: 5, color: 'bg-amber-500' },
];

export const VOUCHERS = [
  { code: 'NUSANTARA70', discount: 70000, minSpend: 200000, description: 'Diskon Spesial Rp 70.000 min. belanja Rp 200.000' },
  { code: 'GRATISONGKIR', discount: 25000, minSpend: 50000, description: 'Potongan Ongkir Rp 25.000' },
  { code: 'HEMAT50', discount: 50000, minSpend: 150000, description: 'Potongan Langsung Rp 50.000' },
];

export const BANNER_SLIDES = [
  {
    id: 1,
    title: 'Diskon Kilat Ramadhan',
    subtitle: 'Kejutan Spesial Menjelang Hari Raya',
    heading: 'Diskon Up to 70% + Ekstra Voucher Rp 70Rb',
    description: 'Beli gadget impian & baju lebaran terbaru dengan harga terjangkau. Gratis ongkir ke seluruh pelosok Indonesia tanpa syarat!',
    buttonText: 'Klaim Promo Sekarang',
    badge: 'SPESIAL RAMADHAN',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',
    bgColor: 'from-amber-600 via-orange-600 to-red-700',
  },
  {
    id: 2,
    title: 'Gadget Mania 2026',
    subtitle: 'Teknologi Canggih di Genggaman',
    heading: 'iPhone & Smartwatch Garansi Resmi iBox',
    description: 'Dapatkan cashback hingga Rp 1.500.000 dan cicilan 0% hingga 12 bulan dengan kartu kredit atau PayLater pilihanmu.',
    buttonText: 'Lihat Katalog Gadget',
    badge: 'NEW ARRIVALS',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    bgColor: 'from-blue-600 via-indigo-700 to-slate-900',
  },
  {
    id: 3,
    title: 'Gaya Kekinian Pria & Wanita',
    subtitle: 'Tampil Percaya Diri Setiap Hari',
    heading: 'Koleksi Fashion Premium & Streetwear',
    description: 'Bahan katun premium yang nyaman seharian. Dirancang oleh desainer lokal ternama dengan jahitan berstandar internasional.',
    buttonText: 'Belanja Pakaian',
    badge: 'TRENDING 2026',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
    bgColor: 'from-purple-700 via-pink-600 to-rose-700',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nusantara Ultra Smartwatch Series 9 - AMOLED Display 45mm',
    price: 1899000,
    originalPrice: 3499000,
    discount: 45,
    rating: 4.9,
    reviewsCount: 1248,
    category: 'elektronik',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Jakarta Pusat',
    storeName: 'Nusantara Tech Official',
    stock: 12,
    sold: 340,
    isFlashSale: true,
    flashSaleStock: { total: 50, remaining: 12 },
    badge: 'Terlaris #1',
    featured: true,
    description: 'Nusantara Ultra Smartwatch Series 9 menghadirkan layar AMOLED 1.9 inch super tajam dengan kecerahan hingga 2000 nits. Dilengkapi dengan sensor detak jantung 24/7, pengukur oksigen darah SpO2, pemantau tidur akurat, serta GPS mandiri untuk mencatat rute lari Anda. Baterai tahan hingga 7 hari penggunaan normal.',
    specs: {
      'Layar': '1.9" Always-on AMOLED',
      'Ketahanan Air': 'IP68 / 50 ATM',
      'Konektivitas': 'Bluetooth 5.3 & NFC',
      'Garansi': 'Garansi Resmi 1 Tahun',
      'Baterai': '450 mAh (Up to 7 days)'
    },
    variants: [
      { name: 'Warna', options: ['Midnight Black', 'Starlight Silver', 'Rose Gold'] },
      { name: 'Ukuran Strap', options: ['S/M (140-190mm)', 'M/L (160-220mm)'] }
    ]
  },
  {
    id: 'p2',
    name: 'AirMax SoundPods Pro Wireless ANC TWS Earbuds - Bass Boost',
    price: 749000,
    originalPrice: 1499000,
    discount: 50,
    rating: 4.8,
    reviewsCount: 890,
    category: 'elektronik',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Jakarta Barat',
    storeName: 'GadgetZone ID',
    stock: 25,
    sold: 1250,
    isFlashSale: true,
    flashSaleStock: { total: 100, remaining: 25 },
    badge: 'Diskon 50%',
    featured: true,
    description: 'Nikmati keheningan sejati dengan teknologi Active Noise Cancelling (ANC) hingga 42dB pada AirMax SoundPods Pro. Driver dinamis 11mm menghasilkan suara bass yang menggelegar tanpa mengorbankan vokal jernih. Mendukung pengisian daya nirkabel Qi dan fast charging (10 menit cas untuk 3 jam musik).',
    specs: {
      'Audio': '11mm Hi-Fi Bass Dynamic Driver',
      'Fitur Utama': 'Active Noise Cancelling (ANC) + Transparency Mode',
      'Mic': '6-Mic ENC untuk Telepon Jernih',
      'Ketahanan Baterai': 'Total 32 Jam (dengan Case)',
      'Garansi': 'Garansi Tukar Baru 6 Bulan'
    },
    variants: [
      { name: 'Warna', options: ['Matte White', 'Obsidian Black'] }
    ]
  },
  {
    id: 'p3',
    name: 'Kemeja Pria Flannel Premium Katun 100% Lengan Panjang - Heritage',
    price: 199000,
    originalPrice: 399000,
    discount: 50,
    rating: 4.9,
    reviewsCount: 2310,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Bandung',
    storeName: 'Bandung Clothier',
    stock: 85,
    sold: 4520,
    isFlashSale: false,
    badge: 'Produk Lokal Pilihan',
    featured: true,
    description: 'Kemeja Flannel edisi Heritage dari Bandung Clothier terbuat dari benang katun impor kualitas premium yang telah dicuci agar menghasilkan tekstur sangat lembut dan tidak menyusut. Pola reguler fit cocok untuk gaya kasual sehari-hari maupun semi-formal untuk bekerja di kantor.',
    specs: {
      'Bahan': '100% Premium Cotton Flannel (Tebal & Lembut)',
      'Potongan': 'Regular Fit',
      'Kerah': 'Button-Down Collar',
      'Saku': 'Saku Tunggal di Dada Kiri',
      'Perawatan': 'Bisa dicuci dengan mesin'
    },
    variants: [
      { name: 'Ukuran', options: ['M', 'L', 'XL', 'XXL'] },
      { name: 'Motif', options: ['Navy Tartan', 'Red Buffalo', 'Green Forest', 'Black Monokrom'] }
    ]
  },
  {
    id: 'p4',
    name: 'ErgoComfort Kursi Kerja Ergonomis Mesh Jaring - Dukungan Tulang Belakang',
    price: 1350000,
    originalPrice: 2250000,
    discount: 40,
    rating: 4.8,
    reviewsCount: 412,
    category: 'rumah',
    image: 'https://images.unsplash.com/photo-1580481077494-e3299ac43ee9?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1580481077494-e3299ac43ee9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Surabaya',
    storeName: 'Living Home Indonesia',
    stock: 18,
    sold: 520,
    isFlashSale: true,
    flashSaleStock: { total: 30, remaining: 18 },
    badge: 'Gratis Ongkir Pulau Jawa',
    featured: true,
    description: 'Bekerja atau bermain game selama berjam-jam kini tidak lagi membuat punggung Anda pegal! ErgoComfort dirancang khusus dengan lumbar support 3D yang dapat disesuaikan naik-turun dan maju-mundur. Bahan mesh jaring sirkulasi tinggi menjamin punggung tetap sejuk di cuaca panas.',
    specs: {
      'Material': 'Breathable Mesh & High-Density Foam',
      'Kapasitas Beban': 'Maksimal 150 kg',
      'Mekanisme': 'Tilt Lock & Gaslift Class 4 Bersertifikasi',
      'Sandaran Tangan': '3D Adjustable Armrest',
      'Garansi': 'Garansi Rangka 2 Tahun'
    },
    variants: [
      { name: 'Warna', options: ['All Black', 'Space Grey', 'Arctic White'] }
    ]
  },
  {
    id: 'p5',
    name: 'Sneakers Pria Wanita Aerostep CloudFoam Original Lari & Kasual',
    price: 349000,
    originalPrice: 699000,
    discount: 50,
    rating: 4.9,
    reviewsCount: 1540,
    category: 'sepatu',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Tangerang Selatan',
    storeName: 'StepAhead Store',
    stock: 45,
    sold: 3100,
    isFlashSale: false,
    badge: 'Diskon 50%',
    featured: true,
    description: 'Sepatu Aerostep CloudFoam memberikan pijakan seringan awan berkat sol luar phylon empuk dan insole memory foam. Dibalut rajutan upper berteknologi FlyKnit yang lentur mengikuti bentuk kaki, membuat sirkulasi udara lancar bebas bau kaki.',
    specs: {
      'Upper': 'Engineered FlyKnit Mesh',
      'Insole': 'Ortholite Memory Foam Anti Bakteri',
      'Outsole': 'Rubber Phylon Anti-Slip',
      'Berat Sepatu': 'Hanya 240 gram per sisi',
      'Cocok Untuk': 'Jogging, Gym, Kuliah, Kerja Kasual'
    },
    variants: [
      { name: 'Ukuran', options: ['38', '39', '40', '41', '42', '43', '44'] },
      { name: 'Warna', options: ['Fiery Red', 'Carbon Black', 'Pure Navy', 'Triple White'] }
    ]
  },
  {
    id: 'p6',
    name: 'GlowSkin Hydrating Niacinamide Serum 5% + Centella Asiatica 30ml',
    price: 119000,
    originalPrice: 185000,
    discount: 35,
    rating: 4.9,
    reviewsCount: 3820,
    category: 'kecantikan',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Jakarta Selatan',
    storeName: 'GlowSkin Official',
    stock: 120,
    sold: 14500,
    isFlashSale: false,
    badge: 'BPOM Approved',
    featured: true,
    description: 'Serum ajaib yang diformulasikan khusus untuk mencerahkan kulit kusam, menyamarkan noda bekas jerawat, serta menenangkan kulit kemerahan. Kombinasi 5% Niacinamide grade farmasi dan ekstrak tulen Centella Asiatica dari Madagaskar.',
    specs: {
      'Isi Bersih': '30 ml / 1.01 fl.oz',
      'Sertifikasi': 'Halal MUI & Resmi BPOM NA18230104829',
      'Bebas Dari': 'Paraben, Alkohol, dan Pewangi Buatan',
      'Jenis Kulit': 'Semua jenis kulit termasuk sensitif',
      'Cara Pakai': 'Gunakan 3-4 tetes pada wajah bersih pagi dan malam'
    },
    variants: [
      { name: 'Ukuran Botol', options: ['30ml (Reguler)', '50ml (Hemat +Rp 45.000)'] }
    ]
  },
  {
    id: 'p7',
    name: 'Nordic Style Tas Ransel Kuliah Kerja Anti Air Laptop 15.6 Inch USB Port',
    price: 249000,
    originalPrice: 499000,
    discount: 50,
    rating: 4.7,
    reviewsCount: 680,
    category: 'sepatu',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Bandung',
    storeName: 'Nordic Gear ID',
    stock: 50,
    sold: 920,
    badge: 'Waterproof',
    description: 'Tas ransel berdesain minimalis khas Skandinavia ini dilengkapi slot khusus berlapis busa tebal untuk laptop hingga 15.6 inch. Terdapat eksternal USB Charging Port untuk mengisi daya ponsel tanpa perlu membuka tas. Material Oxford water-repellent menjaga barang berharga Anda aman dari hujan.',
    specs: {
      'Bahan': 'High-Density Oxford Fabric (Waterproof)',
      'Dimensi': '44 cm x 30 cm x 15 cm (Volume 25L)',
      'Kompartemen': '1 Ruang Utama, 1 Slot Laptop, 3 Kantong Depan, 2 Kantong Botol',
      'Fitur': 'USB Charging Port & Luggage Strap untuk Koper'
    },
    variants: [
      { name: 'Warna', options: ['Minimalist Grey', 'Deep Black', 'Navy Blue'] }
    ]
  },
  {
    id: 'p8',
    name: 'SmartChef Air Fryer Low Watt 4 Liter Digital Touchscreen 8 Menu Preset',
    price: 689000,
    originalPrice: 1299000,
    discount: 47,
    rating: 4.9,
    reviewsCount: 1102,
    category: 'rumah',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Surabaya',
    storeName: 'SmartChef Official',
    stock: 22,
    sold: 1430,
    badge: 'Hemat Listrik',
    description: 'Memasak makanan renyah dan lezat tanpa minyak berlebih kini sangat mudah dengan SmartChef Air Fryer! Hanya membutuhkan daya 650 Watt, tidak membuat meteran listrik anjlok. Dilengkapi layar sentuh digital dengan 8 menu instan untuk ayam, kentang, kue, ikan, dan udang.',
    specs: {
      'Kapasitas': '4.0 Liter (Cukup untuk 1 ekor ayam utuh kecil)',
      'Konsumsi Daya': '650 Watt (Low Watt Tech)',
      'Suhu & Waktu': '80°C - 200°C / Timer hingga 60 Menit',
      'Keranjang Panci': 'Lapisan Teflon Food Grade Anti-Lengket',
      'Garansi': 'Garansi Resmi 1 Tahun'
    },
    variants: [
      { name: 'Warna', options: ['Emerald Green', 'Pearl White', 'Matte Black'] }
    ]
  },
  {
    id: 'p9',
    name: 'ProSound Studio Microphone Condenser USB Plug & Play Podcast / Streaming',
    price: 499000,
    originalPrice: 850000,
    discount: 41,
    rating: 4.8,
    reviewsCount: 520,
    category: 'elektronik',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Jakarta Utara',
    storeName: 'AudioPro Store',
    stock: 30,
    sold: 840,
    badge: 'Rekomendasi Creator',
    description: 'Dapatkan kualitas rekaman suara standar studio rekaman dengan ProSound Mic USB. Pola penangkapan suara kardioid fokus menangkap suara dari arah depan dan meredam kebisingan latar belakang. Sangat cocok untuk rapat Zoom, rekaman vokal lagu, podcast, dan live streaming YouTube atau TikTok.',
    specs: {
      'Pola Polar': 'Cardioid (Searah)',
      'Konektor': 'USB Type-C to USB-A (Panjang kabel 2 meter)',
      'Frekuensi': '20Hz - 20kHz Hi-Res Recording',
      'Kelengkapan': 'Mic, Table Stand Besi, Pop Filter Busa, Kabel USB',
      'Kompatibilitas': 'Windows, macOS, PS4/PS5, Android OTG'
    },
    variants: [
      { name: 'Paket Bundling', options: ['Standar (Table Stand)', 'Studio Pack (+Boom Arm & Metal Shock Mount)'] }
    ]
  },
  {
    id: 'p10',
    name: 'Set Piyama Sutra Satin Premium Wanita Baju Tidur Lembut Elegan',
    price: 165000,
    originalPrice: 299000,
    discount: 45,
    rating: 4.9,
    reviewsCount: 1890,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Surakarta',
    storeName: 'Batik & Silk Solo',
    stock: 60,
    sold: 3400,
    badge: 'Koleksi Premium',
    description: 'Tidur lebih lelap dan berkualitas dengan balutan piyama sutra satin yang super adem di kulit. Permukaan kain halus dengan kilau mewah yang menawan. Jahitan rapi standar butik dengan kancing hidup dan pinggang karet elastis yang tidak bikin sesak.',
    specs: {
      'Bahan': 'Premium Silk Satin 100%',
      'Satu Set': 'Atasan Lengan Pendek + Celana Panjang',
      'Kancing': 'Full Kancing Depan (Busui Friendly)',
      'Perawatan': 'Cuci dengan tangan atau putaran lembut mesin'
    },
    variants: [
      { name: 'Ukuran', options: ['All Size Fit to L', 'XL (Jumbo)'] },
      { name: 'Warna', options: ['Champagne Gold', 'Dusty Pink', 'Emerald Velvet', 'Midnight Blue'] }
    ]
  },
  {
    id: 'p11',
    name: 'Gourmet Artisan Coffee Beans - 100% Arabica Aceh Gayo Specialty 500g',
    price: 135000,
    originalPrice: 195000,
    discount: 30,
    rating: 5.0,
    reviewsCount: 940,
    category: 'makanan',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Medan',
    storeName: 'Sumatra Coffee Roasters',
    stock: 150,
    sold: 6200,
    badge: 'Kopi Nusantara',
    description: 'Biji kopi pilihan grade Specialty dari dataran tinggi Takengon, Aceh Gayo. Disangrai dengan profil Medium-Dark Roast oleh Master Roaster bersertifikat Q-Grader. Menghasilkan notes rasa cokelat hitam pekat, aroma rempah herbal yang khas, dan keasaman rendah yang ramah di lambung.',
    specs: {
      'Asal Kopi': 'Takengon, Aceh Gayo (Ketinggian 1400m mdpl)',
      'Varietas & Proses': '100% Arabica - Semi Washed (Giling Basah)',
      'Tasting Notes': 'Dark Chocolate, Caramel Sweetness, Hint of Spice',
      'Berat Bersih': '500 Gram kemasan foil dengan One-Way Valve'
    },
    variants: [
      { name: 'Gilingan', options: ['Biji Kopi Utuh (Whole Bean)', 'Giling Halus (Espresso/Moka Pot)', 'Giling Sedang (V60/Filter)', 'Giling Kasar (French Press/Tubruk)'] }
    ]
  },
  {
    id: 'p12',
    name: 'LuxeGlow Lampu Meja Estetik Minimalis LED Dimmable - Warm White',
    price: 299000,
    originalPrice: 550000,
    discount: 45,
    rating: 4.8,
    reviewsCount: 310,
    category: 'rumah',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800'
    ],
    location: 'Jakarta Barat',
    storeName: 'LuxeGlow Decor',
    stock: 35,
    sold: 720,
    badge: 'Estetik Interior',
    description: 'Hadirkan nuansa hangat dan elegan di sudut kamar tidur atau ruang kerja Anda. Lampu LuxeGlow menggunakan LED berkualitas tinggi tanpa kedipan (flicker-free) yang nyaman di mata untuk membaca. Dilengkapi kontrol sentuh untuk mengatur 3 tingkat kecerahan.',
    specs: {
      'Material Rangka': 'Besi Stainless & Kaca Opal Putih',
      'Daya Listrik': '7 Watt LED Hemat Energi',
      'Temperatur Cahaya': '3000K Warm White (Cahaya Kuning Hangat)',
      'Dimensi': 'Tinggi 32 cm, Diameter Kap 18 cm'
    },
    variants: [
      { name: 'Warna Body', options: ['Brushed Gold', 'Matte Black', 'Scandinavian White'] }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    user: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '2 hari yang lalu',
    comment: 'Barang sampai dengan sangat cepat, packing super aman pakai bubble wrap tebal berlapis. Smartwatchnya keren banget, responsif layarnya dan baterainya awet banget. Sangat puas belanja di sini!',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400']
  },
  {
    id: 'r2',
    user: 'Siti Rahmawati',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '1 minggu yang lalu',
    comment: 'Kualitas produk sangat melebihi ekspektasi dengan harga yang sangat terjangkau diskon 50%. Jahitan rapi, bahan halus adem, dan penjual sangat ramah membantu memilih ukuran yang pas.',
  },
  {
    id: 'r3',
    user: 'Hendra Wijaya',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
    rating: 4,
    date: '2 minggu yang lalu',
    comment: 'Pengiriman kurir agak lambat karena promo 12.12 kemaren overload, tapi kualitas barang top cer. Garansi resmi terdaftar dan berfungsi 100% lancar. Recommended seller!',
  },
  {
    id: 'r4',
    user: 'Rina Kartika',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '3 minggu yang lalu',
    comment: 'Suka banget sama packagingnya yang rapi dan elegan! Begitu dicoba langsung pas di badan. Bakal jadi toko langganan buat beli kebutuhan fashion dan hadiah orang tua.',
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Apakah barang di Nusantara Store dijamin 100% original?',
    answer: 'Ya! Semua produk yang dijual di Nusantara Store telah diverifikasi dan didatangkan langsung dari distributor resmi atau produsen utama dengan garansi keaslian 100% uang kembali.'
  },
  {
    question: 'Bagaimana cara mendapatkan Gratis Ongkir?',
    answer: 'Setiap pembeli otomatis mendapatkan subsidi ongkir hingga Rp 50.000 untuk pengiriman ke seluruh Indonesia dengan minimal belanja Rp 50.000. Anda juga bisa memasukkan kode voucher GRATISONGKIR saat checkout.'
  },
  {
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami mendukung berbagai opsi pembayaran aman termasuk Bank Transfer (BCA, Mandiri, BRI, BNI), QRIS, E-Wallet (GoPay, OVO, Dana, ShopeePay), Kartu Kredit cicilan 0%, dan Bayar di Tempat (COD).'
  },
  {
    question: 'Bagaimana proses pengembalian barang jika ada cacat?',
    answer: 'Kami memberikan jaminan retur 7 hari sejak pesanan diterima. Cukup sertakan video unboxing tanpa jeda saat mengajukan komplain di menu Lacak Pesanan, dan kurir kami akan mengambil barang retur ke rumah Anda secara gratis.'
  }
];
