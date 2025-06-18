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

// Static logo paths
const logoPaths = [
  "../img/servicesLogo/cidbLogo.png",
  "../img/servicesLogo/jimLogo.png",
  "../img/servicesLogo/expatriateLogo.png",
  "../img/servicesLogo/othersLogo.png"
];

//service logo path
document.querySelectorAll('.serviceLogo').forEach((img, index) => {
  img.src = logoPaths[index];
});

// Modal function with language-loaded data
function openModal(index) {
  fetch("lang.json")
    .then(res => res.json())
    .then(langData => {
      const lang = langData[currentLang]; // 选择当前语言
      const titleKey = `service${index + 1}Title`;
      const descKey = `service${index + 1}Desc`;
      const detailsKey = `service${index + 1}Details`;

      const logo = logoPaths[index];
      const title = lang[titleKey] || "Service";
      const description = lang[descKey] || "Description not available.";
      const details = lang[detailsKey] || [];

      // 插入内容到 Modal
      const logoElement = document.getElementById("serviceLogo");
      logoElement.src = logo;
      logoElement.alt = title + " Logo";
      document.getElementById("modalTitle").innerText = title;
      document.getElementById("modalDescription").innerText = description;

      const detailsList = document.getElementById("modalDetails");
      detailsList.innerHTML = ""; // 清空旧内容
      details.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        detailsList.appendChild(li);
      });

      document.getElementById("serviceModal").style.display = "flex";
    })
    .catch(err => {
      console.error("Language file loading failed:", err);
    });
}
  
  function closeModal() {
    document.getElementById("serviceModal").style.display = "none";
  }

  document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
      closeModal();
    }
  });
  
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

function applyTranslations(lang) {
  elements.forEach(el => {
    const listKey = el.getAttribute("data-lang-list");
    const key = el.getAttribute("data-lang-key");

    // ✅ 优先处理 data-lang-list（你偏好的 list 格式）
    if (listKey && translations[lang] && Array.isArray(translations[lang][listKey])) {
      const listItems = translations[lang][listKey]
        .map(item => `<li>${item}</li>`)
        .join("");
      el.innerHTML = `<ul>${listItems}</ul>`;
      return; // 避免继续执行 data-lang-key
    }

    // ✅ 普通翻译 或 自动识别数组为 bullet list
    if (key && translations[lang] && translations[lang][key]) {
      const value = translations[lang][key];

      if (Array.isArray(value)) {
        const listItems = value.map(item => `<li>${item}</li>`).join("");
        el.innerHTML = `<ul>${listItems}</ul>`;
      } else {
        el.textContent = value;
      }
    }
  });
}


//set button displayed language 
function updateToggleButton() {
  langToggle.innerHTML = currentLang === "en"
    ? '<i class="fas fa-globe"></i> 中文'
    : '<i class="fas fa-globe"></i> EN';
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  localStorage.setItem("lang", currentLang);
  applyTranslations(currentLang);
  updateToggleButton();
});

//FAQ toggle
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");

  const isOpen = answer.classList.contains("open");

  // 可选：是否互斥关闭其他
  document.querySelectorAll(".faq-answer").forEach(a => {
    a.classList.remove("open");
  });
  document.querySelectorAll(".faq-icon").forEach(i => {
    i.textContent = "+";
  });

  // 打开当前项
  if (!isOpen) {
    answer.classList.add("open");
    icon.textContent = "–";
  }
}


window.addEventListener("DOMContentLoaded", loadTranslations);
