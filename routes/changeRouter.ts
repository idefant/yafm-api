import { Router } from 'express';

import ChangeController from '../controllers/ChangeController';
import authMiddleware from '../middlewares/authMiddleware';
import { body } from '../middlewares/checkRequestMiddleware';
import { createChangeSchema } from '../schema/changeSchema';

const router = Router();
router.use(authMiddleware);

router.get('/', ChangeController.getList);
router.post('/', body(createChangeSchema), ChangeController.create);

export default router;
