import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect() {
  // const mongod = await MongoMemoryServer.create();
  // const getUri = mongod.getUri();

  mongoose.set('strictQuery', true);
  const db = await mongoose.connect(process.env.ATLAS_URI);

  console.log('Connected to database');

  return db;
}

export default connect;
