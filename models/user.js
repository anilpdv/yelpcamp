var mongoose = require("mongoose");
var bcrypt   = require("bcrypt");

// schema
var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
});

// authenticating input against database documents
UserSchema.statics.authenticate = function(email,password,callback){
            User.findOne({email:email})
                .exec(function(error,user){
                    if(error){
                        return callback(error);
                    }else if(!user){
                    
                        var err = new Error("User not found");
                        console.log(err);
                        return callback(err);
                    }

                    bcrypt.compare(password,user.password,function(error,result){
                        if(result===true){
                            return callback(null,user);
                        }else{
                            return callback();
                        }
                    })
                    
                });
}

//hash the password just before adding it
UserSchema.pre("save",function(next){
    var user = this;
    bcrypt.hash(user.password,10,function(err,hash){
        if(err){
            console.log(err);
        }else{
            user.password = hash;
            next();
        }
    });
});

User = mongoose.model("User",UserSchema);

// compile
module.exports = User;
