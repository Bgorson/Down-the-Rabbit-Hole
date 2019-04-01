// Packages
var db = require("../models");
var passport = require("../config/passport");
module.exports = function (app) {

  // route for making new posts
  // When making a post, run create and do sequelize
  app.post("/api/post", function (req, res) {
    db.Post.create(req.body).then(function (post) {
      res.json(post);
    });
  });

  //route for making a new comment
  app.post("/post/api/comment", function (req, res) {
    db.Comment.create(req.body).then(function (comment) {
      res.json(comment);
    });
  });
  //when a post is liked
  app.post("/api/like/:id", function (req, res) {
    db.Post.increment(['counter'], {
      where: {
        id: req.params.id
      }
    })
  })
  //when a post is disliked
  app.post("/api/dislike/:id", function (req, res) {
    db.Post.decrement(['counter'], {
      where: {
        id: req.params.id
      }
    })
  })

  // For selecting a specific post based off ID number. Send data back to the page
  app.get("/api/posts/:id", function (req, res) {
    db.Post.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (post) {
      res.json(post);
    });
  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
      })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        login: true,
        email: req.user.email,
        id: req.user.id,
        name: req.user.name
      });
    }
  });

  app.get("/duplicateCheck", function (req, res) {
    db.User.findAll({}).then(function (response) {
      let emailArray = [];
      for (i = 0; i < response.length; i++) {
        emailArray.push(response[i].email)
      }
      res.send(emailArray)
    })
  })
};