//Global variables uses to determine login Status.
var postId = $("#submit").attr("post")
var $description = $("#comment-description");
var user;
var loginStatus= false;
//API call to get user information and to see if someone is logged in
$.get("/api/user_data").then(function(data) {
  user = data.name
  loginStatus= data.login
})

//API call when a user creates a new comment. Is called and posts to route
var API = {
  newComment: function(comment) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/comment",
      data: JSON.stringify(comment)
    });
  }
};


//on submit- make post object and put in SQL
$("#submit").click(function(event) {

  console.log("This is the user name" + user)
  console.log("postID " + postId)
  event.preventDefault();
  if (!loginStatus){
    alert("Log in Modal here")
    return false;
  }
  //Creates comment object to be placed into SQL
  var comment = {
    text: $description.val().trim(),
    PostId: postId,
    name:user
    
  };
  console.log(comment)
  if (!(comment.text)) {
    alert("You must enter an post text and description!");
    return;
  }
  ///Runs API call to MYSQL to place comment in database
  API.newComment(comment).then(function(){
    console.log("commented")
    //reloads page and empties text boxes
    location.reload();
  })
  $description.val("");

});

