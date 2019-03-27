var db = require("../models");
var path = require("path");
let user;
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Default page loaded when arriving at site
  app.get("/", function(req, res) {
    if (req.user) {
      console.log("*******Logged in!************")
      console.log(req.user)
      user = req.user
    }
    db.Post.findAll({
      include:[
        {
          model:db.User
        }
      ]
    }).then(function(dbPosts) {
      res.render("display-posts", {
        posts: dbPosts,
      });
    });
  });

  // Used when making a post
  app.get("/post", function(req, res) {
    console.log("========")
    console.log(user)
    console.log("========")
    res.render("post", {
      msg: "Post here!",
      user:user
    });

  });

  //Used for logging into your account
  app.get("/login", function(req, res) {
    console.log("hitting login route");
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("Build in a block here somewhere");
      console.log("you're already logged in");
    }
    res.render("login");
  });

  // logic for creating an account
  app.get("/create", function(req, res) {
    console.log("creating account");
    res.render("createAccount");
  });


  // Show a post by its ID
  app.get("/post/:id", function(req, res) {
    const postId= req.params.id
    const postInfo = db.Post.findOne({
      where: {
          id:postId
      },
      include:[
        {
          model:db.User
        }
      ]
  });
 
  const comments = db.Comment.findAll({
      where: {
          PostId:postId
      }
  });
  Promise
      .all([postInfo,comments])
      .then(responses => {
        console.log("------Post INFO====="+JSON.stringify(responses,null,2))
        let commentInfo=[];
        try { 
        console.log('**********COMPLETE RESULTS****************');
          console.log(responses[0].description); // user profile
          console.log(responses[1][0].text); // all reports 
        
        //add try+ Catch
        
        for (i=0;i<responses[1].length;i++){
          commentInfo.push({
            text:responses[1][i].text,
            name:responses[1][i].name
          })
        }
      }
      catch(err){
        console.log("no comments")
      }
          let renderInfo= {
        post: {
          id: responses[0].id,
          name: responses[0].User.name,
          description: responses[0].description,
          text: responses[0].text,
          comment:commentInfo
        }
      }
      console.log(renderInfo)
      //use helper
      res.render("singlePost", {
        response: renderInfo,
      });

        })
      .catch(err => {
          console.log('**********ERROR RESULT****************');
          console.log(err);
      });

    });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
