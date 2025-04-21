import { logger } from './logger';
import { detectLanguage } from './language';

/**
 * Interface for email headers
 */
interface EmailHeaders {
  subject: string;
  from: string;
  to: string;
  cc?: string;
  date?: string;
  messageId?: string;
  [key: string]: string | undefined;
}

/**
 * Interface for parsed email data
 */
export interface ParsedEmail {
  messageId: string;
  threadId: string;
  headers: EmailHeaders;
  fromEmail: string;
  fromName?: string;
  subject: string;
  receivedAt: Date;
  textBody?: string;
  htmlBody?: string;
  attachments: Array<{
    filename: string;
    mimeType: string;
    size: number;
    contentId?: string;
    attachmentId?: string;
    data: Buffer;
  }>;
  language?: string;
}

/**
 * Extract headers from Gmail message
 * @param headers Array of header objects from Gmail API
 * @returns Structured headers object
 */
export function extractHeaders(headers: Array<{ name: string; value: string }>): EmailHeaders {
  const result: EmailHeaders = {
    subject: 'No Subject',
    from: '',
    to: '',
  };

  for (const header of headers) {
    // Convert header name to lowercase for case-insensitive matching
    const headerName = header.name.toLowerCase();

    switch (headerName) {
      case 'subject':
        result.subject = header.value;
        break;
      case 'from':
        result.from = header.value;
        break;
      case 'to':
        result.to = header.value;
        break;
      case 'cc':
        result.cc = header.value;
        break;
      case 'date':
        result.date = header.value;
        break;
      case 'message-id':
        result.messageId = header.value;
        break;
      default:
        // Store other headers with original case
        result[header.name] = header.value;
    }
  }

  return result;
}

/**
 * Extract email address from a formatted email string
 * @param emailString Email string (e.g., "John Doe <john@example.com>")
 * @returns Object containing email and name
 */
export function extractEmailAddress(emailString: string): { email: string; name?: string } {
  // Match pattern: "Name <email@example.com>" or just "email@example.com"
  const match = emailString.match(/^(?:"?([^"]*)"?\s)?<?([^>]*)>?$/);

  if (match) {
    const [, name, email] = match;
    // If email contains @ symbol, it's likely an email address
    if (email && email.includes('@')) {
      return { email: email.trim(), name: name?.trim() };
    }
    // If no @ in the supposed email part, the whole string might be just an email
    if (emailString.includes('@')) {
      return { email: emailString.trim() };
    }
  }

  // Fallback: return the original string as email
  return { email: emailString.trim() };
}

/**
 * Decode base64 encoded string
 * @param encoded Base64 encoded string
 * @returns Decoded string
 */
export function decodeBase64(encoded: string): string {
  try {
    // Handle URL-safe base64 encoding
    const sanitized = encoded.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(sanitized, 'base64').toString('utf-8');
  } catch (error) {
    logger.error('Error decoding base64 string:', error);
    return '';
  }
}

/**
 * Extract email body parts from Gmail message
 * @param payload Gmail message payload
 * @returns Object containing text and HTML bodies
 */
export function extractBodyParts(payload: any): { textBody?: string; htmlBody?: string; attachments: any[] } {
  const result = {
    textBody: undefined as string | undefined,
    htmlBody: undefined as string | undefined,
    attachments: [] as any[]
  };

  // Function to recursively process message parts
  function processPart(part: any) {
    const mimeType = part.mimeType;

    // Handle attachments
    if (part.filename && part.body && part.body.attachmentId) {
      result.attachments.push({
        filename: part.filename,
        mimeType: part.mimeType,
        size: part.body.size || 0,
        contentId: part.headers?.find((h: any) => h.name.toLowerCase() === 'content-id')?.value,
        attachmentId: part.body.attachmentId
      });
      return;
    }

    // Handle text parts
    if (mimeType === 'text/plain' && part.body && part.body.data) {
      result.textBody = decodeBase64(part.body.data);
    }
    // Handle HTML parts
    else if (mimeType === 'text/html' && part.body && part.body.data) {
      result.htmlBody = decodeBase64(part.body.data);
    }
    // Handle multipart messages
    else if (mimeType.startsWith('multipart/') && part.parts) {
      for (const subPart of part.parts) {
        processPart(subPart);
      }
    }
  }

  // Process the main payload
  if (payload.mimeType.startsWith('multipart/') && payload.parts) {
    for (const part of payload.parts) {
      processPart(part);
    }
  } else if (payload.body && payload.body.data) {
    // Handle single part messages
    if (payload.mimeType === 'text/plain') {
      result.textBody = decodeBase64(payload.body.data);
    } else if (payload.mimeType === 'text/html') {
      result.htmlBody = decodeBase64(payload.body.data);
    }
  }

  return result;
}

/**
 * Parse Gmail message into structured email data
 * @param message Gmail message object
 * @returns Parsed email data
 */
export function parseGmailMessage(message: any): ParsedEmail {
  try {
    const { id, threadId, payload, internalDate } = message;

    // Extract headers
    const headers = extractHeaders(payload.headers || []);

    // Extract email address and name
    const { email: fromEmail, name: fromName } = extractEmailAddress(headers.from);

    // Extract body parts
    const { textBody, htmlBody, attachments } = extractBodyParts(payload);

    // Create received date from internalDate (milliseconds since epoch)
    const receivedAt = new Date(parseInt(internalDate || '0'));

    // Detect language from text body
    const language = textBody ? detectLanguage(textBody) : undefined;

    // Create parsed email object
    const parsedEmail: ParsedEmail = {
      messageId: id,
      threadId,
      headers,
      fromEmail,
      fromName,
      subject: headers.subject,
      receivedAt,
      textBody,
      htmlBody,
      attachments: attachments.map(attachment => ({
        ...attachment,
        data: Buffer.from([]) // Placeholder for attachment data
      })),
      language
    };

    return parsedEmail;
  } catch (error) {
    logger.error('Error parsing Gmail message:', error);
    throw new Error(`Failed to parse email: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Download attachment from Gmail
 * @param gmail Gmail API client
 * @param auth OAuth2 client
 * @param messageId Message ID
 * @param attachmentId Attachment ID
 * @returns Attachment data as Buffer
 */
export async function downloadAttachment(
  gmail: any,
  auth: any,
  messageId: string,
  attachmentId: string
): Promise<Buffer> {
  try {
    const response = await gmail.users.messages.attachments.get({
      auth,
      userId: 'me',
      messageId,
      id: attachmentId
    });

    if (response.data && response.data.data) {
      // Convert base64 to Buffer
      return Buffer.from(response.data.data, 'base64');
    }

    throw new Error('No attachment data received');
  } catch (error) {
    logger.error(`Error downloading attachment ${attachmentId} from message ${messageId}:`, error);
    throw new Error(`Failed to download attachment: ${error instanceof Error ? error.message : String(error)}`);
  }
}
