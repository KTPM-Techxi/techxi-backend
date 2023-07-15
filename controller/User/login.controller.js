const bcryptService = require('../../services/bcrypt.service');
const User = require('../../models/User');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Compare the entered password with the stored hashed password
    const isMatch = await bcryptService.comparePassword(password, user.password);
    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = loginController;
