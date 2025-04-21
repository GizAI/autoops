import { PrismaClient } from '@prisma/client';
import { generateEmbedding } from '../services/openai.service';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

/**
 * Initial knowledge base entries for seeding the database
 */
const initialKnowledgeEntries = [
  {
    content: 'GizAI is an AI-powered customer support automation platform that helps businesses respond to customer inquiries efficiently.',
    source: 'company_info',
    category: 'general',
    language: 'en'
  },
  {
    content: 'Our standard support hours are Monday to Friday, 9 AM to 5 PM Eastern Time.',
    source: 'support_policy',
    category: 'support',
    language: 'en'
  },
  {
    content: 'For urgent issues outside of business hours, please use the emergency contact form on our website.',
    source: 'support_policy',
    category: 'support',
    language: 'en'
  },
  {
    content: 'The free tier of GizAI includes up to 100 automated responses per month and basic analytics.',
    source: 'pricing',
    category: 'pricing',
    language: 'en'
  },
  {
    content: 'The Pro plan costs $49 per month and includes up to 1,000 automated responses and advanced analytics.',
    source: 'pricing',
    category: 'pricing',
    language: 'en'
  },
  {
    content: 'The Enterprise plan is custom-priced based on your needs and includes unlimited responses, dedicated support, and custom integrations.',
    source: 'pricing',
    category: 'pricing',
    language: 'en'
  },
  {
    content: 'To reset your password, go to the login page and click on "Forgot Password", then follow the instructions sent to your email.',
    source: 'faq',
    category: 'account',
    language: 'en'
  },
  {
    content: 'GizAI integrates with Gmail, Outlook, Zendesk, Intercom, and Slack.',
    source: 'integrations',
    category: 'technical',
    language: 'en'
  },
  {
    content: 'All data transmitted to and from GizAI is encrypted using industry-standard TLS/SSL protocols.',
    source: 'security',
    category: 'security',
    language: 'en'
  },
  {
    content: 'GizAI is GDPR compliant and we do not sell or share your data with third parties.',
    source: 'privacy',
    category: 'legal',
    language: 'en'
  }
];

/**
 * Initialize the database with seed data
 */
async function initializeDatabase() {
  try {
    logger.info('Starting database initialization...');

    // Create initial knowledge base entries with embeddings
    logger.info('Creating knowledge base entries...');
    for (const entry of initialKnowledgeEntries) {
      // Check if entry already exists
      const existingEntry = await prisma.knowledgeBase.findFirst({
        where: {
          content: entry.content,
          source: entry.source
        }
      });

      if (!existingEntry) {
        // Generate embedding for the content
        const embedding = await generateEmbedding(entry.content);
        
        // Create knowledge base entry
        await prisma.knowledgeBase.create({
          data: {
            ...entry,
            embedding
          }
        });
        
        logger.info(`Created knowledge base entry: ${entry.content.substring(0, 50)}...`);
      } else {
        logger.info(`Knowledge base entry already exists: ${entry.content.substring(0, 50)}...`);
      }
    }

    // Create admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@giz.ai';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // This should be hashed in production
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Admin User',
          password: adminPassword, // In production, this should be hashed
          role: 'admin'
        }
      });
      
      logger.info(`Created admin user: ${adminEmail}`);
    } else {
      logger.info(`Admin user already exists: ${adminEmail}`);
    }

    logger.info('Database initialization completed successfully.');
  } catch (error) {
    logger.error('Error initializing database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Database initialization failed:', error);
      process.exit(1);
    });
}

export { initializeDatabase };
