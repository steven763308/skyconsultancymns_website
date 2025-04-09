//preload animation
window.addEventListener("load", () => {
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      preloader.classList.add("hidden");
    }, 2500); // 2.5秒后隐藏
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
      title: "Service / Product 1",
      description: "This is a detailed description for Service / Product 1. You can provide more context, pricing, usage instructions, or images here."
    },
    {
      title: "Service / Product 2",
      description: "Full information about Service / Product 2 goes here. Tailor the details for your client's needs."
    },
    {
      title: "Service / Product 3",
      description: "Explain why Service / Product 3 is beneficial. You can add certification info or workflow."
    },
    {
      title: "Service / Product 4",
      description: "Detailed overview of Service / Product 4 with solutions and contact methods if needed."
    }
  ];
  
  //onclick function
  function openModal(index) {
    document.getElementById("modalTitle").innerText = serviceData[index].title;
    document.getElementById("modalDescription").innerText = serviceData[index].description;
    document.getElementById("serviceModal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("serviceModal").style.display = "none";
  }
  
