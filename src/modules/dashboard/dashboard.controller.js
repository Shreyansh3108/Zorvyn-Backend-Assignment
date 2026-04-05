const dashboardService = require('./dashboard.service');

const getDashboardSummary = async (req, res) => {
  try {
    const metrics = await dashboardService.getMetrics(req.user.id);
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard metrics' });
  }
};

module.exports = { getDashboardSummary };