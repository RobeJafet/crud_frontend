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
