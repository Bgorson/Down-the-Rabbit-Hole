//Global variables uses to determine login Status.
var postId = $("#submit").attr("post")
var $description = $("#comment-description");
var user;
var loginStatus= false;


var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//API call to get user information and to see if someone is logged in
$.get("/api/user_data").then(function(data) {
  user = data.name
  loginStatus= data.login
})

$(document).ready(function(){
  $(".like").click(function(){
    let postLiked = $(this).attr("value")
    let block = $(this).parent().closest('div')
    console.log(block)
    $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "/api/like/"+ postLiked,
      });
    $(block).css("display","none")
  });

  $(".dislike").click(function () {
    let postDisLiked = $(this).attr("value")
    let block = $(this).parent().closest('div')
    console.log(block)
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/dislike/" + postDisLiked,
    });
    $(block).css("display", "none")
  });
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
    modal.style.display = "block";
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
    alert("Please enter text to comment")
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

