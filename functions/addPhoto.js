const mongoose = require("mongoose");

require("dotenv").config();

const Photo = require("../src/Photo.model");

const DB = process.env.MONGO_DB;

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connection with MongoDB database was established");
});

exports.handler = async (event, context) => {
  try {
    const { photoUrl, label } = JSON.parse(event.body);
    console.log(photoUrl, label);
    const photo = new Photo({ url: photoUrl, description: label });
    console.log("photo", photo);
    await photo.save();
    return {
      statusCode: 200,
      body: "added photo",
    };
  } catch (err) {
    return err;
  }
};
