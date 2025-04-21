import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (existingUser) {
      logger.info('Test user already exists');
      return;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user'
      }
    });

    logger.info(`Test user created with ID: ${user.id}`);

    // Create admin user
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    });

    if (!adminExists) {
      const adminHashedPassword = await bcrypt.hash('admin123', 10);
      const admin = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password: adminHashedPassword,
          role: 'admin'
        }
      });

      logger.info(`Admin user created with ID: ${admin.id}`);
    }
  } catch (error) {
    logger.error('Error creating test users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser()
  .then(() => {
    logger.info('Test users creation completed');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Error in test users creation script:', error);
    process.exit(1);
  });
