$(document).ready(function() {
    const token = localStorage.getItem('token');
    $.ajax({
        url: '/cart',
        type: 'GET',
        headers: { 'Authorization': token },
        success: function(data) {
            // Process and display cart items
            $('#cartItems').append('<p>Your cart items will be displayed here.</p>');
        },
        error: function(response) {
            alert(response.responseJSON.message);
        }
    });
});