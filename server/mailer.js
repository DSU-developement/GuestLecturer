const nodemailer = require('nodemailer');

function sendEmail(receiverEmail, subject, text) {
  return new Promise((resolve, reject) => {
    const sender = 'eng21cs0279@dsu.edu.in';
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender,
        pass: 'Yolov5Pass'
      }
    });

    // Add a timestamp to the subject to create a new thread
    const timestamp = new Date().toISOString();
    const subjectWithTimestamp = `[${timestamp}] ${subject}`;
    
    console.log(subjectWithTimestamp);

    const mailOptions = {
      from: sender,
      to: receiverEmail,
      subject: subjectWithTimestamp,
      text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve('Email sent successfully');
      }
    });
  });
}

module.exports = sendEmail;
