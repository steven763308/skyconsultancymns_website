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
      logo: "img/servicesLogo/cidbLogo.png", //path to relevant logo
      title: "Service / Product 1",
      description: "This is a detailed description for Service / Product 1. You can provide more context, pricing, usage instructions, or images here."
    },
    {
      logo: "", //path to relevant logo
      title: "Service / Product 2",
      description: "Full information about Service / Product 2 goes here. Tailor the details for your client's needs."
    },
    {
      logo: "", //path to relevant logo
      title: "Service / Product 3",
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
  
