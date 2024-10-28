import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Send email to Admin function
export const sendEmailToAdmin = async (
  name: string,
  email: string,
  message: string
) => {
  const mailOptions = {
    from: process.env.EMAIL, // Email user who submitted the form
    to: process.env.EMAIL, // Email admin
    subject: 'New Contact Form Submission',
    text: `You have received a new message from: \n
          Name: ${name}\n
          Email: ${email}\n
          Message: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);

  } catch (error) {

  }
};
