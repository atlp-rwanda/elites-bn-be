import sgMail from '@sendgrid/mail';
import 'dotenv/config';

export const sendEmail = async (email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  email.from = process.env.SENDGRID_EMAIL;
  try {
    await sgMail.send(email);
  } catch (error) {
    console.error(error);
  }
};
