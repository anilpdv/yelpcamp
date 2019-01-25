// loading libararies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var seedDB = require("./seed");

// creating a app instance
var app = express();

// "mongodb://localhost/yelp_camp"
//connecting to the database
mongoose.connect(
  "mongodb://"fofo":"ilovepython100%"@ds121945.mlab.com:21945/fofotomoruzza",
  {
    useNewUrlParser: true
  }
);

// Passport configuration
app.use(
  session({
    secret: "This is session secret",
    resave: true,
    saveUninitialized: false
  })
);

app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

// telling app to use body parser while recieving post request
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// run the seedDB
//seedDB(); seed the database

// serve static files from public file
app.use(express.static(__dirname + "/public"));

// setting the app view engine to 'ejs'
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// include routes
var routes = require("./routes/app.js");
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("File not found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callbacks
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";
// listen to port:3000
app.listen(port, ip, function() {
  console.log("app is starting and runnign on port ", port);
  // setTimeout(function(){
  //     console.log("[ yelpcamp ] app is starting..");
  // },1000)
  // setTimeout(function(){
  //     console.log("[ yelpcamp ] app is runnning on port: "+port);
  //
  // },2000)
  // setTimeout(function(){
  //     console.log("[ yelpcamp ] app is running at ip: "+ip);
  // },3000);
});
