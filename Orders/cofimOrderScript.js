data = 
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmJjNWQ4YS1jYjU4LTRjMjYtOTA5ZC0wOGRiZDZhNzIxYjkiLCJuYW1lIjoibmFtZS5zdXJuYW1lQGRvbWFpbi5jb20iLCJlbWFpbCI6Im5hbWUuc3VybmFtZUBkb21haW4uY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvYXV0aGVudGljYXRpb24iOiIzNTJhY2ZlZi00NDUwLTRiNmYtYTcxNi02NzMwNmMwNjc1OGQiLCJuYmYiOjE2OTkwMjk2MjYsImV4cCI6MTY5OTAzMzIyNiwiaWF0IjoxNjk5MDI5NjI2LCJpc3MiOiJEZWxpdmVyeS5BcGkiLCJhdWQiOiJEZWxpdmVyeS5BcGkifQ.wJDfJzmsnGIkqfKYOSD_n3YXsa_qWeNxQLkmcao0KGg"
}
const url = "https://food-delivery.kreosoft.ru/api/order";
const token = "Bearer " + data.token;
const options = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": token
    }
};

function updateStatusOrder(orderId)
{
    fetch(`https://food-delivery.kreosoft.ru/api/order/${orderId}/status`, options)
    

}