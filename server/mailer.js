const nodemailer = require('nodemailer');

function sendEmail(receiverEmail) {
  return new Promise((resolve, reject) => {
    const sender = 'eng21cs0279@dsu.edu.in';
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sender,
        pass: 'Yolov5Pass'
      }
    });

    const mailOptions = {
      from: sender,
      to: receiverEmail,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
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
