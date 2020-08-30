const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0a2206e89313b1",
    pass: "8de19d1da554b8",
  },
});

module.exports = (emaiID, subject, mailBody) => {
  const message = {
    from: "mymeds@mymeds.com", // Sender address
    to: emaiID, // List of recipients
    subject: subject, // Subject line
    text: mailBody, // Plain text body
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
