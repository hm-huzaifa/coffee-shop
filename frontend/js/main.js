$(document).ready(function() {
  $.ajax({
      url: 'http://localhost:5000/coffee',
      type: 'GET',
      success: function(data) {
          data.forEach((item, index) => {
            index < 6 ? 
              $('#coffeeList').append(`
                  <div class="col-md-4 my-3">
                      <div class="card" style="width: 18rem;">
                      <a href="coffee.html" class="text-decoration-none text-dark">    
                      <img src="${item.image}" class="card-img-top" style="height: 100px; object-fit: cover;" alt="${item.name}">
                          <div class="card-body">
                              <h5 class="card-title">${item.name}</h5>
                              <p class="card-text">${item.description}</p>
                          </div>
                      </a>
                          </div>
                  </div>
              `): "";
          });        
      },
      error: function(response) {
          alert(response.responseText);
      }
  });
});
