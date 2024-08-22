const {insertBlog} = require("../Components/BlogComponent");
const BlogsModel = require("../Models/blogMongo");

const addBlog = async (req, res) => {
  const { title,content } = req.body.data;

  if (!title || title.length < 2 || title.length > 30) {
    return res.status(400).json({ status: "error", message: "title must be between 2 and 30 characters long." });
  }

  if (!content || content.length < 10 || content.length > 5000) {
    return res.status(400).json({ status: "error", message: "content must be between 10 and 5000 characters long." });
  }


  try {
    const result = await insertBlog(
      title,
      content,
      req.user.id,
      req.user.name
    );
    if (result) {
      return res
        .status(200)
        .json({ status: "success", message: "Blog Created" });
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to create blog." });
    }
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const viewAllBlogs = async (req, res) => {
  try {
 
    const allData = await BlogsModel.find({}).select('title content userName upVotes');

    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const viewAllPrivateBlogs = async (req, res) => {
  try {
    const user = req.user;
    const allData = await BlogsModel.find({
      userId: user.id,
    });

    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const editTodo = async (req, res) => {
  const user = req.user;
  const { title,content,id } = req.body.data;


  if (!title || title.length < 2 || title.length > 30) {
    return res.status(400).json({ status: "error", message: "title must be between 2 and 30 characters long." });
  }

  if (!content || content.length < 10 || content.length > 5000) {
    return res.status(400).json({ status: "error", message: "content must be between 10 and 5000 characters long." });
  }

  try {
    const dataToUpdate = await BlogsModel.findOne({ _id: id });

    if (dataToUpdate !== null && dataToUpdate.userId === user.id) {
      await BlogsModel.updateOne(
        { _id:id },
        {
          $set: {
            title:title,
            content: content
          },
        }
      );

      res.status(200).send({ status: true, message: "Successfully Updated" });
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error("Error Updating data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const dataToDelete = await BlogsModel.findOne({ _id: id });

    if (dataToDelete !== null && dataToDelete.userId === user.id) {
      await dataToDelete.deleteOne({ _id: id });

      res.json({ status: true, message: "Record deleted successfully" });
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
};




module.exports = { addBlog, viewAllBlogs, viewAllPrivateBlogs, deleteBlog, editTodo };
