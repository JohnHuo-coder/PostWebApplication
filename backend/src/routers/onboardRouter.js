import { Router } from 'express';
import { completePublic, getOnboardStatus } from '../controllers/onboardController.js';
import { checkOnboardStatus, checkOnboardPublic } from '../middleware/onboardMiddleWare.js';
import { checkAuth } from '../middleware/authMiddleware.js';
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});


router.get('/checkonboard', checkAuth, checkOnboardStatus, getOnboardStatus)
router.post('/completepublic', checkAuth, checkOnboardPublic, upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 }
  ]), completePublic);

// router.post('/skip-private', checkAuth, checkPublicBeforePrivate, checkOnboardPrivate, skipPrivate)
// router.post('/completeprivate', checkAuth, checkPublicBeforePrivate, checkOnboardPrivate, upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "backgroundImage", maxCount: 1 }
//   ]), completePrivate);

export default router;