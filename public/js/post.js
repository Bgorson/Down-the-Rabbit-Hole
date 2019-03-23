//declare location of text to be inputted
var $text = $("#post-text");
var $description = $("#post-description");
var $category = $("#post-category");
//pending functionality of linking to user profile
$(".userProfile").click(function() {
  alert("Clicked Add link to user profile here");
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
  
  var post = {
    text: $text.val().trim(),
    description: $description.val().trim(),
    category: $category.val().trim()
  };
  
  if (!(post.text && post.description)) {
    alert("You must enter an post text and description!");
    return;
  }
  API.newPost(post).then(function(){
    console.log("posted")
  })
  $text.val("");
  $description.val("");
  $category.val("");
});

//add a redirect to main page or completed post page
