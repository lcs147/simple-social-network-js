import * as dotenv from 'dotenv';
dotenv.config();
import { UnauthenticatedError } from '../errors/customErrors.js';
import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/password.js';
import { createJWT } from '../utils/jwt.js';

export const register = async (req, res) => {
  const user = req.body;
  user.password = await hashPassword(user.password);

  await User.create(user);

  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user || !(await comparePassword(password, user.password)))
    throw new UnauthenticatedError('invalid credentials');

  const jwt = createJWT({ id: user._id });
  res.cookie('token', jwt, {
    httpOnly: true,
    maxage: 24 * 60 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    maxage: 1,
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
