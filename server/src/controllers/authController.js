const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const check = async (req, res) => {
  try {
    const contactNumber = req.query.contactNumber || req.body.contactNumber;
    if (!contactNumber) return res.status(400).json({ message: 'Missing contactNumber' });

    const user = await User.findOne({ contactNumber }).select('_id name contactNumber').exec();
    res.json({ exists: !!user, user: user ? { id: user._id, name: user.name, contactNumber: user.contactNumber } : null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const register = async (req, res) => {
  try {
    const { name, contactNumber, password } = req.body;
    if (!name || !contactNumber || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ contactNumber }).exec();
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, contactNumber, passwordHash });
    await user.save();

    // For this demo we return a simple token (user id). In real apps use JWT/sessions.
    res.status(201).json({
      user: { id: user._id, name: user.name, contactNumber: user.contactNumber },
      token: String(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { contactNumber, password } = req.body;
    if (!contactNumber || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ contactNumber }).exec();
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ user: { id: user._id, name: user.name, contactNumber: user.contactNumber }, token: String(user._id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { check, register, login };