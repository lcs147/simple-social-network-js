import User from '../models/user.js';

export const register = async (req, res) => {
  await User.create(req.body);
  res.send(req.body);
};

export const login = async (req, res) => {
  res.send('login user');
};
