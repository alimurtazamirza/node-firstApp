const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");

const feedController = require("../controllers/feed");

const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// feed/posts
router.get("/posts", feedController.getPosts);
// feed/post/3
router.get("/post/:postID", feedController.getPost);
// feed/post
router.post(
  "/post",
  upload.single("image"),
  [
    body("title")
      .trim()
      .notEmpty()
      .exists()
      .withMessage("title is required")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("content")
      .trim()
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  feedController.createPosts
);

module.exports = router;
