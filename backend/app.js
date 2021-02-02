const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const Photo = require("./models/Photo");

const app = express();

const PORT = process.env.PORT || 8000;
const DB = process.env.MONGO_DB;

app.use(cors());
app.use(express.json());

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connection with MongoDB database was established");
});

app.get("/getAll", async (req, res) => {
  const photos = await Photo.find({});
  if (photos.length > 0) {
    await res.send(photos);
  } else {
    console.log("empty database");
  }
});

app.post("/addPhoto", async (req, res) => {
  try {
    const { photoUrl, label } = req.body;
    const photo = new Photo({ url: photoUrl, description: label });
    await photo.save();
    await res.json("photo added");
  } catch (error) {
    return res.status(400).json("Error: " + error);
  }
});

app.delete("/deletePhoto", async (req, res) => {
  const { id, password } = req.body;
  if (password === process.env.PASSWORD) {
    Photo.findByIdAndDelete(id, (err, photo) => {
      if (err) return console.log(err);
      console.log("Photo was deleted: ", photo);
      res.status(200).json("The photo was successfully deleted");
    });
  } else {
    res.status(401).json("The password was wrong");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
