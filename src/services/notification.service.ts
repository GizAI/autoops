import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

// Email configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
  }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify transporter connection
async function verifyConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    logger.info('Email notification service connected successfully');
    return true;
  } catch (error) {
    logger.error('Email notification service connection failed:', error);
    return false;
  }
}

// Send email notification
async function sendEmailNotification(
  to: string | string[],
  subject: string,
  text: string,
  html?: string,
  options?: {
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: any[];
    from?: string;
  }
): Promise<boolean> {
  try {
    const from = options?.from || process.env.EMAIL_FROM || 'noreply@gizai.com';
    
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html: html || text,
      cc: options?.cc,
      bcc: options?.bcc,
      attachments: options?.attachments
    };

    const info = await transporter.sendMail(mailOptions);
    
    logger.info('Email notification sent successfully', {
      messageId: info.messageId,
      to,
      subject,
      timestamp: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    logger.error('Failed to send email notification:', error);
    return false;
  }
}

// Send new email notification to admin
async function notifyAdminOfNewEmail(
  emailId: number,
  fromEmail: string,
  subject: string,
  receivedAt: Date
): Promise<boolean> {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  
  if (adminEmails.length === 0) {
    logger.warn('No admin emails configured for notifications');
    return false;
  }
  
  const emailSubject = `[AutoOps] New Email Received: ${subject}`;
  
  const text = `
A new email has been received and requires attention.

From: ${fromEmail}
Subject: ${subject}
Received: ${receivedAt.toLocaleString()}
Email ID: ${emailId}

You can view and respond to this email in the AutoOps dashboard:
${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/emails/${emailId}

This is an automated notification.
`;

  const html = `
<h2>New Email Received</h2>
<p>A new email has been received and requires attention.</p>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>From:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${fromEmail}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Received:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${receivedAt.toLocaleString()}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email ID:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${emailId}</td>
  </tr>
</table>
<p>
  <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/emails/${emailId}" 
     style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
    View Email
  </a>
</p>
<p><small>This is an automated notification.</small></p>
`;

  return sendEmailNotification(adminEmails, emailSubject, text, html);
}

// Send response notification to user
async function notifyUserOfResponse(
  toEmail: string,
  responseId: number,
  subject: string,
  responsePreview: string
): Promise<boolean> {
  const emailSubject = `[AutoOps] Response Sent: ${subject}`;
  
  const text = `
We have sent a response to your inquiry.

Subject: ${subject}
Response Preview: ${responsePreview.substring(0, 100)}...

You can view the full response in your email inbox.

This is an automated notification.
`;

  const html = `
<h2>Response Sent</h2>
<p>We have sent a response to your inquiry.</p>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Subject:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Response Preview:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${responsePreview.substring(0, 100)}...</td>
  </tr>
</table>
<p><small>This is an automated notification.</small></p>
`;

  return sendEmailNotification(toEmail, emailSubject, text, html);
}

// Send system alert notification
async function sendSystemAlert(
  alertType: 'error' | 'warning' | 'info',
  message: string,
  details?: any
): Promise<boolean> {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  
  if (adminEmails.length === 0) {
    logger.warn('No admin emails configured for system alerts');
    return false;
  }
  
  const alertTypeUpper = alertType.toUpperCase();
  const emailSubject = `[AutoOps] ${alertTypeUpper} ALERT: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`;
  
  const text = `
SYSTEM ${alertTypeUpper} ALERT

Message: ${message}

${details ? `Details: ${JSON.stringify(details, null, 2)}` : ''}

Time: ${new Date().toLocaleString()}

This is an automated system alert.
`;

  const html = `
<h2 style="color: ${alertType === 'error' ? 'red' : alertType === 'warning' ? 'orange' : 'blue'}">
  SYSTEM ${alertTypeUpper} ALERT
</h2>
<p><strong>Message:</strong> ${message}</p>
${details ? `<p><strong>Details:</strong></p><pre>${JSON.stringify(details, null, 2)}</pre>` : ''}
<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
<p><small>This is an automated system alert.</small></p>
`;

  return sendEmailNotification(adminEmails, emailSubject, text, html);
}

export const notificationService = {
  verifyConnection,
  sendEmailNotification,
  notifyAdminOfNewEmail,
  notifyUserOfResponse,
  sendSystemAlert
};

export default notificationService;
