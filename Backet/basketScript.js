// тестовый токен, потом передавать его 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiI1MGQ5ZDJmYi0zYzMyLTQ2ZjgtYjAxYS1iNjgxODI1NTA3ODQiLCJuYmYiOjE2OTg5NDIxODEsImV4cCI6MTY5ODk0NTc4MSwiaWF0IjoxNjk4OTQyMTgxLCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.6Q_lmkqmvW6b5C4VenNHtwTmAbFzOJkFUzPELgDzH1M";
const productContainer = document.getElementById("product-container");
function deleteProduct(dishId, cardElement) {

    // Опции для DELETE-запроса
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    // Выполнение DELETE-запроса
    fetch(`https://food-delivery.kreosoft.ru/api/basket/dish/${dishId}`, options)
        .then(response => {
            if (response.ok) {
                // Успешное удаление, удаляем карточку из DOM
                productContainer.removeChild(cardElement);
                console.log(`Товар с ID ${dishId} успешно удален.`);
            } else {
                // Обработка ошибки при удалении
                console.error(`Ошибка HTTP: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}
function createBasket (products)
{
    
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
            <div class="card" product-id="${product.id}" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Цена: ${product.price}</p>
                    <p class="card-text">Общая стоимость: <span class="product-total-price">${product.totalPrice}</span></p>
                    <p class="card-text">Количество: <span class="product-amount">${product.amount}</span></p>
                    <button class="btn btn-secondary decrement">-</button>
                    <button class="btn btn-secondary increment">+</button>
                    <a href="#" class="btn btn-danger delete-product">Удалить</a>
                </div>
            </div>
        `;

        productContainer.appendChild(card); 
        const decrementButton = card.querySelector(".decrement");
        const incrementButton = card.querySelector(".increment");
        const amountElement = card.querySelector(".product-amount");
        const totalPriceElement = card.querySelector(".product-total-price");

        decrementButton.addEventListener("click", () => {
            let amount = parseInt(amountElement.textContent);
            if (amount > 1) {
                amount--;
                amountElement.textContent = amount;
                // Обновление общей стоимости
                const price = parseFloat(product.price);
                const total = amount * price;
                totalPriceElement.textContent = total;
            }
        });

        incrementButton.addEventListener("click", () => {
            let amount = parseInt(amountElement.textContent);
            amount++;
            amountElement.textContent = amount;
            // Обновление общей стоимости
            const price = parseFloat(product.price);
            const total = amount * price;
            totalPriceElement.textContent = total;
        });

        const deleteButton = card.querySelector(".delete-product");
            deleteButton.addEventListener("click", () => {
                const dishId = product.id; 
                deleteProduct(dishId, card); 
            });
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
