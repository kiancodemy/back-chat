import express from "express";
import { chataccess } from "../controlers/chat.controler.js";
import { AuthLogin } from "../middleware/Auth.js";
import { fetchchat } from "../controlers/chat.controler.js";
import {
  deleteGroup,
  renameGroup,
  createGroup,
  removedGroup,
  addGroup,
} from "../controlers/chat.controler.js";
const router = express.Router();

router.post("/chatacess", AuthLogin, chataccess);
router.get("/fetchChat", AuthLogin, fetchchat);
router.post("/addMember", AuthLogin);
router.delete("/deleteMember", AuthLogin, deleteGroup);
router.put("/renameGroup", AuthLogin, renameGroup);
router.post("/createGroup", AuthLogin, createGroup);
router.post("/ removedGroup", AuthLogin, removedGroup);
router.post("/addGroup", AuthLogin, addGroup);
export default router;
