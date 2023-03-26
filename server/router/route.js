import { Router } from 'express';
import {
  createResetSession,
  generateOTP,
  getUser,
  login,
  register,
  resetPassword,
  updateUser,
  verifyOTP,
  verifyUser,
} from '../controllers/appController.js';
import { registerEmail } from '../controllers/mailer.js';
import { auth, localVariables } from '../middleware/auth.js';
// import * as controller from '../controllers/appController';

const router = Router();

/*Post Methods*/
router.post('/register', register);
router.post('/registerEmail', registerEmail);
router.post('/authenticate', verifyUser, (req, res) => res.end());
router.post('/login', verifyUser, login);

/*Get Methods*/
router.get('/user/:username', getUser);
router.get('/generateOTP', verifyUser, localVariables, generateOTP);
router.get('/verifyOTP', verifyUser, verifyOTP);
router.get('/createResetSession', createResetSession);

/*Put Methods*/
router.put('/updateUser', auth, updateUser);
router.put('/resetPassword', verifyUser, resetPassword);

export default router;
