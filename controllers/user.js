import { OK, StatusCodes } from 'http-status-codes';
import User from '../models/user.js';
import { NotFoundError } from '../errors/customErrors.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).send(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError('inexistent user');
  res.status(StatusCodes.OK).send(user);
};
