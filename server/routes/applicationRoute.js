import express from "express";
import {jwtAuth} from "../middleware/jwtAuth.js"
import { applyJob, getAppliedJob } from "../controller/applicationController.js";


const router = express.Router();
 
router.get("/apply/:id",jwtAuth,applyJob);
router.get("/applied",jwtAuth,getAppliedJob);

export default router; 