import { Router } from 'express';
import { getAllUsers, getUserByName, getUserPosts, getUserInfo } from '../controllers/usersController.js';

const router = Router();


router.get('/', getAllUsers);
router.get('/search', getUserByName);
router.get('/:id/posts', getUserPosts);
router.get('/:id', getUserInfo);



export default router;
