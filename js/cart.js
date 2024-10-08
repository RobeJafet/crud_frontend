var token;

function consultar() {
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

    $.ajax({
        url: `https://api.mediterrum.site/carrito/${usuario_id}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        success: function(result) {
            var productos = result;
            var total = 0;

            let promises = productos.map((producto_carrito, index) => {
                return $.ajax({
                    url: `https://api.mediterrum.site/productos/${producto_carrito.producto_sku}`,
                    type: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token 
                    }
                }).then(productoResult => {
                    return { producto_carrito, productoResult, index };
                });
            });

            Promise.all(promises).then((responses) => {
                responses.sort((a, b) => a.index - b.index);

                let html = '';
                responses.forEach(({ producto_carrito, productoResult }) => {
                    let descuento = productoResult.descuento;
                    let img = productoResult.imagen;
                    let producto_sku = productoResult.producto_sku;
                    let costo_con_descuento = descuento > 0
                        ? producto_carrito.costo - (producto_carrito.costo * (descuento / 100))
                        : producto_carrito.costo;

                    let itemTotal = costo_con_descuento * producto_carrito.cantidad;
                    total += itemTotal;

                    let descuentoHtml = descuento > 0
                        ? `<p class="discount">$${costo_con_descuento}</p>
                           <p>$${itemTotal}</p>`
                        : `<p class="discount">$${producto_carrito.costo}</p>
                           <p>$${producto_carrito.costo_total}</p>`;

                    html += `
                    <div class="row pt-15">
                        <div class="col-4 d-none d-md-block">
                            <div class="img-wrapper">
                                <img src="${img}" alt="../assets/gotero.jpg">
                            </div>
                        </div>
                        <div class="col-12 col-md-8">
                            <div class="container-white">
                                <p>${producto_carrito.nombre}</p>
                                <div class="d-flex gap-3 pt-15">
                                    ${descuentoHtml}
                                </div>
                                <div class="d-flex justify-content-between mt-auto pt-15">
                                    <div class="box-quantity">
                                        <a href="#" class="minus-sym">
                                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6L7.4641 9.53674e-07L0.535898 9.53674e-07L4 6Z" fill="#B6A996"/>
                                            </svg>
                                        </a>
                                        <input type="hidden" name="sku" value="${producto_sku}">
                                        <input type="text" name="cantidad" value="${producto_carrito.cantidad}">
                                        <a href="#" class="plus-sym">
                                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="#B6A996"/>
                                            </svg>
                                        </a>
                                    </div>
                                    <a href="#" class="trash-button delete-from-cart" data-sku="${producto_sku}">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 1.5C9.13261 1.5 9.25979 1.55268 9.35355 1.64645C9.44732 1.74021 9.5 1.86739 9.5 2C9.5 2.13261 9.44732 2.25979 9.35355 2.35355C9.25979 2.44732 9.13261 2.5 9 2.5H8.5L8.4985 2.5355L8.032 9.071C8.01404 9.32329 7.90115 9.55941 7.71606 9.73179C7.53097 9.90417 7.28743 10 7.0345 10H2.965C2.71207 10 2.46853 9.90417 2.28344 9.73179C2.09835 9.55941 1.98546 9.32329 1.9675 9.071L1.501 2.536L1.5 2.5H1C0.867392 2.5 0.740215 2.44732 0.646447 2.35355C0.552678 2.25979 0.5 2.13261 0.5 2C0.5 1.86739 0.552678 1.74021 0.646447 1.64645C0.740215 1.55268 0.867392 1.5 1 1.5H9ZM6 0C6.13261 0 6.25979 0.0526784 6.35355 0.146447C6.44732 0.240215 6.5 0.367392 6.5 0.5C6.5 0.632608 6.44732 0.759785 6.35355 0.853553C6.25979 0.947322 6.13261 1 6 1H4C3.86739 1 3.74021 0.947322 3.64645 0.853553C3.55268 0.759785 3.5 0.632608 3.5 0.5C3.5 0.367392 3.55268 0.240215 3.64645 0.146447C3.74021 0.0526784 3.86739 0 4 0H6Z" fill="#B6A996"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });

                $('#productos-carrito').html(html);

                $('.total-amount').html(`Total: $${total.toFixed(2)}`);
            });
        },
        error: function() {
            console.log('A problem to access the database');
        }
    });
}



$(function() {
    consultar();
});

$(document).on('click', '.minus-sym', function(e) {
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

    var cantidad = $(this).closest('.box-quantity').find('input[name="cantidad"]').val();
    var producto_sku = $(this).closest('.box-quantity').find('input[name="sku"]').val();


    if (cantidad > 1) {
        $(this).closest('.box-quantity').find('input').val(parseInt(cantidad) - 1);

        var JSONData = JSON.stringify({
            usuario_id: usuario_id,
            producto_sku: producto_sku,
            nueva_cantidad: cantidad - 1
        });

        $.ajax({
            url: 'https://api.mediterrum.site/carrito/modificar-cantidad',
            type: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: JSONData,
            success: function(response) {
                consultar();
            },
            error: function(error) {
                alert('Error al actualizar la cantidad.');
            }
        });
    }
});


$(document).on('click', '.plus-sym', function(e) {
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

    var cantidad = $(this).closest('.box-quantity').find('input[name="cantidad"]').val();
    var producto_sku = $(this).closest('.box-quantity').find('input[name="sku"]').val();

    $(this).closest('.box-quantity').find('input').val(parseInt(cantidad) + 1);

    var JSONData = JSON.stringify({
        usuario_id: usuario_id,
        producto_sku: producto_sku,
        nueva_cantidad: parseInt(cantidad) + 1
    });

    $.ajax({
        url: 'https://api.mediterrum.site/carrito/modificar-cantidad',
        type: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: JSONData,
        success: function(response) {
            consultar();
        },
        error: function(error) {
            console.log(error);
            alert('Error al actualizar la cantidad.');
        }
    });
});

$(document).on('click', '.delete-from-cart', function(e) {
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

    var producto_sku = $(this).data('sku');

    var JSONData = JSON.stringify({
        usuario_id: usuario_id,
        producto_sku: producto_sku
    });

    $.ajax({
        url: 'https://api.mediterrum.site/carrito/eliminar-producto',
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: JSONData,
        success: function(response) {
            consultar();
        },
        error: function(error) {
            alert('Error al eliminar el producto.');
        }
    });

});