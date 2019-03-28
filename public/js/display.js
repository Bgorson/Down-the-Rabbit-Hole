let userName;
let login= false;
$(document).ready(function() {
$.get("/api/user_data").then(function(data) {
    userName = data.name
    console.log("user name:" + userName)
    login = data.login
    $(".member-name").text(userName);
  });

})

