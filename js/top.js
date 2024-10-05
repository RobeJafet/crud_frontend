$(function(){
    consultar();
})

function consultar(){

    // Obtener la fecha actual
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaActual.getDate()).slice(-2);

    // Formatear fecha en 'YYYY-MM-DD'
    const fechaFormateada = `${año}-${mes}-${dia}`;

    $.ajax({
        url: `https://api.mediterrum.site/reporte/top-usuarios/${fechaFormateada}/10`,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
             // Iterar sobre la respuesta para agregar los usuarios
        response.forEach((usuario, index) => {
            $('#top-filas').append(`
                <div class="col-12 col-md-6">
                    <p>${index + 1}. ${usuario.nombre}</p>
                </div>
                <div class="col-12 col-md-6">
                    <p class="text-md-center">Puntaje Mensual: ${usuario.total_puntos}</p>
                </div>
            `);
        });
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}