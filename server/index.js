const connectDB = require('./config/db.js');

connectDB();

const express = require("express");

const PORT =  3001;

const app = express();

app.get("/api", (req, res) => {
    console.log('request received');
    res.json({ message: "Hello from server!" });
    console.log(res);
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });