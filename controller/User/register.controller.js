const bcryptService = require('../../services/bcrypt.service');
const User = require('../../models/User');

const registerController = async (req, res) => {
  const { email, phoneNumber, name, password } = req.body;
  try {
    // Check if the user is already registered
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    } else {
      const hashedPassword = await bcryptService.hashPassword(password);
      const newUser = await User.create({ email, phoneNumber, name, password: hashedPassword });
      return res.status(200).json({ message: 'Register successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = registerController;
