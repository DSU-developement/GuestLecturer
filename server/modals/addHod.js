// Function to add HOD data to the database
const addHODData = async (hodData) => {
    try {
      // Iterate over hodData and insert each HOD into the database
      for (const hod of hodData) {
        // Find the corresponding Dean by email
        const dean = await Dean.findOne({ email: hod.deanEmail });
  
        // If Dean is found, create a new HOD with the mapped Dean ID
        if (dean) {
          const newHOD = new HOD({ ...hod,   deanId: dean._id });
          await newHOD.save();
          console.log(`HOD added for ${hod.department}`);
        } else {
          console.error(`Dean not found for ${hod.department}`);
        }
      }
      console.log('All HOD data added successfully');
    } catch (error) {
      console.error('Error adding HOD data:', error);
    }
  };
  
  // Sample HOD data
  const hodData = [
    {
        email: 'ppl-nursing@dsu.edu.in',
        password: 'hod123',
        school: 'School of Health Sciences',
        department: 'Nursing',
        deanEmail: 'dean-sahs@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'ppl-pharmacy@dsu.edu.in',
        password: 'hod123',
        school: 'School of Health Sciences',
        department: 'Pharmacy',
        deanEmail: 'dean-sahs@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'ppl-physio@dsu.edu.in',
        password: 'hod123',
        school: 'School of Health Sciences',
        department: 'Physiotherapy',
        deanEmail: 'dean-sahs@dsu.edu.in' // Dean's email for mapping
      },
    
      // School of Engineering
      {
        email: 'dean-engg@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'School of Engineering', // Dean of School of Engineering
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'vinayak-me@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Mechanical Engineering',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-aiml@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'AI & ML',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-ds@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Data Science',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-cse@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Computer Science Engineering',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-ct@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Computer Science Technology',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-cs@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Cyber Security',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'vasanthi-bca@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Computer Applications',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'mahalakshmi-maths@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Mathematics',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-chem@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Chemistry',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-phy@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Physics',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-ece@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'ECE',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      },
      {
        email: 'chairman-ae@dsu.edu.in',
        password: 'hod123',
        school: 'School of Engineering',
        department: 'Aerospace',
        deanEmail: 'dean-engg@dsu.edu.in' // Dean's email for mapping
      }
  ];
  
  // Call the function to add HOD data to the database
  addHODData(hodData);
  