// domain/.netlify/functions/getAll

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
  const photos = await Photo.find({});
  const data = JSON.stringify(photos);

  if (photos.length > 0) {
    return {
      statusCode: 200,
      body: data,
    };
  } else {
    console.log("empty database");
  }
};
