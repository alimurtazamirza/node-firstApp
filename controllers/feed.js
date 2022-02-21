const Feed = require("../models/feed");
const { validationResult } = require("express-validator");

// fetch
const getPosts = async (req, res, next) => {
  try {
    let feed = await Feed.findAll();
    if (Array.isArray(feed)) {
      feed = feed.map((fed) => {
        return { ...fed.get(), creator: { name: "ali" } };
      });
    }
    res.status(200).json({
      posts: feed,
      totalItems: feed.length,
    });
  } catch (error) {
    res.status(200).json({ message: error.message, line: error.line });
  }
};

//create
const createPosts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      error.error = errors.array();
      throw error;
    }
    if (!req.file) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      error.error = errors.array();
      throw error;
    }
    const body = { ...req.body, imageUrl: req.file.path };
    const feed = await Feed.create(body);
    await feed.reload();
    res.status(201).json({
      message: "Post created successfully",
      post: {
        _id: feed._id,
        content: feed.content,
        title: feed.title,
        createdAt: feed.createdAt,
        creator: { name: "Ali murtaza Mirza" },
      },
    });
  } catch (error) {
    next(error);
  }
};

// View
const getPost = async (req, res, next) => {
  try {
    const postID = req.params.postID;
    const feed = await Feed.findByPk(postID);
    if (!feed) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      post: { ...feed.get(), creator: { name: "ali" } },
      message: "Post fetched.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  createPosts,
  getPost,
};
