$('#loginForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: 'http://localhost:5000/auth/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: $('#username').val(),
            password: $('#password').val()
        }),
        success: function(response) {
            localStorage.setItem('token', response.token);
            window.location.href = 'coffee.html';
        },
        error: function(response) {
            alert(response.responseText);
        }
    });
});
