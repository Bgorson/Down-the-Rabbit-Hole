$(document).ready(function(){
  // Limit Post Content to 150 chars
  $(".post-content").shorten({
    "showChars": 150,
    "ellipsesText": "... ",
    "moreText": "Continue Reading",
  });
});
