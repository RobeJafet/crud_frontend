var token;

$(document).ready(function() {
    token = window.localStorage.getItem('token');
    if (!token) {
        setTimeout(function () {
            $('#modal-unlogin').addClass('show');
        }, 100);
    }
});


$('#form-agregar-producto').on('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores de los inputs
    var sku = $('#sku').val();
    var nombreProducto = $('#nombre').val();
    var precio = $('#precio').val();
    var descuento = $('#descuento').val();
    var puntos_producto = $('#puntos').val();
    var cantidadInventario = $('#cantidad').val();
    var descripcion = $('#textarea-producto').val();
    var imageFile = $('#image-btn')[0].files[0].name; 

    // Validación de campos vacíos
    if (!sku || !nombreProducto || !precio || !cantidadInventario) {
        alert('Por favor, complete todos los campos obligatorios.');
        return;
    }

    // Validación de formato de precio (número positivo)
    var precioRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!precioRegex.test(precio)) {
        alert('Por favor, ingrese un precio válido.');
        return;
    }

    // Validación de descuento (debe ser un número entre 1 y 100)
    if (descuento && (isNaN(descuento) || descuento < 1 || descuento > 100)) {
        alert('El descuento debe ser un número entre 1 y 100.');
        return;
    }

    // Preparar los datos para enviar a la API
    var productoData = {
        sku: sku,
        nombre_producto: nombreProducto,
        costo_total: precio,
        costo_no_iva: precio * 0.84, // Se calcula el costo sin IVA
        descuento: descuento || 0, // Si no hay descuento, se envía como 0
        cantidad_inventario: cantidadInventario,
        puntos_producto: puntos_producto,
        img:  imageFile,
        descripcion: descripcion || null, // Si no hay descripción, se envía como null
    };


    // Enviar los datos a la API
    $.ajax({
        url: 'https://api.mediterrum.site/productos/',
        type: 'POST',
        contentType: 'application/json',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(productoData),
        success: function(response) {
            alert('Producto agregado correctamente');
            // Limpiar los campos del formulario después de enviar
            $('#sku').val('');
            $('#nombre').val('');
            $('#precio').val('');
            $('#descuento').val('');
            $('#cantidad').val('');
            $('#textarea-producto').val('');
            $('#image-btn').val(''); // Asegúrate de limpiar el campo de imagen
        },
        error: function(error) {
            console.log(error);
            if (error.responseJSON && error.responseJSON.mensaje) {
                alert(error.responseJSON.mensaje);
            } else {
                alert('Ocurrió un error al agregar el producto');
            }
        }
    });
});


$('#image-btn').on('change', function(e) {
    var file = e.target.files[0];

    if (file) {
        // Mostrar el nombre del archivo
        $('#file-chosen').text(file.name);

        // Cargar y mostrar la vista previa de la imagen
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#preview-img').attr('src', e.target.result).show();
            // Ocultar el label con la clase image-button y el span con id file-chosen
            $('.image-button').hide();
            $('#file-chosen').hide();
        };
        reader.readAsDataURL(file);
    } else {
        // Restablecer si no hay archivo seleccionado
        $('#file-chosen').text('No file chosen').show();
        $('#preview-img').hide();
        // Mostrar el label y el file-chosen de nuevo si no hay imagen seleccionada
        $('.image-button').show();
        $('#file-chosen').show();
    }
});

