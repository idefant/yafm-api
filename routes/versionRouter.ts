import { Router } from 'express';

import VersionController from '../controllers/VersionController';
import authMiddleware from '../middlewares/authMiddleware';
import { body, params } from '../middlewares/checkRequestMiddleware';
import { createVersionSchema, getVersionByIdSchema } from '../schema/versionSchema';

const router = Router();
router.use(authMiddleware);

router.get('/last', VersionController.getLast);
router.get('/', VersionController.getList);
router.get('/:versionId', params(getVersionByIdSchema), VersionController.getById);
router.post('/', body(createVersionSchema), VersionController.create);

export default router;
