const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[API HIT] ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'active', timestamp: new Date() });
});

const userRoutes = require('./modules/user/user.routes');
app.use('/api/users', userRoutes);

const financeRoutes = require('./modules/finance/finance.routes');
app.use('/api/finance', financeRoutes);

const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});