import { Router } from 'express';
import {
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
  verifyUser,
} from '../controllers/appController.js';
import { auth, localVariables } from '../middleware/auth.js';
// import * as controller from '../controllers/appController';

const router = Router();

/*Post Methods*/
router.post('/register', register);
router.post('/registerEmail', (req, res) => {
  res.status(201).json('Hello World');
});
router.post('/authenticate', (req, res) => {
  res.status(201).json('Hello World');
});
router.post('/login', verifyUser, login);

/*Get Methods*/
router.get('/user/:username', getUser);
router.get('/generateOTP', verifyUser, localVariables, generateOTP);
router.get('/verifyOTP', verifyUser, verifyOTP);
router.get('/createResetSession', (req, res) => {
  res.status(201).json('Hello World');
});

/*Put Methods*/
router.put('/updateUser', auth, updateUser);
router.put('/resetPassword', verifyUser, resetPassword);

export default router;
