const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Feed = sequelize.define(
  "feed",
  {
    _id: {
      type: Sequelize.INTEGER,
      field: "id",
      primaryKey: true,
      autoIncrement: true,
    },
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
