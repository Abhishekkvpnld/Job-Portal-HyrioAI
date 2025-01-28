import Application from "../models/applicationModel.js";
import Company from "../models/companyModel.js";
import Job from "../models/jobPostModel.js";
import User from "../models/userModel.js";
import { sendMail } from "../utils/nodeMailer.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;

    if (!userId) {
      throw new Error("Please login first...");
    }

    if (!jobId) {
      throw new Error("Job not found...");
    }

    let user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // check job available
    const checkJob = await Job.findById(jobId);
    if (!checkJob) {
      throw new Error("Job not available...");
    }

    let company = await Company.findById(checkJob?.company);
    if (!company) {
      throw new Error("Company not available...");
    }

    // check user already applied
    const checkApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (checkApplied) {
      throw new Error("You have already applied for this job...");
    }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    checkJob.applications.push({
      application: newApplication._id,
      jobId: newApplication.job,
      userId: newApplication.applicant,
    });
    await checkJob.save();

    let subject = `JobNest Application: ${checkJob?.title}`;
    let text = `
    Dear ${user.username},
    
    Thank you for applying for the position of "${checkJob.title}" at ${company.name}. We have successfully received your application and are currently reviewing your qualifications.
    If your profile matches our requirements, we will get in touch with you to discuss the next steps.
    In the meantime, if you have any questions, feel free to reach out to us.
    We appreciate your interest and wish you the best of luck!
    
    Best regards,  
    ${companyName}  
    `;
 
    let to = user?.email;
    //Send Mail-Send Job details
    await sendMail(to, subject, text);

    return res.status(201).json({
      success: true,
      error: false,
      message: "Job applied successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.userId;
    const applicatons = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applicatons) {
      throw new Error("No Applications Found...");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: applicatons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      throw new Error("Job not found..");
    }

    return res.status(200).json({
      success: true,
      error: false,
      data: job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      throw new Error("Status required...");
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      throw new Error("Application not found...");
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Status updated successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};
