import nodemailer from "nodemailer";
import { envVars } from "../config/env";

export const sendEmail = async (to: string,subject: string,html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envVars.EMAIL_USER,
      pass: envVars.EMAIL_PASS,
    }
  });
  await transporter.sendMail({
    from: `"Feedback System" <${envVars.EMAIL_USER}>`,
    to,
    subject,
    html
  });

};