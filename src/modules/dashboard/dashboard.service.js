const mongoose = require('mongoose');
const TransactionDb = require('../finance/finance.model'); 

const fetchUserStats = async (uid) => {
  const userObjectId = new mongoose.Types.ObjectId(uid);

  const statsData = await TransactionDb.aggregate([
    { $match: { createdBy: userObjectId } },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" }
      }
    }
  ]);

  let incomeTotal = 0;
  let expenseTotal = 0;

  statsData.forEach(item => {
    if (item._id === 'income') incomeTotal = item.totalAmount;
    if (item._id === 'expense') expenseTotal = item.totalAmount;
  });

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentSpending = await TransactionDb.aggregate([
    { $match: { 
        createdBy: userObjectId, 
        type: 'expense', 
        date: { $gte: last30Days } 
    }},
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const recentList = await TransactionDb.find({ createdBy: userObjectId })
    .sort({ date: -1 })
    .limit(5);

  return {
    totalIncome: incomeTotal,
    totalExpense: expenseTotal,
    netBalance: incomeTotal - expenseTotal,
    last30DaysSpending: recentSpending[0]?.total || 0, 
    recentTransactions: recentList
  };
};

module.exports = { getMetrics: fetchUserStats };