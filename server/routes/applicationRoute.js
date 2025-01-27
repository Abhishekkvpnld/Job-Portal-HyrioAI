import express from "express";
import {jwtAuth} from "../middleware/jwtAuth.js"
import { applyJob } from "../controller/applicationController.js";


const router = express.Router();
 
router.post("/apply",jwtAuth,applyJob)

export default router; 