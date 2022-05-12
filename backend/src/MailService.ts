import * as nodemailer from 'nodemailer';
// Import the config file
import { MAIL_HOST, MAIL_USERNAME, MAIL_PASSWORD } from 'src/config';

let transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
});

export { transporter };
