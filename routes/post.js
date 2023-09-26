import { Router } from 'express';
const router = Router();
import { createPost, search } from '../controllers/post.js';
import { authenticatorUser } from '../middleware/authentication.js';
import { validatePostCreate } from '../middleware/validation.js';

router
  .route('/')
  .get(search)
  .post(authenticatorUser, validatePostCreate, createPost); // add validators

export default router;
