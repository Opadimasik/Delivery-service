// // Элементы формы
// const emailField = document.getElementById('staticEmail');
// const fullNameField = document.getElementById('exampleFormControlInput1');
// const phoneField = document.getElementById('phone');
// const genderField = document.getElementById('staticGender');
// const birthdayField = document.getElementById('birthday');

// // Кнопка "Сохранить"
// const saveButton = document.getElementById('saveButton');

// // Функция для выполнения GET-запроса и обновления данных на странице
// function updateProfileData() {
//   fetch('https://food-delivery.kreosoft.ru/api/account/profile')
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(data => {
//           // Проверка наличия данных перед обновлением
//           if (data) {
//               emailField.value = data.email;
//               fullNameField.value = data.fullName;
//               phoneField.value = data.phoneNumber;
//               genderField.value = data.gender;
//               birthdayField.value = data.birthDate;
//           } else {
//               console.error('Пустой ответ от сервера');
//           }
//       })
//       .catch(error => {
//           console.error('Ошибка при выполнении GET-запроса:', error);
//       });
// }

// // Вызов функции для обновления данных при загрузке страницы
// window.onload = function () {
//   updateProfileData();
// };

// // Обработчик клика по кнопке "Сохранить"
// saveButton.addEventListener('click', function () {
//  
//  
// });