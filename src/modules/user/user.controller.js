const userService = require('./user.service');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required for signup' });
    }

    const user = await userService.registerUser(req.body);

    res.status(201).json({
      message: 'Signup successful',
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { user, token } = await userService.loginUser(email, password);
    res.status(200).json({ 
      message: 'Login successful',
      token, 
      user: { id: user._id, email: user.email } 
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };