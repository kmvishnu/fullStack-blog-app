const BlogsModel = require("../Models/blogMongo");

const insertBlog = async (title, content, id, name) => {
  try {
    await BlogsModel.create({
      title: title,
      content: content || "",
      userId: id,
      userName: name,
      upVotes: 0,
    });

    return true;
  } catch (error) {
    console.error("Error creating blog:", error);
    return false;
  }
};

module.exports = { insertBlog };
