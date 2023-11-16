const { Schema, model } = require("mongoose");

const bandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  genre: [String],

  info: {
    type: String,
    required: true,
  },

  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],


  instagramUrl: String,
  facebookUrl: String,
  spotifyUrl: String,

  bandPic: String,
});

const Band = model("Band", bandSchema);

module.exports = Band;
