import Job from "../models/jobPostModel.js";
import User from "../models/userModel.js";
import { sendMail } from "../utils/nodeMailer.js";
import { generateOTP } from "../utils/otpGenerator.js";

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
    const singleJob = await Job.findById(jobId).populate("applications");

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

export const verifyAccount = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      throw new Error("Please login first");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const newOTP = generateOTP();
    let subject = "OTP for Your Verification Request";
    let to = user.email;
    
    let text = `Dear ${user?.username},
A One-Time Password (OTP) has been sent to your email address to verify your request. Please check your inbox (or spam folder) for the OTP.
Use the following OTP to complete your verification:

OTP: ${newOTP}

This OTP will expire in 10 minutes for security purposes. If you did not request this, please ignore this email.`;

    await sendMail(to, subject, text);

    return res.status(201).json({
      success: true,
      error: false,
      message: "OTP send to your email...✅",
      data: newOTP,
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
