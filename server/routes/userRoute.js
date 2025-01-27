import express from "express";
import { login, logout, signup } from "../controller/userController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", signup);
router.get("/logout", logout);

export default router;
