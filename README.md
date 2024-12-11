# Restful API Portal-Berita

Deskripsi Proyek  
Proyek ini adalah sebuah RESTful API yang dibangun menggunakan Node.js dan Prisma ORM untuk mengelola data aplikasi. Sistem ini mendukung autentikasi berbasis session dan memiliki fitur manajemen pengguna, artikel, serta komentar. Proyek ini dirancang untuk mendemonstrasikan pengelolaan CRUD (Create, Read, Update, Delete) dengan role-based access control (Admin, Writer, Reader).

Fitur Utama  
- Autentikasi: Login dan Register berbasis session.  
- Manajemen Artikel: CRUD artikel oleh pengguna dengan peran Writer.  
- Manajemen category  


Prasyarat  
Pastikan Anda telah menginstal perangkat berikut:  
- Node.js
- NPM
- Database(MySQL)


#Instalasi  
1. Clone Repository
   bash
   git clone https://github.com/username/project-name.git
   cd project-name
   

2. Install Dependencies
   Jalankan perintah berikut untuk menginstal semua dependency yang diperlukan:  
   bash
   npm install
   

3. Konfigurasi Database
   - Ubah file `.env.example` menjadi `.env`.  
   - Sesuaikan konfigurasi koneksi database di dalam file `.env`:  
     env
     DATABASE_URL="mysql://username:password@localhost:3306/nama_database"
     SESSION_SECRET="secret_key_anda"
     

4. Migrasi Database
   Jalankan migrasi untuk membuat tabel pada database:  
   bash
   npx prisma migrate dev --name init
   

5. Jalankan Server
   Start server dalam mode pengembangan:  
   bash
   npm run dev
   


Cara Menjalankan Proyek  

1. Akses API
   Gunakan aplikasi seperti Postman menguji endpoint API.  

2. Login sebagai Admin 
   - Username dan password admin telah diatur langsung dalam database.  
    "username": "superAnonim",
    "password": "@meisKING.env1"
   - Silakan gunakan kredensial yang telah ditentukan.  

3. Mendaftar Sebagai Pengguna Baru  
   - Pengguna baru akan otomatis mendapatkan role Reader.  
   - Admin dapat mengubah role pengguna melalui dashboard admin.  



Dokumentasi Endpoint  
Dokumentasi lengkap tersedia melalui Swagger atau file Postman Collection yang disediakan di folder `/docs`.



Teknologi yang Digunakan  
- Node.js(Backend)  
- Express.js(Framework)  
- Prisma ORM(Manajemen Database)  
- Session Authentication**  
- MySQL(Database)



Kontributor  
Willy Syah Putra - willystudent0@gmail.com  
