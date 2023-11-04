const urlParamsClone = new URLSearchParams(window.location.search);
const orderId = urlParamsClone.get('orderId');
data = 
{
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiI0NjQyZTk3NC05NjQyLTQ0MzktODE4OC0xZWE2YTAwOWNlZWEiLCJuYmYiOjE2OTkwOTgwMDUsImV4cCI6MTY5OTEwMTYwNSwiaWF0IjoxNjk5MDk4MDA1LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.UkOC9uUFAXk_Tq4Or709CVD4aIMvRYJeGd_QYp4pJD4"
}
const token = "Bearer " + data.token;
const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    }
};
// Функция для обработки ответа от сервера
function handleResponseOrder(order) {
    const orderInfo = document.getElementById("orderInfo");
    const orderItems = document.getElementById("orderItems");

    // Отображение информации о заказе
    orderInfo.innerHTML = `
        <p>Дата доставки: ${new Date(order.deliveryTime).toLocaleString()}</p>
        <p>Дата заказа: ${new Date(order.orderTime).toLocaleString()}</p>
        <p>Статус: ${order.status === "InProcess" ? "В обработке" : "Доставлен"}</p>
        <p>Цена: ${order.price}</p>
        <p>Адрес: ${order.address}</p>
    `;

    order.dishes.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("row", "border", "border-dark", "p-2"); 
        itemRow.innerHTML = `
            <div class="col-2 border-end">
                <img src="${item.image}" alt="${item.name}" style="max-width: 100%; height: auto;">
            </div>
            <div class="col-4 border-end">
                <div>${item.name}</div>
                <div class="text"style="font-size: 12px;">Наименование</div>
            </div>
            <div class="col-2 border-end">
                <div>${item.price}</div>
                <div class="text"style="font-size: 12px;">Цена</div>
            </div>
            <div class="col-2 border-end">
                <div>${item.amount}</div>
                <div class="text"style="font-size: 12px;">Количество</div>
            </div>
            <div class="col-2">
                <div>${item.totalPrice}</div>
                <div class="text"style="font-size: 12px;">Итого</div>
            </div>
        `;
    
        if (order.status === "InProcess") {
            const confirmButton = document.createElement("button");
            confirmButton.innerText = "Подтвердить доставку";
            confirmButton.classList.add("btn", "btn-primary");
            itemRow.appendChild(confirmButton);
            confirmButton.addEventListener("click", () => {
                updateStatusOrder(order.id);
                window.location.reload();
            });
        }
    
        orderItems.appendChild(itemRow);
    });
}

// Выполнить GET-запрос
fetch(`https://food-delivery.kreosoft.ru/api/order/${orderId}`, options)
    .then(response => response.json())
    .then(data => {
        handleResponseOrder(data);
    })
    .catch(error => {
        console.error("Ошибка при получении данных:", error);
    });