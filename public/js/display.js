document.getElementById("login").onclick = function(){
    location.href= "/login"
}

$.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

