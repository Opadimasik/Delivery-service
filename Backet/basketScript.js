// тестовый токен, потом передавать его 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiJmNzZkZmFkOS0wM2FlLTRjYmItYmI5OS1kOWQxYmUyMDgyZTIiLCJuYmYiOjE2OTkyMDI0MzksImV4cCI6MTY5OTIwNjAzOSwiaWF0IjoxNjk5MjAyNDM5LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.VvU1JnHznjGsRGdO4b2jHFPycZ6eVNaNwz72YWqBxXU";
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
    
    products.forEach(item => {
      const itemRow = document.createElement("div");
      itemRow.classList.add("row", "border", "border-dark", "p-2");
      itemRow.setAttribute("product-id", item.id); // Устанавливаем атрибут product-id
      itemRow.innerHTML = `
          <div class="col-2 border-end">
              <img src="${item.image}" alt="${item.name}" style="max-width: 100%; height: auto;">
          </div>
          <div class="col-4 border-end">
              <div>${item.name}</div>
              <div class="text" style="font-size: 12px;">Наименование</div>
          </div>
          <div class="col-2 border-end">
              <div>${item.price}</div>
              <div class="text" style="font-size: 12px;">Цена</div>
          </div>
          <div class="col-2 border-end">
              <div>${item.amount}</div>
              <div class="text" style="font-size: 12px;">Количество</div>
          </div>
          <div class="col-2">
              <div>${item.totalPrice}</div>
              <div class="text" style="font-size: 12px;">Итого</div>
          </div>
      `;
      
      // Добавьте созданный элемент куда вам нужно
      productContainer.appendChild(itemRow);

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
