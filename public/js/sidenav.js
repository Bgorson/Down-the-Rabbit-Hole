

$(document).ready(function(){
  // SideNav
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#toggle-wrapper").toggleClass("toggled");

    let arrowMenu = $("#arrow-menu");

    // Switch arrow direction for #menu-toggle #arrow-menu
    if (arrowMenu.hasClass("fas fa-angle-double-right")) {
      arrowMenu.removeClass("fas fa-angle-double-right")
      arrowMenu.addClass("fas fa-angle-double-left")
    } else {
      arrowMenu.removeClass("fas fa-angle-double-left");
      arrowMenu.addClass("fas fa-angle-double-right");
    }

  });

});
