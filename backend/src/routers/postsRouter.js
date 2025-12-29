import { Router } from 'express';
import {getAllPosts, postNewPost, searchPosts, getPostDetail} from '../controllers/postsController.js';
import { checkAuth } from '../middleware/authMiddleware.js';
import { checkOnboardStatus } from '../middleware/onboardMiddleWare.js';

const router = Router();

router.post('/post', checkAuth, checkOnboardStatus, postNewPost);
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPostDetail);


export default router;