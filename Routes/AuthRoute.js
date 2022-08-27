import express from 'express';
import { registerFreelancer, registerClient, loginFreelancer, loginClient, getFreelancers, getFreelancerById } from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/freelancer/signup', registerFreelancer);

router.post('/client/signup', registerClient);

router.post('/freelancer/login', loginFreelancer);

router.post('/client/login', loginClient);

router.get('/', getFreelancers);

router.get('/:id', getFreelancerById);

export default router;