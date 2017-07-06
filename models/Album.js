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
      "r&b",
      "classical",
      "metal",
      "alternative",
      "electronic",
      "jazz",
      "blues",
      "instrumental",
      "spoken word",
      "unknown"
    ],
    default: "unknown"
  },
  tracks: [
    {
      title: String,
      length: Number,
      single: Boolean
    }
  ]
});

module.exports = mongoose.model("Album", albumSchema);
