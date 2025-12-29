import { Router } from 'express';
import { getMyProfile, editMyPublicProfile, getMyPosts, deleteMyPost } from '../controllers/myProfileController.js';
import { checkOnboardStatus } from '../middleware/onboardMiddleWare.js';
import { checkAuth } from '../middleware/authMiddleware.js';

import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

const router = Router();

router.get('/', checkAuth, checkOnboardStatus, getMyProfile);
router.get('/posts', checkAuth, checkOnboardStatus, getMyPosts);
router.put('/edit/public', checkAuth, checkOnboardStatus, upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 }
  ]), editMyPublicProfile);

// router.put('/edit/personal', checkAuth, checkOnboardStatus, upload.single("avatar"), editMyProfile);
router.delete('/posts/:id/delete', checkAuth, checkOnboardStatus, deleteMyPost);

export default router;
