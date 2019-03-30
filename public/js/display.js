// I dont think we need this since the nav bar accounts for this
// $(document).ready(function() {
// //gets information on the user to display and to determine if they can post
//   $.get("/api/user_data").then(function(data) {
//     let login= false;
//     let userName = data.name
//     console.log("user name:" + userName)
//     login = data.login
//     $(".member-name").text(userName);
//   });
// })
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
    })
  

      $(".dislike").click(function(){
          let postDisLiked = $(this).attr("value")
          let block = $(this).parent().closest('div')
          console.log(block)
      
              $.ajax({
                  headers: {
                    "Content-Type": "application/json"
                  },
                  type: "POST",
                  url: "/api/dislike/"+ postDisLiked,
                });
                $(block).css("display","none")
          })

        })
      

