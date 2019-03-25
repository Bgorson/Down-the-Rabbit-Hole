//declare location of text to be inputted
var $text = $("#post-text");
var $description = $("#post-description");
var $category = $("#post-category");
var userID;
var postID;
//pending functionality of linking to user profile
$.get("/api/user_data").then(function(data) {
  userID = data.id
  $(".member-name").text(data.email);
});
//establish post route logic
var API = {
  newPost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/post",
      data: JSON.stringify(post)
    });
  }
};
//on submit- make post object and put in SQL
$("#submit").click(function(event) {
  event.preventDefault();
  console.log(userID)
  var post = {
    text: $text.val().trim(),
    description: $description.val().trim(),
    category: $category.val().trim(),
    UserId: userID
  };
  
  if (!(post.text && post.description)) {
    alert("You must enter an post text and description!");
    return;
  }
  API.newPost(post).then(function(){

    console.log("posted")
    location.href= "/"

  })
  $text.val("");
  $description.val("");
  $category.val("");

});

//add a redirect to main page or completed post page
