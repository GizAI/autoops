import OpenAI from 'openai';
import Bottleneck from 'bottleneck';
import { logger } from '../utils/logger';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configure rate limiter
const limiter = new Bottleneck({
  maxConcurrent: 5, // Maximum number of concurrent requests
  minTime: 200, // Minimum time between requests in ms (5 requests per second)
  highWater: 20, // Maximum number of requests to queue
  strategy: Bottleneck.strategy.LEAK, // Strategy for when the queue is full
  retryCount: 3, // Number of retries for failed requests
  retryOptions: { minTimeout: 500, maxTimeout: 5000 } // Retry timing options
});

// Log rate limiter events
limiter.on('error', (error) => {
  logger.error('Rate limiter error:', error);
});

limiter.on('failed', (error, jobInfo) => {
  logger.warn(`Rate limiter job failed (attempt ${jobInfo.retryCount}):`, error);
});

limiter.on('retry', (error, jobInfo) => {
  logger.info(`Retrying rate limited job (attempt ${jobInfo.retryCount}):`, error);
});

limiter.on('depleted', () => {
  logger.warn('OpenAI API rate limit queue depleted, some requests may be dropped');
});

/**
 * Generate an embedding for a text
 * @param text The text to generate an embedding for
 * @returns The embedding as a number array
 */
export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    // Use rate limiter for API call
    const response = await limiter.schedule(() =>
      openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text
      })
    );

    logger.debug(`Generated embedding for text of length ${text.length}`);
    return response.data[0].embedding;
  } catch (error) {
    logger.error('OpenAI embedding error:', error);
    throw error;
  }
};

/**
 * Generate a response to an email
 * @param emailContent The content of the email to respond to
 * @param knowledgeBase Relevant knowledge base entries
 * @param language The language to generate the response in
 * @returns The generated response
 */
export const generateEmailResponse = async (
  emailContent: string,
  knowledgeBase: any[],
  language: string
): Promise<{ subject: string; body: string }> => {
  try {
    // Prepare knowledge base context
    const knowledgeContext = knowledgeBase
      .map((entry, index) => `[${index + 1}] ${entry.content}`)
      .join('\n\n');

    // Prepare system message
    const systemMessage = `You are a helpful customer support assistant for GizAI (giz.ai).
Your task is to draft a response to the customer's email below.
Use the provided knowledge base to inform your response.
Be professional, helpful, and concise.
Respond in the same language as the customer's email (${language}).
Do not make up information that is not in the knowledge base.
If you don't know the answer, politely say so and offer to escalate the issue to a human agent.`;

    // Prepare user message
    const userMessage = `CUSTOMER EMAIL:
${emailContent}

RELEVANT KNOWLEDGE BASE:
${knowledgeContext}

Please draft a response to this email. Include a subject line and the body of the email.
Format your response as:
Subject: [Your subject line]

[Your email body]`;

    // Generate response with rate limiting
    const response = await limiter.schedule(() =>
      openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    );

    logger.debug(`Generated email response for email of length ${emailContent.length}`);

    const content = response.choices[0].message.content || '';

    // Extract subject and body
    const subjectMatch = content.match(/Subject: (.+?)(?:\n|$)/);
    const subject = subjectMatch ? subjectMatch[1] : 'Re: Your inquiry';

    // Extract body (everything after the subject line and an empty line)
    const bodyMatch = content.match(/Subject: .+?\n\n([\s\S]+)/);
    const body = bodyMatch ? bodyMatch[1] : content;

    return { subject, body };
  } catch (error) {
    logger.error('OpenAI response generation error:', error);
    throw error;
  }
};
