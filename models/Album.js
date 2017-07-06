var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Number,
    required: true
  },
  label: String,
  genre: {
    type: String,
    enum: [
      "rock",
      "pop",
      "country",
      "rap",
      "hip-hop",
      "r_n_b",
      "classical",
      "metal",
      "alternative",
      "electronic",
      "jazz",
      "blues",
      "instrumental",
      "spoken_word",
      "other"
    ],
    default: "other"
  },
  trackCount: Number,
  favorites: [
    {
      track: Number,
      title: String
    }
  ]
});

module.exports = mongoose.model("Album", albumSchema);
