import * as nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "najtex.net@gmail.com", // generated ethereal user
        pass: "ggFz4uFwSc6tLhSa", // generated ethereal password
    },
});

export { transporter };
