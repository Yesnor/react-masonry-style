const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
