const connectDB = require('./config/db.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./modals/User.js");


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
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
  
      // Include the value of the 'hod' field in the response
      res.json({ success: true, message: "Login successful", hod: user.hod });
    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ success: false, message: "An error occurred while logging in" });
    }
  });