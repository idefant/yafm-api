import { Router } from 'express';

import CommitController from '../controllers/CommitController';
import { body, query } from '../middlewares/checkRequestMiddleware';
import { createCommitSchema, getListCommitsSchema } from '../schema/commitSchema';

const router = Router();

router.get('/', query(getListCommitsSchema), CommitController.getList);
router.post('/', body(createCommitSchema), CommitController.create);

export default router;
