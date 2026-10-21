/**
 * ===================================================================
 *  CHERIVELLE'S ROMANTIC TEMPLATE INTERACTION SCRIPT
 *  Features:
 *  - Floating Rose Petals & Stardust Canvas Engine
 *  - Web Audio Dreamy Ambient Music Box (No external audio file needed!)
 *  - Interactive Love Jar with 30+ Cherished Affirmations
 *  - Heart Burst & Virtual Hug Counter with LocalStorage
 *  - Flip Cards Mobile/Desktop Handler
 *  - Wax-Sealed Handwritten Letter Modal
 *  - Candlelight / Moonlight Night Mode
 *  - Dynamic Relationship / Cherished Time Counter
 * ===================================================================
 */

// Customizable Configuration
const CHERIVELLE_CONFIG = {
  lovedOneName: "Cherivelle",
  // Format: YYYY-MM-DD (Defaults to 1 year ago from today if you haven't set an anniversary)
  relationshipStartDate: "2024-01-01",
  loveNotes: [
    "Cherivelle, you are remarkably strong. Whatever mountain stands before you today, you have the grit to conquer it.",
    "Having you as my partner is the greatest gift of my lifetime. You make everyday ordinary moments magical.",
    "Your laugh is my favorite soundtrack in the whole universe.",
    "Never doubt the profound impact of your kindness. You leave every room brighter than you found it.",
    "You don’t have to carry the weight of the world alone. I am always in your corner, right by your side.",
    "Cherivelle, your resilience under pressure is nothing short of awe-inspiring.",
    "I love the way your mind works, your curiosity, and the passion you bring into everything you care about.",
    "Being with you feels like coming home after a long journey.",
    "You are worthy of all the peace, joy, and breathtaking blessings this world has to offer.",
    "Thank you for being my teammate, my confidante, and my sweetest adventure.",
    "On days you feel tired, remember to be gentle with yourself. You are already doing so wonderfully.",
    "Your heart is pure gold, Cherivelle. Don't ever let the noise of the world dull your sparkle.",
    "Through every storm and every sunshine, I choose you every single day.",
    "You make loving you feel as natural and essential as breathing.",
    "Cherivelle, you are strong, you are cherished, and you are loved beyond words."
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initAmbientCanvas();
  initMusicBox();
  initLoveCounter();
  initLoveJar();
  initLetterModal();
  initVirtualHug();
  initFlipCards();
  initThemeToggle();
});

/* ===================================================================
   1. AMBIENT PARTICLES CANVAS (Rose Petals, Stars & Mouse Sparkles)
   =================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const stars = [];
  const sparkles = [];

  const petalColors = ["#ffc2d1", "#ffb3c6", "#ff8fab", "#fb6f92", "#f7cad0"];

  class Petal {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -100;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.angle = Math.random() * 360;
      this.spinSpeed = (Math.random() - 0.5) * 1.5;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.opacity = Math.random() * 0.6 + 0.3;
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 1.2 + this.speedX;
      this.angle += this.spinSpeed;
      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Organic petal shape
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size, -this.size * 0.6, this.size * 1.4, 0);
      ctx.quadraticCurveTo(this.size, this.size * 0.6, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.5;
      this.alpha = Math.random() * 0.8;
      this.twinkleSpeed = Math.random() * 0.02 + 0.008;
    }
    update() {
      this.alpha += this.twinkleSpeed;
      if (this.alpha > 0.85 || this.alpha < 0.15) {
        this.twinkleSpeed = -this.twinkleSpeed;
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#ffb3c6";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate
  const petalCount = window.innerWidth < 768 ? 20 : 35;
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  for (let i = 0; i < 40; i++) {
    stars.push(new Star());
  }

  // Interactive mouse sparkles
  window.addEventListener("pointermove", (e) => {
    if (Math.random() < 0.3) {
      sparkles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 7 + 4,
        alpha: 1,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        velY: (Math.random() - 0.5) * 1.5,
        velX: (Math.random() - 0.5) * 1.5
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((s) => {
      s.update();
      s.draw();
    });

    petals.forEach((p) => {
      p.update();
      p.draw();
    });

    for (let i = sparkles.length - 1; i >= 0; i--) {
      const sp = sparkles[i];
      sp.alpha -= 0.025;
      sp.x += sp.velX;
      sp.y += sp.velY;
      if (sp.alpha <= 0) {
        sparkles.splice(i, 1);
      } else {
        ctx.save();
        ctx.globalAlpha = sp.alpha;
        ctx.fillStyle = sp.color;
        ctx.font = `${sp.size}px serif`;
        ctx.fillText("✨", sp.x, sp.y);
        ctx.restore();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================================
   2. DREAMY AMBIENT MUSIC BOX (Web Audio API Synthesizer)
   =================================================================== */
function initMusicBox() {
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicLabel = document.getElementById("music-label");
  const soundWave = document.getElementById("sound-wave");
  if (!musicBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;

  // Romantic Pentatonic/Warm chord notes in Hz (C major / A minor dreamy progression)
  const melodyNotes = [
    261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 783.99,
    440.0, 523.25, 659.25, 783.99, 880.0,
    349.23, 440.0, 523.25, 659.25,
    392.0, 493.88, 587.33, 783.99
  ];

  function playTone(freq, duration = 2.4) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Soft envelope (gentle attack, soft decay like a music box or harp)
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  let step = 0;
  function startMelodyLoop() {
    function loop() {
      if (!isPlaying) return;
      const note = melodyNotes[step % melodyNotes.length];
      playTone(note, 2.5);

      // Play soft harmonic accent occasionally
      if (step % 2 === 0) {
        playTone(note * 0.5, 3.0); // Soft bass root
      }

      step++;
      const nextTime = Math.random() * 400 + 750; // Dreamy loose arpeggio rhythm
      timerId = setTimeout(loop, nextTime);
    }
    loop();
  }

  musicBtn.addEventListener("click", () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isPlaying = !isPlaying;
    if (isPlaying) {
      musicLabel.textContent = "Pause Harmony";
      soundWave.classList.add("active");
      startMelodyLoop();
    } else {
      musicLabel.textContent = "Play Harmony";
      soundWave.classList.remove("active");
      if (timerId) clearTimeout(timerId);
    }
  });
}

/* ===================================================================
   3. DAYS & TIME LOVED COUNTER
   =================================================================== */
function initLoveCounter() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl) return;

  const startDate = new Date(CHERIVELLE_CONFIG.relationshipStartDate).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = Math.max(0, now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours < 10 ? "0" + hours : hours;
    minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ===================================================================
   4. CHERIVELLE'S JAR OF LOVE NOTES
   =================================================================== */
function initLoveJar() {
  const pickBtn = document.getElementById("pick-note-btn");
  const noteText = document.getElementById("random-note-text");
  const foldedNote = document.getElementById("folded-note");

  if (!pickBtn || !noteText) return;

  let lastIndex = -1;

  pickBtn.addEventListener("click", () => {
    const notes = CHERIVELLE_CONFIG.loveNotes;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * notes.length);
    } while (newIndex === lastIndex && notes.length > 1);

    lastIndex = newIndex;

    foldedNote.classList.remove("pop-anim");
    void foldedNote.offsetWidth; // Trigger reflow
    noteText.textContent = `"${notes[newIndex]}"`;
    foldedNote.classList.add("pop-anim");

    // Spawn tiny heart sparkles around note
    const rect = foldedNote.getBoundingClientRect();
    createMiniBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
  });
}

/* ===================================================================
   5. LOVE LETTER MODAL
   =================================================================== */
function initLetterModal() {
  const openBtn = document.getElementById("open-letter-btn");
  const closeBtn = document.getElementById("close-modal-btn");
  const modal = document.getElementById("letter-modal");
  const dateEl = document.getElementById("letter-current-date");

  if (!modal) return;

  if (dateEl) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    dateEl.textContent = new Date().toLocaleDateString(undefined, options);
  }

  const openModal = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ===================================================================
   6. VIRTUAL HUG & LOVE EXPLOSION BUTTON
   =================================================================== */
function initVirtualHug() {
  const hugBtn = document.getElementById("send-hug-btn");
  const hugCountEl = document.getElementById("hug-count");
  if (!hugBtn || !hugCountEl) return;

  let count = parseInt(localStorage.getItem("cherivelle_hug_count") || "0", 10);
  hugCountEl.textContent = count;

  hugBtn.addEventListener("click", (e) => {
    count++;
    hugCountEl.textContent = count;
    localStorage.setItem("cherivelle_hug_count", count.toString());

    // Generate flying floating hearts
    const rect = hugBtn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    createMiniBurst(originX, originY, 16);
  });
}

function createMiniBurst(x, y, count = 12) {
  const emojis = ["💖", "💕", "🌸", "✨", "🌷", "🌹", "💌"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart-burst";
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const tx = (Math.random() - 0.5) * 280;
    const ty = -(Math.random() * 200 + 100);
    const tr = (Math.random() - 0.5) * 60;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty("--tx", `${tx}px`);
    heart.style.setProperty("--ty", `${ty}px`);
    heart.style.setProperty("--tr", `${tr}deg`);

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1600);
  }
}

/* ===================================================================
   7. FLIP CARDS MOBILE & CLICK TOGGLE
   =================================================================== */
function initFlipCards() {
  const flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  });
}

/* ===================================================================
   8. CANDLELIGHT / NIGHT THEME TOGGLE
   =================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem("cherivelle_theme");
  if (currentTheme === "candlelight") {
    document.body.classList.add("candlelight-theme");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("candlelight-theme");
    const isDark = document.body.classList.contains("candlelight-theme");
    if (isDark) {
      themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      localStorage.setItem("cherivelle_theme", "candlelight");
    } else {
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      localStorage.setItem("cherivelle_theme", "romantic");
    }
  });
}
