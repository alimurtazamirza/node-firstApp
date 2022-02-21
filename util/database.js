const Sequelize = require("sequelize");
// const sequelize = new Sequelize()
const sequelize = new Sequelize("node-firstapp", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  port: 3306,
});

module.exports = sequelize;
