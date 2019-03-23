var db = require("../models");

module.exports = function(app) {
  app.get("/post", function(req, res) {
    res.render("post", {
      msg: "Post here!",
      user: "User Profile Info"
    });
  });
  // Load all posts
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPosts) {
      res.render("display-posts", {
        posts: dbPosts
      });
    });
  });
  // Comments
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
