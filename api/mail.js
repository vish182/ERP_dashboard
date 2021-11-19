const nodemailer = require("nodemailer");

const fromEmail = "emphasysauth@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: "emphasysadmin", //password
  },
});

const mailExec = ({ toEmail, subject, text, cc }) => {
  let mailOptions = {
    from: fromEmail,
    to: toEmail,
    cc: cc,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(`Failed to sent mail not sent to ${toEmail}`);
    } else {
      console.log(`Mail Successfully sent to ${toEmail}`);
    }
  });
};

exports.sendMail = (req, res) => {
  //console.log(req.body);

  mailExec({
    toEmail: req.body.toEmail,
    subject: req.body.subject,
    text: req.body.text,
    cc: req.body.cc,
  });
};
