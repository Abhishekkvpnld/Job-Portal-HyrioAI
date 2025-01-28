import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [{ type: String }],
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum:["BEGINNER", "INTERMEDIATE", "EXPERT"],
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      required: true,
      ref: "Company",
      type: mongoose.Schema.Types.ObjectId,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    applications: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Job',
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: true,
        },
        application: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Application',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
