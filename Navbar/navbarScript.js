document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-link");
    const iframe = document.getElementById("myFrame");
  
    navLinks.forEach(link => {
      link.addEventListener("click", function(event) {
        // event.preventDefault();
  
        // const targetPage = link.getAttribute("href"); 
        // window.location.href = targetPage;
        window.close();
      });
    });
  });