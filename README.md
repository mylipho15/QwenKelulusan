# 🎓 Portal Kelulusan - SMKS Kesehatan SDM Sumedang

Portal web untuk mengecek status kelulusan siswa dengan desain **Cyberpunk-Anime Style**.

## ✨ Fitur Utama

- **Desain Cyberpunk-Anime**: Tampilan modern dengan efek neon, animasi glitch, dan partikel confetti
- **Mobile & PC Friendly**: Responsive design yang bekerja sempurna di semua perangkat
- **DB-Less System**: Tidak memerlukan database server, data dapat dimuat dari file JSON/CSV
- **Real-time Search**: Pencarian data siswa berdasarkan NIPD
- **Animasi Interaktif**: Loading animation, confetti effect, dan berbagai transisi smooth

## 📁 Struktur File

```
/workspace
├── index.html      # Halaman utama HTML
├── style.css       # Styling CSS (Cyberpunk theme)
├── app.js          # JavaScript application logic
├── data.json       # Data siswa format JSON
├── data.csv        # Data siswa format CSV
└── README.md       # Dokumentasi
```

## 🚀 Cara Menggunakan

### 1. Menjalankan Portal

Buka file `index.html` di browser web modern (Chrome, Firefox, Edge, Safari).

```bash
# Menggunakan Python HTTP Server
python -m http.server 8000

# Atau menggunakan Node.js
npx serve .

# Kemudian buka browser di http://localhost:8000
```

### 2. Testing dengan Data Sample

Gunakan salah satu NIPD berikut untuk testing:

| NIPD | Nama | Jurusan |
|------|------|---------|
| 1234567890 | Ahmad Fauzi | Keperawatan |
| 2345678901 | Siti Nurhaliza | Farmasi |
| 3456789012 | Budi Santoso | Teknologi Laboratorium Medik |
| 4567890123 | Dewi Lestari | Keperawatan |
| 5678901234 | Eko Prasetyo | Farmasi |

### 3. Mengganti Data Siswa

#### Opsi A: Menggunakan file `data.json`

Edit file `data.json` dengan format:

```json
[
    {
        "nipd": "1234567890",
        "nama": "Nama Siswa",
        "jurusan": "Jurusan",
        "tahunAjaran": "2023/2024",
        "status": "LULUS"
    }
]
```

#### Opsi B: Menggunakan file `data.csv`

Edit file `data.csv` dengan format:

```csv
nipd,nama,jurusan,tahunAjaran,status
1234567890,Nama Siswa,Jurusan,2023/2024,LULUS
```

Sistem akan otomatis mendeteksi dan memuat data dari file eksternal.

## 🎨 Kustomisasi

### Mengubah Warna Theme

Edit variabel CSS di `style.css`:

```css
:root {
    --cyber-primary: #00f5ff;      /* Warna utama (cyan) */
    --cyber-secondary: #ff00e6;    /* Warna sekunder (pink) */
    --cyber-accent: #7b2cbf;       /* Warna accent (purple) */
    --cyber-success: #00ff88;      /* Warna sukses (green) */
    --cyber-danger: #ff3366;       /* Warna error (red) */
}
```

### Mengubah Logo Sekolah

Ganti icon di `index.html` pada bagian `.school-logo`:

```html
<div class="school-logo">
    <i class="fas fa-graduation-cap logo-icon"></i>
    <!-- Ganti dengan img tag jika ingin menggunakan gambar -->
    <!-- <img src="logo.png" alt="Logo Sekolah"> -->
</div>
```

## 🔧 Konfigurasi Lanjutan

### Menambah Validasi Tambahan

Edit fungsi `validateInput()` di `app.js`:

```javascript
function validateInput(e) {
    const value = e.target.value;
    
    // Hanya angka
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (value !== numericValue) {
        e.target.value = numericValue;
    }
    
    // Batasi panjang
    if (numericValue.length > 15) {
        e.target.value = numericValue.slice(0, 15);
    }
}
```

### Export Data

Gunakan fungsi export yang tersedia di console browser:

```javascript
// Export ke JSON
exportToJSON(studentData, 'backup_data.json');

// Export ke CSV
exportToCSV(studentData, 'backup_data.csv');
```

## 📱 Responsive Breakpoints

- **Desktop**: > 991px
- **Tablet**: 768px - 991px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🌐 Browser Support

- Chrome/Edge (terbaru)
- Firefox (terbaru)
- Safari (terbaru)
- Opera (terbaru)

## 📞 Contact Info

Portal ini dibuat untuk **SMKS Kesehatan SDM Sumedang**:

- **Website**: https://www.smkkesehatansdm.sch.id
- **Instagram**: https://www.instagram.com/smkksdm
- **TikTok**: https://www.tiktok.com/@smkksdm
- **WA Admin**: +62 821-2662-1991
- **WA Humas**: +62 852-2405-8508

## 📄 License

Copyright © 2024 SMKS Kesehatan SDM Sumedang. All Rights Reserved.

---

**Made with ❤️ by IT Team**
