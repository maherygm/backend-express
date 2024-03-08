const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

module.exports = Post;
