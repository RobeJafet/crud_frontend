$(function(){
    consultar();
})

function consultar(){
    $.ajax({
        url: 'https://api.mediterrum.site/reporte/top-usuarios/2023-01-01/6',
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}