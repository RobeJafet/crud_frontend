var token;

$(document).ready(function() {
    const id = obtenerUsuarioIdDesdeUrl(); // Asegúrate de definir esta función
   
    if (id) {
        consultar(id);
        redAnalytics(id);
    } else {
        console.error('No se pudo obtener el usuario_id desde la URL');
    }
});

function obtenerUsuarioIdDesdeUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('usuario_id'); // Devuelve el usuario_id desde la URL
}


function consultar(id) {

    token = window.localStorage.getItem('token');
    if (!token) {
        setTimeout(function () {
            $('#modal-unlogin').addClass('show');
        }, 100);
    }
    const usuario_id = id

    $.ajax({
        url: `https://api.mediterrum.site/usuarios/${usuario_id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        contentType: 'application/json',
        
        success: function(response) {
            usuario = response[0][0];
            const nombre = usuario.nombre;
            const rol = usuario.rol;

            $('#usuario-red-info').html(`
                <p class="text-center">Usuario: ${nombre}</p>
                <p class="text-center pt-10 pt-md-15 pt-lg-20">Rol: ${rol}</p>
            `);

            if (rol=="distribuidor"){
            $('#red-personas').html(`
                <div class="col-12">
                    <h2 class="text-center pb-30" >Red Personas</h2>
                </div>
                <div class="col-8 col-md-6 col-lg-4 text-center">
                    <div class="row justify-content-end">
                        <div class="col-md-9 col-lg-12">
                            <p class="detalle pb-20">Vendedores</p>
                            <div class="d-flex flex-column gap-13" id="red-personas-vendedores">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8 col-md-6 col-lg-4 text-center">
                    <div class="row">
                        <div class="col-md-9 col-lg-12">
                            <p class="detalle pb-20 pt-35 pt-md-0">Promotores</p>
                            <div class="d-flex flex-column gap-13" id="red-personas-promotores">
                            </div>
                        </div>
                    </div>
                </div>
            
            `);
        
            $('#modificar-red').html(`
            <p class="pt-30 pb-10 text-center">
                Distribuidor, no puedes cambiar a un distribuidor de su distribuidor por ahora.
            </p>
            `);
            }


            if (rol=="vendedor"){
                $('#red-personas').html(`
                    <div class="col-12">
                        <h2 class="text-center pb-30" >Red Personas</h2>
                    </div>
                    <div class="col-8 col-md-6 col-lg-4 text-center">
                        <div class="row justify-content-end">
                            <div class="col-md-9 col-lg-12">
                                <p class="detalle pb-20">Distribuidor</p>
                                <div class="d-flex flex-column gap-13" id="red-personas-distribuidor">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-8 col-md-6 col-lg-4 text-center">
                        <div class="row">
                            <div class="col-md-9 col-lg-12">
                                <p class="detalle pb-20 pt-35 pt-md-0">Promotores</p>
                                <div class="d-flex flex-column gap-13" id="red-personas-promotores">
                                </div>
                            </div>
                        </div>
                    </div>
                
                `);
                

            $('#modificar-red').html(`
            <p class="pt-30">Distribuidor original</p>
            <div class="d-flex flex-column pt-10" id="red-distribuidor">
            </div>
            <p class="pt-30 pb-10">
                Cambiar de Distribuidor a
            </p>
            <select class="select-rol" id="select-distribuidor" name="select-input-distribuidor">
            </select>
            <div class="d-flex justify-content-center pt-30 mt-auto">
                <button class="btn under-white" id="cambiar-distribuidor">
                    Cambiar superior
                </button>
            </div>
            `);

            $.ajax({
                url: `https://api.mediterrum.site/listas/distribuidores`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
                },
                contentType: 'application/json',
                success: function(response) {
                    const lista = response;
                    // Limpiar el select antes de agregar opciones
                    $('#select-input-distribuidor').empty();
            
                    // Generar las opciones dinámicamente
                    lista.forEach(distribuidor => {
                        console.log("distribuidires: ", distribuidor);
            
                        $('#select-distribuidor').append(`
                            <option value="${distribuidor.id}">${distribuidor.nombre}</option>
                        `);
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        

            
            
            }

                if (rol=="promotor"){
                    $('#red-personas').html(`
                        <div class="col-12">
                            <h2 class="text-center pb-30" >Red Personas</h2>
                        </div>
                        <div class="col-8 col-md-6 col-lg-4 text-center">
                            <div class="row justify-content-end">
                                <div class="col-md-9 col-lg-12">
                                    <p class="detalle pb-20">Distribuidor</p>
                                    <div class="d-flex flex-column gap-13" id="red-personas-distribuidor">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-8 col-md-6 col-lg-4 text-center">
                            <div class="row">
                                <div class="col-md-9 col-lg-12">
                                    <p class="detalle pb-20 pt-35 pt-md-0">Vendedor</p>
                                    <div class="d-flex flex-column gap-13" id="red-personas-vendedores">
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    `);
                
            $('#modificar-red').html(`
                <p class="pt-30">Vendedor original</p>
                <div class="d-flex flex-column pt-10" id="red-vendedor">
                </div>
                <p class="pt-30 pb-10">
                    Cambiar de Vendedor a
                </p>
                <select class="select-rol" id="select-vendedor" name="select-input-vendedor">
                </select>
                <div class="d-flex justify-content-center pt-30 mt-auto">
                    <button class="btn under-white" id="cambiar-vendedor">
                        Cambiar superior
                    </button>
                </div>
            `);
                    

            $.ajax({
                url: `https://api.mediterrum.site/listas/vendedores`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token 
                },
                contentType: 'application/json',
                success: function(response) {
                    const lista = response;
                    console.log("vendedores: ", lista);
            
                    $('#select-vendedor').empty();
            
                    // Generar las opciones dinámicamente
                    lista.forEach(vendedor => {
                        $('#select-vendedor').append(`
                            <option value="${vendedor.id}">${vendedor.nombre}</option>
                        `);
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
                }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
    $.ajax({
        url: `https://api.mediterrum.site/usuarios/${usuario_id}/red`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        contentType: 'application/json',
        success: function(response) {
            const vendedores = new Set();
            const promotores = new Set();
            const distribuidores = new Set();
            var red = response[0];

            red.forEach(item => {
                vendedores.add(item.VendedorNombre);        
                promotores.add(item.PromotorNombre);       
                distribuidores.add(item.DistribuidorNombre); 
            });
    
            // Convertir los conjuntos a arreglos y ordenarlos
            const vendedoresArray = Array.from(vendedores).sort();
            const promotoresArray = Array.from(promotores).sort();
            const distribuidoresArray = Array.from(distribuidores).sort();
    
            // Crear el HTML para mostrar los vendedores
            $('#red-personas-vendedores').html(vendedoresArray.map(vendedor => `
                <p>${vendedor ? vendedor : "-"}</p>
            `).join(''));
    
            // Crear el HTML para mostrar los promotores
            $('#red-personas-promotores').html(promotoresArray.map(promotor => `
                <p>${promotor ? promotor : "-"}</p>
            `).join(''));
    
            // Crear el HTML para mostrar los distribuidores
            $('#red-personas-distribuidor').html(distribuidoresArray.map(distribuidor => `
                <p>${distribuidor ? distribuidor : "-"}</p>
            `).join(''));

             // Crear el HTML para mostrar los distribuidores
             $('#red-distribuidor').html(distribuidoresArray.map(distribuidor => `
             <p class="pb-5">${distribuidor ? distribuidor : "No asignado."}</p>
            <div class="pleca-w"></div>
            `).join(''));

            // Crear el HTML para mostrar los vendedores
            $('#red-vendedor').html(vendedoresArray.map(vendedor => `
                <p class="pb-5">${vendedor ? vendedor : "No asignado."}</p>
                <div class="pleca-w"></div>
            `).join(''));

        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
    


}


function redAnalytics(id){
    const usuario_id = id;

    // Obtener la fecha actual
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaActual.getDate()).slice(-2);

    // Formatear fecha en 'YYYY-MM-DD'
    const fechaFormateada = `${año}-${mes}-${dia}`;
     // Hacer la petición con la fecha formateada y el usuario_id
     $.ajax({
        url: `https://api.mediterrum.site/reporte/reporte-trimestral-red/${fechaFormateada}/${usuario_id}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        contentType: 'application/json',
        success: function(response) {
            const ventas=response[0];

            $('#red-ventas').html(`
                <h2 class="text-center">Red Ventas</h2>
                <div class="d-flex flex-column justify-content-center h-100">
                <p class="text-center pt-45 ">En este trimestre se vendieron:</p>
                <p class="text-center">$${ventas.ingreso_total ? ventas.ingreso_total : "0"} MXN en total</p>
                <p class="text-center pt-25">En este trimestre se vendieron:</p>
                <p class="text-center">${ventas.productos_vendidos ? ventas.productos_vendidos : "0"} productos</p>
                </div>
            `);

        },
        error: function(error) {
            console.error('Error:', error);
        }
    });

}


$(document).on('click', '#cambiar-distribuidor', function (event) {
    event.preventDefault();
    const usuarioId = obtenerUsuarioIdDesdeUrl();
    const nuevoDistribuidorId = $('#select-distribuidor').val();
    console.log(nuevoDistribuidorId);
    
    $.ajax({
        url: `https://api.mediterrum.site/usuarios/${usuarioId}/distribuidor`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        contentType: 'application/json',
        data: JSON.stringify({
            nuevoDistribuidor: nuevoDistribuidorId
        }),
        success: function(response) {
            console.log('Distribuidor actualizado:', response);
            alert(`Distribuidor actualizado correctamente para el usuario con ID: ${usuarioId}`);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Ocurrió un error al actualizar el distribuidor.');
        }
    });

  });

  $(document).on('click', '#cambiar-vendedor', function (event) {
    event.preventDefault();
    const usuarioId = obtenerUsuarioIdDesdeUrl();
    const nuevoVendedorId = $('#select-vendedor').val(); // Corrected the select to vendedor
    console.log(nuevoVendedorId);
    
    $.ajax({
        url: `https://api.mediterrum.site/usuarios/${usuarioId}/vendedor`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        contentType: 'application/json',
        data: JSON.stringify({
            nuevoVendedor: nuevoVendedorId // Make sure this matches your API's expected field name
        }),
        success: function(response) {
            console.log('Vendedor actualizado:', response);
            alert(`Vendedor actualizado correctamente para el usuario con ID: ${usuarioId}`);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Ocurrió un error al actualizar el vendedor.');
        }
    });
});

