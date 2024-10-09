var userId;
var token;

$(function() {
    const params = new URLSearchParams(window.location.search);
    token = params.get('token');
    userId = params.get('id');
    if (!token) {
        window.location.href = './login.html';
    }
});



$('#password-form').on('submit', function(e) {
    e.preventDefault();
    console.log('submit');
    var password = $('#password-input').val();
    const JSONData = JSON.stringify({
        nuevaContrasena: password
    });
    $.ajax({
        url: `http://api.mediterrum.site/usuarios/${userId}/contrasena`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSONData,
        headers: {
            'Authorization': `Bearer ${token}` 
        },
        success: function(response) {
            alert('Contraseña actualizada');
            window.localStorage.clear();
            window.location.href = './';
        },
        error: function(xhr, status, error) {
            console.log("ERROR");
        }
    });
  });