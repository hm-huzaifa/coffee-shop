$(document).ready(function() {
    // Register form submission
    $('#register-form').on('submit', function(event) {
      event.preventDefault();
      let data = {
        username: $('#username').val(),
        password: $('#password').val()
      };
      $.post('/auth/register', data, function(response) {
        alert(response);
        window.location.href = 'login.html';
      });
    });
  
    // Login form submission
    $('#login-form').on('submit', function(event) {
      event.preventDefault();
      let data = {
        username: $('#username').val(),
        password: $('#password').val()
      };
      $.post('/auth/login', data, function(response) {
        if (response.token) {
          localStorage.setItem('token', response.token);
          window.location.href = 'index.html';  // Redirect to main page
        } else {
          alert('Invalid credentials');
        }
      });
    });
  
    // Load coffee items for the menu
    $.get('/coffee', function(data) {
      let menu = $('#coffee-menu');
      data.forEach(item => {
        menu.append(`
          <div class="coffee-item">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
            <img src="${item.image}" alt="${item.name}">
            <button data-id="${item._id}">Add to Cart</button>
          </div>
        `);
      });
    });
  
    // Add to cart
    $('#coffee-menu').on('click', 'button', function() {
      let id = $(this).data('id');
      $.post(`/cart/${id}`, function(response) {
        alert(response);
      });
    });
  
    // Load cart items (placeholder implementation)
    if (window.location.pathname.endsWith('cart.html')) {
      $.get('/cart', function(data) {
        let cart = $('#cart-items');
        cart.append('<p>Cart functionality is under construction.</p>');
      });
    }
  });