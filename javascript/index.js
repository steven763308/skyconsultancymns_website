const translations = {
    en: {
      logo: "Sky Consultancy",
      services: "Services",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      getStarted: "Get Started",
      heroTitle: "Your Trusted Partner for CIDB Solutions",
      heroSubtitle: "HIHI PIG ZIQI, CLICK HERE!!!",
      contactUs: "Contact Us Today",
      forfun: "Click ME !!!",
      ourServices: "Our Services",
      service1Title: "CIDB Company Registration (G1-G7)",
      service1Desc: "Efficient licensing solutions for contractors of all scales.",
      service2Title: "Green Card Registration",
      service2Desc: "Secure your workers’ credentials with ease.",
      service3Title: "Blacklist Resolution",
      service3Desc: "Get back on track with our expert assistance.",
      service4Title: "Project Declaration",
      service4Desc: "Stay compliant and avoid unnecessary penalties.",
      aboutUs: "About Us",
      aboutDesc: "Sky Consultancy specializes in simplifying the CIDB compliance process...",
      faqTitle: "Frequently Asked Questions",
      faq1Title: "What is CIDB registration?",
      faq1Desc: "CIDB registration is a mandatory requirement for contractors...",
      faq2Title: "How long does the process take?",
      faq2Desc: "Typically, the process takes 2-4 weeks...",
      contactUsTitle: "Contact Us",
      nameLabel: "Name:",
      emailLabel: "Email:",
      messageLabel: "Message:",
      sendMessage: "Send Message",
      contactDetails: "Or reach us at: finityconsult@gmail.com | 017-2913517",
      footer: "© 2024 Sky Consultancy. All Rights Reserved.",
    },
    zh: {
      logo: "天谕咨询",
      services: "服务",
      about: "关于我们",
      faq: "常见问题",
      contact: "联系我们",
      getStarted: "立即开始",
      heroTitle: "您值得信赖的 CIDB 解决方案合作伙伴",
      heroSubtitle: "通过我们的专业服务简化您的建筑合规流程。",
      contactUs: "联系我们",
      ourServices: "我们的服务",
      service1Title: "CIDB 公司注册（G1-G7）",
      service1Desc: "为所有规模的承包商提供高效的许可证解决方案。",
      service2Title: "绿卡注册",
      service2Desc: "轻松确保工人资质。",
      service3Title: "黑名单解决",
      service3Desc: "通过专业援助重回正轨。",
      service4Title: "项目申报",
      service4Desc: "保持合规，避免不必要的罚款。",
      aboutUs: "关于我们",
      aboutDesc: "天谕咨询专注于简化马来西亚承包商的 CIDB 合规流程...",
      faqTitle: "常见问题",
      faq1Title: "什么是 CIDB 注册？",
      faq1Desc: "CIDB 注册是马来西亚承包商运营的强制性要求。",
      faq2Title: "流程需要多长时间？",
      faq2Desc: "通常，流程需要 2-4 周，具体取决于服务。",
      contactUsTitle: "联系我们",
      nameLabel: "姓名:",
      emailLabel: "电子邮箱:",
      messageLabel: "留言:",
      sendMessage: "发送留言",
      contactDetails: "联系我们: finityconsult@gmail.com | 017-2913517",
      footer: "© 2024 天谕咨询。版权所有。",
    }
  };
  
  // Language Toggle
  const languageToggle = document.getElementById("language-toggle");
  let currentLanguage = "en";
  
  languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "zh" : "en";
    updateLanguage();
    languageToggle.textContent = currentLanguage === "en" ? "中文" : "English";
  });
  
  function updateLanguage() {
    document.querySelectorAll("[data-lang-key]").forEach(element => {
      const key = element.getAttribute("data-lang-key");
      element.textContent = translations[currentLanguage][key];
    });
  }
  
  updateLanguage();
  
  // FAQ Toggle
  function toggleFaq(element) {
    const description = element.nextElementSibling;
    description.style.display = description.style.display === "block" ? "none" : "block";
  }
  
  // Back-to-Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }