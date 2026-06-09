import nodemailer from "nodemailer";

/**
 * Sends an email via Gmail SMTP.
 * Requires env vars: MAIL_USER, MAIL_PASS, MAIL_FROM_NAME
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,   // Use an App Password, not your Gmail password
        },
    });

    await transporter.sendMail({
        // BUG FIX: was hardcoded as "Hack Pack" in original — now uses env var
        from: `"${process.env.MAIL_FROM_NAME ?? "Carbonix"}" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};
