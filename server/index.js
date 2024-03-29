const connectDB = require('./config/db.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./modals/User.js");
const Hod = require("./modals/Hod.js");
const Dean = require("./modals/Dean.js");
const GuestLecture = require('./modals/guestlecture.js');


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
        console.log(email,password);
        // Find the user by email
        let user = await Hod.findOne({ email }); // Check if user is HOD
        if (!user) {
            user = await Dean.findOne({ email }); // Check if user is Dean
        }
        if (!user) {
            user = await User.findOne({ email }); // Check if user is in the generic User model
        }
        
        

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Determine the user's role
        let role = '';
        if (user.role === 'HR') {
            role = 'HR';
        } else if (user.role === 'Registrar') {
            role = 'Registrar';
        } else if (user.role === 'ViceChancellor') {
            role = 'ViceChancellor';
        } else if (user.role === 'ProChanCellor') {
            role = 'ProChanCellor';
        } else if (user.role === 'CFO') {
            role = 'CFO';
        } else {
            // If not one of the predefined roles, check other models
            if (await Dean.exists({ email })) {
                role = 'Dean';
            } else if (await Hod.exists({ email })) {
                role = 'HOD';
            } else if (await GuestLecture.exists({ email })) {
                role = 'GuestLecture';
            } else {
                // No matching role found
                return res.status(401).json({ success: false, message: "Invalid user role" });
            }
        }

        // Return the successful login response with user details and role
        res.json({ success: true, message: "Login successful", user, role });

    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while logging in" });
    }
});

app.post('/api/signup', async (req, res) => {
  try {
        const { name, email, password, role, department, school } = req.body;
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
          school
        });

        await user.save();

        // Generate JWT token

        // Send JWT token in response
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/signupLecturer', async (req, res) => {
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
      hod_id,
      dean_id,
      remarks,
      approved,
     
    } = req.body;

    const existingUser = await GuestLecture.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new GuestLecture({
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
      remarks,
      hod_id,
      dean_id,
      approved
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/editDetails/:id', async (req, res) => {
      const { id } = req.params;
      const updateFields = req.body; // Assuming request body contains the updated fields
    
      try {
        // Find the lecturer by ID and update the specified fields
        const updatedLecturer = await guestLecture.findByIdAndUpdate(id, updateFields, {
          new: true, // Return the updated document
        });
        res.json(updatedLecturer); // Return the updated lecturer
      } catch (error) {
        console.error('Error updating lecturer:', error);
        res.status(500).json({ error: 'Error updating lecturer details' });
      }
    

  });

  app.get('/lecture/:hod_id', async (req, res) => {
    try {
      const hodId = req.params.hod_id;
      const lectures = await GuestLecture.find({ hod_id: hodId });
      res.json(lectures);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/lecture/dean/:dean_id', async (req, res) => {
    try {
      const deanId = req.params.dean_id;
      const lectures = await GuestLecture.find({ dean_id: deanId });
      res.json(lectures);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.delete('/lecture/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await GuestLecture.findByIdAndDelete(id);
      res.status(200).json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
      console.error('Error deleting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/lecture/accept/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedLecturer = await GuestLecture.findByIdAndUpdate(id, { 'approved.dean': true }, { new: true });
      res.json(updatedLecturer);
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.get('/registar/approved-lectures', async (req, res) => {
    try {
      const approvedLectures = await GuestLecture.find({ 'approved.dean': true });
      res.json(approvedLectures);
    } catch (error) {
      console.error('Error fetching approved lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/lecture/accept/registar/:lecturerId', async (req, res) => {
    const { lecturerId } = req.params;
  
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.approved.registrar = true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/vicechancellor/approved-lectures', async (req, res) => {
    try {
      const approvedLectures = await GuestLecture.find({ 'approved.registrar': true });
      res.json(approvedLectures);
    } catch (error) {
      console.error('Error fetching approved lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.put('/lecture/accept/vicechancellor/:lecturerId', async (req, res) => {
    const { lecturerId } = req.params;
  
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.approved.viceChancellor = true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  app.get('/vphr/approved-lectures', async (req, res) => {
    try {
      const approvedLectures = await GuestLecture.find({ 'approved.viceChancellor': true });
      res.json(approvedLectures);
    } catch (error) {
      console.error('Error fetching approved lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.put('/lecture/accept/hr/:lecturerId', async (req, res) => {
    const { lecturerId } = req.params;
  
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.approved.vpHR = true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  app.get('/prochancellor/approved-lectures', async (req, res) => {
    try {
      const approvedLectures = await GuestLecture.find({ 'approved.vpHR': true });
      res.json(approvedLectures);
    } catch (error) {
      console.error('Error fetching approved lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.put('/lecture/accept/prochancellor/:lecturerId', async (req, res) => {
    const { lecturerId } = req.params;
  
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.approved.proChancellor = true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  module.exports = app; 