var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// creating the data
var data = [
    {
    name:"teepee",
    image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg",
    description:"This is teepee campground"
    },
    {
    name:"tent",
    image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg",
    description:"this is tent campground"
    },
    {
    name:"lake-two-rivers",
    image:"https://image.shutterstock.com/image-photo/lake-two-rivers-campground-algonquin-260nw-745284697.jpg",
    description:"shutterstock of the campground"
    },
    {
    name:"rv-campground",
    image:"https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg",
    description:"rv campground"
    },
    {
    name:"campground",
    image:"https://cdn.pixabay.com/photo/2015/09/14/13/57/campground-939588__340.jpg",
    description:"campground"
    }
];


// remove everything from the database
function seedDB(){
    // removing the campgrounds when sever has started
    Campground.remove({},function(err){
        if (err){
        console.log(err);
       }
       console.log("removed camogrounds!");
    // creating the campgrounds
/*    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log(err);
            }else{
                console.log("added a campgrounds!");
                // add comments to the post
                Comment.create({
                    text:"this is so good!",
                    author:"harry potter"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created comments!");
                    }
                });
            }
           });
        }); */
     });
}

// export the function
module.exports = seedDB;



