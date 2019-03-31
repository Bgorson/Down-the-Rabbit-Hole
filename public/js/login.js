document.getElementById("createAccount").onclick = function () {
  location.href = "/create"
}
// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Getting references to our form and inputs

// When the form is submitted, we validate there's an email and password entered
$("#submit").click(function (event) {
  event.preventDefault();
  var emailInput = document.getElementById("inputEmail").value
  var passwordInput = document.getElementById("inputPassword").value
  var userData = {
    email: emailInput,
    password: passwordInput
  };

  if (!userData.email || !userData.password) {
    return;
  }

  // If we have an email and password we run the loginUser function and clear the form
  loginUser(userData.email, userData.password);
  emailInput.val("");
  passwordInput.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(email, password) {
  $.post("/api/login", {
    email: email,
    password: password
  }).then(function (data) {
    window.location.replace(data);
    // If there's an error, log the error
  }).catch(function (err) {
    console.log(err)
    modal.style.display = "block";
  });
}