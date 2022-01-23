const Sequelize = require("sequelize");
// const sequelize = new Sequelize()
const sequelize = new Sequelize("node-firstapp", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully."); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err); // eslint-disable-line no-console
  });

module.exports = sequelize;
