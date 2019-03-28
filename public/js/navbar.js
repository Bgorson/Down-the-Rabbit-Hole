let userName;
let login= false;
$(document).ready(function() {
$.get("/api/user_data").then(function(data) {
    userName = data.name
    console.log("user name:" + userName)
    login = data.login
    $(".member-name").text(userName);
    if (login){
        // $("#logBtn").text("Log Out")
        $("#logBtn").html('<i class="fas fa-sign-in-alt">Log Out</i>')
        $('#logBtn').click(function(){
            location.href= "/logout"
        
        })
    }
    else {
        $("#postLink").html("")
        // $("#logBtn").text("Log in")
        $("#logBtn").html('<i class="fas fa-sign-in-alt">Log In</i>')
        $('#logBtn').click(function(){
            location.href= "/login"
        })
    }
  });

})

