import { body, param, validationResult } from 'express-validator';
import User from '../models/user.js';
import Post from '../models/post.js';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import mongoose from 'mongoose';

const joinValidatorsWithHandler = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegister = joinValidatorsWithHandler([
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 3, max: 10 })
    .withMessage('username must have between 3 and 10 characters')
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) throw new BadRequestError('username already in use');
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must have at least 8 characters'),
]);

export const validateLogin = joinValidatorsWithHandler([
  body('username').notEmpty().withMessage('username is required'),
  body('password').notEmpty().withMessage('password is required'),
]);

export const validatePostCreate = joinValidatorsWithHandler([
  body('title')
    .trim()
    .isLength({ min: 3 })
    .withMessage('title must have at least characters 3'),
  body('content').notEmpty().withMessage('content is required'),
  body('topic').notEmpty().withMessage('topic is required'),
]);

export const validatePermissionPost = joinValidatorsWithHandler([
  param('id').custom(async (id, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestError('invalid post id');

    const post = await Post.findById(id);
    if (!post) throw new BadRequestError(`no post with id: ${id}`);

    if (post.createdBy != req.user.id)
      throw new UnauthenticatedError('not authorized to access this route');
  }),
]);
