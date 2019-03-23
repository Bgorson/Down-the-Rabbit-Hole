var db = require("../models");

module.exports = function(app) {

//route for making new posts
  app.post("/api/post", function(req, res){
    console.log("hitting post route")
    db.Post.create(req.body).then(function(post) {
      res.json(post);
    });
  });
  app.post("/api/comment/:post", function(req, res){
    console.log("commenting on post number: " + req.params.post)
    db.Comment.create(req.body).then(function(comment) {
      res.json(comment);
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findAll({
      where: {
        id:req.params.id
      }
    }).then(function(post) {
      res.json(post);
    });
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
