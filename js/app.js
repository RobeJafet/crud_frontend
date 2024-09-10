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

localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6Im1lZGl0ZXJydW0iLCJpYXQiOjE3MjU4NTgyNjMsImV4cCI6MTcyNTg4NzA2M30.-JejUNOkMAOIRYikGdme4K0WqdgGnfsNg_jneG-hObs');

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
    url: 'http://localhost:3000/api/users',
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    success: function (result) {
      var users = result;
      var html = '';
      users.forEach(user => {
        html += `
        <div class="row pt-lg-20">
          <div class="col-lg-3-esp">
            <div class="contain-text">
              <p>${user.nombre}</p>
            </div>
          </div>
          <div class="col-lg-2-esp">
            <div class="contain-text">
              <p>${user.rol}</p>
            </div>
          </div>
          <div class="col-lg-2-esp">
            <div class="contain-text">
              <p>${user.email}</p>
            </div>
          </div>
          <div class="col-lg-2-esp">
            <div class="contain-text">
              <p>${user.telefono}</p>
            </div>
          </div>
          <div class="col-lg-1-esp">
            <div class="contain-text">
              <p>${user.puntos_total}</p>
            </div>
          </div>
          <div class="col-lg-1-esp">
            <div class="contain-text">
              <p>${user.nivel}</p>
            </div>
          </div>
          <div class="col-lg-3-esp">
            <div class="d-flex gap-3 justify-content-center">
              <a href="#" class="btn small btn-eliminar" data-id="${user.id}" data-target="#modal-eliminar" data-toggle="show">
                Borrar
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.23077 2.96154L9.30769 6.03846M9.30769 2.96154L6.23077 6.03846M4.07692 0.5L1 4.5L4.07692 8.5H13.3077V0.5H4.07692Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="edit.html?id=${user.id}" class="btn brown small">
                Editar
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.80206 1.84283L9.65717 3.69794M1.61837 8.02652L1 10.5L3.47348 9.88163L10.6379 2.71721C10.8698 2.48528 11 2.17077 11 1.84283C11 1.51489 10.8698 1.20038 10.6379 0.96846L10.5315 0.8621C10.2996 0.630248 9.9851 0.5 9.65717 0.5C9.32923 0.5 9.01471 0.630248 8.78279 0.8621L1.61837 8.02652Z" stroke="#F7F6F3" stroke-width="0.618369" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <div class="position-relative">
                <a href="#" class="toggle-button" data-toggle="show" data-target="#cuad-red-${user.id}">
                  <span></span>
                  <span></span>
                </a>
                <div class="cuad-red" id="cuad-red-${user.id}">
                  <a href="#" class="btn-cuad">
                    Cambiar Superior
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 7.96338C13 9.15006 12.6481 10.3101 11.9888 11.2968C11.3295 12.2835 10.3925 13.0525 9.2961 13.5067C8.19975 13.9608 6.99335 14.0796 5.82946 13.8481C4.66557 13.6166 3.59648 13.0451 2.75736 12.206C1.91825 11.3669 1.3468 10.2978 1.11529 9.13392C0.88378 7.97003 1.0026 6.76363 1.45673 5.66728C1.91085 4.57092 2.67989 3.63385 3.66658 2.97456C4.65328 2.31527 5.81331 1.96338 7 1.96338C5.61391 3.66805 4.80565 5.76924 4.692 7.96338C4.80565 10.1575 5.61391 12.2587 7 13.9634C8.08652 12.627 8.82272 11.0408 9.142 9.34838M1 7.96338H7.923M7.892 4.47038C7.542 4.41038 7.542 3.90638 7.892 3.84538C8.51346 3.73689 9.0886 3.44601 9.54428 3.00974C9.99996 2.57347 10.3156 2.01152 10.451 1.39538L10.471 1.29838C10.548 0.951376 11.041 0.948376 11.121 1.29538L11.146 1.40838C11.2858 2.02214 11.604 2.58084 12.0606 3.01413C12.5172 3.44743 13.0918 3.73595 13.712 3.84338C14.064 3.90438 14.064 4.41138 13.712 4.47338C13.0918 4.5808 12.5172 4.86932 12.0606 5.30262C11.604 5.73591 11.2858 6.29461 11.146 6.90838L11.121 7.02038C11.041 7.36638 10.548 7.36438 10.471 7.01738L10.451 6.92138C10.3156 6.30523 9.99996 5.74328 9.54428 5.30701C9.0886 4.87074 8.51346 4.57886 7.892 4.47038Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                  <div class="divide-cuad"></div>
                  <a href="#" class="btn-cuad">
                    Ver Red
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 7.96338C13 9.15006 12.6481 10.3101 11.9888 11.2968C11.3295 12.2835 10.3925 13.0525 9.2961 13.5067C8.19975 13.9608 6.99335 14.0796 5.82946 13.8481C4.66557 13.6166 3.59648 13.0451 2.75736 12.206C1.91825 11.3669 1.3468 10.2978 1.11529 9.13392C0.88378 7.97003 1.0026 6.76363 1.45673 5.66728C1.91085 4.57092 2.67989 3.63385 3.66658 2.97456C4.65328 2.31527 5.81331 1.96338 7 1.96338C5.61391 3.66805 4.80565 5.76924 4.692 7.96338C4.80565 10.1575 5.61391 12.2587 7 13.9634C8.08652 12.627 8.82272 11.0408 9.142 9.34838M1 7.96338H7.923M7.892 4.47038C7.542 4.41038 7.542 3.90638 7.892 3.84538C8.51346 3.73689 9.0886 3.44601 9.54428 3.00974C9.99996 2.57347 10.3156 2.01152 10.451 1.39538L10.471 1.29838C10.548 0.951376 11.041 0.948376 11.121 1.29538L11.146 1.40838C11.2858 2.02214 11.604 2.58084 12.0606 3.01413C12.5172 3.44743 13.0918 3.73595 13.712 3.84338C14.064 3.90438 14.064 4.41138 13.712 4.47338C13.0918 4.5808 12.5172 4.86932 12.0606 5.30262C11.604 5.73591 11.2858 6.29461 11.146 6.90838L11.121 7.02038C11.041 7.36638 10.548 7.36438 10.471 7.01738L10.451 6.92138C10.3156 6.30523 9.99996 5.74328 9.54428 5.30701C9.0886 4.87074 8.51346 4.57886 7.892 4.47038Z" stroke="#776254" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>  
            </div>
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
    url: `http://localhost:3000/api/users/${id}`,
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
    url: 'http://localhost:3000/api/users',
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
