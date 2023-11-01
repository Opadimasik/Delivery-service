// Получение элементов формы
const fullNameInput = document.getElementById("fullName");
const genderInputs = document.querySelectorAll('input[name="gender"]');
const phoneInput = document.getElementById("phone");
const birthdayInput = document.getElementById("birthday");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const address = localStorage.getItem("objectGuid1");
const registerButton = document.getElementById("submitForRegistr");
console.log(address);
// Обработчик отправки формы
registerButton.addEventListener("click", (event) => {
  event.preventDefault(); // Предотвращение стандартной отправки формы
  console.log("SUBMIT");
  console.log(address);
  // Получение значений из полей ввода
  const fullName = fullNameInput.value;
  const gender = Array.from(genderInputs).find((input) => input.checked).value;
  const phone = phoneInput.value;
  const birthday = birthdayInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const addressId = address;
  console.log(gender);
  console.log(birthday);
  console.log(fullName);
  console.log(phone);
  console.log(email);
  console.log(password);
  // Создание объекта для отправки данных
  const data = {
    fullName: fullName,
    password: password,
    email: email,
    addressId: addressId,
    birthDate: birthday,
    gender: gender,
    phoneNumber: phone,
  };
  console.log(data);
  // Опции для POST-запроса
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Отправка POST-запроса на указанный URL
  fetch("https://food-delivery.kreosoft.ru/api/account/register", options)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
            const regToken = data.token;
            document.cookie = "token=" + regToken;
            console.log("Успешная регистрация");
          });
      } else if (response.status === 500) {
        // Ошибка сервера с кодом 500
        response.json().then((errorData) => {
          console.error("Произошла ошибка сервера:", errorData.message);
        });
      } else if (response.status === 400){
        console.log(response.json());
      }
    })
    .catch((error) => {
      // Обработка ошибки сети или других ошибок
      console.error("Произошла ошибка:", error);
    });
});
