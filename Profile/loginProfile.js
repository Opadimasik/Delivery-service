// Элементы формы
var emailField = document.getElementById('staticEmail');
var phoneFieldStatic = document.getElementById('staticPhone');
var fullNameField = document.getElementById('exampleFormControlInput1');
var phoneField = document.getElementById('phone');
var genderField = document.getElementById('staticGender');
var birthdayField = document.getElementById('birthday');
var address = document.getElementById('address-section-main');
// Кнопка "Сохранить"
const saveButton = document.getElementById('saveButton');
data = 
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiIxNmNmNDQ4My03NjRmLTQzZDMtYjAyOC1iMjA3ZGU5OGM3MDEiLCJuYmYiOjE2OTkxOTgyMzgsImV4cCI6MTY5OTIwMTgzOCwiaWF0IjoxNjk5MTk4MjM4LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.13GCsDIwKmBOfd2WR0Q6hghVTFN0WVNbIugFtP61SiE"
}
// Функция для выполнения GET-запроса и обновления данных на странице
function updateProfileData() {
  // Добавляем токен в заголовок "Authorization"
  const token = "Bearer " + data.token;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  };

  fetch('https://food-delivery.kreosoft.ru/api/account/profile', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Проверка наличия данных перед обновлением
      if (data) {
        emailField.value = data.email;
        fullNameField.value = data.fullName;
        phoneField.value = data.phoneNumber;
        phoneFieldStatic.value = data.phoneNumber;
        address.value = data.address;
        if(data.gender === "Male")
        {
          genderField.value = "Мужской";
        }
        else{
          genderField.value = "Женский";
        }
        birthdayField.value = data.birthDate;
      } else {
        console.error('Пустой ответ от сервера');
      }
    })
    .catch(error => {
      console.error('Ошибка при выполнении GET-запроса:', error);
    });
}

// Вызов функции для обновления данных при загрузке страницы
window.onload = function () {
  updateProfileData();
};

// Обработчик клика по кнопке "Сохранить"
saveButton.addEventListener('click', function () {
 
 
});