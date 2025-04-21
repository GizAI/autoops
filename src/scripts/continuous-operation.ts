import { exec } from 'child_process';
import { logger } from '../utils/logger';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// Configuration
const config = {
  checkIntervalMs: 1 * 60 * 1000, // 1 minute
  taskQueueFile: path.join(__dirname, '../../.augment/task-queue.json'),
  workHistoryFile: path.join(__dirname, '../../.augment/work.md'),
  maxRetries: 3,
  criticalServices: [
    { name: 'Frontend Server', command: 'cd /home/user/autoops/frontend && npm run dev -- -H 0.0.0.0', port: 3000 },
    { name: 'Backend Server', command: 'cd /home/user/autoops && PORT=3001 TS_NODE_TRANSPILE_ONLY=1 npm run dev', port: 3001 },
    { name: 'Server Monitor', command: 'cd /home/user/autoops && npm run monitor:servers', port: null }
  ]
};

// Task interface
interface Task {
  id: string;
  name: string;
  description: string;
  command?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'high' | 'medium' | 'low';
  retries: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  errorMessage?: string;
}

// Load task queue
function loadTaskQueue(): Task[] {
  try {
    if (fs.existsSync(config.taskQueueFile)) {
      const data = fs.readFileSync(config.taskQueueFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    logger.error('Failed to load task queue:', error);
  }
  return [];
}

// Save task queue
function saveTaskQueue(tasks: Task[]): void {
  try {
    const data = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(config.taskQueueFile, data, 'utf8');
  } catch (error) {
    logger.error('Failed to save task queue:', error);
  }
}

// Add task to queue
function addTask(task: Omit<Task, 'id' | 'status' | 'retries' | 'createdAt' | 'updatedAt'>): void {
  const tasks = loadTaskQueue();
  const newTask: Task = {
    id: Date.now().toString(),
    status: 'pending',
    retries: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...task
  };
  tasks.push(newTask);
  saveTaskQueue(tasks);
  logger.info(`Task added to queue: ${newTask.name}`);
}

// Update task status
function updateTaskStatus(taskId: string, status: Task['status'], errorMessage?: string): void {
  const tasks = loadTaskQueue();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    if (status === 'completed') {
      tasks[taskIndex].completedAt = new Date().toISOString();
    }
    if (errorMessage) {
      tasks[taskIndex].errorMessage = errorMessage;
    }
    saveTaskQueue(tasks);
    logger.info(`Task ${taskId} status updated to ${status}`);
  }
}

// Execute task
async function executeTask(task: Task): Promise<void> {
  logger.info(`Executing task: ${task.name}`);
  updateTaskStatus(task.id, 'in-progress');
  
  try {
    if (task.command) {
      const { stdout, stderr } = await execAsync(task.command);
      logger.info(`Task ${task.id} output: ${stdout}`);
      if (stderr) {
        logger.warn(`Task ${task.id} stderr: ${stderr}`);
      }
    }
    
    updateTaskStatus(task.id, 'completed');
    logger.info(`Task ${task.id} completed successfully`);
    
    // Update work history
    updateWorkHistory(task);
  } catch (error: any) {
    logger.error(`Task ${task.id} failed:`, error.message);
    
    if (task.retries < config.maxRetries) {
      // Retry task
      const tasks = loadTaskQueue();
      const taskIndex = tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        tasks[taskIndex].retries += 1;
        tasks[taskIndex].status = 'pending';
        tasks[taskIndex].updatedAt = new Date().toISOString();
        tasks[taskIndex].errorMessage = error.message;
        saveTaskQueue(tasks);
        logger.info(`Task ${task.id} will be retried (${tasks[taskIndex].retries}/${config.maxRetries})`);
      }
    } else {
      updateTaskStatus(task.id, 'failed', error.message);
      logger.error(`Task ${task.id} failed after ${config.maxRetries} retries`);
    }
  }
}

// Process task queue
async function processTaskQueue(): Promise<void> {
  const tasks = loadTaskQueue();
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  
  if (pendingTasks.length === 0) {
    logger.info('No pending tasks in queue');
    return;
  }
  
  // Sort tasks by priority
  pendingTasks.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
  
  // Execute highest priority task
  const task = pendingTasks[0];
  await executeTask(task);
}

// Update work history
function updateWorkHistory(task: Task): void {
  try {
    if (fs.existsSync(config.workHistoryFile)) {
      let content = fs.readFileSync(config.workHistoryFile, 'utf8');
      
      // Add completed task to work history
      const completedTaskEntry = `- ${task.name} ✓`;
      
      // Check if task is already in completed tasks
      if (!content.includes(completedTaskEntry)) {
        // Find the "Completed Tasks" section
        const completedTasksSection = content.indexOf('## Completed Tasks');
        if (completedTasksSection !== -1) {
          // Insert task at the end of the completed tasks section
          const lines = content.split('\n');
          let insertIndex = completedTasksSection + 1;
          
          // Find the end of the completed tasks section
          while (insertIndex < lines.length && !lines[insertIndex].startsWith('##')) {
            insertIndex++;
          }
          
          // Insert the completed task
          lines.splice(insertIndex, 0, completedTaskEntry);
          content = lines.join('\n');
          
          // Save the updated work history
          fs.writeFileSync(config.workHistoryFile, content, 'utf8');
          logger.info(`Work history updated with completed task: ${task.name}`);
        }
      }
    }
  } catch (error) {
    logger.error('Failed to update work history:', error);
  }
}

// Check if a port is in use
async function isPortInUse(port: number): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`netstat -tulpn | grep ${port}`);
    return stdout.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Check and restart critical services
async function checkCriticalServices(): Promise<void> {
  logger.info('Checking critical services...');
  
  for (const service of config.criticalServices) {
    try {
      let isRunning = true;
      
      // Check if service is running
      if (service.port) {
        isRunning = await isPortInUse(service.port);
      } else {
        // Check if process is running by name
        const { stdout } = await execAsync(`ps aux | grep "${service.command}" | grep -v grep`);
        isRunning = stdout.trim().length > 0;
      }
      
      if (!isRunning) {
        logger.warn(`Critical service ${service.name} is not running. Restarting...`);
        
        // Restart service
        await execAsync(`${service.command} &`);
        logger.info(`Critical service ${service.name} restarted`);
      } else {
        logger.info(`Critical service ${service.name} is running`);
      }
    } catch (error) {
      logger.error(`Failed to check or restart critical service ${service.name}:`, error);
    }
  }
}

// Main function
async function main(): Promise<void> {
  logger.info('Starting continuous operation monitor');
  
  // Create task queue file if it doesn't exist
  if (!fs.existsSync(config.taskQueueFile)) {
    saveTaskQueue([]);
  }
  
  // Initial check of critical services
  await checkCriticalServices();
  
  // Process task queue periodically
  setInterval(async () => {
    try {
      await processTaskQueue();
    } catch (error) {
      logger.error('Error processing task queue:', error);
    }
  }, config.checkIntervalMs);
  
  // Check critical services periodically
  setInterval(async () => {
    try {
      await checkCriticalServices();
    } catch (error) {
      logger.error('Error checking critical services:', error);
    }
  }, config.checkIntervalMs * 5); // Check every 5 minutes
  
  logger.info('Continuous operation monitor started');
}

// Start the continuous operation monitor
main()
  .then(() => {
    logger.info('Continuous operation monitor initialized');
  })
  .catch((error) => {
    logger.error('Failed to initialize continuous operation monitor:', error);
  });
