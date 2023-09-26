import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/jwt.js';

export const authenticatorUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('invalid authentication1');

  try {
    const { id } = verifyJWT(token);
    req.user = { id };
    next();
  } catch (err) {
    throw new UnauthenticatedError('invalid authentication');
  }
};
