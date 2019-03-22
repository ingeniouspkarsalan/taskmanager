const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:7
    },
    avatar:{
        type:String,
        default:null
    }
},
{
    timestamps: true
  }
);

var users = mongoose.model('USERS',userSchema);

module.exports=users;