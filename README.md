# toniismail12.github.io

Situs profil pribadi **Toni Ismail** — Software Engineer, Backend & Identity and
Access Management. Ditulis dengan HTML, CSS, dan JavaScript murni: tanpa framework,
tanpa dependensi, tanpa proses build. Tayang di <https://toniismail12.github.io>.

## Struktur

```
index.html              seluruh isi halaman
assets/css/style.css    satu-satunya stylesheet
assets/js/main.js       tema, menu mobile, nav aktif, animasi reveal
assets/img/             foto profil dan galeri kegiatan
assets/cv/              CV versi Indonesia dan Inggris (PDF)
```

## Menjalankan di komputer sendiri

Cukup buka `index.html` di browser. Kalau ingin lewat server lokal:

```sh
python3 -m http.server 8000
```

lalu buka <http://localhost:8000>.

## Memperbarui isi

Isi situs mengikuti CV. Saat CV berubah, perbarui juga:

| Bagian          | Lokasi di `index.html`          |
| --------------- | ------------------------------- |
| Ringkasan & angka | `section#beranda` — `.hero-lead` dan `.stats` |
| Proyek          | `section#proyek` — satu `<article class="card">` per proyek |
| Pengalaman      | `section#pengalaman` — satu `<li class="timeline-item">` per posisi |
| Sertifikasi     | `section#pengalaman` — `<ol class="certs">` |
| Keahlian        | `section#keahlian` — satu `.skill-group` per kategori |
| Kontak          | `section#kontak` |

Jangan lupa mengganti berkas PDF di `assets/cv/` bila CV diperbarui.

## Desain

- Palet putih dengan aksen hijau dan biru, didefinisikan sebagai custom property
  di `:root` pada `style.css`. Mengganti `--green` dan `--blue` akan mengubah
  seluruh situs sekaligus.
- Mode gelap tersedia lewat tombol di header dan tersimpan di `localStorage`.
  Bawaannya selalu terang.
- Tipografi: *Instrument Serif* untuk judul, *Inter* untuk isi (Google Fonts).

## Menerbitkan

Setiap dorongan ke branch `main` otomatis tayang lewat GitHub Pages,
biasanya kurang dari satu menit.
