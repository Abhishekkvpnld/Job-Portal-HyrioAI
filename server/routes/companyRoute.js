import express from "express";
import {jwtAuth} from "../middleware/jwtAuth.js"
import { getCompany, registerCompany, updateCompany } from "../controller/companyController.js";

const router = express.Router();

router.post("/register",jwtAuth,registerCompany);
router.put("/update",jwtAuth,updateCompany);
router.get("/all",jwtAuth,getCompany)

export default router; 