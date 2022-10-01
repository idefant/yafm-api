import { Router } from 'express';

import BaseController from '../controllers/BaseController';
import authMiddleware from '../middlewares/authMiddleware';
import { body } from '../middlewares/checkRequestMiddleware';
import { createBaseSchema } from '../schema/baseSchema';

const router = Router();
router.use(authMiddleware);

router.get('/', BaseController.get);
router.post('/', body(createBaseSchema), BaseController.create);

export default router;
