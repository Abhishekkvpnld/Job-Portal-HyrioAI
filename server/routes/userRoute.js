import express from "express";
import { fetchUser, login, logout, signup, updateProfile } from "../controller/userController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.get("/logout", logout); 
router.get("/:id",jwtAuth,fetchUser);
router.put("/update-profile",jwtAuth,updateProfile)

export default router;
