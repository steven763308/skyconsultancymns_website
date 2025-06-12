//preload animation
window.addEventListener("load", () => {
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      preloader.classList.add("hidden");
    }, 2000); // 2.5秒后隐藏
});

//open menu sidebar
function toggleMenu(){
    const nav = document.getElementById('navBar');
    nav.classList.toggle('active');
}

//close menu sidebar
function closeMenu(){
    const nav = document.getElementById('navBar');
    nav.classList.toggle('active');
}

// Service Data (Modal)
const serviceData = [
    {
      logo: "../img/servicesLogo/cidbLogo.png", //path to relevant logo
      title: "CIDB",
      description: "This is a detailed description for Service / Product 1. You can provide more context, pricing, usage instructions, or images here."
    },
    {
      logo: "../img/servicesLogo/jimLogo.png", //path to relevant logo
      title: "Imigresen Malaysia",
      description: "Full information about Service / Product 2 goes here. Tailor the details for your client's needs."
    },
    {
      logo: "../img/servicesLogo/expatriateLogo.png", //path to relevant logo
      title: "Expatriate (ESD)",
      description: "Explain why Service / Product 3 is beneficial. You can add certification info or workflow."
    },
    {
      logo: "", //path to relevant logo
      title: "Service / Product 4",
      description: "Detailed overview of Service / Product 4 with solutions and contact methods if needed."
    }
  ];
  
  //onclick function
  function openModal(index) {
    const data = serviceData[index];

    const logoElement = document.getElementById("serviceLogo");
    logoElement.src = data.logo;
    logoElement.alt = data.title + " Logo";
    document.getElementById("modalTitle").innerText = data.title;
    document.getElementById("modalDescription").innerText = data.description;
    document.getElementById("serviceModal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("serviceModal").style.display = "none";
  }
  
  // Show or hide back-to-top button on scroll [back to top button]
  window.addEventListener('scroll', function () {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });

  // Smooth scroll to top
  document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ContactUs Phone Prefix
  document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const prefix = "+60 ";
  
    // 初始状态强制带前缀
    if (!phoneInput.value.startsWith(prefix)) {
      phoneInput.value = prefix;
    }
  
    // 防止删除前缀
    phoneInput.addEventListener("input", function () {
      if (!phoneInput.value.startsWith(prefix)) {
        const cursorPos = phoneInput.selectionStart;
        phoneInput.value = prefix + phoneInput.value.replace(/^(\+)?60\s?/i, "");
        phoneInput.setSelectionRange(cursorPos < prefix.length ? prefix.length : cursorPos, cursorPos < prefix.length ? prefix.length : cursorPos);
      }
    });
  
    // 防止全选后删除
    phoneInput.addEventListener("keydown", function (e) {
      if (
        (e.key === "Backspace" || e.key === "Delete") &&
        phoneInput.selectionStart <= prefix.length
      ) {
        e.preventDefault();
      }
    });
  });

//Language Switching
const langToggle = document.getElementById("language-toggle");
const elements = document.querySelectorAll("[data-lang-key]");
let translations = {};
let currentLang = "en";

//load language pack from json
async function loadTranslations(){
  try{
    const res = await fetch ("../official/lang.json"); //lang.json actual path
    translations = await res.json();
    const savedLang = localStorage.getItem("lang");

    //if guest previously choosen, otherwise: use default browser
    if(savedLang){
      currentLang = savedLang;
    }else{
      const browserLang = navigator.language || navigator.userLanguage;
      currentLang = browserLang.startsWith("zh") ? "zh" : "en";
    }

    applyTranslations(currentLang);
    updateToggleButton(); //set default text
  }catch(err){
    console.error("Error Loading Translation: ", err);
  }
}

function applyTranslations(lang){
  elements.forEach(el => {
    const key = el.getAttribute("data-lang-key");
    if(translations[lang] && translations[lang][key]){
      el.textContent = translations[lang][key];
    }
  });
}

//set button displayed language 
function updateToggleButton(){
  langToggle.textContent = currentLang === "en" ? "中文" : "EN";
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);
  updateToggleButton();
});

window.addEventListener("DOMContentLoaded", loadTranslations);
  
