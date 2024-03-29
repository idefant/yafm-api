import { Router } from 'express';

import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';
import { body } from '../middlewares/checkRequestMiddleware';
import {
  changePasswordSchema,
  loginUserSchema,
  refreshTokenSchema,
  signupUserSchema,
} from '../schema/userSchema';

const router = Router();

router.post('/signup', body(signupUserSchema), UserController.signup);
router.post('/login', body(loginUserSchema), UserController.login);
router.put('/change_password', body(changePasswordSchema), UserController.changePassword);
router.put('/refresh_token', body(refreshTokenSchema), UserController.refreshToken);
router.get('/me', authMiddleware, UserController.getInfo);
router.delete('/me', authMiddleware, UserController.delete);

export default router;
