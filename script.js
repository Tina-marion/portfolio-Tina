const docEl = document.documentElement;
const page = docEl.dataset.page || "intro";
const themeToggle = document.getElementById("themeToggle");
const clockEl = document.getElementById("clock");
const headerSearch = document.getElementById("headerSearch");
const searchResults = document.getElementById("searchResults");
const musicToggle = document.querySelector(".icon-actions .icon-btn");

const routes = [
  { id: "intro", label: "Introduction", file: "index.html" },
  { id: "about", label: "About Me", file: "about.html" },
  { id: "projects", label: "Projects", file: "projects.html" },
  { id: "skills", label: "Skills & Tools", file: "skills-tools.html" },
  { id: "experience", label: "Experience", file: "experience.html" },
  { id: "education", label: "Education", file: "education.html" },
  { id: "awards", label: "Awards", file: "awards.html" },
  { id: "contact", label: "Contact", file: "contact.html" }
];

function goTo(file) {
  window.location.href = file;
}

function updateClock() {
  if (!clockEl) {
    return;
  }
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString("en-GB", { hour12: false });
}

function setTheme(theme) {
  docEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initMusicControl() {
  if (!musicToggle) {
    return;
  }

  let audioContext;
  let loopTimer;
  let step = 0;
  let isPlaying = false;
  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];

  function playNote(freq) {
    if (!audioContext) {
      return;
    }

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.29);
  }

  function updateMusicButton() {
    musicToggle.textContent = isPlaying ? "❚❚" : "♫";
    musicToggle.classList.toggle("is-active", isPlaying);
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
  }

  function stopMusic() {
    if (loopTimer) {
      clearInterval(loopTimer);
      loopTimer = null;
    }
    isPlaying = false;
    updateMusicButton();
  }

  async function startMusic() {
    if (!audioContext) {
      audioContext = new window.AudioContext();
    }
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    isPlaying = true;
    step = 0;
    updateMusicButton();
    playNote(notes[step]);
    step += 1;

    loopTimer = setInterval(() => {
      playNote(notes[step % notes.length]);
      step += 1;
    }, 320);
  }

  musicToggle.addEventListener("click", async () => {
    if (isPlaying) {
      stopMusic();
      return;
    }

    try {
      await startMusic();
    } catch {
      stopMusic();
      alert("Unable to start audio. Please check your browser audio permissions.");
    }
  });

  updateMusicButton();
}

function toggleTheme() {
  const next = docEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(next);
}

function markActiveLinks() {
  const navLinks = document.querySelectorAll(".section-nav a, .header-links a[data-page]");
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
}

function hideSearchResults() {
  if (!searchResults) {
    return;
  }
  searchResults.innerHTML = "";
  searchResults.hidden = true;
}

function renderSearchResults(items) {
  if (!searchResults) {
    return;
  }

  searchResults.innerHTML = "";
  if (items.length === 0) {
    searchResults.hidden = true;
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.label;
    li.addEventListener("mousedown", (event) => {
      event.preventDefault();
      goTo(item.file);
    });
    searchResults.appendChild(li);
  });
  searchResults.hidden = false;
}

function filterRoutes(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    hideSearchResults();
    return;
  }
  const matches = routes.filter((r) => r.label.toLowerCase().includes(q));
  renderSearchResults(matches);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
}

markActiveLinks();
updateClock();
setInterval(updateClock, 1000);

themeToggle?.addEventListener("click", toggleTheme);
initMusicControl();

(function spawnFloatingFlowers() {
  const petals = [
    /* pink */     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g fill="none"><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffb7c5" opacity=".85" transform="rotate(0 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffb7c5" opacity=".85" transform="rotate(60 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffb7c5" opacity=".85" transform="rotate(120 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffc8d4" opacity=".85" transform="rotate(180 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffc8d4" opacity=".85" transform="rotate(240 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffc8d4" opacity=".85" transform="rotate(300 20 20)"/><circle cx="20" cy="20" r="5" fill="#ffe48a"/></g></svg>',
    /* blue */     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g fill="none"><ellipse cx="20" cy="10" rx="6" ry="10" fill="#aad3ff" opacity=".85" transform="rotate(0 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#aad3ff" opacity=".85" transform="rotate(60 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#aad3ff" opacity=".85" transform="rotate(120 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#c5e2ff" opacity=".85" transform="rotate(180 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#c5e2ff" opacity=".85" transform="rotate(240 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#c5e2ff" opacity=".85" transform="rotate(300 20 20)"/><circle cx="20" cy="20" r="5" fill="#fff5a0"/></g></svg>',
    /* lavender */ '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g fill="none"><ellipse cx="20" cy="10" rx="6" ry="10" fill="#d4b4fe" opacity=".85" transform="rotate(0 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#d4b4fe" opacity=".85" transform="rotate(60 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#d4b4fe" opacity=".85" transform="rotate(120 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#e8d0ff" opacity=".85" transform="rotate(180 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#e8d0ff" opacity=".85" transform="rotate(240 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#e8d0ff" opacity=".85" transform="rotate(300 20 20)"/><circle cx="20" cy="20" r="5" fill="#ffe48a"/></g></svg>',
    /* white */    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g fill="none"><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffffff" opacity=".7" transform="rotate(0 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffffff" opacity=".7" transform="rotate(60 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#ffffff" opacity=".7" transform="rotate(120 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#f0f0ff" opacity=".7" transform="rotate(180 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#f0f0ff" opacity=".7" transform="rotate(240 20 20)"/><ellipse cx="20" cy="10" rx="6" ry="10" fill="#f0f0ff" opacity=".7" transform="rotate(300 20 20)"/><circle cx="20" cy="20" r="5" fill="#ffe48a"/></g></svg>'
  ];

  const COUNT = 26;

  const directions = [
    { anim: "flowerFloatUp",    posAxis: "left",   posRange: 100, unit: "vw", crossAxis: "bottom", crossVal: "-60px" },
    { anim: "flowerFloatDown",  posAxis: "left",   posRange: 100, unit: "vw", crossAxis: "top",    crossVal: "-60px" },
    { anim: "flowerFloatRight", posAxis: "top",    posRange: 100, unit: "vh", crossAxis: "left",   crossVal: "-60px" },
    { anim: "flowerFloatLeft",  posAxis: "top",    posRange: 100, unit: "vh", crossAxis: "right",  crossVal: "-60px" }
  ];

  function createFlower() {
    const el = document.createElement("div");
    el.className = "floating-flower";
    const size = 28 + Math.random() * 36;
    el.style.width  = size + "px";
    el.style.height = size + "px";
    const dir = directions[Math.floor(Math.random() * directions.length)];
    el.style[dir.posAxis]   = (Math.random() * dir.posRange) + dir.unit;
    el.style[dir.crossAxis] = dir.crossVal;
    el.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    const duration = 8 + Math.random() * 10;
    const delay    = Math.random() * 4;
    el.style.animationName     = dir.anim;
    el.style.animationDuration = duration + "s";
    el.style.animationDelay    = delay + "s";
    el.style.animationTimingFunction = "linear";
    el.style.animationIterationCount = "infinite";
    document.body.appendChild(el);

    el.addEventListener("animationiteration", () => {
      el.style[dir.posAxis] = (Math.random() * dir.posRange) + dir.unit;
    });
  }

  for (let i = 0; i < COUNT; i++) {
    createFlower();
  }
}());

headerSearch?.addEventListener("input", (e) => {
  filterRoutes(e.target.value);
});

headerSearch?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const match = routes.find((r) => r.label.toLowerCase().includes(headerSearch.value.trim().toLowerCase()));
    if (match) {
      goTo(match.file);
    }
  }
  if (e.key === "Escape") {
    hideSearchResults();
    headerSearch.blur();
  }
});

document.addEventListener("keydown", (e) => {
  const openSearch = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
  if (openSearch) {
    e.preventDefault();
    headerSearch?.focus();
    headerSearch?.select();
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-wrap")) {
    hideSearchResults();
  }
});

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) {
    return;
  }

  const statusEl = document.getElementById("contactStatus");
  const recipient = form.dataset.recipient || "tinaamarion@gmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message || !emailValid) {
      if (statusEl) {
        statusEl.textContent = "Please enter a valid name, email, and message.";
      }
      return;
    }

    const subject = `Portfolio contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (statusEl) {
      statusEl.textContent = "Opening your email app to send the message...";
    }
    window.location.href = mailtoUrl;
  });
}

initContactForm();
