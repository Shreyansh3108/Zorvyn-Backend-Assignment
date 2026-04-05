const mongoose = require('mongoose');

const financeRecordSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  notes: { 
    type: String, 
    trim: true 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

financeRecordSchema.index({ createdBy: 1 });
financeRecordSchema.index({ type: 1, category: 1 });

module.exports = mongoose.model('FinanceRecord', financeRecordSchema);