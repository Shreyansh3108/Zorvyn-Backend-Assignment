const User = require('./user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  console.log("Register attempt for:", email); 

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'viewer',
  });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { user, token };
};

module.exports = { registerUser, loginUser };