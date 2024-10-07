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
});



$(document).on('click', '.cerrar-sesion-modal', function (event) {
  event.preventDefault();
  window.localStorage.clear();
  window.location.href = './';
});