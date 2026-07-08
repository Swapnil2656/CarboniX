import nodemailer from "nodemailer";

/**
 * Sends an email via Gmail SMTP.
 * Requires env vars: MAIL_USER, MAIL_PASS, MAIL_FROM_NAME
 */
export const sendEmail = async (to: string, subject: string, html: string, replyTo?: string) => {
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
        replyTo,
        subject,
        html,
    });
};
