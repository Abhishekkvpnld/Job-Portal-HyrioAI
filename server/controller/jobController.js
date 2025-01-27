import Job from "../models/jobPostModel.js";

export const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.userId;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Something is missing...",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "New Job Created Successfully...",
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const allJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const allJobs = await Job.find();
    const filterJobs = allJobs.filter((job) => job.created_by !== userId);

    return res.status(201).json({
      success: true,
      error: false,
      message: "New Job Created Successfully...",
      data: filterJobs || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const getSingleJob = async (req, res) => {
  const jobId = req.params.id;

  if (!jobId) {
    throw new Error("Something went wrong");
  }
  try {
    const singleJob = await Job.findById(jobId);

    if (!singleJob) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Job not found...",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: singleJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error?.message,
    });
  }
};

export const postedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const allJobs = await Job.find().populate("company");

    const filterJobs = allJobs.filter((job) => job.created_by == userId);

    return res.status(201).json({
      success: true,
      error: false,
      message: "Posted Jobs fetched successfully",
      data: filterJobs || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  const userId = req.userId;
  const jobId = req.params.id;

  try {
    if (!userId) {
      throw new Error("Please login first");
    }


    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Job Not Found",
      });
    }


    if (job?.created_by != userId) {
      throw new Error("You dont have permission to delete this post");
    }

    const deletePost = await Job.deleteOne({ _id: jobId });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Job Post Deleted Successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
