import express from "express";
import {
  addContactMessage,
  getContactMessage,
} from "../controllers/contactController";

const router = express.Router();

router.get("/", getContactMessage);
router.post("/", addContactMessage);

export default router;
