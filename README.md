# Auth API & Chatbot Integration

Project ini adalah RESTful API yang menyediakan fitur autentikasi pengguna (Register, Login, Profile) serta integrasi chatbot menggunakan **Groq AI**. Data pengguna dan riwayat obrolan disimpan dalam database **PostgreSQL**.

## 🚀 Fitur Utama

- **Autentikasi JWT**: Registrasi dan login aman menggunakan JSON Web Tokens.
- **AI Chatbot**: Integrasi dengan Groq AI (Llama 3.1) untuk obrolan interaktif.
- **Riwayat Chat**: Menyimpan semua pesan user dan AI ke database.
- **Middleware Proteksi**: Route tertentu hanya bisa diakses oleh pengguna yang sudah login.
- **Database PostgreSQL**: Menggunakan Pool connection untuk performa yang lebih baik.

## 🛠️ Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (pg)
- **AI Engine**: Groq Cloud API
- **Keamanan**: Bcrypt (Hashing Password), JWT (Tokenization)
- **Environment**: Dotenv

## 📋 Prasyarat

Sebelum menjalankan project ini, pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (Versi 20 atau terbaru direkomendasikan)
- Database PostgreSQL (Lokal atau Cloud seperti Supabase/Neon)

## ⚙️ Cara Instalasi

1. Clone repository ini:
   ```bash
   git clone <url-repository>
   cd auth-api
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Konfigurasi Environment Variables:
   Buat file `.env` di root folder dan isi dengan format berikut:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   JWT_SECRET=rahasia_banget
   GROQ_API_KEY=gsk_xxx...
   ```

4. Menyiapkan Database:
   Pastikan tabel `users`, `chats`, dan `messages` sudah dibuat di database Anda.

## 🚦 Cara Menjalankan

- **Mode Development** (dengan Auto-reload):
  ```bash
  npm run dev
  ```
- **Mode Production**:
  ```bash
  npm start
  ```

## 📍 API Endpoints

### Autentikasi
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Mendaftarkan pengguna baru |
| POST | `/api/auth/login` | Login dan mendapatkan Token |
| GET | `/api/auth/profile` | Melihat profil (Perlu Token) |

### Chatbot
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| POST | `/api/chat` | Membuat sesi chat baru |
| POST | `/api/chat/message` | Mengirim pesan ke AI & simpan ke DB |
| GET | `/api/chat/:id` | Melihat riwayat pesan di sesi tertentu |

### Users
| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| GET | `/api/users` | Melihat daftar semua user (Perlu Token) |

---
Dibuat dengan ❤️ untuk pembelajaran API dan AI.
