const optionsPost = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": token
    }
};

function updateStatusOrder(orderId)
{
    fetch(`https://food-delivery.kreosoft.ru/api/order/${orderId}/status`, optionsPost)
    .then((response) => {
        if (response.status === 200) {
          
            console.log("Ok");
        
        } else if (response.status === 500) {
          // Ошибка сервера с кодом 500
          response.json().then((errorData) => {
            console.error("Произошла ошибка сервера:", errorData.message);
          });
        } else if (response.status === 400){
          console.log(response.json());
        }
      })
      .catch((error) => {
        // Обработка ошибки сети или других ошибок
        console.error("Произошла ошибка:", error);
      });

}