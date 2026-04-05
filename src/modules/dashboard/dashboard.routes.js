const express = require('express');
const { getDashboardSummary } = require('./dashboard.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/summary', verifyToken, getDashboardSummary);

module.exports = router;