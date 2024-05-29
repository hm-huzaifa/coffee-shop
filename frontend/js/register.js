$('#registerForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: 'http://localhost:5000/auth/register',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: $('#username').val(),
            password: $('#password').val()
        }),
        success: function(response) {
            alert('User registered successfully');
            window.location.href = 'login.html';
        },
        error: function(response) {
            alert(response.responseText);
        }
    });
});
