document.addEventListener('DOMContentLoaded', function () {
  // === Countdown Timer ===
  const targetDate = new Date("2025-07-20T00:00:00").getTime();
  const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
      clearInterval(countdownFunction);
      document.querySelector("#countdown .countdown-timer").innerHTML = "Waktu telah tiba!";
    }
  }, 1000);


  // === Galeri Slider ===
  let currentSlide = 0;
  const slides = document.querySelectorAll(".gallery-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  window.nextSlide = function () {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  window.prevSlide = function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  showSlide(currentSlide);


  // === Musik Otomatis ===
  const audio = document.getElementById('bg-music');
  const playMusic = () => {
    audio.play().then(() => {
      console.log('Musik diputar otomatis');
    }).catch(e => {
      console.log('Autoplay gagal:', e);
    });
  };
  document.body.addEventListener('click', playMusic, { once: true });


  // === Rsvp ===



window.addEventListener("load", function() {
  const form = document.getElementById('rsvp-form');
  const guestMessagesContainer = document.getElementById('guest-messages');
  const sheetURL = 'https://opensheet.vercel.app/1wqgoT2hOzxHSfQ3gFiEwJ4XjBQ8zHC7TxW8kMTts-qc/Sheet1';

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // ⛔️ Penting untuk cegah redirect!
    
    const data = new FormData(form);
    const action = form.action;

    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Ucapan berhasil dikirim!");
      form.reset();
      setTimeout(loadGuestMessages, 1000);
    })
    .catch(() => {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    });

    return false; // 🔒 Tambahan jaga-jaga agar form tidak kirim default
  });

  function loadGuestMessages() {
  fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
      guestMessagesContainer.innerHTML = '';
      rotatingData = data.reverse(); // simpan dan balik data
      rotatingIndex = 0;
      rotateUcapan();

      rotatingData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'message-box';
        div.innerHTML = `
          <p><strong>${item.name}</strong> (${item.attendance})</p>
          <p>${item.message}</p>
          <hr>
        `;
      });
    })
    .catch(err => {
      console.error("Gagal memuat ucapan", err);
    });
}

  loadGuestMessages();
});


const sheetURL = 'https://opensheet.vercel.app/1wqgoT2hOzxHSfQ3gFiEwJ4XjBQ8zHC7TxW8kMTts-qc/Sheet1';
let rotatingData = [];
let rotatingIndex = 0;


// === Tampilkan ucapan bergantian ===
function rotateUcapan() {
  const ucapanDisplay = document.getElementById('ucapan-display');
  const ucapanContainer = document.getElementById('ucapan-container');

  if (rotatingData.length === 0) {
    ucapanContainer.classList.add('hidden');
    return;
  }

  ucapanContainer.classList.remove('hidden');

  const current = rotatingData[rotatingIndex];
  ucapanDisplay.innerHTML = `<strong>${current.name}</strong> (${current.attendance}):<br>${current.message}`;

  rotatingIndex = (rotatingIndex + 1) % rotatingData.length;

  setTimeout(rotateUcapan, 4000); // ganti tiap 4 detik
}


  // === Smooth Scroll untuk Anchor Link ===
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  

  // === Tombol "Lihat Undangan" & Scroll Control ===
  const lihatUndanganBtn = document.querySelector(".button-gold");
  const body = document.body;

  function enableScroll() {
    body.style.overflow = "auto";
    sessionStorage.setItem("undanganDibuka", "true");
  }

  function disableScroll() {
    body.style.overflow = "hidden";
  }

  const undanganDibuka = sessionStorage.getItem("undanganDibuka");
  if (!undanganDibuka && window.location.hash === "") {
    disableScroll();
  } else {
    enableScroll();
  }

  if (lihatUndanganBtn) {
    lihatUndanganBtn.addEventListener("click", function (e) {
      e.preventDefault();
      enableScroll();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});


// animasi
const observers = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // opsional kalau mau reset
    }
  });
}, {
  threshold: 0.2
});

observers.forEach(el => observer.observe(el));
