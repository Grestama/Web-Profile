// Carousel Selector
const track = document.querySelector(".carousel-track");
const btnPrev = document.querySelector(".carousel-btn.prev");
const btnNext = document.querySelector(".carousel-btn.next");
const items = document.querySelectorAll(".gallery-item");

let index = 0;

// Hitung width item + gap
function getItemWidth() {
  const style = window.getComputedStyle(track);
  const gap = parseInt(style.gap) || 0;
  return items[0].offsetWidth + gap;
}

// Hitung berapa item yang terlihat
function getVisibleCount() {
  const containerWidth = track.parentElement.offsetWidth;
  const itemWidth = getItemWidth();
  return Math.floor(containerWidth / itemWidth);
}

// Hitung batas maksimum index
function getMaxIndex() {
  const visible = getVisibleCount();
  return Math.max(0, items.length - visible);
}

// Update posisi carousel
function updateCarousel() {
  const moveX = index * getItemWidth();
  track.style.transform = `translateX(-${moveX}px)`;
}

// Next (Looping)
btnNext.addEventListener("click", () => {
  const maxIndex = getMaxIndex();
  if (index < maxIndex) {
    index++;
  } else {
    index = 0; // balik ke awal
  }
  updateCarousel();
});

// Prev (Looping)
btnPrev.addEventListener("click", () => {
  const maxIndex = getMaxIndex();
  if (index > 0) {
    index--;
  } else {
    index = maxIndex; // loncat ke item terakhir yang bisa tampil
  }
  updateCarousel();
});

// Recalculate saat resize
window.addEventListener("resize", () => {
  const maxIndex = getMaxIndex();
  if (index > maxIndex) index = maxIndex;
  updateCarousel();
});

// ========================================================================

// Animation
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".animate");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target); // stop animasi ulang
        }
      });
    },
    { threshold: 0.5 },
  );

  items.forEach((el, i) => {
    el.style.setProperty("--i", i);
    io.observe(el);
  });
});
/* View Transition API */
const firstVisit = !localStorage.getItem("visited");

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (!document.startViewTransition) return;

    if (!firstVisit) return;

    e.preventDefault();
    document.startViewTransition(() => {
      window.location.href = link.href;
      localStorage.setItem("visited", "true");
    });
  });
});

// Tandai sudah kunjungan pertama saat selesai load
if (firstVisit) {
  localStorage.setItem("visited", "true");
}

// ==========================================================================
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

// ** Bagian 2: Inisialisasi Feather Icons **
feather.replace();

// ** Bagian 3: Dropdown Menu Koleksi **
const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const toggleBtn = dropdown.querySelector("a");

toggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dropdownContent.classList.toggle("show-dropdown");
});

// Tutup dropdown saat klik di luar area dropdown
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdownContent.classList.remove("show-dropdown");
  }
});

// ==========================================================================
