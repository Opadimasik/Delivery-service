function fetchAddressByGuid(guid) {
  const apiEndpoint = `https://food-delivery.kreosoft.ru/api/address/chain?objectGuid=${guid}`;
  
  fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
          const addressSection = document.getElementById('address-section-main');
          
          while (addressSection.children.length > 1) {
              addressSection.removeChild(addressSection.lastChild);
          }

          data.forEach(element => {
              const label = document.createElement('label');
              label.textContent = element['objectLevelText'];
              const select = document.createElement('select');
              select.className = 'form-select mb-1';
              select.setAttribute('name', `select-${element['objectId']}`);


              const option = document.createElement('option');
              option.value = JSON.stringify(element);
              option.textContent = element['text'];
              select.appendChild(option);

              addressSection.appendChild(label);
              addressSection.appendChild(select);
          });
      })
      .catch(error => {
          console.error('Ошибка при получении данных адреса:', error);
      });
}



// Элементы формы
var emailField = document.getElementById('staticEmail');
//var phoneFieldStatic = document.getElementById('staticPhone');
var fullNameField = document.getElementById('exampleFormControlInput1');
var phoneField = document.getElementById('phone');
var genderField = document.getElementById('staticGender');
var birthdayField = document.getElementById('birthday');
var address = document.getElementById('address-section-main');
// Кнопка "Сохранить"
const saveButton = document.getElementById('saveButton');
data = 
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiI0YzA2YTBlYi0yZmY0LTRhMDQtODI5ZC1lODI1MGM4NWVlMDkiLCJuYmYiOjE2OTkyMDAwNDcsImV4cCI6MTY5OTIwMzY0NywiaWF0IjoxNjk5MjAwMDQ3LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.VP_FWofN5iwOyWrW_pbJWp0s0oDT91Fs0nNtmdfdbdc"
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
       // phoneFieldStatic.value = data.phoneNumber;
        fetchAddressByGuid(data.address);
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
