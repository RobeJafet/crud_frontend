$(document).on('click', function (event) {
    if (!$(event.target).closest('.container-button').length) {
        $('.container-button').removeClass('active');
    }
});

$(document).on('click', '.container-button', function (event) {
event.stopPropagation();
});
  
$(document).on('click', '.toggle-button', function (event) {
event.preventDefault()
const $parent = $(this).parent();
if ($parent.hasClass('active')) { 
    $parent.removeClass('active');
    $('.container-button').removeClass('active');
}
else {
    $('.container-button').removeClass('active'); 
    $parent.addClass('active');
}
})

var token;
  
  $(function () {
    consultar();
    $('.select-rol').selectize({
        openOnFocus: false,
        onInitialize: function () {
            var that = this;
  
            this.$control.on("click", function () {
                that.ignoreFocusOpen = true;
                setTimeout(function () {
                    that.ignoreFocusOpen = false;
                }, 50);
            });
        },
        onFocus: function () {
          if (!this.ignoreFocusOpen) {
              this.open();
          }
      },
        hideSelected: true,
    });
  })


  function consultar() {
    token = window.localStorage.getItem('token');
    if (!token) {
        setTimeout(function () {
            $('#modal-unlogin').addClass('show');
        }, 100);
    }
    $.ajax({
        url: 'https://api.mediterrum.site/usuarios',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
            var users = result;
            var html = '';
            users[0].forEach(user => {
            html += `
            <div class="grid-usuarios pt-30">
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 pl-lg-10">
                            <p class="detalle">Nombre</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Rol</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center cap">${user.rol}</p>
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
                            <p class="text-lg-center">${user.email}</p>
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
                            <p class="text-lg-center">${user.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Locación</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.locacion ? user.locacion : "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Puntos</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.puntos ? user.puntos : "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Nivel</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.nivel ? user.nivel : "-"}</p>
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
                                <a href="#" class="btn small brown btn-editar" data-id="${user.usuario_id}" data-target="#modal-editar" data-toggle="show">
                                    Editar
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.49444 1.84283L9.34955 3.69794M1.31075 8.02652L0.692383 10.5L3.16586 9.88163L10.3303 2.71721C10.5621 2.48528 10.6924 2.17077 10.6924 1.84283C10.6924 1.51489 10.5621 1.20038 10.3303 0.96846L10.2239 0.8621C9.992 0.630248 9.67749 0.5 9.34955 0.5C9.02161 0.5 8.7071 0.630248 8.47518 0.8621L1.31075 8.02652Z" stroke="#F7F6F3" stroke-width="0.618369" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <a href="#" class="btn small btn-eliminar" data-id="${user.usuario_id}" data-target="#modal-eliminar" data-toggle="show">
                                    Borrar
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.23077 2.96154L9.30769 6.03846M9.30769 2.96154L6.23077 6.03846M4.07692 0.5L1 4.5L4.07692 8.5H13.3077V0.5H4.07692Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <div class="container-button position-relative">
                                    <a href="#" class="toggle-button">
                                        <span></span>
                                        <span></span>
                                    </a>
                                    <div class="menu-drop">
                                        <a href="./historial.html?usuario_id=${user.usuario_id}" class="link-drop">
                                            Ver Historial
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.34506 10.1879C3.52219 10.1879 3.6706 10.1278 3.79031 10.0076C3.90948 9.88785 3.96906 9.73917 3.96906 9.5615C3.96906 9.38383 3.90894 9.23542 3.78869 9.11625C3.66844 8.99708 3.51975 8.9375 3.34262 8.9375C3.1655 8.9375 3.01708 8.99762 2.89737 9.11787C2.77767 9.23812 2.71808 9.38681 2.71862 9.56394C2.71917 9.74106 2.77929 9.88921 2.899 10.0084C3.01871 10.1275 3.1674 10.1879 3.34506 10.1879ZM3.34506 7.12481C3.52219 7.12481 3.6706 7.06496 3.79031 6.94525C3.90948 6.825 3.96906 6.67604 3.96906 6.49837C3.96906 6.32071 3.90894 6.17256 3.78869 6.05394C3.66844 5.93531 3.51975 5.87573 3.34262 5.87519C3.1655 5.87464 3.01708 5.9345 2.89737 6.05475C2.77767 6.175 2.71808 6.32396 2.71862 6.50162C2.71917 6.67929 2.77929 6.82744 2.899 6.94606C3.01871 7.06469 3.1674 7.12427 3.34506 7.12481ZM3.34506 4.0625C3.52219 4.0625 3.6706 4.00265 3.79031 3.88294C3.90948 3.76269 3.96906 3.61373 3.96906 3.43606C3.96906 3.2584 3.90894 3.11025 3.78869 2.99162C3.66844 2.873 3.51975 2.81342 3.34262 2.81287C3.1655 2.81233 3.01708 2.87219 2.89737 2.99244C2.77821 3.11269 2.71862 3.26137 2.71862 3.4385C2.71862 3.61562 2.77875 3.76404 2.899 3.88375C3.01925 4.00346 3.16794 4.06304 3.34506 4.0625ZM5.8435 9.96937H10.2188V9.15687H5.8435V9.96937ZM5.8435 6.90625H10.2188V6.09375H5.8435V6.90625ZM5.8435 3.84312H10.2188V3.03062H5.8435V3.84312ZM1.313 13C0.938708 13 0.626437 12.8749 0.376187 12.6246C0.125937 12.3744 0.000541667 12.0618 0 11.687V1.313C0 0.938708 0.125396 0.626437 0.376187 0.376187C0.626979 0.125937 0.93925 0.000541667 1.313 0H11.6878C12.0616 0 12.3738 0.125396 12.6246 0.376187C12.8754 0.626979 13.0005 0.93925 13 1.313V11.6878C13 12.0616 12.8749 12.3738 12.6246 12.6246C12.3744 12.8754 12.0618 13.0005 11.687 13H1.313ZM1.313 12.1875H11.6878C11.8124 12.1875 11.927 12.1355 12.0315 12.0315C12.136 11.9275 12.188 11.8127 12.1875 11.687V1.313C12.1875 1.18788 12.1355 1.07304 12.0315 0.9685C11.9275 0.863958 11.8127 0.811958 11.687 0.8125H1.313C1.18788 0.8125 1.07304 0.8645 0.9685 0.9685C0.863958 1.0725 0.811958 1.18733 0.8125 1.313V11.6878C0.8125 11.8124 0.8645 11.927 0.9685 12.0315C1.0725 12.136 1.18788 12.188 1.313 12.1875Z" fill="#776254"/>
                                            </svg>
                                        </a>
                                        <a href="./red.html?usuario_id=${user.usuario_id}" class="link-drop">
                                            Ver Red
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.024 7.96338C13.024 9.15006 12.6721 10.3101 12.0128 11.2968C11.3535 12.2835 10.4164 13.0525 9.32009 13.5067C8.22373 13.9608 7.01733 14.0796 5.85345 13.8481C4.68956 13.6166 3.62046 13.0451 2.78135 12.206C1.94223 11.3669 1.37079 10.2978 1.13928 9.13392C0.907767 7.97003 1.02659 6.76363 1.48071 5.66728C1.93484 4.57092 2.70387 3.63385 3.69057 2.97456C4.67726 2.31527 5.8373 1.96338 7.02399 1.96338C5.6379 3.66805 4.82964 5.76924 4.71599 7.96338C4.82964 10.1575 5.6379 12.2587 7.02399 13.9634C8.11051 12.627 8.84671 11.0408 9.16599 9.34838M1.02399 7.96338H7.94699M7.91599 4.47038C7.56599 4.41038 7.56599 3.90638 7.91599 3.84538C8.53744 3.73689 9.11259 3.44601 9.56827 3.00974C10.0239 2.57347 10.3396 2.01152 10.475 1.39538L10.495 1.29838C10.572 0.951376 11.065 0.948376 11.145 1.29538L11.17 1.40838C11.3097 2.02214 11.6279 2.58084 12.0846 3.01413C12.5412 3.44743 13.1158 3.73595 13.736 3.84338C14.088 3.90438 14.088 4.41138 13.736 4.47338C13.1158 4.5808 12.5412 4.86932 12.0846 5.30262C11.6279 5.73591 11.3097 6.29461 11.17 6.90838L11.145 7.02038C11.065 7.36638 10.572 7.36438 10.495 7.01738L10.475 6.92138C10.3396 6.30523 10.0239 5.74328 9.56827 5.30701C9.11259 4.87074 8.53744 4.57886 7.91599 4.47038Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </a>
                                        <a href="#" class="link-drop">
                                            Ver Ventas
                                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.91944 13V11.4472C2.28148 11.3028 1.73091 11.0259 1.26772 10.6167C0.804538 10.2074 0.464371 9.62963 0.247223 8.88333L1.58333 8.34167C1.76389 8.91944 2.03183 9.3588 2.38717 9.65972C2.7425 9.96065 3.20882 10.1111 3.78611 10.1111C4.27963 10.1111 4.69804 9.99989 5.04133 9.77744C5.38463 9.555 5.55604 9.20882 5.55556 8.73889C5.55556 8.31759 5.42315 7.98369 5.15833 7.73717C4.89352 7.49065 4.27963 7.21067 3.31667 6.89722C2.28148 6.57222 1.5713 6.18415 1.18611 5.733C0.800927 5.28185 0.608334 4.73104 0.608334 4.08056C0.608334 3.29815 0.861112 2.69028 1.36667 2.25694C1.87222 1.82361 2.38982 1.57685 2.91944 1.51667V0H4.36389V1.51667C4.96574 1.61296 5.46239 1.83276 5.85383 2.17606C6.24528 2.51935 6.53104 2.93752 6.71111 3.43056L5.375 4.00833C5.23056 3.62315 5.02593 3.33426 4.76111 3.14167C4.4963 2.94907 4.13519 2.85278 3.67778 2.85278C3.14815 2.85278 2.74491 2.97026 2.46806 3.20522C2.1912 3.44019 2.05278 3.73196 2.05278 4.08056C2.05278 4.47778 2.23333 4.79074 2.59444 5.01944C2.95556 5.24815 3.58148 5.48889 4.47222 5.74167C5.30278 5.98241 5.93183 6.3647 6.35939 6.88856C6.78694 7.41241 7.00048 8.01715 7 8.70278C7 9.55741 6.74722 10.2074 6.24167 10.6528C5.73611 11.0981 5.11019 11.375 4.36389 11.4833V13H2.91944Z" fill="#776254"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
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
            $('#usuarios').html(html);
        },
        error: function () {
            console.log('A problem to access the database');
        }
    });
  }
  
  function deleteUser(id) {
    $.ajax({
        url: `https://api.mediterrum.site/usuarios/${id}`,
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
            },  
        success: function () {
            $('#modal-eliminar').removeClass('show');
            consultar();
        },
        error: function (e) {
            console.log(e);
        }
        });
  }
  
  $(document).on('click', '.btn-eliminar', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    $('.btn-eliminar-modal').data('id', id);
  });

  $(document).on('click', '.btn-eliminar-modal', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    console.log(id);
    deleteUser(id);
  });
  
  
  $(document).on('click', '.btn-editar', function (event) {
    event.preventDefault();
    var id = $(this).data('id');
    $('#btn-editar-modal').data('id', id);
    $.ajax({
      url: `https://api.mediterrum.site/usuarios/${id}`,
      type: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
        },
      success: function (response) {
        usuario = response[0][0];
        console.log(usuario);
        $('#input-name-edit').val(usuario.nombre);
        $('#input-email-edit').val(usuario.email);
        $('#input-tel-edit').val(usuario.telefono);
        $('#input-locacion-edit').val(usuario.locacion);
        var selectizeControl = $('#select-input-edit')[0].selectize;
        if (!selectizeControl.options[usuario.rol]) {
            selectizeControl.addOption({ value: usuario.rol, text: usuario.rol });
        }
        selectizeControl.setValue(usuario.rol);
      },
      error: function (error) {
        console.log(error);
      }
    });
  
  });
  
  $(document).on('click', '#btn-editar-modal', function (event) {
    event.preventDefault();
    
    var name = $('#input-name-edit').val();
    var role = $('#select-input-edit').val();
    var email = $('#input-email-edit').val();
    var phone = $('#input-tel-edit').val();
    var locacion = $('#input-locacion-edit').val();
    var id = $(this).data('id');

    $('#form-editar .invalid-fields .empty-fields').removeClass('show');
    $('#form-editar .invalid-fields .invalid-email').removeClass('show');
    $('#form-editar .invalid-fields .invalid-phone').removeClass('show');
    
    // Validación de campos vacíos
    if (!name || !role || !email || !phone) {
      $('#form-editar .invalid-fields .empty-fields').addClass('show');
      return;
    }
  
    // Validación de email
    var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      $('#form-editar .invalid-fields .invalid-email').addClass('show');
      return;
    }
  
    // Validación de número de teléfono
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      $('#form-editar .invalid-fields .invalid-phone').addClass('show');
      return;
    }
  
    console.log(name, role, email, phone, id);
    
    $.ajax({
      url: `https://api.mediterrum.site/usuarios/${id}`,
      type: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
        },
      data: JSON.stringify({
        nuevoNombre: name,
        nuevoEmail: email,
        nuevoTelefono: phone,
        nuevaLocacion: locacion,
      }),
      success: function (response) {
        console.log(response);
        
        $.ajax({
          url: `https://api.mediterrum.site/usuarios/${id}/rol`,
          type: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token 
            },
          data: JSON.stringify({
            nuevoRol: role // Asegúrate de que este campo sea el correcto según tu API
          }),
          success: function (roleResponse) {
            $('.container-modal').removeClass('show');
            consultar(); // Llama a la función para actualizar la vista después de ambas actualizaciones.
          },
          error: function (xhr, status, error) {
            console.log('Error al actualizar el rol:', xhr.responseJSON.message || 'Error no especificado');
          }
        });
      },
      error: function (xhr, status, error) {
        console.log('Error en actualización de datos:', xhr.responseJSON.message || 'Error no especificado');
      }
    });
  });
  
  
  $('#form-agregar').on('submit', function(e) {
    e.preventDefault();
    var name = $('#input-name').val();
    var role = $('.select-rol').val();
    var email = $('#input-email').val();
    var phone = $('#input-tel').val();
    var locacion = $('#input-locacion').val();
    
    $('#modal-agregar .invalid-fields .empty-fields').removeClass('show');
    $('#modal-agregar .invalid-fields .invalid-email').removeClass('show');
    $('#modal-agregar .invalid-fields .invalid-phone').removeClass('show');
    
    // Validation
    if (!name || !role || !email || !phone) {
      $('#modal-agregar .invalid-fields .empty-fields').addClass('show');
      return;
    }
  
    // Email validation
    var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      $('#modal-agregar .invalid-fields .invalid-email').addClass('show');
      return;
    }

    // Validación de número de teléfono (exactamente 10 dígitos)
  var phoneRegex = /^\d{10}$/; // Asegura que el número tenga exactamente 10 dígitos
  if (!phoneRegex.test(phone)) {
    $('#modal-agregar .invalid-fields .invalid-phone').addClass('show');
    return;
  }
  
    $.ajax({
      url: 'https://api.mediterrum.site/usuarios',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
        },
      data: JSON.stringify({
        nombre: name,
        rol: role,
        email: email,
        telefono: phone,
        locacion: locacion,
        nivel: 1,
      }),
      success: function(response) {
        $('.container-modal').removeClass('show');
        $('#input-name').val('');
        $('#input-email').val('');
        $('#input-tel').val('');
        $('.select-rol')[0].selectize.clear();
        consultar();
      },
      error: function(error) {
        console.log(error);
        alert(error.responseJSON.mensaje);
      }
    });
  });
  
  $('#search-name').on('submit', function(e) {
    e.preventDefault();
    var name = $('#search-name-input').val();
    if (name != ''){
      $.ajax({
        url: `https://api.mediterrum.site/usuarios/param/${name}`,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token
        },
        success: function (result) {
          var users = result;
          var html = '';
          users[0].forEach(user => {
            console.log(user);
            html += `
            <div class="grid-usuarios pt-30">
            <div class="usuario-3">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 pl-lg-10">
                            <p class="detalle">Nombre</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Rol</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.rol}</p>
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
                            <p class="text-lg-center">${user.email}</p>
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
                            <p class="text-lg-center">${user.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Locación</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.locacion ? user.locacion : "-" }</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Puntos</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.puntos ? user.puntos : "-"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usuario-2">
                <div class="row">
                    <div class="col-4 col-md-5 col-lg-12 offset-md-1 d-lg-none">
                        <div class="pl-15 pl-md-0 px-lg-10">
                            <p class="detalle">Nivel</p>
                        </div>
                    </div>
                    <div class="col-8 col-md-5 col-lg-12 pl-0 pl-md-15">
                        <div class="pl-lg-10">
                            <p class="text-lg-center">${user.nivel ? user.nivel : "-"}</p>
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
                                <a href="#" class="btn small brown btn-editar" data-id="${user.usuario_id}" data-target="#modal-editar" data-toggle="show">
                                    Editar
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.49444 1.84283L9.34955 3.69794M1.31075 8.02652L0.692383 10.5L3.16586 9.88163L10.3303 2.71721C10.5621 2.48528 10.6924 2.17077 10.6924 1.84283C10.6924 1.51489 10.5621 1.20038 10.3303 0.96846L10.2239 0.8621C9.992 0.630248 9.67749 0.5 9.34955 0.5C9.02161 0.5 8.7071 0.630248 8.47518 0.8621L1.31075 8.02652Z" stroke="#F7F6F3" stroke-width="0.618369" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <a href="#" class="btn small btn-eliminar" data-id="${user.usuario_id}" data-target="#modal-eliminar" data-toggle="show">
                                    Borrar
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.23077 2.96154L9.30769 6.03846M9.30769 2.96154L6.23077 6.03846M4.07692 0.5L1 4.5L4.07692 8.5H13.3077V0.5H4.07692Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <div class="container-button position-relative">
                                    <a href="#" class="toggle-button">
                                        <span></span>
                                        <span></span>
                                    </a>
                                    <div class="menu-drop">
                                        <a href="#" class="link-drop">
                                            Ver Historial
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.34506 10.1879C3.52219 10.1879 3.6706 10.1278 3.79031 10.0076C3.90948 9.88785 3.96906 9.73917 3.96906 9.5615C3.96906 9.38383 3.90894 9.23542 3.78869 9.11625C3.66844 8.99708 3.51975 8.9375 3.34262 8.9375C3.1655 8.9375 3.01708 8.99762 2.89737 9.11787C2.77767 9.23812 2.71808 9.38681 2.71862 9.56394C2.71917 9.74106 2.77929 9.88921 2.899 10.0084C3.01871 10.1275 3.1674 10.1879 3.34506 10.1879ZM3.34506 7.12481C3.52219 7.12481 3.6706 7.06496 3.79031 6.94525C3.90948 6.825 3.96906 6.67604 3.96906 6.49837C3.96906 6.32071 3.90894 6.17256 3.78869 6.05394C3.66844 5.93531 3.51975 5.87573 3.34262 5.87519C3.1655 5.87464 3.01708 5.9345 2.89737 6.05475C2.77767 6.175 2.71808 6.32396 2.71862 6.50162C2.71917 6.67929 2.77929 6.82744 2.899 6.94606C3.01871 7.06469 3.1674 7.12427 3.34506 7.12481ZM3.34506 4.0625C3.52219 4.0625 3.6706 4.00265 3.79031 3.88294C3.90948 3.76269 3.96906 3.61373 3.96906 3.43606C3.96906 3.2584 3.90894 3.11025 3.78869 2.99162C3.66844 2.873 3.51975 2.81342 3.34262 2.81287C3.1655 2.81233 3.01708 2.87219 2.89737 2.99244C2.77821 3.11269 2.71862 3.26137 2.71862 3.4385C2.71862 3.61562 2.77875 3.76404 2.899 3.88375C3.01925 4.00346 3.16794 4.06304 3.34506 4.0625ZM5.8435 9.96937H10.2188V9.15687H5.8435V9.96937ZM5.8435 6.90625H10.2188V6.09375H5.8435V6.90625ZM5.8435 3.84312H10.2188V3.03062H5.8435V3.84312ZM1.313 13C0.938708 13 0.626437 12.8749 0.376187 12.6246C0.125937 12.3744 0.000541667 12.0618 0 11.687V1.313C0 0.938708 0.125396 0.626437 0.376187 0.376187C0.626979 0.125937 0.93925 0.000541667 1.313 0H11.6878C12.0616 0 12.3738 0.125396 12.6246 0.376187C12.8754 0.626979 13.0005 0.93925 13 1.313V11.6878C13 12.0616 12.8749 12.3738 12.6246 12.6246C12.3744 12.8754 12.0618 13.0005 11.687 13H1.313ZM1.313 12.1875H11.6878C11.8124 12.1875 11.927 12.1355 12.0315 12.0315C12.136 11.9275 12.188 11.8127 12.1875 11.687V1.313C12.1875 1.18788 12.1355 1.07304 12.0315 0.9685C11.9275 0.863958 11.8127 0.811958 11.687 0.8125H1.313C1.18788 0.8125 1.07304 0.8645 0.9685 0.9685C0.863958 1.0725 0.811958 1.18733 0.8125 1.313V11.6878C0.8125 11.8124 0.8645 11.927 0.9685 12.0315C1.0725 12.136 1.18788 12.188 1.313 12.1875Z" fill="#776254"/>
                                            </svg>
                                        </a>
                                        <a href="#" class="link-drop">
                                            Ver Red
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.024 7.96338C13.024 9.15006 12.6721 10.3101 12.0128 11.2968C11.3535 12.2835 10.4164 13.0525 9.32009 13.5067C8.22373 13.9608 7.01733 14.0796 5.85345 13.8481C4.68956 13.6166 3.62046 13.0451 2.78135 12.206C1.94223 11.3669 1.37079 10.2978 1.13928 9.13392C0.907767 7.97003 1.02659 6.76363 1.48071 5.66728C1.93484 4.57092 2.70387 3.63385 3.69057 2.97456C4.67726 2.31527 5.8373 1.96338 7.02399 1.96338C5.6379 3.66805 4.82964 5.76924 4.71599 7.96338C4.82964 10.1575 5.6379 12.2587 7.02399 13.9634C8.11051 12.627 8.84671 11.0408 9.16599 9.34838M1.02399 7.96338H7.94699M7.91599 4.47038C7.56599 4.41038 7.56599 3.90638 7.91599 3.84538C8.53744 3.73689 9.11259 3.44601 9.56827 3.00974C10.0239 2.57347 10.3396 2.01152 10.475 1.39538L10.495 1.29838C10.572 0.951376 11.065 0.948376 11.145 1.29538L11.17 1.40838C11.3097 2.02214 11.6279 2.58084 12.0846 3.01413C12.5412 3.44743 13.1158 3.73595 13.736 3.84338C14.088 3.90438 14.088 4.41138 13.736 4.47338C13.1158 4.5808 12.5412 4.86932 12.0846 5.30262C11.6279 5.73591 11.3097 6.29461 11.17 6.90838L11.145 7.02038C11.065 7.36638 10.572 7.36438 10.495 7.01738L10.475 6.92138C10.3396 6.30523 10.0239 5.74328 9.56827 5.30701C9.11259 4.87074 8.53744 4.57886 7.91599 4.47038Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </a>
                                        <a href="#" class="link-drop">
                                            Ver Ventas
                                            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.91944 13V11.4472C2.28148 11.3028 1.73091 11.0259 1.26772 10.6167C0.804538 10.2074 0.464371 9.62963 0.247223 8.88333L1.58333 8.34167C1.76389 8.91944 2.03183 9.3588 2.38717 9.65972C2.7425 9.96065 3.20882 10.1111 3.78611 10.1111C4.27963 10.1111 4.69804 9.99989 5.04133 9.77744C5.38463 9.555 5.55604 9.20882 5.55556 8.73889C5.55556 8.31759 5.42315 7.98369 5.15833 7.73717C4.89352 7.49065 4.27963 7.21067 3.31667 6.89722C2.28148 6.57222 1.5713 6.18415 1.18611 5.733C0.800927 5.28185 0.608334 4.73104 0.608334 4.08056C0.608334 3.29815 0.861112 2.69028 1.36667 2.25694C1.87222 1.82361 2.38982 1.57685 2.91944 1.51667V0H4.36389V1.51667C4.96574 1.61296 5.46239 1.83276 5.85383 2.17606C6.24528 2.51935 6.53104 2.93752 6.71111 3.43056L5.375 4.00833C5.23056 3.62315 5.02593 3.33426 4.76111 3.14167C4.4963 2.94907 4.13519 2.85278 3.67778 2.85278C3.14815 2.85278 2.74491 2.97026 2.46806 3.20522C2.1912 3.44019 2.05278 3.73196 2.05278 4.08056C2.05278 4.47778 2.23333 4.79074 2.59444 5.01944C2.95556 5.24815 3.58148 5.48889 4.47222 5.74167C5.30278 5.98241 5.93183 6.3647 6.35939 6.88856C6.78694 7.41241 7.00048 8.01715 7 8.70278C7 9.55741 6.74722 10.2074 6.24167 10.6528C5.73611 11.0981 5.11019 11.375 4.36389 11.4833V13H2.91944Z" fill="#776254"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
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
          $('#usuarios').html(html);
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

  $(document).on('click', '#btn-excel', function (event) {
        event.preventDefault();
        $.ajax({
            url: 'https://api.mediterrum.site/usuarios/excel',
            type: 'GET',
            xhrFields: {
                responseType: 'blob'
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            success: function (result) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(result);
                a.href = url;
                a.download = 'usuarios.xlsx'; 
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
  