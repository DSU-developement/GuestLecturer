const mongoose = require('mongoose');
const Dean = require('./Dean'); // Import the Dean model

// MongoDB connection URI
const mongoURI = 'mongodb+srv://appdevelopment:jp9fTibjOngBiLM1@dsu.oyfomzc.mongodb.net/';

// Function to establish MongoDB connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Function to add dean data to the database
 const addDeanData = async () => {
  try {
 
    const deanData = [
      {
        school: "School of Health Sciences",
        email: "dean-sahs@dsu.edu.in",
        password: "dean123"
      },
      {
        school: "School of Engineering",
        email: "dean-engg@dsu.edu.in",
        password: "dean123"
      },
      {
        school: "College of Journalism & Mass Communication",
        email: "dean-cjmc@dsu.edu.in",
        password: "dean123"
      },
      {
        school: "School of Basic & Applied Sciences",
        email: "dean-sbas@dsu.edu.in",
        password: "dean123"
      },
      {
        school: "School of Commerce & Management",
        email: "dean-scms@dsu.edu.in",
        password: "dean123"
      },
      {
        school: "School of Law",
        email: "dean-law@dsu.edu.in",
        password: "dean123"
      }
    ];

    // Iterate over deanData and insert each dean into the database
    for (const dean of deanData) {
      const newDean = new Dean(dean); // Create a new instance of the Dean model
      await newDean.save(); // Save the new dean to the database
      console.log(`Dean added for ${dean.school}`);
    }
    console.log('All dean data added successfully');
  } catch (error) {
    console.error('Error adding dean data:', error);
  } finally {
    // Close the MongoDB connection after adding dean data
    mongoose.connection.close();
  }
};
module.exports = addDeanData;
// Call the function to add dean data to the database

