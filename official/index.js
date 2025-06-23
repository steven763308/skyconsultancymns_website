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

//whatsapp link array
const whatsappLink = [
  "https://api.whatsapp.com/send?phone=60125583398&text=CIDB%20Enquiry", //service CIDB
  "https://api.whatsapp.com/send?phone=60125583398&text=Imigresen%20Enquiry", //service Imigresen
  "https://api.whatsapp.com/send?phone=60125583398&text=Expatriate%20(ESD)%20Enquiry", //service ESD
  "https://api.whatsapp.com/send?phone=60125583398&text=Others%20Service%20Enquiry%20(MyKKP%2C%20MOF%2C%20etc...)", //service Others (MyKKP, MOF)
]

// Modal function with language-loaded data
function openModal(index) {
  fetch("lang.json")
    .then(res => res.json())
    .then(langData => {
      const lang = langData[currentLang];
      const titleKey = `service${index + 1}Title`;
      const descHintTitle = `serviceHintTitle`;
      const descKey = `service${index + 1}DescDetails`;
      const detailsKey = `service${index + 1}Details`;
      const detailsObjectKey = `service${index + 1}DetailsObject`; // ✅ 新增字段
      const serHintDesc = `service${index + 1}HintDesc`;

      const logo = logoPaths[index];
      const title = lang[titleKey] || "Service";
      const hintTitle = lang[descHintTitle] || [];
      const description = lang[descKey] || "Description not available.";
      const details = lang[detailsKey] || [];
      const detailsObject = lang[detailsObjectKey] || [];
      const hintDesc = lang[serHintDesc] || [];

      // 插入基本内容
      document.getElementById("serviceLogo").src = logo;
      document.getElementById("serviceLogo").alt = title + " Logo";
      document.getElementById("modalTitle").innerText = title;
      document.getElementById("serviceModalHint").innerHTML = `<i class="fas fa-lightbulb" style="margin-right: 8px; color: #ffc107;"></i>${hintTitle}`;
      document.getElementById("modalDescription").innerText = description;
      document.getElementById("serviceModalHintDesc").innerText = hintDesc;

      // ✅ 渲染复杂内容（CIDB / Imigresen）
      const detailsContainer = document.querySelector(".modal-content-details");
      detailsContainer.innerHTML = "";

      if (detailsObject.length > 0) {
        const h3 = document.createElement("h3");
        h3.innerHTML = `<i class="fas fa-file-alt" style="margin-right: 8px;"></i>我们提供的 ${title} 服务包括:`;
        detailsContainer.appendChild(h3);

        detailsObject.forEach(block => {
          const h4 = document.createElement("h4");
          h4.textContent = block.title;
          detailsContainer.appendChild(h4);

          const ul = document.createElement("ul");
          block.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          detailsContainer.appendChild(ul);
        });
      } else {
        // 否则使用原来的简单 bullet list 渲染
        const simpleList = document.getElementById("modalDetails");
        simpleList.innerHTML = "";
        details.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          simpleList.appendChild(li);
        });
      }

      //update WhatsApp Button Link
      const btn = document.getElementById("btnInterest");
      btn.onclick = () => {
        window.open(whatsappLink[index], "_blank");
      };

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
