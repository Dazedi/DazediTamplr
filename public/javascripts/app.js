var main = function(){
  $('.dropdown-toggle').click(function() {
    $('.dropdown-menu').toggle();
  });
  
  $(document).click( function(event) {
    if( $(event.target).closest('.dropdown-menu, .dropdown-toggle').length === 0 ){
      $('.dropdown-menu').hide();
    }
  });

  $(".logout").click(function() {
    $.post("/logout", function(data){
      window.location.href = "/";
    });
    // $.ajax({
    //   type: "POST",
    //   url: "http://localhost:3000/logout",
    //   complete: {
    //     window.location.href = "index";
    //   }
    // })
  });

  $(document).on("click", "#toggleNewPost", function(){
    //$("#toggleNewPost").click(function(){
    if( $('#sidebar').hasClass('col-xs-3') ){
      $('#sidebar').removeClass('col-xs-3', 200);
      $('#sidebar').addClass('col-xs-9',200);
      $('#middle').removeClass('col-xs-6', 200);
      $('#middle').addClass('hidden');
      $('#newPostForm').removeClass('hidden');
    } else {
      $('#sidebar').addClass('col-xs-3', 200);
      $('#sidebar').removeClass('col-xs-9',200);
      $('#middle').addClass('col-xs-6', 200);
      $('#middle').removeClass('hidden');
      $('#newPostForm').addClass('hidden');
    }
  })
}

$(document).ready(main);