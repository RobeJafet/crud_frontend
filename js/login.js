
$(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();
        var email = $('#email-input').val();
        var password = $('#password-input').val();

        JSONData = JSON.stringify({
            email: email,
            contrasena: password
        });

        $.ajax({
            url: 'https://api.mediterrum.site/usuarios/login',
            type: 'POST',
            contentType: 'application/json', // Add this line
            data: JSONData,
            success: function(data) {
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('id', data.id);
                window.location.href = './usuarios.html';
            }, error: function() {
                $('#error-message').addClass('show');
            }
        });
    });


    if (window.localStorage.getItem('token')) {
        window.location.href = './usuarios.html';
    }
    
});