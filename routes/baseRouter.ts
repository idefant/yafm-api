import { Router } from 'express';

import BaseController from '../controllers/BaseController';
import { body } from '../middlewares/checkRequestMiddleware';
import { createBaseSchema } from '../schema/baseSchema';

const router = Router();

router.get('/', BaseController.getList);
router.post('/', body(createBaseSchema), BaseController.create);
router.get('/latest', BaseController.get);

export default router;
