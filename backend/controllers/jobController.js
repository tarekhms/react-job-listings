import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel.js';

// @desc    Create a new job listing
// route    POST /api/jobs
// @access  Public
const addJob = asyncHandler(async (req, res) => {
    console.log('add job');

    const { title, type, description, location, salary, company } = req.body;

    const jobData = {
        title,
        type,
        description,
        location,
        salary,
        company
    };

    const job = new Job(jobData);
    await job.save();
    res.status(201).json(job);
});

// @desc    Fetch job listings
// route    GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
    let limit = parseInt(req.query.limit);
    limit = !isNaN(limit) && limit > 0 ? limit : 0;

    const jobs = await Job.find({}).limit(limit);
    res.status(200).json(jobs);
});

// @desc    Fetch single job listing
// route    GET /api/jobs/:id
// @access  Public
const getJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    res.status(200).json(job);
});

// @desc    Update job listing
// route    PUT /api/jobs/:id
// @access  Public
const updateJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const jobData = {
        title: req.body.title,
        type: req.body.type,
        location: req.body.location,
        salary: req.body.salary,
        company: req.body.company
    };

    await Job.findByIdAndUpdate(jobId, jobData);

    res.status(200).json({});
});

// @desc    Delete job listing
// route    DELETE /api/jobs/:id
// @access  Public
const deleteJob = asyncHandler(async (req, res, next) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    await job.deleteOne();
    res.status(200).json({});
});

export {
    addJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
};