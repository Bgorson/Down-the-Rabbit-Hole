let user;
let login= false;
$(document).ready(function() {
$.get("/api/user_data").then(function(data) {
    user = data.name
    login = data.login
    $(".member-name").text(user);
    if (login){
        $("#logBtn").text("Log Out")
        $('#logBtn').click(function(){
            location.href= "/logout"
        })
    }
    else {
        $("#logBtn").text("Log in")
        $('#logBtn').click(function(){
            location.href= "/login"
        })
    }
  });

})

