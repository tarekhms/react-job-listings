import express from 'express';
import { addJob, getJobs, getJob, updateJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', addJob);
router.get('/', getJobs);
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob);

export default router;