const userModel = require('../models/userModel');
const { verifyToken } = require('../utils/jwt');

exports.me = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const payload = verifyToken(token);
    const user = await userModel.findByEmail(payload.email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
