var id;
var token;

$(document).ready(function () {
  $("header").load("../partials/header.html");
  $("footer").load("../partials/footer.html");
});

$(window).on('load', function () {
  $('.loader').fadeOut(500);
});

$(document).on('click', function (event) {
  if (!$(event.target).closest('.cerrar-sesion-modal, #logo-header').length) {
      $('.cerrar-sesion-modal.show').removeClass('show');
  }
});

$(document).on('click', '[data-toggle="show"]', function (event) {
  event.preventDefault()
  var target = $(this).data('target')
  $(target).toggleClass('show')
})

$(document).ready(function() {
  setTimeout(function() {
    var current = location.pathname;
  $('.nav-item a').each(function() {
    var $this = $(this);
    if ($this.attr('href').indexOf(current) !== -1) {
        $this.addClass('active');
    }
  })
  }, 10);

  if ((window.localStorage.getItem('token')) && (window.localStorage.getItem('id'))) {
    id = window.localStorage.getItem('id');
    token = window.localStorage.getItem('token');

    $.ajax({
      url: 'https://api.mediterrum.site/usuarios/' + id,
      type: 'GET',
      contentType: 'application/json',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      success: function (data) {
        usuario = data[0][0];
        $('#usuario-nombre').text(usuario.nombre);
        $('#usuario-rol').text(usuario.rol);

      },
      error: function (error) {
        console.log(error);
      }
    });

  }
});




$(document).on('click', '.cerrar-sesion-modal', function (event) {
  event.preventDefault();
  window.localStorage.clear();
  window.location.href = './';
});



$(document).on('click', '.btn-carrito', function (event) {
   if ($('#productos-carrito .row.pt-15').length == 0){
    $('.modal-carrito').addClass('vacio');
   } else{
    $('.modal-carrito').removeClass('vacio');
   }
});