
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
            contentType: 'application/json', 
            data: JSONData,
            success: function(data) {
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('id', data.id);
                window.location.href = `./red.html?usuario_id=${window.localStorage.getItem('id')}`;
            }, error: function() {
                $('#error-message').addClass('show');
            }
        });
    });


    if (window.localStorage.getItem('token')) {
        window.location.href = `./red.html?usuario_id=${window.localStorage.getItem('id')}`;
    }
    
});

$(function() {
    $('.btn-recuperar').click(function(e) {
        e.preventDefault(); 

        var emailRecuperar = $('#recuperar-contrasena').val(); 

        if (emailRecuperar) {
            var JSONData = JSON.stringify({
                email: emailRecuperar
            });

            $.ajax({
                url: 'https://api.mediterrum.site/usuarios/recuperar', 
                type: 'POST',
                contentType: 'application/json',
                data: JSONData,
                success: function(response) {
                    alert('Correo enviado exitosamente. Revisa tu bandeja de entrada.');
                    $('#modal-recuperar').removeClass('show'); 
                },
                error: function(error) {
                    alert('No se encontró un usuario con ese correo.');
                }
            });
        } else {
            alert('Por favor, ingresa un correo válido.');
        }
    });
});

