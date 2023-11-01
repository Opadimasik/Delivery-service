function getCurrentUser() {
    // здесь должна быть логика получения логина аккаунта
    return "examle@exe.com"; // Заменить этим логином текущего пользователя
  }
  document.addEventListener("DOMContentLoaded", function () {
    const userUsername = document.getElementById("user-username");
    const currentUser = getCurrentUser();
  
    if (currentUser) {
      userUsername.textContent = currentUser; 
    }
  });