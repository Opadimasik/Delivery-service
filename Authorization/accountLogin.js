// Получение элементов формы
const emailInput = document.getElementById("exampleInputEmail1");
const passwordInput = document.getElementById("exampleInputPassword1");

const authorizationLoginButton = document.getElementById("authorizationLogin");

// Добавление обработчика события отправки формы к кнопке
authorizationLoginButton.addEventListener("click", (event) => {
  event.preventDefault(); // Предотвращение стандартной отправки формы
  
  // Получение значений из полей ввода
  const email = emailInput.value;
  const password = passwordInput.value;

  // Создание объекта для отправки данных
  const data = {
    email: email,
    password: password,
  };

  // Опции для POST-запроса
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Отправка POST-запроса на указанный URL
  fetch("https://food-delivery.kreosoft.ru/api/account/login", options)
    .then((response) => {
      if (response.status === 200) {
        // Извлечение токена из JSON-ответа
        const authToken = data.token;
        
        document.cookie = "token=" + authToken;
        
        // Дополнительные действия после успешной авторизации
        console.log("Успешная авторизация");
      } else if (response.status === 400) {
        // Неуспешная авторизация, здесь можно обработать ошибку
        console.log("Неуспешная авторизация");
      }
      else if(response.status === 500)
      {
        response.json().then((errorData) => {
            console.error("Произошла ошибка сервера:", errorData.message)
        });
      }
    })
    .catch((error) => {
      // Обработка ошибки сети или других ошибок
      console.error("Произошла ошибка:", error);
    });
});
