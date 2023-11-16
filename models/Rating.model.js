const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const ratingSchema = new Schema(
  {

    rating: {

      type: Number,
      default:0,


    },


    username: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
      },
    ],
   
  
    band: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Band"
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Rating = model("Rating", ratingSchema);

module.exports = Rating;
