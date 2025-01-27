import express from "express";
import {jwtAuth} from "../middleware/jwtAuth.js"
import { jobPost } from "../controller/jobController.js";

const router = express.Router();

router.post("/create",jwtAuth,jobPost);


export default router; 