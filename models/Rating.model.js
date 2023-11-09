const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const ratingSchema = new Schema(
  {
    author: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref:"User"
        required: true,
      },
    ],
    score: Number,

    comment: {
      type: String,
      required: true,
    },

    band: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref:"Band"
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
