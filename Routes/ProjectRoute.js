import express from 'express';
import { createProject, getProject, applyProject } from "../Controllers/ProjectController.js";

const router = express.Router();

router.post('/addproject', createProject);

router.get('/projects', getProject);

router.put('/:id/apply', applyProject);

export default router;