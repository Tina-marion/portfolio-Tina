const docEl = document.documentElement;
const page = docEl.dataset.page || "intro";
const themeToggle = document.getElementById("themeToggle");
const clockEl = document.getElementById("clock");
const headerSearch = document.getElementById("headerSearch");
const searchResults = document.getElementById("searchResults");

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
