$( ".header-dropdown-trigger" ).click(function() {
    $( this ).toggleClass( "active" );
    $( ".header-dropdown" ).toggleClass( "expand" );
  });
  
  $( ".header-dropdown li" ).click(function() {
    $( ".header-dropdown-trigger" ).removeClass( "active" );
    $( ".header-dropdown" ).removeClass( "expand" );
  });
  
  $( ".button--approve" ).click(function() {
    $( this ).toggleClass( "active" );
    $( this ).siblings( '.button--deny' ).removeClass( "active" );
  });
  
  $( ".button--deny" ).click(function() {
    $( this ).toggleClass( "active" );
    $( this ).siblings( '.button--approve' ).removeClass( "active" );
  });
  
  $( ".comment-trigger" ).click(function() {
    $( this ).parent().parent().toggleClass( "post--commenting" );
  });
  
  $( ".button--flag" ).click(function() {
    $( this ).parent().parent().toggleClass( "post--commenting" );
  });
  
  
  $( ".button--confirm" ).click(function() {
    $( this ).parent().parent().parent().parent().parent().toggleClass( "post--commenting" );
  });
  
  $( ".button.cancel" ).click(function() {
    $( this ).parent().parent().parent().parent().parent().toggleClass( "post--commenting" );
  });

  if (localStorage.getItem("token") == null) {
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = "signin.html";
  }
  
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  
  const logado = document.querySelector("#logado");
  logado.innerHTML = `Olá ${userLogado.nome}`;
  