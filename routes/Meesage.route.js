import express from "express";
import { AuthLogin } from "../middleware/Auth.js";
import { getMessages, sendMessages } from "../controlers/message.controler.js";
const router = express.Router();
router.post("/sendmessage", AuthLogin, sendMessages);
router.get("/getmessages/:id", AuthLogin, getMessages);
export default router;
