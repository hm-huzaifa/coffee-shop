$(document).ready(function() {
    function updateNavbar() {
        const token = localStorage.getItem('token');
        if (token) {
            $('#authLinks').html(`
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" id="logout" href="#">Logout</a>
                    </li>
                </ul>
            `);
            $('#logout').on('click', function() {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            });
        } else {
            $('#authLinks').html(`
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="register.html">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Login</a>
                    </li>
                </ul>
            `);
        }
    }

    updateNavbar();
});
