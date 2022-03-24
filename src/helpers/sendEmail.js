import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetEmail = (recepient, source, subject, content) => {
	try {
		const msg = {
			to: recepient,
			from: source,
			subject: subject,
			html: content,
		};
		return sgMail.send(msg);
	} catch (err) {
		return new Error(err);
	}
};

export default sendResetEmail;
