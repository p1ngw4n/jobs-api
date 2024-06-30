const { NotFoundError, BadRequestError } = require("../errors");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ createdBy: userId, _id: jobId });
  if (!job) {
    throw new NotFoundError(`no job with id ${jobId}`);
  }
  console.log(job);
  console.log("hey!");
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("company or position is empt");
  }

  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: jobId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`no job with id ${jobId}`);
  }
  console.log(job);
  console.log("hey!");
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`no job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).send();

};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
