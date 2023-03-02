const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//DB configs
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://kaleabd:DvaKSy4F45H2ezYY@cluster0.hipl3.mongodb.net/?retryWrites=true&w=majority")
  .catch((err) => console.log(err));

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  artist: String,
  album: String,
  genre: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre
  });

  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("server is running!");
});
