/* ============================================================
   Sky Consultancy — Site Script
   Language engine, navbar, mobile nav, services, FAQ, modal,
   contact form and WhatsApp deep-linking.
   ============================================================ */

const WHATSAPP_NUMBER = "60125583398";

function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------------- Preloader ---------------- */
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  if (!pre) return;
  setTimeout(() => pre.classList.add("hide"), 500);
  setTimeout(() => pre.remove(), 1100);
});

/* ---------------- Footer year ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ---------------- Navbar scroll state ---------------- */
const navbar = document.getElementById("navbar");
function updateNavbarState() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateNavbarState, { passive: true });
updateNavbarState();

/* ---------------- Mobile Nav ---------------- */
const navBar = document.getElementById("navBar");
const navOverlay = document.getElementById("navOverlay");
const menuToggle = document.getElementById("menuToggle");
const navBarClose = document.getElementById("navBarClose");

function openMenu() {
  navBar.classList.add("active");
  navOverlay.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("nav-locked");
}
function closeMenu() {
  navBar.classList.remove("active");
  navOverlay.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-locked");
}
menuToggle?.addEventListener("click", () => {
  const isOpen = navBar.classList.contains("active");
  isOpen ? closeMenu() : openMenu();
});
navBarClose?.addEventListener("click", closeMenu);
navOverlay?.addEventListener("click", closeMenu);
navBar?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

/* ---------------- Back to top ---------------- */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (!backToTop) return;
  backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
}, { passive: true });
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------------- Services data (structured, reusable) ---------------- */
const SERVICES = [
  { key: "service1", icon: "fa-file-signature", primary: true },
  { key: "service2", icon: "fa-id-card", primary: false },
  { key: "service3", icon: "fa-shield-halved", primary: false },
  { key: "service4", icon: "fa-people-group", primary: false, secondary: true },
  { key: "service5", icon: "fa-briefcase", primary: false, secondary: true },
];

function t(lang, key) {
  return translations[lang]?.[key] || "";
}

function collectList(lang, prefix) {
  const items = [];
  let i = 1;
  while (true) {
    const val = t(lang, `${prefix}${i}`);
    if (!val) break;
    items.push(val);
    i++;
  }
  return items;
}

function collectBullets(lang, key) {
  return collectList(lang, `${key}Bullet`);
}

function renderServices(lang) {
  const grid = document.getElementById("serviceGrid");
  if (!grid) return;
  grid.innerHTML = "";

  SERVICES.forEach((svc, index) => {
    const bullets = collectBullets(lang, svc.key);
    const card = document.createElement("div");
    card.className = `service-card${svc.primary ? " service-card-primary" : ""}${svc.secondary ? " service-card-secondary" : ""}`;
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", String((index % 3) * 100));
    card.innerHTML = `
      <div class="service-card-icon"><i class="fas ${svc.icon}" aria-hidden="true"></i></div>
      <p class="service-card-tag">${t(lang, `${svc.key}Tag`)}</p>
      <h3>${t(lang, `${svc.key}Title`)}</h3>
      <p class="service-card-desc">${t(lang, `${svc.key}Desc`)}</p>
      <ul class="service-card-bullets">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      <button type="button" class="service-card-cta" data-service-index="${index}">
        ${t(lang, `${svc.key}CardCta`)} <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".service-card-cta").forEach((btn) => {
    btn.addEventListener("click", () => openServiceModal(Number(btn.getAttribute("data-service-index"))));
  });
}

/* ---------------- Service Modal ---------------- */
const serviceModal = document.getElementById("serviceModal");

function openServiceModal(index) {
  const svc = SERVICES[index];
  if (!svc) return;
  const lang = currentLang;
  const key = svc.key;

  document.getElementById("modalTag").textContent = t(lang, `${key}Tag`);
  document.getElementById("modalTitle").textContent = t(lang, `${key}Title`);
  document.getElementById("modalDescription").textContent = t(lang, `${key}Desc`);
  document.getElementById("modalWhoForLabel").textContent = t(lang, "modalWhoForLabel");
  document.getElementById("modalSituationsLabel").textContent = t(lang, "modalSituationsLabel");
  document.getElementById("modalAssistLabel").textContent = t(lang, "modalAssistLabel");
  document.getElementById("modalNotesLabel").textContent = t(lang, "modalNotesLabel");
  document.getElementById("modalCtaLabel").textContent = t(lang, "modalCtaLabel");

  const whoFor = t(lang, `${key}WhoFor`);
  document.getElementById("modalWhoFor").textContent = whoFor;
  document.getElementById("modalWhoFor").closest(".modal-block").hidden = !whoFor;

  const situations = collectList(lang, `${key}Situations`);
  document.getElementById("modalSituations").innerHTML = situations.map((s) => `<li>${s}</li>`).join("");

  const assist = collectList(lang, `${key}Assist`);
  document.getElementById("modalAssist").innerHTML = assist.map((s) => `<li>${s}</li>`).join("");

  const notes = t(lang, `${key}Notes`);
  const notesBlock = document.getElementById("modalNotesBlock");
  document.getElementById("modalNotes").textContent = notes;
  notesBlock.hidden = !notes;

  const serviceTitle = t(lang, `${key}Title`);
  const message = lang === "zh"
    ? `您好 Sky Consultancy，我想咨询关于「${serviceTitle}」的服务。`
    : `Hi Sky Consultancy, I would like to enquire about ${serviceTitle}.`;
  document.getElementById("btnInterest").setAttribute("href", buildWhatsappUrl(message));

  serviceModal.hidden = false;
  document.body.classList.add("nav-locked");
  requestAnimationFrame(() => serviceModal.classList.add("active"));
}

function closeServiceModal() {
  serviceModal.classList.remove("active");
  document.body.classList.remove("nav-locked");
  setTimeout(() => {
    if (!serviceModal.classList.contains("active")) serviceModal.hidden = true;
  }, 350);
}

document.getElementById("closeModalBtn")?.addEventListener("click", closeServiceModal);
serviceModal?.addEventListener("click", (e) => {
  if (e.target === serviceModal) closeServiceModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && serviceModal && !serviceModal.hidden) closeServiceModal();
});

/* ---------------- FAQ (data-driven) ---------------- */
function renderFaq(lang) {
  const container = document.getElementById("faqContainer");
  if (!container) return;
  container.innerHTML = "";

  let i = 1;
  while (true) {
    const q = t(lang, `faqQ${i}`);
    const a = t(lang, `faqA${i}`);
    if (!q || !a) break;

    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `
      <button class="faq-question" aria-expanded="false" aria-controls="faqAnswer${i}">
        <span>${q}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer" id="faqAnswer${i}" role="region">
        <p>${a}</p>
      </div>
    `;
    container.appendChild(item);
    i++;
  }

  container.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => toggleFaq(btn));
  });
}

function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const isOpen = answer.classList.contains("open");

  if (!isOpen) {
    answer.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  } else {
    answer.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  }
}

/* ---------------- Phone prefix (Contact form) ---------------- */
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("cf-phone");
  if (!phoneInput) return;
  const prefix = "+60 ";

  phoneInput.addEventListener("focus", function () {
    if (!phoneInput.value) phoneInput.value = prefix;
  });

  phoneInput.addEventListener("input", function () {
    if (phoneInput.value && !phoneInput.value.startsWith(prefix)) {
      const cursorPos = phoneInput.selectionStart;
      phoneInput.value = prefix + phoneInput.value.replace(/^(\+)?60\s?/i, "");
      const pos = cursorPos < prefix.length ? prefix.length : cursorPos;
      phoneInput.setSelectionRange(pos, pos);
    }
  });

  phoneInput.addEventListener("keydown", function (e) {
    if ((e.key === "Backspace" || e.key === "Delete") && phoneInput.selectionStart <= prefix.length && phoneInput.value.startsWith(prefix)) {
      e.preventDefault();
    }
  });
});

/* ---------------- Contact form submission ---------------- */
const contactForm = document.getElementById("contactForm");
const cfSubmitBtn = document.getElementById("cfSubmitBtn");
const cfSuccess = document.getElementById("cfSuccess");
const cfError = document.getElementById("cfError");

contactForm?.addEventListener("submit", async function (e) {
  e.preventDefault();
  cfSuccess.hidden = true;
  cfError.hidden = true;

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  cfSubmitBtn.disabled = true;
  cfSubmitBtn.classList.add("is-loading");

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      cfSuccess.hidden = false;
      contactForm.reset();
    } else {
      cfError.hidden = false;
    }
  } catch (err) {
    cfError.hidden = false;
  } finally {
    cfSubmitBtn.disabled = false;
    cfSubmitBtn.classList.remove("is-loading");
  }
});

/* ---------------- WhatsApp links (site-wide) ---------------- */
function refreshWhatsappLinks(lang) {
  const message = lang === "zh"
    ? "您好 Sky Consultancy，我想咨询有关 CIDB／合规服务的事宜。"
    : "Hi Sky Consultancy, I would like to enquire about your CIDB / compliance services.";
  const url = buildWhatsappUrl(message);
  document.querySelectorAll("[data-wa-base]").forEach((el) => el.setAttribute("href", url));
}

/* ---------------- Language Switching ---------------- */
const langToggle = document.getElementById("language-toggle");
const langToggleLabel = document.getElementById("langToggleLabel");
const translations = TRANSLATIONS;
let currentLang = "en";

function loadTranslations() {
  const savedLang = localStorage.getItem("lang");

  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
  } else {
    const browserLang = navigator.language || navigator.userLanguage || "en";
    currentLang = browserLang.startsWith("zh") ? "zh" : "en";
  }

  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  applyTranslations(currentLang);
  renderServices(currentLang);
  renderFaq(currentLang);
  refreshWhatsappLinks(currentLang);
  updateToggleButton();
}

function applyTranslations(lang) {
  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    const value = translations[lang]?.[key];
    if (value !== undefined) el.textContent = value;
  });
}

function updateToggleButton() {
  langToggleLabel.textContent = currentLang === "en" ? "中文" : "EN";
}

langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("lang", currentLang);
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  applyTranslations(currentLang);
  renderServices(currentLang);
  renderFaq(currentLang);
  refreshWhatsappLinks(currentLang);
  updateToggleButton();
});

window.addEventListener("DOMContentLoaded", loadTranslations);
