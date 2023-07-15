const logOutController = async (req, res) => {
  res.cookie('token', '').json({ message: 'Logout success' });
};

module.exports = logOutController;
