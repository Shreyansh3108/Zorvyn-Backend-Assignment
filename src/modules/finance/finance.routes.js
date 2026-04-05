const express = require('express');
const { createRecord, getRecords, updateRecord, deleteRecord } = require('./finance.controller');
const { verifyToken } = require('../../middleware/auth.middleware');
const { authorizeRoles } = require('../../middleware/role.middleware');

const router = express.Router();

router.use(verifyToken);

router.get('/', authorizeRoles('viewer', 'analyst', 'admin'), getRecords);

router.post('/', authorizeRoles('admin'), createRecord);
router.put('/:id', authorizeRoles('admin'), updateRecord);
router.delete('/:id', authorizeRoles('admin'), deleteRecord);

module.exports = router;