'use strict';

const mongoose = require('mongoose');
const { logger } = require('./logger');
require('dotenv').config();

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI || "mongodb+srv://cbm360tiv:MiiFze4xYGr6XNji@cluster0.sf6iagh.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster";
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 15000,
    // Prefer DB name from the URI; avoid separate dbName to prevent mismatches
    dbName: undefined,
  });

  isConnected = true;
  const usedDb = (mongoose.connection && mongoose.connection.name) || 'unknown';
  logger.info(`Connected to MongoDB (db: ${usedDb})`);
}

module.exports = { connectToDatabase };


