import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thoilvibritania123@gmail.com',
    pass: 'humzbxaqxptyhqul',
  },
});
