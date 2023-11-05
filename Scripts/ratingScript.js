function getStarRating(rating) {
    let stars = '';
            for (let i = 0; i < 10; i++) {
                if (i < rating) {
                    stars += '★';
                } else {
                    stars += '☆';
                }
            }
            return `<span class="stars">${stars}</span>`;
}