data = 
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiIzNTJhY2ZlZi00NDUwLTRiNmYtYTcxNi02NzMwNmMwNjc1OGQiLCJuYmYiOjE2OTkwMjk2MjYsImV4cCI6MTY5OTAzMzIyNiwiaWF0IjoxNjk5MDI5NjI2LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.wJDfJzmsnGIkqfKYOSD_n3YXsa_qWeNxQLkmcao0KGg"
}
const url = "https://food-delivery.kreosoft.ru/api/order";
const token = "Bearer " + data.token;
const options = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    "Authorization": token
    }
};
function handleResponse(data) {
    const orderTable = document.getElementById("orderTable");

    data.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.deliveryTime}</td>
            <td>Заказ от ${new Date(order.orderTime).toLocaleTimeString()}</td>
            <td>${order.status === "InProcess" ? "В обработке" : "Доставлен"}</td>
            <td>${order.price}</td>
        `;

        if (order.status === "InProcess") {
            const confirmButton = document.createElement("button");
            confirmButton.innerText = "Подтвердить доставку";
            confirmButton.classList.add("btn", "btn-primary");
            confirmButton.addEventListener("click", () => {
                updateStatusOrder(order.id);
                row.removeChild(cell);
                const statusCell = row.querySelector("td:nth-child(3)"); // Здесь 3 - номер столбца с статусом
                statusCell.textContent = "Доставлен";
            });

            const cell = document.createElement("td");
            cell.appendChild(confirmButton);
            row.appendChild(cell);
        }

        orderTable.appendChild(row);
    });
}

fetch(url, options)
    .then(response => response.json())
    .then(data => {
        handleResponse(data);
    })
    .catch(error => {
        console.error("Ошибка при получении данных:", error);
    });