//declare location of text to be inputted
//when clicking a post, need to pass ID of the 
//post somehow
var postId = 1;
var $description = $("#comment-description");
//pending functionality of linking to user profile
$(".userProfile").click(function() {
  alert("Clicked Add link to user profile here");
});
//establish post route logic
var API = {
  newComment: function(comment) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/comment/" + postId ,
      data: JSON.stringify(comment)
    });
  }
};

//on submit- make post object and put in SQL
$("#submit").click(function(event) {
  event.preventDefault();
  
  var comment = {
    text: $description.val().trim(),
    topic: postId,
  };
  
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
