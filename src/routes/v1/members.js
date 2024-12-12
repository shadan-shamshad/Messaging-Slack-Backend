import express from 'express';

import { isMemberPartOfWorkspaceController } from '../../controllers/memberController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get(
    '/:memberId',
    isAuthenticated,
    isMemberPartOfWorkspaceController)


export default router;