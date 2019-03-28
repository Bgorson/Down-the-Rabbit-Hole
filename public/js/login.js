document.getElementById("createAccount").onclick = function(){
  location.href= "/create"
}
    // Getting references to our form and inputs

    // When the form is submitted, we validate there's an email and password entered
    $("#submit").click(function(event) {
      event.preventDefault();
      var emailInput = document.getElementById("inputEmail").value
      var passwordInput = document.getElementById("inputPassword").value
      console.log(emailInput)
      console.log("submit clicked")
      
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
        console.log("checking account")
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        console.log("completed")
        console.log(data)
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    }

  