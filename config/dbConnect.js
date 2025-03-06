const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("demo-tst", "devil", "Prince#0506", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
// });
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Important for self-signed certificates
    },
  },
  logging: false, // Disable SQL query logs (optional)
});
const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (err) {
    console.log("cant connect to database", err);
  }
};

// Remove the IIFE (Immediately Invoked Function Expression) since the function should only run inside dbConnection

module.exports = {
  dbConnection,
  sequelize,
};
