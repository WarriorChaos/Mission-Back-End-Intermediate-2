### Konfigurasi Environment (.env)

Project ini menggunakan file `.env` untuk menyimpan konfigurasi koneksi database MySQL.

Sebelum menjalankan project, buat file `.env` di folder utama project dan isi dengan konfigurasi berikut:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=isi_password_mysql_kamu
DB_NAME=vidiobelajar
DB_PORT=3306
PORT=3000
```

**Catatan:**
- Ganti `isi_password_mysql_kamu` dengan password MySQL milikmu.
- File `.env` tidak disertakan di GitHub untuk menjaga keamanan informasi database.
- Gunakan file `.env.example` sebagai contoh konfigurasi environment.
