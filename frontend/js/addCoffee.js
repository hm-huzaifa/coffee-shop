$('#addCoffeeForm').on('submit', function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    $.ajax({
        url: 'http://localhost:5000/coffee/',
        type: 'POST',
        headers: { 'Authorization': token },
        contentType: 'application/json',
        data: JSON.stringify({
            name: $('#name').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            image: $('#image').val()
        }),
        success: function(response) {
            alert("Coffee Successfully Added.")
            window.location.href = 'index.html';
        },
        error: function(response) {
            alert(response.responseText);
        }
    });
});
