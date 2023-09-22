import * as dotenv from 'dotenv';
dotenv.config();
import { UnauthenticatedError } from '../errors/customErrors.js';
import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/password.js';
import Jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const user = req.body;
  user.password = await hashPassword(user.password);

  console.log(user);
  await User.create(user);
  delete user.password;
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user || !(await comparePassword(password, user.password)))
    throw new UnauthenticatedError('invalid credentials');

  const jwt = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged in', jwt });
};
