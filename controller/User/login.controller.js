const bcryptService = require('../../services/bcrypt.service');
const User = require('../../models/User');
var jwt = require('jsonwebtoken');
const authConfig = require('../../app/config/auth.config');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the useNếu cần thiết ta sẽ viết thêm để custom. Cái handle error này sẽ hơi khó.r in the databaNếu cần thiết ta sẽ viết thêm để custom. Cái handle error này sẽ hơi khó.sechung chung ở common/errorutil Nếu cần thiết ta sẽ viết thêm để c
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    // Compare the entered password with the stored hashed password
    const isMatch = await bcryptService.comparePassword(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: '300'
      });
      return res.status(200).send({
        username: user.username,
        email: user.email,
        accessToken: token
      });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = loginController;
