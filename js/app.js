$(document).ready(function () {
  $("header").load("../partials/header.html");
  $("footer").load("../partials/footer.html");
});

$(document).on('click', '[data-toggle="show"]', function (event) {
  event.preventDefault()
  var target = $(this).data('target')
  $(target).toggleClass('show')
})

$(document).on('click', '.toggle-button', function (event) {
  event.preventDefault()
  $(this).toggleClass('active')
})

$(document).on('click', '.toggle-button', function (event) {
  event.preventDefault()
  $(this).toggleClass('active')
})

localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6Im1lZGl0ZXJydW0iLCJpYXQiOjE3MjY1MTM1NDF9.N3Bg3n0-E9uFKRfgbXgdsr7iaWHiA6hIz6aIe2bkmiw');

var token = localStorage.getItem('authToken');

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
  $.ajax({
    url: 'http://mediterrum.test-test-test.xyz/api/users',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    success: function (result) {
      var users = result;
      var html = '';
      users.forEach(user => {
        html += `
        <div class="row pt-20 r-gap-acciones">
          <div class="col-4 col-md-5 offset-md-1 d-lg-none">
              <p class="detalle pl-15 pl-md-0">Nombre</p>
          </div>
          <div class="col-8 col-md-5 col-lg-3-esp">
            <div class="contain-text">
              <p>${user.nombre}</p>
            </div>
          </div>
          <div class="col-4 col-md-5 offset-md-1 d-lg-none">
            <p class="detalle pl-15 pl-md-0">Rol</p>
          </div>
          <div class="col-8 col-md-5 col-lg-2-esp">
            <div class="contain-text">
              <p>${user.rol}</p>
            </div>
          </div>
          <div class="col-4 col-md-5 offset-md-1 d-lg-none">
            <p class="detalle pl-15 pl-md-0">Email</p>
          </div>
          <div class="col-8 col-md-5 col-lg-2-esp">
            <div class="contain-text">
              <p>${user.email}</p>
            </div>
          </div>
          <div class="col-4 col-md-5 offset-md-1 d-lg-none">
            <p class="detalle pl-15 pl-md-0">Teléfono</p>
          </div>
          <div class="col-8 col-md-5 col-lg-2-esp">
            <div class="contain-text ">
              <p>${user.telefono}</p>
            </div>
          </div>
          <div class="col-4 col-md-5 offset-md-1 d-lg-none">
            <p class="detalle pl-15 pl-md-0">Puntos</p>
          </div>
          <div class="col-8 col-md-5 col-lg-1-esp">
            <div class="contain-text">
              <p>${user.puntos_total}</p>
            </div>
          </div>
          <div class="col-4 col-md-5 offset-md-1 d-lg-none">
            <p class="detalle pl-15 pl-md-0">Nivel</p>
          </div>
          <div class="col-8 col-md-5 col-lg-1-esp">
            <div class="contain-text">
              <p>${user.nivel}</p>
            </div>
          </div>
          <div class="col-4 col-md-5 offset-md-1 d-flex align-items-center d-lg-none">
            <p class="detalle pl-15 pl-md-0">Acciones</p>
          </div>
          <div class="col-8 col-md-5 col-lg-3-esp">
            <div class="d-flex gap-3 justify-content-lg-center">
              <a href="#" class="btn small btn-eliminar" data-id="${user.id}" data-target="#modal-eliminar" data-toggle="show">
                Borrar
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.23077 2.96154L9.30769 6.03846M9.30769 2.96154L6.23077 6.03846M4.07692 0.5L1 4.5L4.07692 8.5H13.3077V0.5H4.07692Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="col-md-10 d-lg-none mx-auto pt-20 px-25 px-md-15">
            <div class="pleca-h"></div>
          </div>
        </div>
        `;
      });
      $('#users').html(html);
    },
    error: function () {
      console.log('A problem to access the database');
    }
  });
}

function deleteUser(id) {
  $.ajax({
    url: `http://mediterrum.test-test-test.xyz/api/users/${id}`,
    type: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    success: function () {
      consultar();
    },
  });
}

$(document).on('click', '.btn-eliminar', function (event) {
  event.preventDefault();
  var id = $(this).data('id');
  console.log(id);
  $('.btn-eliminar-modal').data('id', id);
});

$(document).on('click', '.btn-eliminar-modal', function (event) {
  event.preventDefault();
  var id = $(this).data('id');
  $('.container-modal').removeClass('show');
  deleteUser(id);
});

$('form').on('submit', function(e) {
  e.preventDefault();
  var name = $('#input-name').val();
  var role = $('.select-rol').val();
  var email = $('#input-email').val();
  var phone = $('#input-tel').val();

  $.ajax({
    url: 'http://mediterrum.test-test-test.xyz/api/users',
    type: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      nombre: name,
      rol: role,
      email: email,
      telefono: phone,
      puntos_total: 0,
      nivel: 1
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
    }
  });
});
