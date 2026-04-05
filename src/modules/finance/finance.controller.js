const financeService = require('./finance.service');

const createRecord = async (req, res) => {
  try {
    const { amount, type, category } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: 'Missing required transaction fields' });
    }

    console.log("Creating record for user:", req.user.id); 

    const record = await financeService.createRecord(req.body, req.user.id);

    res.status(201).json({
      message: 'Transaction added successfully',
      transaction: record
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRecords = async (req, res) => {
  try {
    const records = await financeService.getRecords(req.query, req.user.id);

    res.status(200).json({
      status: 'ok',
      results: records.length,
      transactions: records
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch financial records' });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await financeService.updateRecord(req.params.id, req.body, req.user.id);
    res.status(200).json({ message: 'Update successful', transaction: record });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    await financeService.deleteRecord(req.params.id, req.user.id);
    res.status(200).json({ message: 'Transaction removed permanently' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { createRecord, getRecords, updateRecord, deleteRecord };