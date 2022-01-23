const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Feed = sequelize.define(
  "feed",
  {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    imageUrl: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    timestamps: false,
  }
);

module.exports = Feed;
