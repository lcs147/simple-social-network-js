import { Router } from 'express';
const router = Router();
import { getAllUsers, getUserById } from '../controllers/user.js';

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;
