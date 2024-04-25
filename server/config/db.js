require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

const connectDB = () =>
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log(`DB Connected Succesfully.... :: ${MONGO_URL}`))
    .catch((err) => {
      console.log('DB Connection Failed!');
      console.log(err);
      process.exit(1);
    });

module.exports = connectDB;
