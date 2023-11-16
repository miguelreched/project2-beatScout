const { Schema, model } = require("mongoose");

const commentSchema = new Schema({


 band: {

    type: Schema.Types.ObjectId,
    ref: "Band",
    required: true,

 },   

 user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

 comment:String,

 rating: {
   type: Number,
  
 }
})

const Comment= model("Comment", commentSchema);

module.exports = Comment;