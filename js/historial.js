$(function(){
    consultar();
})

var token;

function consultar(){
    token = window.localStorage.getItem('token');
    if (!token) {
        setTimeout(function () {
            $('#modal-unlogin').addClass('show');
        }, 100);
    }
    var params = new URLSearchParams(window.location.search);
    var usuario_id = params.get('usuario_id');
    $.ajax({
        url: 'https://api.mediterrum.site/usuarios/' + usuario_id + '/historial',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            var productos = result[0];
            console.log(productos);
            var html = '';
            productos.forEach(producto => {
                if (!producto || !producto.hasOwnProperty('descripcion') || producto.descripcion == null) {
                    return;
                }
                let fecha = new Date(producto.fecha);
                let formattedDate = ("0" + fecha.getDate()).slice(-2) + "/" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "/" + fecha.getFullYear().toString().substr(-2);
                html += `
                <div class="row pt-30 pt-md-20 hist">
                    <div class="col-12 col-md-4">
                        <div class="row">
                            <div class="col-4 d-md-none pl-45 pr-0">
                                <p class="c-green detalle d-md-none">Fecha</p>
                            </div>
                            <div class="col-8 col-md-12 pr-45 pr-md-15">
                                <div class="pl-md-30 pr-md-15">
                                    <p class="text-md-center detalle">${formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row pt-15 pt-md-0">
                            <div class="col-4 d-md-none pl-45 pr-0">
                                <p class="c-green detalle d-md-none">Descripción</p>
                            </div>
                            <div class="col-8 col-md-12 pr-45 pr-md-15">
                                <div class="pr-md-30 pl-md-15">
                                    <p class="text-lg-center">${producto.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 d-md-none px-45 pt-25 divider-container">
                        <div class="divider"></div>
                    </div>
                </div>
                `
            });
            $('#historial').html(html);
        }
    });
}