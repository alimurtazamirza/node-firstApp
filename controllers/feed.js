const getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First posts",
        content: "This is the first post content",
        imageUrl: "images/images.png",
        creator: {
          name: "ali",
        },
        createdAt: new Date(),
      },
    ],
  });
};

const createPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};

module.exports = {
  getPosts,
  createPosts,
};
