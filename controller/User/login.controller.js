const User = require('../../models/User');
var jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
      if (user.email === email && user.password === password) {
        return res.status(200).json({ message: 'Login successfully' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = loginController;
