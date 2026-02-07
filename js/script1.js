document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;

  const images = [
    "img/1.jpg",
    "img/1.jpg",
    "img/1.jpg",
    "img/1.jpg",
    "img/1.jpg",
    "img/1.jpg",
    "img/1.jpg",
    "img/1.jpg",
  ];

  function openModal(index) {
    currentIndex = index;
    document.getElementById("imageModal").style.display = "flex";
    updateModal();
  }

  function closeModal() {
    document.getElementById("imageModal").style.display = "none";
  }

  function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    updateModal();
  }

  function updateModal() {
    document.getElementById("modalImage").src = images[currentIndex];
  }

  const buttons = document.querySelectorAll(".gallery-button");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const index = parseInt(this.dataset.index);
      openModal(index);
    });
  });

  // Biar tombol X dan panah tetap jalan
  window.closeModal = closeModal;
  window.changeImage = changeImage;
});
