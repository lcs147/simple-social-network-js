import { Router } from 'express';
const router = Router();
import {
  createPost,
  search,
  deletePost,
  updatePost,
} from '../controllers/post.js';
import { authenticatorUser } from '../middleware/authentication.js';
import {
  validatePostCreate,
  validatePermissionPost,
} from '../middleware/validation.js';

router
  .route('/')
  .get(search)
  .post(authenticatorUser, validatePostCreate, createPost); // add validators

router
  .route('/:id')
  .delete(authenticatorUser, validatePermissionPost, deletePost)
  .patch(authenticatorUser, validatePermissionPost, updatePost);

export default router;
