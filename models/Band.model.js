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

  instagramUrl: String,
  facebook: String,
  spotify: String,

  image: String,
});

const Band = model("Band", bandSchema);

module.exports = Band;
