const express = require('express');
const pinoHttp = require('pino-http');
const path = require('path');
const crypto = require('crypto');
const logger = require('./utils/logger');
const auditRoutes = require('./routes/auditRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Request body parser
app.use(express.json());

// Structured logging with request ID
app.use(pinoHttp({
  logger,
  genReqId: () => crypto.randomUUID(),
  customProps: (req, res) => ({
    reqId: req.id,
  }),
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', auditRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
