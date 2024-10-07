
const params = new URLSearchParams(window.location.search);
const token = params.get('token');
const userId = params.get('id');

$(function() {
    $('#password-form').submit(function(e) {
        e.preventDefault();
        var password = $('#password-input').val();

        const JSONData = JSON.stringify({
            nuevaContrasena: password
        });

        $.ajax({
            url: `http://localhost:3000/usuarios/${userId}/contrasena`, // Asegúrate de que esta URL coincide con la ruta que has definido
            type: 'PUT',
            contentType: 'application/json',
            data: JSONData,
            headers: {
                'Authorization': `Bearer ${token}` // Añadir el token en el encabezado
            },
            success: function(response) {
                window.location.href = './usuarios.html';
            },
            error: function(xhr, status, error) {
                console.log("ERROR");
            }
        });
    });

    // Redirigir si el token no está presente
    if (!token) {
        window.location.href = './login.html';
    }
});
