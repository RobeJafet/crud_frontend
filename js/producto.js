var token;

function consultar() {
    token = window.localStorage.getItem('token');
    if (!token) {
        console.log("No token found");
        return;
    }
    
    $.ajax({
        url: 'https://api.mediterrum.site/productos',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        success: function(result) {
            var productos = result;
            var html = '';
            productos.forEach(producto => {
                var descuentoHtml = producto.descuento > 0 
                    ? `<p>$${producto.costo - (producto.costo * (producto.descuento / 100))}</p>
                       <p class="discount">$${producto.costo}</p>` 
                    : `<p>$${producto.costo}</p>`;

                html += `
                <div class="col-10 col-md-4 col-lg-2 h-100">
                    <div href="#" class="img-wrapper">
                        <a href="./producto-vista.html?sku=${producto.producto_sku}" class="d-block w-100 h-100">
                            <img src="${producto.imagen}" alt="../assets/gotero.jpg">
                        </a>
                        <a href="./editar-producto.html?sku=${producto.producto_sku}" class="btn abs green">
                            Ver Info
                        </a>
                    </div>
                    <div class="container-desc mt-10">
                        <form action="submit" class="add-cart-form">
                            <input type="hidden" name="sku" value="${producto.producto_sku}">
                            <p class="text-center">${producto.nombre}</p>
                            <div class="d-flex justify-content-center py-10">
                                <div class="divider-sm"></div>
                            </div>
                            <div class="d-flex gap-3 justify-content-center">
                                ${descuentoHtml}
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
        error: function() {
            console.log('A problem to access the database');
        }
    });
}

$(function() {
    consultar();
});

$(document).on('submit', '.add-cart-form', function(e) {
    e.preventDefault();
    
    
    token = window.localStorage.getItem('token');
    if (!token) {
        console.log("No token found");
        return;
    }

    var usuario_id = window.localStorage.getItem('id');
    if (!usuario_id) {
        console.log("No user ID found");
        return;
    }
    
    var producto_sku = $(this).find('input[name="sku"]').val();
    var cantidad = 1;

    var JSONData = JSON.stringify({
        usuario_id: usuario_id,
        producto_sku: producto_sku,
        cantidad: cantidad
    });

    $.ajax({
        url: 'https://api.mediterrum.site/carrito/agregar',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        data: JSONData,
        success: function(data) {
            $('.container-carrito').addClass('show');
            $('.modal-carrito').removeClass('vacio');
            consultar();
        },
        error: function(error) {
            console.log(error);
        }
    });
});
