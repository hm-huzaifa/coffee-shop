$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:5000/coffee',  // Correct URL to backend
        type: 'GET',
        success: function(data) {
            data.forEach(item => {
                $('#coffeeList').append(`
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${item.image}" class="card-img-top" alt="${item.name}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                                <p class="card-text">$${item.price}</p>
                                <button class="btn btn-primary addToCart" data-id="${item._id}">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `);
            });

            $('.addToCart').on('click', function() {
                const id = $(this).data('id');
                const token = localStorage.getItem('token');
                $.ajax({
                    url: `http://localhost:5000/cart/${id}`,
                    type: 'POST',
                    headers: { 'Authorization': token },
                    success: function(response) {
                        alert('Added to cart');
                    },
                    error: function(response) {
                        alert(response.responseText);
                    }
                });
            });
        },
        error: function(response) {
            alert(response.responseText);
        }
    });
});
