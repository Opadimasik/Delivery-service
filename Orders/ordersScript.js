
const tokenGetFromCookkie = getCookie('token');
console.log(tokenGetFromCookkie);
if (tokenGetFromCookkie !== null) {
data = 
{
    token: tokenGetFromCookkie
}

const url = "https://food-delivery.kreosoft.ru/api/order";
var token = "Bearer " + data.token;
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
            <td><a href="C:/Users/kfk55/.vscode/WebFront-Hits-frontend-project-1/Orders/detailOrder.html?orderId=${order.id}"><u>${order.deliveryTime}</u></a></td>
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
}