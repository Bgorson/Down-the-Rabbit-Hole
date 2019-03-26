var db = require("../models");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Default page loaded when arriving at site
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("display-posts", {
        posts: dbPosts
      });
    });
  });
  // Used when making a post
  app.get("/post", function(req, res) {
    res.render("post", {
      msg: "Post here!",
      user: "User Profile Info"
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

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.redirect("/");
  // });

  // logic for creating an account
  app.get("/create", function(req, res) {
    console.log("creating account");
    res.render("createAccount");
  });

  // Comments
  // app.get("/comment", function(req, res) {
  //   db.Post.findAll({
  //     where: {
  //       id: 3
  //     }
  //   }).then(function(result){
  //     console.log("this is my result" + result[0].description)
  //     res.render("comment", {
  //       msg: "comment!",
  //       post: result[0].description
  //     });
  //   });
  // })

  // Show a post by its ID
  app.get("/post/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPosts) {
      res.render("display-one-post", {
        post: dbPosts
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
