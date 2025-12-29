import { Router } from 'express';
import { signIn, signUp, getCurrentUser, userLogOut, exchange } from '../controllers/authController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signin', signIn);
router.get('/callback', exchange);
router.post('/signup', signUp);
router.get('/me', checkAuth, getCurrentUser)
router.get('/logout', userLogOut)

export default router;