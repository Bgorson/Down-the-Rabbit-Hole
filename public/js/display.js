

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

  // $('.like').hover(
  //   function () { $(this).addClass('fa-spin') },
  //   function () { $(this).removeClass('fa-spin') }
  // );

  // $('.dislike').hover(
  //   function () { $(this).addClass('fa-spin') },
  //   function () { $(this).removeClass('fa-spin') }
  // );

  // Limit Post Content to 150 chars
  $(".post-content").shorten({
    "showChars": 150,
    "ellipsesText": "... ",
    "moreText": "Continue Reading",
  });

});
