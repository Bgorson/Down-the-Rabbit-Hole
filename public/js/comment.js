var postId = $("#submit").attr("post")
var $description = $("#comment-description");
//pending functionality of linking to user profile
//establish post route logic
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
  console.log("postID " + postId)
  event.preventDefault();
  var comment = {
    text: $description.val().trim(),
    PostId: postId
  };
  console.log(comment)
  if (!(comment.text)) {
    alert("You must enter an post text and description!");
    return;
  }
  API.newComment(comment).then(function(){
    console.log("commented")
  })
  $description.val("");

});

//add a redirect to main page or completed post page
