import express from "express";
import { chataccess } from "../controlers/chat.controler.js";
import { AuthLogin } from "../middleware/Auth.js";
import { fetchchat } from "../controlers/chat.controler.js";
import {
  deleteGroup,
  renameGroup,
  createGroup,
} from "../controlers/chat.controler.js";
const router = express.Router();
router.post("/chatacess", AuthLogin, chataccess);
router.get("/fetchChat", AuthLogin, fetchchat);
router.post("/addMember", AuthLogin);
router.post("/deleteMember", AuthLogin, deleteGroup);
router.post("/renameGroup", AuthLogin, renameGroup);
router.post("/createGroup", AuthLogin, createGroup);
export default router;
