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
    const { id, password } = JSON.parse(event.body);
    if (password === process.env.PASSWORD) {
      Photo.findByIdAndDelete(id, (err, photo) => {
        if (err) return console.log(err);
        console.log("Photo was deleted: ", photo);
      });
      return {
        statusCode: 200,
        body: "Photo was deleted",
      };
    } else {
      console.log("The password was wrong");
    }
  } catch (err) {
    return err;
  }
};
