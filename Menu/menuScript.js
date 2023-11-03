
function fetchData(page) {
    const categories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(checkbox => checkbox.value);
    const vegetarian = document.querySelector('#vegetarian').checked;
    const sorting = document.querySelector('#sorting').value;
    
    const categoryParams = categories.map(category => `categories=${category}`).join('&');
    const options = new URLSearchParams({
        page,
        vegetarian,
        sorting,
    }).toString();

    const url = `https://food-delivery.kreosoft.ru/api/dish?${options}&${categoryParams}`;
    console.log(url);

    $.get(url, function (data) {
        const dishes = data.dishes;
        const pagination = data.pagination;


        $('#menu').empty();
        $('#pagination').empty();

        
        dishes.forEach(dish => {
            const stars = getStarRating(dish.rating);
            const isVegetarian = dish.vegetarian;
            const vegetarianIcon = isVegetarian
                ? '<img src="C:/Users/kfk55/.vscode/WebFront-Hits-frontend-project-1/files/листочек.png" class="vegetarian-icon" >'
                : '';
        
            const card = `
                <div class="col-md-5 mb-3">
                    <div class="card">
                        <div class="position-relative">
                            <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
                            ${isVegetarian ? vegetarianIcon : ''}
                        </div>
                        <div class="card-body" id="${dish.id}">
                            <h5 class="card-title">${dish.name}</h5>
                            <p class="card-text" style="font-size: 12px;">${dish.description}</p>
                            <p class="card-text">Цена: $${dish.price}</p>
                            <p class="card-text">Категория: ${dish.category}</p>
                            <p class="card-text">Рейтинг: ${stars}</p>
                            <a href="C:/Users/kfk55/.vscode/WebFront-Hits-frontend-project-1/Dish/dishHTML.html?id=${dish.id}" class="btn btn-primary">Подробнее</a>
                        </div>
                    </div>
                </div>
            `;
            $('#menu').append(card);
        });
        

        
        for (let i = 1; i <= pagination.count; i++) {
            const liClass = i === pagination.current ? 'page-item active' : 'page-item';
            const li = `<li class="${liClass}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            $('#pagination').append(li);
        }
    });
}


fetchData(1, ['Wok', 'Pizza', 'Soup', 'Dessert', 'Drink'], false, 'NameAsc');


$('#pagination').on('click', 'a', function (e) {
    e.preventDefault();
    const page = $(this).data('page');
    fetchData(page, '', false, 'NameAsc');
});

function updateMenu() {
    const page = 1; 
    fetchData(page);
}


document.querySelector('#vegetarian').addEventListener('change', updateMenu);


document.querySelector('#sorting').addEventListener('change', updateMenu);


document.querySelectorAll('.category-checkbox').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateMenu(); 
    });
});

document.querySelectorAll('.card').forEach(img => {
    img.addEventListener('click', function() {
        console.log("Yra")
        const card = img.closest('.card-body');
        const productId = card.id;
        window.location.href = `/Dish/dishHTML.html?id=${productId}`;
    });
});