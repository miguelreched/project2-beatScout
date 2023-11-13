const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    favoriteBand: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref:"Band"
      },
    ],

    followed: [
      {
        // type: mongoose.Schema.Types.ObjectId,
        // ref:"User"
      },      

    ],

    role: {

      type: String,
      enum:["user", "moderator"],
      default: "user"

    },

    profilePic: String, // url cloudinary

  },







  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
