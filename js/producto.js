function consultar() {
    $.ajax({
      url: 'https://api.mediterrum.site/productos',
      type: 'GET',
      success: function (result) {
        var productos = result;
        console.log(productos);
        var html = '';
        productos.forEach(producto => {
            if (producto.descuento>0) {
                html += `
                <div class="col-10 col-md-4 col-lg-2 h-100">
                    <div href="#" class="img-wrapper">
                        <a href="#" class="d-block w-100 h-100">
                            <img src="${producto.imagen}" alt="gotero">
                        </a>
                        <a href="./editar-producto.html?sku=${producto.producto_sku}" class="btn abs green">
                            Ver Info
                        </a>
                    </div>
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
            }
            else{
                html += `
                <div class="col-10 col-md-4 col-lg-2 h-100">
                    <div href="#" class="img-wrapper">
                        <a href="#" class="d-block w-100 h-100">
                            <img src="${producto.imagen}" alt="gotero">
                        </a>
                        <a href="./editar-producto.html?sku=${producto.producto_sku}" class="btn abs green">
                            Ver Info
                        </a>
                    </div>
                    <div class="container-desc mt-10">
                        <form action="submit">
                            <p class="text-center">${producto.nombre}</p>
                            <div class="d-flex justify-content-center py-10">
                                <div class="divider-sm"></div>
                            </div>
                            <div class="d-flex gap-3 justify-content-center">
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
            }

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
