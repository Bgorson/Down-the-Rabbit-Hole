let userName;
let login= false;
$(document).ready(function() {
$.get("/api/user_data").then(function(data) {
    userName = data.name
    console.log("user name:" + userName)
    login = data.login
    $(".member-name").text(userName);
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

