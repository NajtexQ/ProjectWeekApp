import { readFileSync } from 'fs';
import { transporter } from 'src/MailService';

const verifyLink = "http://localhost:3000/auth/verify/";

async function Verification(email, uuid) {

    // Read HTML file
    const rawMailContent = await readFileSync('./src/mail_template/verificationMail.html', 'utf8');
    
    const mailContent = rawMailContent.split('{{verifyLink}}').join(verifyLink + uuid);

    await transporter.sendMail({
        from: '"The Wall" <no-reply@technajt.eu>',
        to: email,
        subject: "Account verification",
        text: "Verify your account by clicking on the following link: " + verifyLink + uuid,
        html: mailContent
    },
        (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        }
    );
}


export default Verification;