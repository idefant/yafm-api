import express, { Router } from 'express';

import UserController from '../controllers/UserController';

const router = Router();

router.post('/signup', express.json(), UserController.signup);
router.post('/login', express.json(), UserController.login);
router.put('/change_password', express.json(), UserController.changePassword);
router.put('/refresh_token', express.json(), UserController.refreshToken);

export default router;
