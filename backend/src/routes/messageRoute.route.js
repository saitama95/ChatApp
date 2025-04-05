import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSlidebar , getMessages , sendMessages } from "../controller/message.controller.js";
const router = express.Router();


router.get("/users",protectRoute,getUsersForSlidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages);

export default router;