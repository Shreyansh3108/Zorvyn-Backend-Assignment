const FinanceRecord = require('./finance.model');

const createRecord = async (recordData, userId) => {
  return await FinanceRecord.create({ ...recordData, createdBy: userId });
};

const getRecords = async (queryFilters, userId) => {
  const filter = { createdBy: userId }; 

  if (queryFilters.type) filter.type = queryFilters.type;
  if (queryFilters.category) filter.category = queryFilters.category;

  if (queryFilters.startDate && queryFilters.endDate) {
    filter.date = {
      $gte: new Date(queryFilters.startDate),
      $lte: new Date(queryFilters.endDate)
    };
  }

  console.log("DB Filter applied:", filter); 

  return await FinanceRecord.find(filter).sort({ date: -1 });
};

const updateRecord = async (recordId, updateData, userId) => {
  const updatedRecord = await FinanceRecord.findOneAndUpdate(
    { _id: recordId, createdBy: userId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedRecord) throw new Error('Transaction not found or access denied');
  return updatedRecord;
};

const deleteRecord = async (recordId, userId) => {
  const deletedRecord = await FinanceRecord.findOneAndDelete({
    _id: recordId,
    createdBy: userId
  });

  if (!deletedRecord) throw new Error('Transaction not found or already deleted');
  return deletedRecord;
};

module.exports = { createRecord, getRecords, updateRecord, deleteRecord };