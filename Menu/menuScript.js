function getStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 10; i++) {
        if (i < Math.floor(rating)) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}
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
            const card = `
                <div class="card">
                    <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
                    <div class="card-body">
                        <h5 class="card-title">${dish.name}</h5>
                        <p class="card-text">${dish.description}</p>
                        <p class="card-text">Price: $${dish.price}</p>
                        <p class="card-text">Category: ${dish.category}</p>
                        <p class="card-text">Vegetarian: ${dish.vegetarian ? 'Yes' : 'No'}</p>
                        <p class="card-text">Rating: ${stars}</p>
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
