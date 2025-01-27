import express from "express";
import { jwtAuth } from "../middleware/jwtAuth.js";
import {
  allJobs,
  deleteJob,
  getSingleJob,
  jobPost,
  postedJobs,
} from "../controller/jobController.js";

const router = express.Router();

router.post("/create", jwtAuth, jobPost);
router.get("/all", jwtAuth, allJobs);
router.get("/single/:id", jwtAuth, getSingleJob);
router.get("/postedJobs", jwtAuth, postedJobs);
router.delete("/delete/:id",jwtAuth,deleteJob);

export default router;
