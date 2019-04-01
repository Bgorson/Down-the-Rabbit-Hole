//Global variables uses to determine login Status.
var postId = $("#submit").attr("post")
var $description = $("#comment-description");
var user;
var loginStatus = false;
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

//API call to get user information and to see if someone is logged in
$.get("/api/user_data").then(function (data) {
  user = data.name
  loginStatus = data.login
})

$(document).ready(function () {
  //Checks to make sure user is logged in before allowed to vote
  $.get("/api/user_data").then(function (data) {
    user = data.name
    loginStatus = data.login
  }).then(function () {
    if (!loginStatus) {
      $(".voting").html("Please Login to vote")
    }
  })
  //Allows a user to click on the like or dislike icons
  //If they've clicked on it, it is disabled
  //Once a user clicks it, post method to increment counter
  //It will also disable the animation and future click events
  $(".like").on('click', function () {
    if($(this).attr("clicked")== 1){
      return false
    }
    let postLiked = $(".like").attr("value")
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/like/" + postLiked,
    });
    $('.like').attr("clicked", 1)
    $('.dislike').css("display", "none")
    $('.like').removeClass("like")
  });

    //Allows a user to click on the like or dislike icons
  //If they've clicked on it, it is disabled
  //Once a user clicks it, post method to increment counter
  //It will also disable the animation and future click events

  $(".dislike").on('click', function () {
    if($(this).attr("clicked")== 1){
      return false
    }
    let postDisLiked = $(".dislike").attr("value")
    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/dislike/" + postDisLiked,
    });
    $('.like').css("display", "none")
    $('.dislike').attr("clicked", 1)
    $('.dislike').removeClass("hvr-sink")
    $('.dislike').removeClass("dislike")
  });
})

//API call when a user creates a new comment. Is called and posts to route
var API = {
  newComment: function (comment) {
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
//If user is not logged in, modal is displayed prompting for sign in
$("#submit").click(function (event) {
  event.preventDefault();
  if (!loginStatus) {
    modal.style.display = "block";
    return false;
  }
  //Creates comment object to be placed into SQL
  var comment = {
    text: $description.val().trim(),
    PostId: postId,
    name: user
  };
  if (!(comment.text)) {
    alert("Please enter text to comment")
    return;
  }
  ///Runs API call to MYSQL to place comment in database
  API.newComment(comment).then(function () {
    //reloads page and empties text boxes
    location.reload();
  })
  $description.val("");

});


// Generate random color for comments
$(function() {
  $(".comment-bubble").each(function() {
      var hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ')';
       $(this).css("background-color", hue);
  });
});

