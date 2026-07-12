"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Sends an email via Gmail SMTP.
 * Requires env vars: MAIL_USER, MAIL_PASS, MAIL_FROM_NAME
 */
const sendEmail = async (to, subject, html, replyTo) => {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        console.warn('Email credentials not configured. Simulating email sending.');
        console.log(`\n--- SIMULATED EMAIL ---`);
        console.log(`To: ${to}`);
        console.log(`Reply-To: ${replyTo || 'None'}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body (HTML): ${html}`);
        console.log(`-----------------------\n`);
        return;
    }
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS, // Use an App Password, not your Gmail password
        },
    });
    await transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME ?? "Carbonix"}" <${process.env.MAIL_USER}>`,
        to,
        replyTo,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
