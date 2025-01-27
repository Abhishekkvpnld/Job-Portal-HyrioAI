import express from "express";
import {jwtAuth} from "../middleware/jwtAuth.js"
import { registerCompany, updateCompany } from "../controller/companyController.js";

const router = express.Router();

router.post("/register",jwtAuth,registerCompany);
router.put("/update",jwtAuth,updateCompany);

export default router;