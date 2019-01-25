// loading libararies
let express = require("express");
let Comment = require("../models/comment");
let Campground = require("../models/campground");
let User = require("../models/user");
let router = express.Router();
let mid = require("../middleware");

// route get method to root:
router.get("/", function(req, res, next) {
  res.render("landing");
});

// in rest arch {/index}
// get route {'/campgrounds'}
router.get("/campgrounds", function(req, res, next) {
  // getting the get all collections
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      next(err);
    } else {
      res.render("campgrounds/index", { data: campgrounds });
    }
  });
});

// rest arch {'/campgrounds'}
// post route {'/campgrounds'}
router.post("/campgrounds", mid.requiresLogin, function(req, res, next) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = {
    name: name,
    image: image,
    description: description
  };

  // create the campground
  Campground.create(newCampground, function(err, newlycreated) {
    if (err) {
      next(err);
    } else {
      console.log("/campgrounds", req.session.userId);
      // redirect to campgrounds;
      res.redirect("/campgrounds");
    }
  });
});

// get route {'/campgrounds/new'}
// creating new campground
router.get("/campgrounds/new", mid.requiresLogin, function(req, res, next) {
  res.render("campgrounds/new");
});

// campgrounds/show{:id}

router.get("/campgrounds/:id", function(req, res, next) {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        next(err);
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//==============================
//     comments routes
//==============================

router.get("/campgrounds/:id/comments/new", mid.requiresLogin, function(
  req,
  res,
  next
) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      next(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

router.post("/campgrounds/:id/comments", mid.requiresLogin, function(
  req,
  res,
  next
) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      next(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          next(err);
        } else {
          console.log(req.session.userId);
          User.findById(req.session.userId, function(err, user) {
            console.log("user details :" + user);
            comment.author.id = user._id;
            comment.author.username = user.email;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log("comment details :" + comment);
            res.redirect("/campgrounds/" + campground._id);
          });
        }
      });
    }
  });
});

//===================
// Auth routes
//==================
router.get("/register", function(req, res, next) {
  res.render("register");
});

// post route /register
router.post("/register", function(req, res, next) {
  if (req.body.email && req.body.password) {
    // if user exists with same email throuh an error
    User.findOne(
      {
        email: req.body.email
      },
      function(error, user) {
        if (user) {
          res.redirect("/register");
        } else {
          // ceate user
          let userData = {
            email: req.body.email,
            password: req.body.password
          };

          // create an user
          User.create(userData, function(err, user) {
            if (err) {
              return next(err);
            } else {
              console.log(userData);
              req.session.userId = user._id;
              res.redirect("/");
            }
          });
        }
      }
    );
  } else {
    let err = new Error("all fields required");
    err.status = 400;
    return next(err);
  }
});

// app login route
router.get("/login", function(req, res, next) {
  res.render("login");
});

// app login post
router.post("/login", function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        let err = new Error("wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("/campgrounds");
      }
    });
  } else {
    let err = new Error("emaill and password are required");
    err.status = 401;
    return next(err);
  }
});

router.get("/logout", function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    } else {
      return res.redirect("/");
    }
  });
});

module.exports = router;
