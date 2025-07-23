const { hashPassword } = require('../utils/hash');

exports.hashPasswordEndpoint = async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'Password required' });
  try {
    const hash = await hashPassword(password);
    res.status(200).json({ hash });
  } catch (error) {
    res.status(500).json({ message: 'Error hashing password' });
  }
};
