var db = require("../models");
let user;
var Fuse = require("fuse.js")
// Requiring our custom middleware for checking if a user is logged in


module.exports = function (app) {
  // Default page loaded when arriving at site
  app.get("/", function (req, res) {
    if (req.user) {
      user = req.user
    }
    let allPosts = db.Post.findAll({
      attributes: [
        "id", "text", "createdAt", "counter",
        // limit description to 150 chars
        [db.sequelize.fn("LEFT", db.sequelize.col("description"), 151), "description"]
      ],
      include: [{
        model: db.User
      }],
      order: [
        ['id', 'DESC']
      ]
    });
    let setCategories = getCategories();
    Promise
      .all([allPosts, setCategories])
      .then(responses => {
        res.render("display-posts", {
          posts: responses[0],
          categories: responses[1],
        });
      });
  });

  app.get("/popular", function (req, res) {
    if (req.user) {
      user = req.user
    }
    let allPosts = db.Post.findAll({
      include: [{
        model: db.User
      }],
      order: [
        ['counter', 'DESC']
      ]
    });
    let setCategories = getCategories();
    Promise
      .all([allPosts, setCategories])
      .then(responses => {
        res.render("display-posts", {
          posts: responses[0],
          categories: responses[1]
        });
      });
  });

  // Create a post
  app.get("/post", function (req, res) {
    let setCategories = getCategories();
    Promise
      .all([setCategories])
      .then(responses => {
        res.render("post", {
          user: user,
          // categories: responses[0]
          categories: [{
              "category": "News"
            }, {
              "category": "Video Games"
            },
            {
              "category": "Shopping"
            }, {
              "category": "Fitness"
            },
            {
              "category": "TV Shows"
            }, {
              "category": "Movies"
            },
            {
              "category": "Sports"
            }, {
              "category": "News"
            },
            {
              "category": "Current Events"
            }, {
              "category": "Cooking"
            }
          ]
        });
      })
      .catch(err => {
        console.log('********** ERROR RESULT ****************');
        console.log(err);
      });
  });

  //Used for logging into your account
  app.get("/login", function (req, res) {
    if (req.user) {
      console.log("you're already logged in");
    }
    res.render("login");
  });

  // logic for creating an account
  app.get("/create", function (req, res) {
    res.render("createAccount");
  });

  // logic for creating an account
  app.get("/profile", function(req, res) {
    console.log("Displaying Profile");
    res.render("profile");
  });

  //
  // app.get("/profile/:user", function(req, res) {
  //   const profileQuery = req.params.user
  //   const profileData = db.Users.findOne({
  //     where: {name:profileQuery},
  // });
  // Show a post by its ID
  app.get("/post/:id", function (req, res) {
    const postId = req.params.id
    const postInfo = db.Post.findOne({
      where: {
        id: postId
      },
      include: [{
        model: db.User
      }]
    });
    const comments = db.Comment.findAll({
      where: {
        PostId: postId
      }
    });
    let setCategories = getCategories();
    Promise
      .all([postInfo, comments, setCategories])
      .then(responses => {
        let commentInfo = [];
        try {
          console.log('**********COMPLETE RESULTS****************');
          console.log(responses[0].description); // user profile
          console.log(responses[1][0].text); // all reports

          for (var i = 0; i < responses[1].length; i++) {
            commentInfo.push({
              //creates a tag links for any urls that are detected
              text: (responses[1][i].text),
              name: responses[1][i].name,
              createdAt: responses[1][i].createdAt
            })
          }
        } catch (err) {
          console.log("no comments");
        }
        let renderInfo = {
          post: {
            id: responses[0].id,
            name: responses[0].User.name,
            description: (responses[0].description),
            text: responses[0].text,
            comment: commentInfo,
            createdAt: responses[0].createdAt,
            counter: responses[0].counter
          }
        }
        res.render("singlePost", {
          response: renderInfo,
          categories: responses[2]
        });
      })
      .catch(err => {
        console.log('**********ERROR RESULT****************');
        console.log(err);
      });
  });

  // Show all posts by its category
  // Path cannot be /post/:category, sotherwise, default to /post/:id above
  app.get("/posts/:category", function (req, res) {
    if (req.user) {
      console.log("*******Logged in!************");
      user = req.user
    };
    let postsCategory = db.Post.findAll({
      attributes: [
        "id", "text", "counter",
        // Limit description to 150 chars
        [db.sequelize.fn("LEFT", db.sequelize.col("description"), 151), "description"]
      ],
      where: {
        category: req.params.category
      },
      include: [{
        model: db.User
      }],
      order: [
        ["counter", "DESC"]
      ]
    });
    let setCategories = getCategories();
    Promise
      .all([postsCategory, setCategories])
      .then(responses => {
        res.render("display-posts", {
          posts: responses[0],
          categories: responses[1]
        });
      })
      .catch(err => {
        console.log('********** ERROR RESULT ****************');
        console.log(err);
      });
  });

  // Search page
  app.get("/search/:string", function (req, res) {
    var results = []
    var options = {
      keys: ['text', 'description'],
      id: 'id'
    }
    db.Post.findAll({})
      .then(responses => {
        for (var i = 0; i < responses.length; i++) {
          results.push({
            id: responses[i].id,
            text: responses[i].text,
            description: responses[i].description
          })
        }
        var fuse = new Fuse(results, options)
        return searchResults = fuse.search(req.params.string)
      }).then(function (searchResults) {
        db.Post.findAll({
          where: {
            id: searchResults
          }
        }).then(function (response) {
          res.render("search-results", {
            posts: response,
          })
        })
      })
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });


};

// -------- Helper Functions --------

// Get Set of Categories
function getCategories() {
  let category = db.Post.findAll({
    attributes: [
      [
        // show distinct values from col 'category'
        db.sequelize.fn("DISTINCT", db.sequelize.col("category")), "category"
      ]
    ]
  });
  return category;
}