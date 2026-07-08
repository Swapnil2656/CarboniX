'use server';

import { sendEmail } from '@/lib/carbonix-auth/email';
import { auth } from '@/auth';

export async function submitSupportTicket(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const category = formData.get('category') as string;
    const priority = formData.get('priority') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const userEmail = session.user.email;
    const userName = session.user.name || 'User';

    const htmlContent = `
      <h2>New Support Ticket</h2>
      <p><strong>From:</strong> ${userName} (${userEmail})</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Priority:</strong> ${priority}</p>
      <hr />
      <h3>${subject}</h3>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    // Send the email to the support team
    // Defaulting to the requested support email address
    await sendEmail(
      'kumarikhushi24168@gmail.com',
      `[Support - ${priority.toUpperCase()}] ${subject}`,
      htmlContent,
      userEmail // Set reply-to as the user's email
    );

    return { success: true };
  } catch (error) {
    console.error('Failed to submit support ticket:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
