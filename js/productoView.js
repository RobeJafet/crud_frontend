var token;

$(function(){
    const urlParams = new URLSearchParams(window.location.search);
    token = window.localStorage.getItem('token');
    var sku = urlParams.get('sku');
    $.ajax({
        url: 'https://api.mediterrum.site/productos/'+sku,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            var producto = result;  
            console.log(producto);

            $('#producto-nombre').text(producto.nombre);
            $('#producto-precio').text(producto.costo);
            $('#producto-puntos').text(producto.puntos_producto);
            $('#producto-descripcion').text(producto.descripcion);
        }
    });
});
