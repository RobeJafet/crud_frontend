function consultar() {
    $.ajax({
      url: 'https://api.mediterrum.site/productos',
      type: 'GET',
      success: function (result) {
        var productos = result;
        var html = '';
        productos.forEach(producto => {
          console.log(producto);
          html += `
          <div class="col-10 col-md-4 col-lg-2 h-100">
          <a href="#" class="img-wrapper">
              <img src="${producto.imagen}" alt="gotero">
              <div class="btn abs green">
                  Ver Info
              </div>
          </a>
          <div class="container-desc mt-10">
              <form action="submit">
                  <p class="text-center">${producto.nombre}</p>
                  <div class="d-flex justify-content-center py-10">
                      <div class="divider-sm"></div>
                  </div>
                  <div class="d-flex gap-3 justify-content-center">
                      <p class="discount">$${producto.costo-(producto.costo*(producto.descuento/100))}</p>
                      <p>$${producto.costo}</p>
                  </div>
                  <div class="d-flex justify-content-center pt-25">
                      <button class="btn dark-brown">
                          Agregar a Carrito
                      </button>
                  </div>
              </form>
          </div>
      </div>
          `;
        });
        $('#productos').html(html);
      },
      error: function () {
        console.log('A problem to access the database');
      }
    });
}

$(function () {
    consultar();
});



$('#form-agregar-producto').on('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores de los inputs
    var sku = $('#sku').val();
    var nombreProducto = $('#nombre').val();
    var precio = $('#precio').val();
    var descuento = $('#descuento').val();
    var cantidadInventario = $('#cantidad').val();
    var descripcion = $('#textarea-producto').val();
    
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
        descuento: descuento || 0, // Si no hay descuento, se envía como 0
        cantidad_inventario: cantidadInventario,
        descripcion: descripcion || null, // Si no hay descripción, se envía como null
    };

    // Hacer la solicitud AJAX
    $.ajax({
        url: 'https://api.mediterrum.site/productos',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(productoData),
        success: function(response) {
            // Limpiar los campos del formulario después de enviar
            $('#sku').val('');
            $('#nombre').val('');
            $('#precio').val('');
            $('#descuento').val('');
            $('#cantidad').val('');
            $('#textarea-producto').val('');
        },
        error: function(error) {
            console.log(error);
            alert('Ocurrió un error al agregar el producto');
        }
    });
});
