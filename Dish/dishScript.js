
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


function fetchProductInfo(productId) {
    fetch(`https://food-delivery.kreosoft.ru/api/dish/${productId}`)
        .then(response => response.json())
        .then(data => {
            const productInfoDiv = document.getElementById('product-info');
            const stars = getStarRating(data.rating);
            productInfoDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <p>Цена: $${data.price}</p>
                <p>Категория: ${data.category}</p>
                <p>Рейтинг: ${stars}</p>
                <img src="${data.image}" alt="${data.name}" style="max-width: 100%;">
            `;
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });
}

fetchProductInfo(productId);