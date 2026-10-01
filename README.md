# 💻 My-Work Dashboard

Sebuah *dashboard* personal bernuansa *Hacker/Terminal* yang dibuat menggunakan **Next.js**, **Tailwind CSS**, dan **Supabase**. Aplikasi ini berfungsi sebagai pusat kontrol ruang kerja pribadi dengan fitur manajemen *link*, catatan cepat (*scratchpad*), dan monitor sistem bergaya CLI.

## ✨ Fitur Utama

- **Terminal-Style Login**: Tampilan autentikasi bergaya *Command Line Prompt*.
- **Link Management**: Simpan, edit, hapus, dan atur (*drag & drop*) tautan-tautan penting Anda dengan mudah.
- **Auto-Sync Scratchpad**: Catatan instan bergaya teks biasa maupun *checklist* yang otomatis tersimpan (*auto-save*) ke *database*.
- **Hacker Command Center**: Animasi indikator sistem waktu-nyata (*real-time ping*) dan *system monitor* *dashboard*.
- **Custom Sorting**: Ubah urutan *link* Anda dengan menggesernya secara langsung (disimpan di *Local Storage*).

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Icons**: FontAwesome

## 🛠️ Panduan Instalasi & Menjalankan

1. **Clone repository ini** (jika ada).
2. **Install dependensi**:
   ```bash
   npm install
   ```
3. **Konfigurasi Environment**:
   Buat file `.env.local` di root proyek Anda dan masukkan kunci Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

## 🗄️ Database Schema (Supabase)

Aplikasi ini menggunakan 2 tabel utama:
1. `links` - Untuk menyimpan data tautan (*id, user_id, title, url, category, color, icon, favorite, created_at*).
2. `scratchpad` - Untuk menyimpan catatan sementara (*id, user_id, content, updated_at*).

---
*Dibuat untuk kebutuhan produktivitas personal tingkat tinggi.* ⚡
