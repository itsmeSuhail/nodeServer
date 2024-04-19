import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { USER_EMAIL, nodeMailerkey } from "../dev.env";
dotenv.config()
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: nodeMailerkey,
    },
});
export const sendNotification=async(email,html,subject)=>{
    const mailOptions = {
        from: `DevAi ${USER_EMAIL}`,
        to: email, 
        subject,
        html:html
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
}