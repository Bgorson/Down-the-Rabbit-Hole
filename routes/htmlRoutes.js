var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/post", function(req, res) {
    res.render("post", {
      msg: "Post here!",
      user: "User Profile Info"
    });
  });

  app.get("/comment", function(req, res) {
    db.Post.findAll({
      where: {
        id:3
      }
    }).then(function(result){
      console.log("this is my result" + result[0].description)
    res.render("comment", {
      msg: "comment!",
      post:result[0].description
    });
  });
})

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
