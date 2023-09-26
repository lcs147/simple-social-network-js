import { Router } from 'express';
const router = Router();
import { getAll, getAllFromUser, createPost } from '../controllers/post.js';

router.route('/').get(getAll).post(createPost);
router.get('/:id', getAllFromUser);

export default router;
