const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    upVotes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogsModel = mongoose.model("blogs", blogSchema);

module.exports =BlogsModel;
