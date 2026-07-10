'use server';

import { sendEmail } from '@/lib/carbonix-auth/email';
import { auth } from '@/auth';
import { prisma } from '@/lib/carbonix-auth/prisma';

export async function submitSupportTicket(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const category = formData.get('category') as string || 'General';
    const subject = formData.get('subject') as string || 'No Subject';
    const message = formData.get('message') as string || '';

    const userEmail = session.user.email || 'unknown@example.com';
    const userName = session.user.name || 'User';

    const htmlContent = `
      <h2>New Support Ticket</h2>
      <p><strong>From:</strong> ${userName} (${userEmail})</p>
      <p><strong>Category:</strong> ${category}</p>
      <hr />
      <h3>${subject}</h3>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    // Send the email to the support team
    // Defaulting to the requested support email address
    await sendEmail(
      'kumarikhushi24168@gmail.com',
      `[Support] ${subject}`,
      htmlContent,
      userEmail // Set reply-to as the user's email
    );

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        actorEmail: userEmail,
        actorRole: (session.user as any).type || 'USER',
        action: 'SUPPORT_TICKET_CREATED',
        resource: 'support',
        resourceId: `ticket_${Date.now()}`,
        before: {},
        after: { subject, category },
        ip: 'Web Client',
        userAgent: 'Browser',
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to submit support ticket:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
