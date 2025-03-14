import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
import { sequelize } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const seedAll = async (): Promise<void> => {
  try {
    console.log("Waiting 5 seconds for DB to be ready...");
    await delay(5000);
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedTickets();
    console.log('\n----- TICKETS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
