import { Router } from 'express';
import { register } from '../controllers/appController.js';
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
router.post('/login', (req, res) => {
  res.status(201).json('Hello World');
});

/*Get Methods*/
router.get('/user/:username', (req, res) => {
  res.status(201).json('Hello World');
});
router.get('/generateOTP', (req, res) => {
  res.status(201).json('Hello World');
});
router.get('/verifyOTP', (req, res) => {
  res.status(201).json('Hello World');
});
router.get('/createResetSession', (req, res) => {
  res.status(201).json('Hello World');
});

export default router;
