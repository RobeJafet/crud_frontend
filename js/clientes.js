function consultar() {
    $.ajax({
      url: 'https://api.mediterrum.site/clientes',
      type: 'GET',
      success: function (result) {
        var clientes = result;
        var html = '';
        clientes[0].forEach(cliente => {
            html += `
            <div class="grid-usuarios pt-30">
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Nombre</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Usuario que lo registro</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.usuario_nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Email</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Teléfono</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Locación</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.locacion}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Intereses</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.intereses}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-4">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="d-flex align-items-center align-items-lg-start h-100 pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Acciones</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <div class="d-flex gap-3 justify-content-lg-center flex-wrap">
                                <a href="#" class="btn small brown btn-editar" data-id="${cliente.cliente_id}" data-target="#modal-editar" data-toggle="show">
                                    Editar
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.49444 1.84283L9.34955 3.69794M1.31075 8.02652L0.692383 10.5L3.16586 9.88163L10.3303 2.71721C10.5621 2.48528 10.6924 2.17077 10.6924 1.84283C10.6924 1.51489 10.5621 1.20038 10.3303 0.96846L10.2239 0.8621C9.992 0.630248 9.67749 0.5 9.34955 0.5C9.02161 0.5 8.7071 0.630248 8.47518 0.8621L1.31075 8.02652Z" stroke="#F7F6F3" stroke-width="0.618369" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <a href="#" class="btn small btn-eliminar" data-id="${cliente.cliente_id}" data-target="#modal-eliminar" data-toggle="show">
                                    Borrar
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.23077 2.96154L9.30769 6.03846M9.30769 2.96154L6.23077 6.03846M4.07692 0.5L1 4.5L4.07692 8.5H13.3077V0.5H4.07692Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center d-lg-none pt-15 divider-container">
                <div class="col-md-10 px-30 px-md-15">
                    <div class="divider"></div>
                </div>
            </div>
        </div>`;
        });
        $('#clientes').html(html);
      },
      error: function () {
        console.log('A problem to access the database');
      }
    });
  }
 
  function deleteCliente(id) {
    $.ajax({
      url: `https://api.mediterrum.site/clientes/${id}`,
      type: 'DELETE',
      success: function () {
        consultar();
      },
    });
  }

  $('#form-agregar').on('submit', function(e) {
    e.preventDefault();
    var name = $('#input-name').val();
    var email = $('#input-email').val();
    var phone = $('#input-tel').val();
    var locacion = $('#input-locacion').val();
    var intereses = $('#input-intereses').val();
    
    $('#modal-agregar .invalid-fields .empty-fields').removeClass('show');
    $('#modal-agregar .invalid-fields .invalid-email').removeClass('show');
    
    // Validation
    if (!name || !email || !phone) {
      $('#modal-agregar .invalid-fields .empty-fields').addClass('show');
      return;
    }
  
    // Email validation
    var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      $('#modal-agregar .invalid-fields .invalid-email').addClass('show');
      return;
    }
  
    $.ajax({
      url: 'https://api.mediterrum.site/clientes',
      type: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        nombre: name,
        usuario: 28,
        email: email,
        telefono: phone,
        intereses: intereses,
        locacion: locacion,
      }),
      success: function(response) {
        consultar();
        $('.container-modal').removeClass('show');
        $('#input-name').val('');
        $('#input-email').val('');
        $('#input-tel').val('');
        $('#input-locacion').val('');
        $('#input-intereses').val('');
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
  

  $(document).on('click', '.btn-eliminar', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    $('.btn-eliminar-modal').data('id', id);
  });

  $(document).on('click', '.btn-eliminar-modal', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    console.log(id);
    $('.container-modal').removeClass('show');
    deleteCliente(id);
  });

  $(document).on('click', '#btn-excel', function (event) {
    event.preventDefault();
    $.ajax({
        url: 'https://api.mediterrum.site/clientes/excel',
        type: 'GET',
        xhrFields: {
            responseType: 'blob' 
        },
        success: function (result) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(result);
            a.href = url;
            a.download = 'clientes.xlsx'; 
            document.body.append(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); 
        },
        error: function () {
            console.log('A problem to access the database');
        }
    });
});

    $(document).on('click', '#btn-editar-modal', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    var name = $('#input-name-edit').val();
    var email = $('#input-email-edit').val();
    var phone = $('#input-tel-edit').val();
    var locacion = $('#input-locacion-edit').val();
    var intereses = $('#input-intereses-edit').val();

    $('#modal-editar .invalid-fields .empty-fields').removeClass('show');
    $('#modal-editar .invalid-fields .invalid-email').removeClass('show');

    // Validation
    if (!name || !email || !phone) {
      $('#modal-editar .invalid-fields .empty-fields').addClass('show');
      return;
    }

    // Email validation
    var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      $('#modal-editar .invalid-fields .invalid-email').addClass('show');
      return;
    }

    $.ajax({
        url: `https://api.mediterrum.site/clientes/${id}`,
        type: 'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            nombre: name,
            email: email,
            telefono: phone,
            intereses: intereses,
            locacion: locacion,
        }),
        success: function(response) {
            consultar();
            $('.container-modal').removeClass('show');
            $('#input-name-edit').val('');
            $('#input-email-edit').val('');
            $('#input-tel-edit').val('');
            $('#input-locacion-edit').val('');
            $('#input-intereses-edit').val('');
        },
        error: function(error) {
            console.log(error);
        }
        });
    });


$(document).on('click', '.btn-editar', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    $('#btn-editar-modal').data('id', id);

    $.ajax({
      url: `https://api.mediterrum.site/clientes/${id}`,
      type: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (response) {
        cliente = response[0][0];
        $('#input-name-edit').val(cliente.nombre);
        $('#input-email-edit').val(cliente.email);
        $('#input-tel-edit').val(cliente.telefono);
        $('#input-locacion-edit').val(cliente.locacion);
        $('#input-intereses-edit').val(cliente.intereses);
      },
      error: function (error) {
        console.log(error);
      }
    });
  
  });
  

  $('#search-name').on('submit', function(e) {
    e.preventDefault();
    var name = $('#search-name-input').val();
    if (name != ''){
      $.ajax({
        url: `https://api.mediterrum.site/clientes/param/${name}`,
        type: 'GET',
        success: function (result) {
          var clientes = result;
          var html = '';
          clientes[0].forEach(cliente => {
            console.log(cliente);
            html += `
            <div class="grid-usuarios pt-30">
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Nombre</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Usuario que lo registro</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.usuario}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Email</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Teléfono</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Locación</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.locacion}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Intereses</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${cliente.intereses}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-4">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="d-flex align-items-center align-items-lg-start h-100 pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Acciones</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <div class="d-flex gap-3 justify-content-lg-center flex-wrap">
                                <a href="#" class="btn small brown btn-editar" data-id="${cliente.cliente_id}" data-target="#modal-editar" data-toggle="show">
                                    Editar
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.49444 1.84283L9.34955 3.69794M1.31075 8.02652L0.692383 10.5L3.16586 9.88163L10.3303 2.71721C10.5621 2.48528 10.6924 2.17077 10.6924 1.84283C10.6924 1.51489 10.5621 1.20038 10.3303 0.96846L10.2239 0.8621C9.992 0.630248 9.67749 0.5 9.34955 0.5C9.02161 0.5 8.7071 0.630248 8.47518 0.8621L1.31075 8.02652Z" stroke="#F7F6F3" stroke-width="0.618369" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <a href="#" class="btn small btn-eliminar" data-id="${cliente.cliente_id}" data-target="#modal-eliminar" data-toggle="show">
                                    Borrar
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.23077 2.96154L9.30769 6.03846M9.30769 2.96154L6.23077 6.03846M4.07692 0.5L1 4.5L4.07692 8.5H13.3077V0.5H4.07692Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center d-lg-none pt-15 divider-container">
                <div class="col-md-10 px-30 px-md-15">
                    <div class="divider"></div>
                </div>
            </div>
        </div>
            `;
          });
          $('#clientes').html(html);
        },
        error: function () {
          console.log('A problem to access the database');
        }
      });
    }
    else{
      consultar();
    }
  });
  

  $(document).ready(function () {
    consultar();
  });