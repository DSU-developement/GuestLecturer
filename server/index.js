const connectDB = require('./config/db.js');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./modals/User.js");
const Hod = require("./modals/Hod.js");
const Dean = require("./modals/Dean.js");
const GuestLecture = require('./modals/guestlecture.js');
const sendEmail = require('./mailer');
const bcrypt = require('bcrypt');



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
        if (!user) {
          user = await GuestLecture.findOne({ email }); // Check if user is in the generic User model
      }
      
      console.log(user);

      if (!user || !(await bcrypt.compare(password, user.password))) {
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
      } else if (user.role === 'ProChancellor') {
          role = 'ProChancellor';
      } else if (user.role === 'CFO') {
          role = 'CFO';
      } else {
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

      res.json({ success: true, message: "Login successful", user, role });

    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while logging in" });
    }
});

app.post('/api/hashPassword', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(password, hashedPassword);
    res.json({ hashedPassword });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'An error occurred while hashing the password' });
  }
});

//update the password and has them
app.put("/api/update-password", async (req, res) => {
  try {
      const { email, currentPassword, newPassword } = req.body;

      // Find the user by email
      let user = await Hod.findOne({ email }); // Check if user is HOD
      if (!user) {
          user = await Dean.findOne({ email }); // Check if user is Dean
      }
      if (!user) {
          user = await User.findOne({ email }); // Check if user is in the generic User model
      }
      if (!user) {
        user = await GuestLecture.findOne({ email }); // Check if user is in the generic User model
    }

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password in the database
      user.password = hashedNewPassword;
      await user.save();

      res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
      console.error("Error updating password:", error.message);
      res.status(500).json({ success: false, message: "An error occurred while updating password" });
  }
});






app.put('/api/edit/lecture', async (req, res) => {
  const { email, ...updatedLecturerData } = req.body; // Extract email and lecturer data from request body

  try {
    // Find the lecturer by email and update it with the new data
    const updatedLecturer = await GuestLecture.findOneAndUpdate({ email: email }, updatedLecturerData, { new: true });

    if (!updatedLecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    res.status(200).json(updatedLecturer); // Respond with the updated lecturer
  } catch (error) {
    console.error('Error updating lecturer:', error);
    res.status(500).json({ message: 'Internal server error' });
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

    const hod = await Hod.findById(hod_id);
    if (!hod) {
      return res.status(404).json({ error: 'HOD not found' });
    }
    const deanEmail = hod.deanEmail;

    send_Email(deanEmail,"New Guest Faculty Request", "There has been a new Guest Faculty been added! \nPlease check their details and approve");
    res.status(200).json({ message: 'User registered successfully', user });
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

      const registrar = await User.findOne({ role: "Registrar" });

        if (registrar) {
            console.log("Registrar's email:", registrar.email);
            REmail= registrar.email;
            send_Email(REmail,"New Guest Faculty Request", "There has been a new Guest Faculty been added! \nPlease check their details and approve");
  
        } else {
            console.log("Registrar not found.");
            return null;
        }

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

      const vc = await User.findOne({ role: "ViceChancellor" });

      if (vc) {
          console.log("Vice chancellor's email:", vc.email);
          VcEmail= vc.email;
          send_Email(VcEmail,"New Guest Faculty Request", "There has been a new Guest Faculty been added! \nPlease check their details and approve");

      } else {
          console.log("VC not found.");
          return null;
      }

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

      const hr = await User.findOne({ role: "HR" });

      if (hr) {
          console.log("HR's email:", hr.email);
          HrEmail= hr.email;
          send_Email(HrEmail,"New Guest Faculty Request", "There has been a new Guest Faculty been added! \nPlease check their details and approve");

      } else {
          console.log("HR not found.");
          return null;
      }
      
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

      const pc = await User.findOne({ role: "ProChancellor" });

      if (pc) {
          console.log("PC's email:", pc.email);
          PcEmail= pc.email;
          send_Email(PcEmail,"New Guest Faculty Request", "There has been a new Guest Faculty been added! \nPlease check their details and approve");

      } else {
          console.log("PC not found.");
          return null;
      }

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
  
      lecturer.approved.proChancellor= true;
      lecturer.Accepted=true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/cfo/approved-lectures', async (req, res) => {
    try {
      const approvedLectures = await GuestLecture.find({ 'approved.proChancellor': true });
      res.json(approvedLectures);
    } catch (error) {
      console.error('Error fetching approved lectures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.put('/lecture/accept/cfo/:lecturerId', async (req, res) => {
    const { lecturerId } = req.params;
  
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
      console.log(lecturer);
      lecturer.approved.cfo= true;
      lecturer.Accepted=true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/updateFinancialDetails', async (req, res) => {
    const { accountNumber, accountHolderName, bankName, bankBranch, panCardNumber, email } = req.body;
  
    // Validate required fields
    if (!accountNumber || !accountHolderName || !bankName || !bankBranch || !panCardNumber || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const lecturer = await GuestLecture.findOne({ email });
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        
        // Update financial details
        lecturer.accountDetails = {
            accountNumber,
            accountHolderName,
            bankName,
            bankBranch,
        };
        lecturer.panCardNumber = panCardNumber;
  
        await lecturer.save();
  
        res.json({ message: 'Financial details updated successfully' });
    } catch (error) {
        console.error('Error updating financial details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/getLecturerDetails/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const lecturer = await GuestLecture.findOne({ _id: userId }); // Assuming the user ID is stored in hod_id
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }
    res.json(lecturer);
  } catch (error) {
    console.error('Error fetching lecturer details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/api/updatePaymentRequest/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the lecturer by ID
    const lecturer = await GuestLecture.findById(id);
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    // Update PaymentRequest status to true
    lecturer.PaymentRequest = true;

    // Save the updated lecturer details
    await lecturer.save();

    res.json({ message: 'Payment request updated successfully' });
  } catch (error) {
    console.error('Error updating payment request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/lecture/hod/payment-request/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Fetch lecturers with PaymentRequest set to true for the given userId
    const lecturers = await GuestLecture.find({ hod_id: userId, PaymentRequest: true });
    res.json(lecturers);
  } catch (error) {
    console.error('Error fetching lecturers with PaymentRequest:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Payment 


app.put('/lecture/hod/paymentaccept/:lecturerId', async (req, res) => {
  const { lecturerId } = req.params;

  try {
    const lecturer = await GuestLecture.findById(lecturerId);
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    lecturer.paymentapproved.hod= true; // Update the approval status
    await lecturer.save();

    res.json({ message: 'Lecturer approved successfully' });
  } catch (error) {
    console.error('Error accepting lecturer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/lecture/remarks/:lecturerId', async (req, res) => {
  const lecturerId = req.params.lecturerId;
  const { from, text } = req.body;

  try {
    // Find the lecturer by ID
    const lecturer = await GuestLecture.findById(lecturerId);

    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }

    // Add the new remark to the lecturer's remarks array
    lecturer.remarks.push({ from, text });
    
    // Save the updated lecturer document
    await lecturer.save();

    res.status(200).json({ message: 'Remark added successfully' });
  } catch (error) {
    console.error('Error adding remark:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Define a route for sending emails
 async function send_Email(receiverEmail,subject,text){
  // const{receiverEmail, subject, text} = req.body;
   //const receiverEmail = 'eng21cs0300@dsu.edu.in';
  try {
    await sendEmail(receiverEmail,subject,text);
    return('Email sent successfully');
  } catch (error) {
    console.error(error);
    return('Error sending email');
  }
}

app.get('/lecture/payment-request/:useremail', async (req, res) => {
  const useremail = req.params.useremail;

  let user = await Hod.findOne({ email: useremail }) || await Dean.findOne({ email: useremail }) || await User.findOne({ email: useremail }) || await GuestLecture.findOne({ email: useremail });

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid user role" });
  }
  console.log(user);
  let role = '';
  if (user.role === 'HR') {
    role = 'HR';
  } else if (user.role === 'Registrar') {
    role = 'Registrar';
  } else if (user.role === 'ViceChancellor') {
    role = 'ViceChancellor';
  } else if (user.role === 'ProChancellor') {
    role = 'ProChancellor';
  } else if (user.role === "CFO") {
    role = 'CFO';
  } else {
    if (await Dean.exists({ email: useremail })) {
      role = 'Dean';
    } else if (await Hod.exists({ email: useremail })) {
      role = 'HOD';
    } else if (await GuestLecture.exists({ email: useremail })) {
      role = 'GuestLecture';
    } else {
      return res.status(401).json({ success: false, message: "Invalid user role" });
    }
  }

  try {
    let lecturers;
    console.log(role);
    switch (role) {
      case 'Dean':
        lecturers = await GuestLecture.find({ 'paymentapproved.hod': true });
        break;
      case 'Registrar':
        lecturers = await GuestLecture.find({ 'paymentapproved.dean': true });
        break;
      case 'ViceChancellor':
        lecturers = await GuestLecture.find({ 'paymentapproved.registrar': true });
        break;
      case 'HR':
        lecturers = await GuestLecture.find({ 'paymentapproved.viceChancellor': true });
        break;
      case 'ProChancellor':
        lecturers = await GuestLecture.find({ 'paymentapproved.vpHR': true });
        break;
      case 'CFO':
        lecturers = await GuestLecture.find({ 'paymentapproved.proChancellor': true });
        break;
      default:
        lecturers = [];
    }
    console.log(lecturers);
    res.json(lecturers);
  } catch (error) {
    console.error('Error fetching lecturers with PaymentRequest:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//API for Accepting Lectures for payment 


app.put('/lecture/:useremail/accept/payment-request/:lecturerId', async (req, res) => {

  const { useremail, lecturerId } = req.params;

  let user = await Hod.findOne({ email: useremail }); 
  if (!user) {
      user = await Dean.findOne({ email: useremail }); 
  }
  if (!user) {
      user = await User.findOne({ email: useremail }); 
  }
  if (!user) {
    user = await GuestLecture.findOne({ email: useremail }); 
  }  
  console.log(user);
  let role = '';
  if (user.role === 'HR') {
      role = 'HR';
  } else if (user.role === 'Registrar') {
      role = 'Registrar';
  } else if (user.role === 'ViceChancellor') {
      role = 'ViceChancellor';
  } else if (user.role === 'ProChancellor') {
      role = 'ProChancellor';
  } else if (user.role === 'CFO') {
      role = 'CFO';
  } else {
      if (await Dean.exists({ email: useremail })) {
          role = 'Dean';
      } else if (await Hod.exists({ email: useremail })) {
          role = 'HOD';
      } else if (await GuestLecture.exists({ email: useremail })) {
          role = 'GuestLecture';
      } else {
          return res.status(401).json({ success: false, message: "Invalid user role" });
      }
  }
  
  if(role ==='Dean'){
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.paymentapproved.dean= true;
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  if(role === 'Registrar'){
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.paymentapproved.registrar= true; // Update the approval status
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  if(role === 'ViceChancellor'){
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }
  
      lecturer.paymentapproved.viceChancellor= true; 
      await lecturer.save();
  
      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  if(role === 'HR'){
    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }

      lecturer.paymentapproved.vpHR= true; 
      await lecturer.save();

      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  if(role === 'ProChancellor'){

    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }

      lecturer.paymentapproved.proChancellor= true; 
      await lecturer.save();

      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  if(role === 'CFO'){

    try {
      const lecturer = await GuestLecture.findById(lecturerId);
      if (!lecturer) {
        return res.status(404).json({ message: 'Lecturer not found' });
      }

      lecturer.paymentapproved.cfo= true; 
      await lecturer.save();

      res.json({ message: 'Lecturer approved successfully' });
    } catch (error) {
      console.error('Error accepting lecturer:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

  module.exports = app; 