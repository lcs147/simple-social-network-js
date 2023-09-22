import { Router } from 'express';
const router = Router();
import { getAll, getAllFromUser } from '../controllers/posts.js';

router.get('/', getAll);
router.get('/:id', getAllFromUser);

export default router;
