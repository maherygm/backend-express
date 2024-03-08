const Post = require("../models/Post");

exports.getAllPosts = (req, res, next) => {
  Post.find({})
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getPostById = (req, res, next) => {
  const id = req.params.postId;
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
};

exports.createPost = (req, res, next) => {
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
};

exports.updatePost = (req, res, next) => {
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
};

exports.deletePost = (req, res, next) => {
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
};
