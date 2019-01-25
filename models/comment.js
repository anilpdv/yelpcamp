// loading the campgrounds
var mongoose = require("mongoose");


//building the schema
var commentSchema = new  mongoose.Schema({
    text:String,
    author:{
        id:{
           type : mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
        username: String
    }
});

// exporting the model
module.exports = mongoose.model("Comment",commentSchema);



