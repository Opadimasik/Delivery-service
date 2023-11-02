// тестовый токен, потом передавать его 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiJiOTJlNWM4Zi04ZDcyLTRiMWQtOTEyYS05MmQxYjJjMTkzYmMiLCJuYmYiOjE2OTg5MzU2NzgsImV4cCI6MTY5ODkzOTI3OCwiaWF0IjoxNjk4OTM1Njc4LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.inhQ2YRpcJmjYX0o1Ju1UwkcVJTL-fDqmH-_VyW5TPQ";
const productContainer = document.getElementById("product-container");

function createBasket (products)
{
    // Создайте карточки для каждого товара в массиве
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-md-4"); // Задайте классы Bootstrap для столбца
        card.innerHTML = `
            <div class="card" id="${product.id}" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Цена: ${product.price}</p>
                    <p class="card-text">Общая стоимость: ${product.totalPrice}</p>
                    <p class="card-text">Количество: <span id="product-quantity">${product.amount}</span></p>
                        <button class="btn btn-secondary" id="decrement">-</button>
                        <button class="btn btn-secondary" id="increment">+</button>
                    <a href="#" class="btn btn-danger">Удалить</a>
                </div>
            </div>
        `;

        productContainer.appendChild(card); // Добавьте карточку в контейнер
    });
}

// Опции для запроса, включая заголовок с токеном Bearer
const options = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

// Выполнение GET-запроса
fetch('https://food-delivery.kreosoft.ru/api/basket', options)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
  })
  .then(data => {
    // Обработка полученных данных
    createBasket(data);
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  });
