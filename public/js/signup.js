var duplicateCheck = false;
// Getting references to our form and input
var signUpForm = $("form.signup");
var emailInput = $("input#email-input");
var passwordInput = $("input#password-input");
var userName = $("input#text-input");


// When the signup button is clicked, we validate the email and password are not blank
signUpForm.on("submit", function (event) {
  event.preventDefault();
  var userData = {
    name: userName.val().trim(),
    email: emailInput.val().trim(),
    password: passwordInput.val().trim()
  };
  if (!userData.email || !userData.password || !userData.name) {
    return;
  }
  $.get("/duplicateCheck", function (emails) {
    duplicateCheck = false
    for (i = 0; i < emails.length; i++) {
      if (emails[i] == userData.email) {
        $("#duplicate").css("display", "block")
        duplicateCheck = true;
        return false;
      }
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.name)
  })
  emailInput.val("");
  passwordInput.val("");
  userName.val("")
});
// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function signUpUser(email, password, name) {
  if (duplicateCheck == true) {
    return false;
  } else {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    }).then(function (data) {
      // data is the root page
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }
}

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}
