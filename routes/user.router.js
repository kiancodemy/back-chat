import express from "express";
import signup from "../controlers/user.controler.js";
import { login, logout } from "../controlers/user.controler.js";
import { AllUsers } from "../controlers/user.controler.js";
import { AuthLogin } from "../middleware/Auth.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/Allusers", AuthLogin, AllUsers);
export default router;
