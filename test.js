const express = require("express");
const app = express();

const cors = require("cors");
const port = 4000;
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const db = "mongodb://127.0.0.1:27017/royal";
const Schema = mongoose.Schema;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to the database"))
  .catch((err) => console.error(err));

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    index: true,
    unique: true,
  },
  author: String,
  category: String,
});

const Post = mongoose.model("recettes", postSchema);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api", (req, res) => {
  Post.find({})
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  Post.findById(id)
    .then((post) => {
      res.status(200).send({
        response: post,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Post not Found",
      });
    });
});

app.post("/api/post", (req, res) => {
  const body = req.body;
  const post = new Post(body);
  post
    .save()
    .then((response) => {
      res.status(200).send("post successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new post' ${err}`,
      });
    });
});

app.put("/api/put/:postId", (req, res) => {
  const postId = req.params.postId;
  const updateBody = req.body;

  Post.findOneAndUpdate({ _id: postId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedPost) => {
      if (!updtatedPost) {
        return res.status(404).send({
          error: "Post not found",
        });
      }
      res.status(200).send({
        message: "Post successfully updated",
        post: updtatedPost,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the post :${err}`,
      });
    });
});

app.delete("/api/delete/:postId", (req, res) => {
  const postId = req.params.postId;

  Post.findOneAndDelete({ _id: postId })
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).send({
          error: "Post not found",
        });
      }
      res.status(200).send({
        message: "Post successfully deleted",
        remainingPost: deletedPost,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the post: ${err}`,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
