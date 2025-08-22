'use strict';

const mongoose = require('mongoose');
const { logger } = require('./logger');
require('dotenv').config();

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 15000,
    dbName: process.env.MONGODB_DB || undefined,
  });

  isConnected = true;
  logger.info('Connected to MongoDB');
}

module.exports = { connectToDatabase };


