const express = require("express");

const feedController = require("../controllers/feed");

const router = express.Router();

// feed/posts
router.get("/posts", feedController.getPosts);
// feed/post
router.post("/post", feedController.createPosts);

module.exports = router;
