const express = require('express');
const auditController = require('../controllers/auditController');
const { validateAudit } = require('../middleware/validate');
const rateLimiter = require('../middleware/rateLimiter');
const concurrencyLimiter = require('../middleware/concurrency');

const router = express.Router();

router.post(
  '/audit',
  rateLimiter,
  concurrencyLimiter,
  validateAudit,
  auditController.auditUrl
);

module.exports = router;
