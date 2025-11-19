// ** Bagian 1: Navigasi dan Hamburger Menu (diambil dari kebutuhan dasar website) **
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

// Cek apakah elemen hamburger ada sebelum menambahkan event listener
if (hamburger) {
  hamburger.addEventListener("click", (e) => {
    // Toggle class 'active' untuk menampilkan/menyembunyikan menu
    navbarNav.classList.toggle("active");
    e.preventDefault();
  });

  // Menghilangkan menu saat klik di luar area navbar (Opsional, tapi penting untuk UX)
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove("active");
    }
  });
}

// ** Bagian 2: Fungsi Modal Gambar Koleksi (Image Modal) **
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const captionText = document.getElementById("captionText");
const closeButton = document.querySelector(".close-button");
const body = document.body; // Mendefinisikan body untuk mengunci scroll

if (imageModal && modalImage && captionText && closeButton) {
  const galleryImages = document.querySelectorAll(".option-card-image");

  galleryImages.forEach((image) => {
    image.style.cursor = "pointer"; // Menambahkan visual feedback
    image.addEventListener("click", function () {
      // Tampilkan modal
      imageModal.style.display = "flex";
      // Set sumber gambar dan alt text (caption)
      modalImage.src = this.src;
      captionText.innerHTML = this.alt;

      // Tambahkan class untuk animasi fade-in
      requestAnimationFrame(() => {
        modalImage.classList.add("show-modal-image");
      });
      // Mengunci scroll saat modal terbuka
      body.classList.add("no-scroll");
    });
  });

  // Fungsi untuk menutup modal
  const closeModal = () => {
    modalImage.classList.remove("show-modal-image");
    // Gunakan event listener untuk transitionend agar performa lebih baik
    modalImage.addEventListener(
      "transitionend",
      function handleTransitionEnd() {
        imageModal.style.display = "none";
        // Kembalikan scroll body
        body.classList.remove("no-scroll");
        // Hapus event listener setelah digunakan untuk menghindari duplikasi
        modalImage.removeEventListener("transitionend", handleTransitionEnd);
      },
      { once: true }
    );
  };

  // Tutup saat klik tombol X
  closeButton.addEventListener("click", closeModal);

  // Tutup saat klik di luar gambar modal
  imageModal.addEventListener("click", function (e) {
    // Hanya tutup jika yang diklik adalah area backdrop
    if (e.target === imageModal) {
      closeModal();
    }
  });

  // Tutup saat menekan tombol ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && imageModal.style.display === "flex") {
      closeModal();
    }
  });
}

// ** Bagian 3: Validasi Form Kontak (Simulasi Sederhana) **
const contactForm = document.querySelector("#contact form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah submit default

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("⚠️ Mohon isi semua kolom di formulir kontak.");
      return;
    }

    // Contoh validasi email sederhana
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("📧 Format email tidak valid.");
      return;
    }

    // Jika semua validasi lolos
    alert(
      "Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda."
    );
    contactForm.reset(); // Kosongkan formulir setelah sukses
  });
}

// ** Bagian 4: Inisialisasi Feather Icons **
feather.replace();
