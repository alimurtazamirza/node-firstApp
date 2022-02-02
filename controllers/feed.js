// const Feed = require("../models/feed");

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
    });
  } catch (error) {
    res.status(200).json({ message: error.message, line: error.line });
  }
};

//create
const createPosts = async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    if (req.body && Object.keys(req.body).length > 1) {
      const feed = await Feed.create(req.body);
      res.status(201).json({
        message: "Post created successfully",
        post: feed,
      });
    } else {
      throw new Error("Request not well formed");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPosts,
};
