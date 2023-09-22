import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/auth.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
