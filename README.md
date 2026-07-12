# KanbanKu — Aplikasi Manajemen Tugas

Aplikasi Kanban board berbasis React + Vite dengan autentikasi lokal, drag & drop, dan penyimpanan di `localStorage`. Semua data (akun, board, tugas) tersimpan di browser, tidak ada server/backend.

## Fitur

**Wajib (sesuai permintaan)**
- Drag & drop antar kolom maupun di dalam kolom yang sama (mendukung mouse dan sentuhan/touch)
- Kolom Todo / Doing / Done (bisa ditambah, diganti nama, dihapus, dan diurutkan ulang)
- Prioritas tugas: Rendah, Sedang, Tinggi, Mendesak (dengan warna)
- Tag berwarna, bisa dibuat bebas per tugas
- Tenggat waktu dengan penanda otomatis "terlambat" dan "segera jatuh tempo"
- Penyimpanan otomatis ke `localStorage`
- Login & Register dengan password ter-hash (SHA-256 + salt, tidak pernah disimpan sebagai teks biasa)
- Dibangun dengan React, tampilan responsif di mobile/tablet/desktop
- Wallpaper animasi (gradient "flow" bergerak lembut, bukan warna polos)

**Tambahan (bonus)**
- Checklist/subtugas di setiap kartu dengan progress bar
- Pencarian & filter (judul/deskripsi, prioritas, tag, tugas terlambat)
- Mode gelap/terang, tersimpan sesuai preferensi
- Notifikasi toast untuk setiap aksi penting
- Dialog konfirmasi sebelum menghapus tugas/kolom
- Ekspor board ke file JSON & impor kembali (berguna karena data hanya tersimpan lokal per-browser)
- Setiap akun punya board sendiri-sendiri (terisolasi berdasarkan user)
- Kolom dinamis: tambah, ganti nama, hapus, geser urutan

## Struktur Proyek

```
kanban-app/
├── index.html
├── vite.config.js
├── vercel.json          # rewrite SPA untuk hosting di Vercel
├── public/_redirects    # rewrite SPA untuk hosting di Netlify
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── context/         # Auth, Theme, Toast, Confirm, Board (state global)
    ├── utils/            # localStorage, hashing, validasi, konstanta
    ├── components/       # Navbar, Board, Column, TaskCard, TaskModal, dll
    ├── pages/            # Login, Register, BoardPage
    └── styles/           # index.css, board.css, modal.css
```

## Menjalankan di Lokal

Butuh [Node.js](https://nodejs.org) versi 18 ke atas.

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser. Klik **Daftar di sini** untuk membuat akun pertama (belum ada akun bawaan, karena semua data memang tersimpan lokal di browser kamu).

## Build untuk Produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`. Coba dulu secara lokal dengan:

```bash
npm run preview
```

## Hosting

Karena ini Single Page Application (SPA), server hosting perlu diatur supaya semua rute (misalnya `/board`) diarahkan ke `index.html`:

- **Vercel**: tinggal import repo, `vercel.json` di proyek ini sudah berisi rule rewrite yang dibutuhkan.
- **Netlify**: file `public/_redirects` sudah disiapkan dan otomatis ikut ter-build ke `dist/`.
- **Hosting statis lain** (GitHub Pages, Cloudflare Pages, dsb): pastikan ada aturan "fallback ke index.html" untuk semua path.

## Catatan Penting

- Semua data disimpan di `localStorage` milik browser. Artinya data **tidak sinkron** antar perangkat/browser berbeda. Gunakan fitur Ekspor (ikon unduh di navbar) untuk membuat cadangan, dan Impor untuk memulihkannya di browser lain.
- Karena tidak ada backend, autentikasi ini cocok untuk penggunaan personal/lokal/demo — bukan pengganti sistem auth production sungguhan dengan server terpisah.
- Jika membersihkan data browser ("Clear site data") atau membuka mode incognito, semua akun dan board akan hilang.
