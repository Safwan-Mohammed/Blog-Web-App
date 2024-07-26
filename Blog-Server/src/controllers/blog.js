const Blog = require("../models/blog");

exports.addBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.body._id });
    if (blog) {
      const response = await Blog.updateOne({ _id: req.body._id }, req.body);
      if (response) {
        return res.status(200).json({
          message: "Blog updated successfully",
        });
      }
    } else {
      const existsBlog =  await Blog.findOne({email : req.body.email, title : req.body.title})
      if(existsBlog){
        return res.status(400).json({
          message: "Blog Exists",
        });
      }
      const newBlog = new Blog(req.body);
      const response = await newBlog.save();

      if (response) {
        return res.status(201).json({
          message: "Blog created successfully",
        });
      } else {
        return res.status(500).json({
          message: "Failed to create blog",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (blog) {
      return res.status(200).send(blog);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.getUserBlog = async (req, res) => {
  try {
    const blog = await Blog.find({ email: req.params.email });
    if (blog) {
      return res.status(200).json({
        message: "Success",
        blogs: blog,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    if (blog) {
      return res.status(200).json({
        message: "Blog found",
        blog: blog,
      });
    } else {
      return res.status(400).json({
        message: "No Blogs found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const resp = await Blog.deleteOne({ _id: req.body.blogId });
    if (resp) {
      return res.status(200).json({
        message: "Blog deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "Blog Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occured",
      error: error,
    });
  }
};
