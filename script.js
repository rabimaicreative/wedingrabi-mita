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


const rsvpForm = document.getElementById("rsvp-form");
const endpoint = "https://script.google.com/macros/s/AKfycbzK9HAaiOGrIR1nTs_Rbp0Nsnb10owGwk21kSkp3a4dpLH9mlH1XIEyCV1p8KRCOzNw/exec"; // url terbaru

rsvpForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("nama").value.trim();
  const message = document.getElementById("pesan").value.trim();
  const attendance = document.getElementById("kehadiran").value;

   if (name && message && attendance) {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, message, attendance })
      })
        .then(response => response.json())
        .then(data => {
          if (data.result === "success") {
            alert("Terima kasih! Ucapan Anda sudah terkirim.");
            rsvpForm.reset();
          } else {
            alert("Gagal: " + data.message);
            console.error(data);
          }
        })
        .catch(err => {
          alert("Gagal mengirim. Coba lagi nanti.");
          console.error(err);
        });
    }
  });




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
