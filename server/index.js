const connectDB = require('./config/db.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./modals/User.js");
const guestLectureSchema = require('./modals/guestlecture.js');


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
      res.json({ success: true, message: "Login successful", user: user});
    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ success: false, message: "An error occurred while logging in" });
    }
  });

  app.post('/api/signup', async (req, res) => {
    try {
      const { name, email, password, role, department,branch } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
      const user = new User({
        name,
        email,
        password,
        role,
        department,
        branch,
      });
      console.log(user);
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/api/sigupLecture', async (req, res) => {
    try {
      const {
        facultyName,
        phone,
        email,
        password,
        qualifications,
        schoolsDeanery,
        department,
        subjectName,
        yearAndSemester,
        sectionsHandled,
        hours,
        startDate,
        proposedRate,
        totalAmount,
        accountDetails,
        panCardNumber,
        remarks
      } = req.body;
  
      const existingUser = await guestLectureSchema.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      const user = new guestLectureSchema({
        facultyName,
        phone,
        email,
        password,
        qualifications,
        schoolsDeanery,
        department,
        subjectName,
        yearAndSemester,
        sectionsHandled,
        hours,
        startDate,
        proposedRate,
        totalAmount,
        accountDetails,
        panCardNumber,
        remarks
      });
  
      await user.save();
      res.status(201).json({ message: 'Guest lecture registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });