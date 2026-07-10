import { sendEmail } from './src/utils/email';

async function test() {
  try {
    console.log("Sending email to swapnillll1102@gmail.com...");
    await sendEmail('swapnillll1102@gmail.com', 'Test Email for Teammate', '<p>Test</p>');
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
test();
