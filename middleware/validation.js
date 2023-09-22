import { body, validationResult } from 'express-validator';
import User from '../models/user.js';
import { BadRequestError } from '../errors/customErrors.js';

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
