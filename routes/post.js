import { Router } from 'express';
const router = Router();
import { getAll, getAllFromUser } from '../controllers/post.js';

router.get('/', getAll);
router.get('/:id', getAllFromUser);

export default router;
