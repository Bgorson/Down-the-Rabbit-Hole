var db = require("../models");
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/post", function(req, res) {
    res.render("post", {
      msg: "Post here!",
      user: "User Profile Info"
    });
  });
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../test/test.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Load all posts
  app.get("/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("dnodeisplay-posts", {
        posts: dbPosts
      });
    });
  });
  // Commentsn
  app.get("/comment", function(req, res) {
    db.Post.findAll({
      where: {
        id: 3
      }
    }).then(function(result){
      console.log("this is my result" + result[0].description)
      res.render("comment", {
        msg: "comment!",
        post: result[0].description
      });
    });
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbPosts) {
      res.render("example", {
        example: dbPosts
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
