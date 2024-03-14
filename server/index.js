const connectDB = require('./config/db.js');
const bodyParser = require("body-parser");
const cors = require("cors");



connectDB();

const express = require("express");

const PORT =  3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get("/api", (req, res) => {
    console.log('request received');
    res.json({ message: "Hello from server!" });
    console.log(res);
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  app.post("/api/login", async (req, res) => {
    const dummyEmail = "test@example.com";
    const dummyPassword = "password123";
  
    const { email, password } = req.body;
    if (email === dummyEmail && password === dummyPassword) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });