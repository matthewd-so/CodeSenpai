import express from "express";
import problem from "./problem";
import accounts from "./accounts";
import chat from './chat';

const router = express.Router();

router.use("/problem", problem);
router.use("/accounts", accounts);
router.use("/chat", chat)

export default router;
