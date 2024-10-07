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

            $('#editar-nombre').val(producto.nombre);
            $('#editar-precio').val(producto.costo);
            $('#editar-descuento').val(producto.descuento);
            $('#editar-puntos').val(producto.puntos_producto);
            $('#editar-cantidad').val(producto.cantidad);
            $('#textarea-producto').val(producto.descripcion);
        }
    });
});

$('#editar-producto').submit(function(e){
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    var sku = urlParams.get('sku');
    var nombre = $('#editar-nombre').val();
    var precio = $('#editar-precio').val();
    var descuento = $('#editar-descuento').val();
    var puntos = $('#editar-puntos').val();
    var cantidad = Number($('#editar-cantidad').val());
    var descripcion = $('#textarea-producto').val();
    var precio_sin_iva = (precio*0.84);

    var dataToSend = {
        nombre_producto: nombre,
        costo_total: precio,
        descuento: descuento,
        puntos_producto: puntos,
        cantidad: cantidad,
        descripcion: descripcion,
        costo_no_iva: precio_sin_iva
    };

    console.log(dataToSend);
    
    $.ajax({
        url: 'https://api.mediterrum.site/productos/' + sku + '/inventario',
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',  // Asegurar que el contenido sea JSON
        data: JSON.stringify({"cantidad_inventario": cantidad}), // Convertir el valor de cantidad a JSON
        success: function (result) {
        }, error: function (error) {
            console.error(error);
            alert('Error al actualizar el inventario');
        }
    });
    
    $.ajax({
        url: 'https://api.mediterrum.site/productos/' + sku,
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        contentType: 'application/json',  // Especificar el tipo de contenido
        data: JSON.stringify(dataToSend), // Convertir el objeto en JSON
        success: function (result) {
            window.location.href = './productos.html'; // Navigate to ./producto.html
        }, error: function (error) {
            console.error(error);
            alert('Error al actualizar el producto');
        }
    }); 

   
    
});


$('.btn-eliminar-modal').click(function(e){ 
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    var sku = urlParams.get('sku');
    $.ajax({
        url: 'https://api.mediterrum.site/productos/' + sku,
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            window.location.href = './productos.html'; // Navigate to ./producto.html
        }, error: function (error) {
            console.error(error);
            alert('Error al eliminar el producto');
        }
    })
}) 