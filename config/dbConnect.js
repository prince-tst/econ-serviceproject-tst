const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("ecom-tst2", "root", "Prince#0506", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (err) {
    console.log("cant connect to database", err);
  }
};
module.exports = {
  dbConnection,
  sequelize,
};
