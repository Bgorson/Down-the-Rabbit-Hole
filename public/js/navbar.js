let userName;
let login = false;
$(document).ready(function () {
    $.get("/api/user_data").then(function (data) {
        userName = data.name
        login = data.login
        $(".member-name").text(userName);
        if (login) {
            // this is the logic responsible for switching log-in/log-out button around
            $("#logBtn").html('<a href="#" class="hvr-icon-forward"><i class=" hvr-icon fas fa-sign-out-alt fa-lg">Log Out</i>')
            $('#logBtn').click(function () {
                location.href = "/logout"
            })
        } else {
            $("#postLink").html("")
            // $("#logBtn").text("Log in")
            $("#logBtn").html('<a href="#" class="hvr-icon-forward"><i class="hvr-icon fas fa-sign-in-alt fa-lg">Log In</i>')
            $('#logBtn').click(function () {
                location.href = "/login"
            })
        }
    });
    $("#search-btn").click(function (event) {
        event.preventDefault();
        let search = $(".form-control").val();
        location.href = "/search/" + search
    })
})