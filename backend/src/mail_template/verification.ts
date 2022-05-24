import { transporter } from 'src/MailService';

const verifyLink = "http://localhost:3000/auth/verify/";

async function Verification(email, uuid) {

    await transporter.sendMail({
        from: '"The Wall" <no-reply@technajt.eu>',
        to: email,
        subject: "Account verification",
        text: "Verify your account by clicking on the following link: " + verifyLink + uuid,
        html: "Verify your account by clicking on the following link: " + verifyLink + uuid,
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